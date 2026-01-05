import { Block } from '@/block';
import { Store } from '@/store';
import {
	FocusManager,
	getFocusData,
} from '@/focus-manager';
import {
	CLASSES,
	IDS,
} from '@/constants';
import {
	compile,
	fieldsValidator,
	getInputStateSlice,
} from '@/utils';
import type {
	BlockProps,
	IInputChangeParams,
} from '@/types';
import { E_FORM_FIELDS_NAME } from '@/types';
import { DropDownBlock } from '@/components/drop-down/drop-down-block';
import { DropDownOptionBlock } from '@/components/drop-down/drop-down-option-block';
import { ButtonRoundBlock } from '@/components/button-round/button-round-block';
import { InputBlock } from '@/components/input/input-block';
import {
	SvgArrowRight,
	SvgCenter,
	SvgFile,
	SvgPhoto,
} from '@/components/icons';
import template from './messaging-footer-template';

export class MessagingFooterBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			markup: {
				[IDS.MAIN.MESSAGING_DD_FOOTER]: `<div id="${ IDS.MAIN.MESSAGING_DD_FOOTER }"></div>`,
				[IDS.MAIN.SEND_MESSAGE_BTN]: `<div id="${ IDS.MAIN.SEND_MESSAGE_BTN }"></div>`,
				[IDS.MAIN.NEW_MESSAGE_INPUT]: `<div id="${ IDS.MAIN.NEW_MESSAGE_INPUT }"></div>`,
			},
			children: {
				[IDS.MAIN.MESSAGING_DD_FOOTER]: new DropDownBlock({
					id: IDS.MAIN.MESSAGING_DD_FOOTER,
					direction: 'top right',
					childrenList: [
						new DropDownOptionBlock({
							id: IDS.MAIN.MAIN_ADD_PHOTO_OPTION,
							icon: SvgPhoto,
							text: 'Фото или видео',
							onClick: (event: Event) => {
								event.preventDefault();
								event.stopPropagation();

								this.toggleClassList(CLASSES.ACT, IDS.MAIN.MESSAGING_DD_FOOTER);
							},
						}),
						new DropDownOptionBlock({
							id: IDS.MAIN.MAIN_ADD_FILE_OPTION,
							icon: SvgFile,
							text: 'Файл',
							onClick: (event: Event) => {
								event.preventDefault();
								event.stopPropagation();

								this.toggleClassList(CLASSES.ACT, IDS.MAIN.MESSAGING_DD_FOOTER);
							},
						}),
						new DropDownOptionBlock({
							id: IDS.MAIN.MAIN_ADD_LOCATION_OPTION,
							icon: SvgCenter,
							text: 'Локация',
							onClick: (event: Event) => {
								event.preventDefault();
								event.stopPropagation();

								this.toggleClassList(CLASSES.ACT, IDS.MAIN.MESSAGING_DD_FOOTER);
							},
						}),
					],
				}),
				[IDS.MAIN.SEND_MESSAGE_BTN]: new ButtonRoundBlock({
					id: IDS.MAIN.SEND_MESSAGE_BTN,
					type: 'submit',
					icon: SvgArrowRight,
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						if (
							typeof this.props?.newMessageForm?.fields?.message === 'string'
							&& this.props?.newMessageForm?.fields?.message.trim().length
						) {
							console.log('New message submit', this.props?.newMessageForm?.fields ?? '');
						}
					},
				}),
				[IDS.MAIN.NEW_MESSAGE_INPUT]: new InputBlock({
					id: IDS.MAIN.NEW_MESSAGE_INPUT,
					input_data: {
						value: props?.newMessageForm?.fields?.message ?? '',
						error: props?.newMessageForm?.errors?.message ?? '',
					},
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return getInputStateSlice(data?.newMessageForm, 'message');
					},
					dataset: E_FORM_FIELDS_NAME.message,
					name: E_FORM_FIELDS_NAME.message,
					placeholder: 'Сообщение',
					type: 'text',
					class: props?.styles?.['message-input'] ?? '',
					onInputChange: (params: IInputChangeParams) => {
						const data = {
							...params,
							...(params.info.event === 'blur' && {
								data: {
									...params.data,
									error: fieldsValidator({
										valueToValidate: params.data.value,
										fieldName: E_FORM_FIELDS_NAME.message,
									}),
								},
							}),
						};
						FocusManager.set(getFocusData(params.info));
						Store.set(
							'newMessageForm',
							{
								fields: {
									...props?.userForm?.fields,
									message: data?.data?.value ?? '',
								},
								errors: {
									...props?.userForm?.errors,
									message: data?.data?.error ?? '',
								},
							},
							'newMessageForm' as BlockProps,
						);
					},
				}),
			},
		});
	}

	override render(): string {
		console.log('Render MessagingFooterBlock', this.props);
		return compile(template, this.props);
	}
}
