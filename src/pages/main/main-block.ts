import { Block } from '@/block';
import { Store } from '@/store';
import { ChatsController } from '@/controllers';
import {
	FocusManager,
	getFocusData,
} from '@/focus-manager';
import {
	IDS,
	INIT_ADD_CHAT_STATE,
	PAGES_URL,
} from '@/constants';
import {
	cloneDeep,
	compile,
	fieldsValidator,
	getInputStateSlice,
} from '@/utils';
import { formatContentLength } from '@/pages/main/utils';
import type {
	BlockProps,
	IAddChatModalForm,
	IChat,
	IFormState,
	IInputChangeParams,
} from '@/types';
import { E_FORM_FIELDS_NAME } from '@/types';
import { FormBlock } from '@/components/form/form-block';
import { InputBlock } from '@/components/input/input-block';
import { UlBlock } from '@/components/ul/ul-block';
import { LinkBlock } from '@/components/link/link-block';
import { ButtonRoundBlock } from '@/components/button-round/button-round-block';
import { MessagingBlock } from '@/pages/main/components/messaging/messaging-block';
import { ChatBlock } from '@/pages/main/components/chat/chat-block';
import { MessagingMainBlock } from '@/pages/main/components/messaging-main/messaging-main-block';
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

						this.createModal(
							'modalAddChatForm',
							'Создание чата',
							{ modalAddChatForm: cloneDeep(INIT_ADD_CHAT_STATE) as IFormState<IAddChatModalForm> },
							(event, data) => {
								if (data) {
									console.log('Create chat submit: ', { event, data });
									ChatsController.createChat({ data: JSON.stringify(data) }, this);
								}
							},
						);
					},
				}),

				[IDS.MAIN.SEARCH_FORM]: new FormBlock({
					id: IDS.MAIN.SEARCH_FORM,
					onSubmit: () => {
						console.log('Search submit: ', { title: this.props?.chatsSearchForm?.fields?.login ?? '' });
					},
					childrenList: [
						new InputBlock({
							id: IDS.MAIN.SEARCH_INPUT,
							input_data: {
								value: props?.chatsSearchForm?.fields?.login ?? '',
								error: props?.chatsSearchForm?.errors?.login ?? '',
							},
							mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
								return getInputStateSlice(data?.chatsSearchForm, 'login');
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
							},
						}),
					],
				}),
				[IDS.MAIN.CHAT_LIST]: new UlBlock({
					id: IDS.MAIN.CHAT_LIST,
					class: styles.chats,
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return {
							chats: data?.chats,
						};
					},
					childrenList: props?.chats?.map?.(({ id, avatar, title, unread_count, last_message }: IChat) => {
						return new ChatBlock({
							id: id,
							styles,
							avatar: avatar,
							title: title,
							date: last_message.time,
							text: formatContentLength(last_message.content),
							counter: unread_count,
							isActive: props.currentChatId === id,
							mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
								return {
									isActive: id === data?.currentChatId,
								};
							},
							onClick: (event: Event) => {
								event.preventDefault();
								event.stopPropagation();

								Store.set('currentChatId', id, 'currentChatId' as BlockProps);
							},
						});
					}),
				}),
				[IDS.MAIN.MESSAGING]: new MessagingBlock({
					id: IDS.MAIN.MESSAGING,
					styles,
					messages: props.messages,
					newMessageForm: props.newMessageForm,
					userData: props.userData,
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return {
							messages: data.messages,
							newMessageForm: data.newMessageForm,
						};
					},
					childrenList: Array.isArray(props?.messages)
						? props?.messages?.map?.(({ id, last_message }: IChat) => {
							return new MessagingMainBlock({
								id,
								styles,
								author: last_message.user.display_name,
								text: last_message.content,
								date: last_message.time,
								isMe: last_message.user.id === props?.userData?.id,
							});
						})
						: [],
					onChangePage: () => {
						Store.clearSubs();
						this?.props?.router?.go?.(PAGES_URL.PROFILE);
					},
				}),
				[IDS.MAIN.PROFILE_LINK]: new LinkBlock({
					id: IDS.MAIN.PROFILE_LINK,
					class: styles.link,
					href: '#',
					ariaLabel: 'profile link',
					tooltip: 'profile link',
					target: '_self',
					text: 'Профиль',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						Store.clearSubs();
						this?.props?.router?.go?.(PAGES_URL.PROFILE);
					},
				}),
			},
		});
	}

	override componentDidMount() {
		console.log('ProfileBlock componentDidMount override', this);
		ChatsController.getChats(this);
	}

	override render(): string {
		console.log('Render MainBlock', this.props);
		return compile(template, this.props);
	}
}
