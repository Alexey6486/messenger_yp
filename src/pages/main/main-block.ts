import { Block } from '@/block';
import { Store } from '@/store';
import { ChatsController } from '@/controllers';
import {
	FocusManager,
	getFocusData,
} from '@/focus-manager';
import { ModalBlock } from '@/pages/modal';
import {
	IDS,
	INIT_MESSAGE_STATE,
	INIT_SEARCH_STATE,
	PAGES_URL,
	STORAGE_KEY,
} from '@/constants';
import {
	cloneDeep,
	compile,
	escapeHTML,
	fieldsValidator,
	formatDate,
	getInputStateSlice,
	isArray,
} from '@/utils';
import type {
	BlockProps,
	IChat,
	IInputChangeParams,
	IUserResponse,
} from '@/types';
import { E_FORM_FIELDS_NAME } from '@/types';
import { FormBlock } from '@/components/form/form-block';
import { InputBlock } from '@/components/input/input-block';
import { UlBlock } from '@/components/ul/ul-block';
import { LinkBlock } from '@/components/link/link-block';
import { ButtonRoundBlock } from '@/components/button-round/button-round-block';
import { MessagingBlock } from '@/pages/main/components/messaging/messaging-block';
import { ChatBlock } from '@/pages/main/components/chat/chat-block';
import { formatContentLength } from '@/pages/main/utils';
import { SvgPlus } from '@/components/icons';
import template from './main-template.hbs?raw';
import styles from './styles.module.pcss';

