import { Block } from '@/block';
import { IDS } from '@/constants';
import { compile } from '@/utils';
import type {
	BlockProps,
	IInputChangeParams,
	IChat,
} from '@/types';
import {
	E_FORM_FIELDS_NAME,
} from '@/types';
import { FormBlock } from '@/components/form/form-block';
import { InputBlock } from '@/components/input/input-block';
import { UlBlock } from '@/components/ul/ul-block';
import { ChatBlock } from '@/pages/main/components/chat/chat-block';
import template from './main-template.hbs?raw';
import styles from './styles.module.pcss';

export class MainBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			styles,
			markup: {
				[IDS.MAIN.SEARCH_FORM]: `<div id="${IDS.MAIN.SEARCH_FORM}"></div>`,
				[IDS.MAIN.CHAT_LIST]: `<div id="${IDS.MAIN.CHAT_LIST}"></div>`,
				[IDS.MAIN.MESSAGING]: `<div id="${IDS.MAIN.MESSAGING}"></div>`,
				[IDS.MAIN.TEMP_NAV]: `<div id="${IDS.MAIN.TEMP_NAV}"></div>`,
			},
			children: {
				[IDS.MAIN.SEARCH_FORM]: new FormBlock({
					id: IDS.MAIN.SEARCH_FORM,
					childrenList: [
						new InputBlock({
							id: IDS.MAIN.SEARCH_INPUT,
							input_data: {
								value: props[IDS.FORMS.MAIN_CHAT_SEARCH_FORM].fields.title,
								error: props[IDS.FORMS.MAIN_CHAT_SEARCH_FORM].errors.title,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.title,
							name: E_FORM_FIELDS_NAME.title,
							placeholder: 'Поиск',
							type: 'text',
							onChange: (params: IInputChangeParams<Block>) => {
								console.log('onChange search chat: ', { params, currentThis: this });

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
					childrenList: props.chats.map((chat: IChat) => {
						return new ChatBlock({
							id: chat.id,
							class: styles,
							avatar: chat.avatar,
							title: chat.title,
							data: chat.last_message.time,
							text: chat.last_message.content,
							counter: chat.unread_count,
							isActive: props.currentChatId === chat.id,
							onClick: (event: Event) => {
								console.log('click chat: ', this);

								event.preventDefault();
								event.stopPropagation();

								Object.entries(this.allInstances).forEach(([id, instance]) => {
									if (id.includes(IDS.MAIN.CHAT_LIST)) {
										Object.entries(instance.allInstances).forEach(([chatId, chatInstance]) => {
											chatInstance.setProps({
												isActive: chatId === chat.id,
											});
										});
									}
								});

								this.setProps({
									currentChatId: chat.id,
								});
							},
						});
					}),
				}),
			},
		});
	}

	override render(): string {
		console.log('Render block MainBlock: ', this);

		return compile(template, this.props);
	}
}
