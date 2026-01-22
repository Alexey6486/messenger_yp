import { Block } from '../../../../block';
import {
	Store,
	StoreEvents,
} from '../../../../store';
import { ChatsController } from '../../../../controllers';
import {
	CLASSES,
	IDS,
} from '../../../../constants';
import {
	compile,
	isEqual,
} from '../../../../utils';
import type { BlockProps } from '../../../../types';
import { DropDownBlock } from '../../../../components/drop-down/drop-down-block';
import { DropDownOptionBlock } from '../../../../components/drop-down/drop-down-option-block';
import { ChatInfoBlock } from '../chat-info/chat-info-block';
import {
	SvgCross,
	SvgPlus,
} from '../../../../components/icons';
import template from './messaging-header-template';

export class MessagingHeaderBlock extends Block {
	constructor(props: BlockProps) {
		let state = props?.mapStateToProps?.(Store.getState());

		super({
			...props,
			...(props?.mapStateToProps && props.mapStateToProps(Store.getState())),
			markup: {
				[IDS.MAIN.MESSAGING_DD_HEADER]: `<div id="${ IDS.MAIN.MESSAGING_DD_HEADER }"></div>`,
				[IDS.MAIN.CHAT_INFO]: `<div id="${ IDS.MAIN.CHAT_INFO }"></div>`,
			},
			children: {
				[IDS.MAIN.MESSAGING_DD_HEADER]: new DropDownBlock({
					id: IDS.MAIN.MESSAGING_DD_HEADER,
					direction: 'bottom left',
					childrenList: [
						new DropDownOptionBlock({
							id: IDS.MAIN.MAIN_ADD_USER_OPTION,
							icon: SvgPlus,
							text: 'Добавить пользователя',
							onClick: (event: Event) => {
								event.preventDefault();
								event.stopPropagation();

								this.toggleClassList(CLASSES.ACT, IDS.MAIN.MESSAGING_DD_HEADER);

								this.createModal(
									IDS.FORMS.MODAL_ADD_USERS_FORM,
									'Добавление пользователей',
									(_, data) => {
										if (data && state?.currentChatData?.info) {
											ChatsController.addUsers(
												data as number[],
												state.currentChatData.info,
												this,
											);
										}
									},
								);
							},
						}),
						new DropDownOptionBlock({
							id: IDS.MAIN.MAIN_REMOVE_USER_OPTION,
							icon: SvgCross,
							text: 'Удалить пользователя',
							onClick: (event: Event) => {
								event.preventDefault();
								event.stopPropagation();

								this.toggleClassList(CLASSES.ACT, IDS.MAIN.MESSAGING_DD_HEADER);

								this.createModal(
									IDS.MODAL.MODAL_REMOVE_USERS,
									'Удаление пользователей',
									(_, data) => {
										if (data && state?.currentChatData?.info) {
											ChatsController.removeUsers(
												data as number[],
												state.currentChatData.info,
												this,
											);
										}
									},
								);
							},
						}),
					],
				}),
				[IDS.MAIN.CHAT_INFO]: new ChatInfoBlock({
					id: IDS.MAIN.CHAT_INFO,
					styles: props?.styles,
					text: props?.currentChatData?.info.title ?? '',
					avatar: props?.currentChatData?.info.title ?? '',
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return {
							text: data?.currentChatData?.info.title ?? '',
							avatar: data?.currentChatData?.info.avatar ?? '',
						};
					},
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						this.createModal(
							IDS.MODAL.CHAT_INFO,
							'Информация о чате',
						);
					},
				}),
			},
		});

		Store.on(StoreEvents.Updated, () => {
			const newState = props?.mapStateToProps?.(Store.getState());
			if (props.mapStateToProps && state && newState) {
				const isEqualCheck = isEqual(state, newState);
				if (!isEqualCheck) {
					this.setProps(newState);
				}
			}
			state = newState;
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
