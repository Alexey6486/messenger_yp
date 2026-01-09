import { Block } from '@/block';
import {
	Store,
	StoreEvents,
} from '@/store';
import { IDS } from '@/constants';
import {
	compile,
	isArray,
	isEqual,
} from '@/utils';
import type { BlockProps } from '@/types';
import type { MessagingMainBlock } from '@/pages/main/components/messaging-main/messaging-main-block';
import { MessagingHeaderBlock } from '@/pages/main/components/messaging-header/messaging-header-block';
import { MessagingFooterBlock } from '@/pages/main/components/messaging-footer/messaging-footer-block';
import template from './messaging-template';
import styles from '@/pages/main/styles.module.pcss';

interface IMessagingBlockProps extends BlockProps {
	childrenList?: MessagingMainBlock[];
}

export class MessagingBlock extends Block {
	constructor(props: IMessagingBlockProps) {
		let state = props?.mapStateToProps?.(Store.getState());

		super({
			...props,
			...(props?.mapStateToProps && props.mapStateToProps(Store.getState())),
			markup: {
				[IDS.COMMON.COMPONENTS_LIST]: `<div id="${ IDS.COMMON.COMPONENTS_LIST }"></div>`,
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
				console.log('State MessagingBlock: ', { isEqualCheck, state, newState, t: this });

				if (!isEqualCheck) {
					if (isArray(args) && (args as BlockProps[]).length) {
						const stateKey: keyof BlockProps = (args as BlockProps[])[0] as unknown as keyof BlockProps;
						console.log('Store Updated MessagingBlock check: ', { stateKey, c: stateKey in newState });
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
		console.log('Render MessagingBlock', this);
		return compile(template, this.props);
	}
}
