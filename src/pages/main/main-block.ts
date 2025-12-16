import { Block } from '@/block';
import {
	CLASSES,
	IDS,
	PAGES,
} from '@/constants';
import { compile } from '@/utils';
import { formatContentLength } from '@/pages/main/utils';
import type {
	BlockProps,
	IChat,
	IInputChangeParams,
} from '@/types';
import {
	E_FORM_FIELDS_NAME,
} from '@/types';
import { FormBlock } from '@/components/form/form-block';
import { InputBlock } from '@/components/input/input-block';
import { UlBlock } from '@/components/ul/ul-block';
import { DropDownBlock } from '@/components/drop-down/drop-down-block';
import { DropDownOptionBlock } from '@/components/drop-down/drop-down-option-block';
import { ChatBlock } from '@/pages/main/components/chat/chat-block';
import { MessagingBlock } from '@/pages/main/components/messaging/messaging-block';
import { LinkBlock } from '@/components/link/link-block';
import template from './main-template.hbs?raw';
import styles from './styles.module.pcss';
import { MessagingMainBlock } from '@/pages/main/components/messaging-main/messaging-main-block';

export class MainBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			styles,
			markup: {
				[IDS.MAIN.SEARCH_FORM]: `<div id="${IDS.MAIN.SEARCH_FORM}"></div>`,
				[IDS.MAIN.CHAT_LIST]: `<div id="${IDS.MAIN.CHAT_LIST}"></div>`,
				[IDS.MAIN.MESSAGING]: `<div id="${IDS.MAIN.MESSAGING}"></div>`,
				[IDS.MAIN.PROFILE_LINK]: `<div id="${IDS.MAIN.PROFILE_LINK}"></div>`,
				[IDS.MAIN.TEMP_NAV]: `<div id="${IDS.MAIN.TEMP_NAV}"></div>`,
			},
			children: {
				[IDS.MAIN.SEARCH_FORM]: new FormBlock({
					id: IDS.MAIN.SEARCH_FORM,
					onSubmit: () => {
						console.log('Search submit: ', { title: this.props?.chatsSearchForm?.fields?.title ?? '' });
					},
					childrenList: [
						new InputBlock({
							id: IDS.MAIN.SEARCH_INPUT,
							input_data: {
								value: props?.chatsSearchForm?.fields?.title ?? '',
								error: props?.chatsSearchForm?.errors?.title ?? '',
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.title,
							name: E_FORM_FIELDS_NAME.title,
							placeholder: 'Поиск',
							type: 'text',
							onInputChange: (params: IInputChangeParams) => {
								this.onFormInputChange(
									params,
									[IDS.MAIN.SEARCH_INPUT, IDS.MAIN.SEARCH_FORM],
									E_FORM_FIELDS_NAME.title,
									IDS.FORMS.MAIN_CHAT_SEARCH_FORM,
								);
							},
						}),
					],
				}),
				[IDS.MAIN.CHAT_LIST]: new UlBlock({
					id: IDS.MAIN.CHAT_LIST,
					class: styles.chats,
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
							onClick: (event: Event) => {
								event.preventDefault();
								event.stopPropagation();

								Object.entries(this.allInstances).forEach(([instanceId, instance]) => {
									if (instanceId === IDS.MAIN.CHAT_LIST) {
										Object.entries(instance.allInstances).forEach(([chatId, chatInstance]) => {
											chatInstance.setProps({
												isActive: chatId === id,
											});
										});
									}
								});

								this.setProps({
									currentChatId: id,
								});
							},
						});
					}),
				}),
				[IDS.MAIN.TEMP_NAV]: new DropDownBlock({
					id: IDS.MAIN.TEMP_NAV,
					direction: 'bottom right',
					childrenList: [
						new DropDownOptionBlock({
							id: PAGES.AUTHORIZATION,
							icon: '',
							text: 'Авторизация',
							onClick: (event: Event) => {
								event.preventDefault();
								event.stopPropagation();

								this.toggleClassList(CLASSES.ACT, IDS.MAIN.TEMP_NAV);
								this.eventBus().emit(Block.EVENTS.FLOW_CWU, { page: PAGES.AUTHORIZATION });
							},
						}),
						new DropDownOptionBlock({
							id: PAGES.REGISTRATION,
							icon: '',
							text: 'Регистрация',
							onClick: (event: Event) => {
								event.preventDefault();
								event.stopPropagation();

								this.toggleClassList(CLASSES.ACT, IDS.MAIN.TEMP_NAV);
								this.eventBus().emit(Block.EVENTS.FLOW_CWU, { page: PAGES.REGISTRATION });
							},
						}),
						new DropDownOptionBlock({
							id: PAGES.ERROR,
							icon: '',
							text: 'Страница ошибки',
							onClick: (event: Event) => {
								event.preventDefault();
								event.stopPropagation();

								this.toggleClassList(CLASSES.ACT, IDS.MAIN.TEMP_NAV);
								this.eventBus().emit(Block.EVENTS.FLOW_CWU, { page: PAGES.ERROR });
							},
						}),
					],
				}),
				[IDS.MAIN.MESSAGING]: new MessagingBlock({
					id: IDS.MAIN.MESSAGING,
					styles,
					messages: props.messages,
					newMessageForm: props.newMessageForm,
					userData: props.userData,
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
						this.eventBus().emit(Block.EVENTS.FLOW_CWU, { page: PAGES.PROFILE });
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

						this.eventBus().emit(Block.EVENTS.FLOW_CWU, { page: PAGES.PROFILE });
					},
				}),
			},
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