export class MainBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			styles,
			markup: {
				[IDS.MAIN.SEARCH_FORM]: `<div id="${ IDS.MAIN.SEARCH_FORM }"></div>`,
				[IDS.MAIN.ADD_CHAT]: `<div id="${ IDS.MAIN.ADD_CHAT }"></div>`,
				[IDS.MAIN.CHAT_LIST]: `<div id="${ IDS.MAIN.CHAT_LIST }"></div>`,
				[IDS.MAIN.MESSAGING]: `<div id="${ IDS.MAIN.MESSAGING }"></div>`,
				[IDS.MAIN.PROFILE_LINK]: `<div id="${ IDS.MAIN.PROFILE_LINK }"></div>`,
			},
			children: {
				[IDS.MAIN.ADD_CHAT]: new ButtonRoundBlock({
					id: IDS.MAIN.ADD_CHAT,
					type: 'button',
					title: 'Создать чат',
					icon: SvgPlus,
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						this.createModal(new ModalBlock({
							contentId: IDS.FORMS.MODAL_ADD_CHAT_FORM,
							title: 'Создание чата',
							onSubmit: (_, data) => {
								if (data) {
									ChatsController.createChat({ data: JSON.stringify(data) }, this);
								}
							},
						}));
					},
				}),

				[IDS.MAIN.SEARCH_FORM]: new FormBlock({
					id: IDS.MAIN.SEARCH_FORM,
					childrenList: [
						new InputBlock({
							id: IDS.MAIN.SEARCH_INPUT,
							input_data: {
								value: props?.chatsSearchForm?.fields?.login ?? '',
								error: props?.chatsSearchForm?.errors?.login ?? '',
							},
							mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
								return {
									...getInputStateSlice(data?.chatsSearchForm, 'login'),
									chats: data?.chats,
									chatsSockets: data?.chatsSockets,
								};
							},
							dataset: E_FORM_FIELDS_NAME.login,
							name: E_FORM_FIELDS_NAME.login,
							placeholder: 'Поиск',
							type: 'text',
							onInputChange: (params: IInputChangeParams) => {
								const data = {
									...params,
									...(params.info.event === 'blur' && {
										data: {
											...params.data,
											error: fieldsValidator({
												valueToValidate: params.data.value,
												fieldName: E_FORM_FIELDS_NAME.search,
											}),
										},
									}),
								};
								FocusManager.set(getFocusData(params.info));
								Store.set(
									'chatsSearchForm',
									{
										fields: {
											...props?.chatsSearchForm?.fields,
											login: data?.data?.value ?? '',
										},
										errors: {
											...props?.chatsSearchForm?.errors,
											login: data?.data?.error ?? '',
										},
									},
									'chatsSearchForm' as BlockProps,
								);

								if (params.info.event !== 'blur') {
									const stateUser = Store.getState().userData;
									if (stateUser && stateUser.id) {
										ChatsController.getChats(
											stateUser.id,
											this,
											{ data: JSON.stringify({ title: escapeHTML(params?.data?.value) }) },
										);
									}
								}
							},
						}),
					],
				}),
				[IDS.MAIN.CHAT_LIST]: new UlBlock({
					id: IDS.MAIN.CHAT_LIST,
					clearChildrenListOnStateChange: true,
					class: styles.chats,
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return {
							chats: data?.chats,
							currentChatData: data?.currentChatData,
						};
					},
					onSetChildrenList: (data: Partial<BlockProps>) => {
						const childrenList: Block[] = [];

						if (isArray(data?.chats, true)) {
							data.chats.forEach((chat: IChat) => {
								const { id, avatar, title, unread_count, last_message } = chat;
								childrenList.push(new ChatBlock({
									id: id,
									styles,
									avatar: avatar,
									title: title,
									date: formatDate(last_message?.time ?? ''),
									text: formatContentLength(last_message?.content),
									counter: unread_count,
									isActive: props.currentChatData?.info?.id === id,
									mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
										return {
											isActive: id === data?.currentChatData?.info?.id,
										};
									},
									onClick: (event: Event) => {
										event.preventDefault();
										event.stopPropagation();

										ChatsController.getChatUsers(chat, this);
									},
								}));
							});
						}

						return childrenList;
					},
				}),
				[IDS.MAIN.MESSAGING]: new MessagingBlock({
					id: IDS.MAIN.MESSAGING,
					styles,
					messages: props.messages,
					newMessageForm: props.newMessageForm,
					currentChatData: props.currentChatData,
					messagesList: props.messagesList,
					container: props.container,
					clearChildrenListOnStateChange: true,
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return {
							messages: data.messages,
							newMessageForm: data.newMessageForm,
							currentChatData: data.currentChatData,
							chatsSockets: data.chatsSockets,
							userData: data.userData,
							messagesList: data.messagesList,
						};
					},
				}),
				[IDS.MAIN.PROFILE_LINK]: new LinkBlock({
					id: IDS.MAIN.PROFILE_LINK,
					class: styles.link,
					href: '#',
					ariaLabel: 'profile link',
					tooltip: 'Перейти в профиль',
					target: '_self',
					text: 'Профиль',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						this?.props?.router?.go?.(PAGES_URL.PROFILE);
					},
				}),
			},
		});
	}

	override componentDidMount() {
		const stateUser = Store.getState().userData;
		let userId = stateUser?.id;
		if (!stateUser || (stateUser && !stateUser.id)) {
			const user: IUserResponse = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '');
			userId = user.id;
			Store.set('userData', user, 'userData' as BlockProps);
		}
		ChatsController.getChats(userId, this);
	}

	override componentWillUnmount() {
		const sockets = Store.getState().chatsSockets;
		if (sockets && sockets.size > 0) {
			sockets.forEach((s) => s.disconnect());
		}

		Store.set('chats', null, 'chats' as BlockProps, true);
		Store.set('chatsSockets', null, 'chatsSockets' as BlockProps, true);
		Store.set('messages', null, 'messages' as BlockProps, true);
		Store.set('newMessageForm', cloneDeep(INIT_MESSAGE_STATE), 'newMessageForm' as BlockProps, true);
		Store.set('currentChatData', null, 'currentChatData' as BlockProps, true);
		Store.set('chatsSearchForm', cloneDeep(INIT_SEARCH_STATE), 'chatsSearchForm' as BlockProps, true);
		Store.clearAllSubs();
	}

	override render(): string {
		return compile(template, this.props);
	}
}
