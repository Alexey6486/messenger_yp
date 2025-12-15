import { Block } from '@/block';
import {
	CLASSES,
	IDS,
} from '@/constants';
import {
	compile,
	fieldsValidator,
} from '@/utils';
import type {
	BlockProps,
	IInputChangeParams,
} from '@/types';
import {
	E_FORM_FIELDS_NAME,
} from '@/types';
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
				[IDS.MAIN.MESSAGING_DD_FOOTER]: `<div id="${IDS.MAIN.MESSAGING_DD_FOOTER}"></div>`,
				[IDS.MAIN.SEND_MESSAGE_BTN]: `<div id="${IDS.MAIN.SEND_MESSAGE_BTN}"></div>`,
				[IDS.MAIN.NEW_MESSAGE_INPUT]: `<div id="${IDS.MAIN.NEW_MESSAGE_INPUT}"></div>`,
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

						if (this.props[IDS.FORMS.MAIN_NEW_MESSAGE_FORM].fields.message.trim().length) {
							console.log('New message submit', this.props[IDS.FORMS.MAIN_NEW_MESSAGE_FORM].fields);
						}
					},
				}),
				[IDS.MAIN.NEW_MESSAGE_INPUT]: new InputBlock({
					id: IDS.MAIN.NEW_MESSAGE_INPUT,
					input_data: {
						value: props[IDS.FORMS.MAIN_NEW_MESSAGE_FORM].fields.message,
						error: props[IDS.FORMS.MAIN_NEW_MESSAGE_FORM].errors.message,
						currentFocus: props?.currentFocus,
					},
					dataset: E_FORM_FIELDS_NAME.message,
					name: E_FORM_FIELDS_NAME.message,
					placeholder: 'Сообщение',
					type: 'text',
					class: props?.styles?.['message-input'] ?? '',
					onInputChange: (params: IInputChangeParams) => {
						this.onFormInputChange(
							{
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
							},
							[IDS.MAIN.NEW_MESSAGE_INPUT],
							E_FORM_FIELDS_NAME.message,
							IDS.FORMS.MAIN_NEW_MESSAGE_FORM,
						);
					},
				}),
			},
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
