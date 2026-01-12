import { Block } from '@/block';
import { ChatsController } from '@/controllers';
import {
	Store,
	StoreEvents,
} from '@/store';
import {
	BASE_IMG_URL,
	IDS,
} from '@/constants';
import {
	cloneDeep,
	compile,
} from '@/utils';
import type {
	BlockProps,
	IChatUserResponse,
} from '@/types';
import { E_FORM_FIELDS_NAME } from '@/types';
import { UlBlock } from '@/components/ul/ul-block';
import { ChatUserBlock } from '@/components/chat-user/chat-user-block';
import { InputBlock } from '@/components/input/input-block';
import { ButtonBlock } from '@/components/button/button-block';
import template from './chat-info-template';
import styles from '../styles.module.pcss';

export class ModalChatInfoBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			styles,
			id: IDS.MODAL.CONTENT,
			baseUrl: BASE_IMG_URL,
			events: {
				submit: (e: Event) => {
					e.preventDefault();
					e.stopPropagation();
				},
			},
			markup: {
				[IDS.MODAL.CHAT_INFO_USERS]: `<div id="${ IDS.MODAL.CHAT_INFO_USERS }"></div>`,
				[IDS.MODAL.CHAT_AVATAR]: `<div id="${ IDS.MODAL.CHAT_AVATAR }"></div>`,
				[IDS.MODAL.REMOVE_GROUP_BTN]: `<div id="${ IDS.MODAL.REMOVE_GROUP_BTN }"></div>`,
			},
			children: {
				[IDS.MODAL.CHAT_AVATAR]: new InputBlock({
					id: IDS.MODAL.CHAT_AVATAR,
					dataset: E_FORM_FIELDS_NAME.avatar,
					name: E_FORM_FIELDS_NAME.avatar,
					placeholder: '',
					type: 'file',
					accept: 'image/*',
					input_data: null,
					onFileChange: (fileList: FileList) => {
						console.log('Avatar onInputChange: ', { fileList });
						const formData = new FormData();
						formData.append('avatar', fileList[0]);
						formData.append('chatId', props.currentChatData?.info.id ?? '');
						ChatsController.changeAvatar({ data: formData as FormData }, this);
					},
				}),
				[IDS.MODAL.CHAT_INFO_USERS]: new UlBlock({
					id: IDS.MODAL.CHAT_INFO_USERS,
					clearChildrenListOnStateChange: true,
					storeEvent: StoreEvents.Updated_modal,
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return {
							currentChatData: cloneDeep(data?.currentChatData),
						};
					},
					childrenList: props.currentChatData?.users.map((user: IChatUserResponse) => {
						const { login, id, avatar } = user;
						return new ChatUserBlock({
							id,
							avatar,
							name: login,
							text: login.substring(0, 1).toUpperCase(),
							isAdd: false,
							isRemove: false,
						});
					}).filter((el) => el),
				}),
				[IDS.MODAL.REMOVE_GROUP_BTN]: new ButtonBlock({
					id: IDS.MODAL.REMOVE_GROUP_BTN,
					type: 'button',
					text: props?.buttonText ?? 'Удалить группу',
					class: 'red',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						ChatsController.deleteChat({
							data: JSON.stringify({ chatId: this.props.currentChatData?.info.id }),
						});

						const chatId = this.props.currentChatData?.info.id;
						const sockets = Store.getState().chatsSockets;
						const messages = Store.getState().messages;
						const chats = Store.getState().chats;
						console.log('modal delete chat: ', { chatId, chats, sockets });

						if (sockets && sockets.size > 0 && chatId) {
							const socket = sockets.get(chatId);
							if (socket) {
								socket.disconnect();
								sockets.delete(chatId);
							}
						}

						Store.set('currentChatData', null, 'currentChatData' as BlockProps);

						if (chats) {
							Store.set(
								'chats',
								chats.filter((el) => el.id !== chatId),
								'chats' as BlockProps,
							);
						}

						Store.set('messagesList', null, 'messagesList' as BlockProps, true);

						if (messages && messages.size > 0 && chatId) {
							const chat = messages.get(chatId);
							if (chat) {
								messages.delete(chatId);
							}
						}

						this.props?.onCloseModal?.();
					},
				}),
			},
		});
	}

	override componentWillUnmount() {
		Store.clearTargetSubs(StoreEvents.Updated_modal);
	}

	override render(): string {
		console.log('Render ModalChatInfoBlock', this, Store);
		return compile(template, this.props);
	}
}
