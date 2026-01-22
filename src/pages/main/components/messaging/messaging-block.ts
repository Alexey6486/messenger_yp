import { Block } from '../../../../block';
import {
	Store,
	StoreEvents,
} from '../../../../store';
import { IDS } from '../../../../constants';
import {
	compile,
	formatDate,
	isArray,
	isEqual,
} from '../../../../utils';
import type {
	BlockProps,
	ISocketChatMessage,
} from '../../../../types';
import { MessagingMainBlock } from '../messaging-main/messaging-main-block';
import { MessagingHeaderBlock } from '../messaging-header/messaging-header-block';
import { MessagingFooterBlock } from '../messaging-footer/messaging-footer-block';
import { UlBlock } from '../../../../components/ul/ul-block';
import template from './messaging-template';
import styles from '../../styles.module.pcss';

export class MessagingBlock extends Block {
	constructor(props: BlockProps) {
		let state = props?.mapStateToProps?.(Store.getState());

		super({
			...props,
			...(props?.mapStateToProps && props.mapStateToProps(Store.getState())),
			markup: {
				[IDS.MAIN.MESSAGING_MAIN]: `<div id="${ IDS.MAIN.MESSAGING_MAIN }"></div>`,
				[IDS.MAIN.MESSAGING_HEADER]: `<div id="${ IDS.MAIN.MESSAGING_HEADER }"></div>`,
				[IDS.MAIN.MESSAGING_FOOTER]: `<div id="${ IDS.MAIN.MESSAGING_FOOTER }"></div>`,
			},
			children: {
				[IDS.MAIN.MESSAGING_HEADER]: new MessagingHeaderBlock({
					id: IDS.MAIN.MESSAGING_HEADER,
					styles,
					container: props.container,
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return {
							currentChatData: data.currentChatData,
						};
					},
				}),
				[IDS.MAIN.MESSAGING_MAIN]: new UlBlock({
					id: IDS.MAIN.MESSAGING_MAIN,
					clearChildrenListOnStateChange: true,
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return {
							messagesList: data.messagesList,
						};
					},
					onSetChildrenList: (data: Partial<BlockProps>) => {
						const childrenList: Block[] = [];

						if (isArray(data?.messagesList, true)) {
							data.messagesList.forEach(({ id, user_id, content, time, login }: ISocketChatMessage) => {
								childrenList.push(new MessagingMainBlock({
									id,
									styles,
									author: login,
									text: content,
									date: formatDate(time),
									isMe: user_id === this.props?.userData?.id,
								}));
							});
						}

						return childrenList;
					},
				}),
				[IDS.MAIN.MESSAGING_FOOTER]: new MessagingFooterBlock({
					id: IDS.MAIN.MESSAGING_FOOTER,
					styles,
					newMessageForm: props.newMessageForm,
					chatsSockets: props.chatsSockets,
					currentChatData: props.currentChatData,
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return {
							newMessageForm: data.newMessageForm,
							currentChatData: data.currentChatData,
							chatsSockets: data.chatsSockets,
						};
					},
				}),
			},
		});

		Store.on(StoreEvents.Updated, (...args) => {
			const newState = props?.mapStateToProps?.(Store.getState());
			if (props.mapStateToProps && state && newState) {
				const isEqualCheck = isEqual(state, newState);
				if (!isEqualCheck) {
					if (isArray(args, true)) {
						const stateKey: keyof BlockProps = (args as BlockProps[])[0] as unknown as keyof BlockProps;
						if (stateKey && stateKey in newState) {
							const targetField = newState[stateKey];
							this.setProps({ [stateKey]: targetField });
						} else {
							this.setProps({ ...newState });
						}
					} else {
						this.setProps({ ...newState });
					}
				}
			}
			state = newState;
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
