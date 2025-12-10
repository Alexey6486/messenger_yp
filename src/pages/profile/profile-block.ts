import { Block } from '@/block';
import {
	IDS,
	PAGES,
} from '@/constants';
import {
	compile,
	fieldsValidator,
} from '@/utils';
import {
	E_FORM_FIELDS_NAME,
} from '@/types';
import type {
	BlockProps,
	IInputChangeParams,
} from '@/types';
import { ButtonRoundBlock } from '@/components/button-round/button-round-block';
import { ProfileFieldBlock } from '@/pages/profile/components/field/profile-field-block';
import { SvgArrowLeft } from '@/components/icons';
import { ButtonBlock } from '@/components/button/button-block';
import { InputBlock } from '@/components/input/input-block';
import template from './profile-template.hbs?raw';
import styles from './styles.module.pcss';

export class ProfileBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			styles,
			ids: {
				form: IDS.PROFILE.FORM,
				buttons: { aside: IDS.PROFILE.ASIDE_BTN },
			},
			markup: {
				[IDS.PROFILE.EMAIL_FIELD]: `<div id="${IDS.PROFILE.EMAIL_FIELD}"></div>`,
				[IDS.PROFILE.O_PSW_FIELD]: `<div id="${IDS.PROFILE.O_PSW_FIELD}"></div>`,

				[IDS.PROFILE.AVATAR]: `<div id="${IDS.PROFILE.AVATAR}"></div>`,
				[IDS.PROFILE.ASIDE_BTN]: `<div id="${IDS.PROFILE.ASIDE_BTN}"></div>`,
				[IDS.PROFILE.CHANGE_DATA_BTN]: `<div id="${IDS.PROFILE.CHANGE_DATA_BTN}"></div>`,
				[IDS.PROFILE.CHANGE_PSW_BTN]: `<div id="${IDS.PROFILE.CHANGE_PSW_BTN}"></div>`,
				[IDS.PROFILE.LOGOUT_BTN]: `<div id="${IDS.PROFILE.LOGOUT_BTN}"></div>`,
			},
			children: {
				[IDS.PROFILE.EMAIL_FIELD]: new ProfileFieldBlock({
					styles,
					id: IDS.PROFILE.EMAIL_FIELD,
					fieldName: 'Почта',
					input_data: {
						value: props.userForm.fields.email,
						error: props.userForm.errors.email,
						currentFocus: props.currentFocus,
					},

					children: {
						[IDS.PROFILE.EMAIL_INPUT]: new InputBlock({
							id: IDS.PROFILE.EMAIL_INPUT,
							input_data: {
								value: props.userForm.fields.email,
								error: props.userForm.errors.email,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.email,
							name: E_FORM_FIELDS_NAME.email,
							placeholder: '',
							type: 'text',
							onChange: (params: IInputChangeParams<Block>) => {
								console.log('onChange email: ', { params, currentThis: this });

								this.onFormInputChange(
									{
										...params,
										...(params.info.event === 'blur' && {
											data: {
												...params.data,
												error: fieldsValidator({
													valueToValidate: params.data.value,
													fieldName: E_FORM_FIELDS_NAME.email,
												}),
											},
										}),
									},
									[IDS.PROFILE.EMAIL_INPUT, IDS.PROFILE.EMAIL_FIELD],
									E_FORM_FIELDS_NAME.email,
									IDS.FORMS.PROFILE_USER_DATA_FORM,
								);

							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${IDS.PROFILE.EMAIL_INPUT}"></div>`,
					},
				}),

				[IDS.PROFILE.O_PSW_FIELD]: new ProfileFieldBlock({
					styles,
					id: IDS.PROFILE.O_PSW_FIELD,
					fieldName: 'Старый пароль',
					input_data: {
						value: props.passwordForm.fields.oldPassword,
						error: props.passwordForm.errors.oldPassword,
						currentFocus: props.currentFocus,
					},

					children: {
						[IDS.PROFILE.O_PSW_INPUT]: new InputBlock({
							id: IDS.PROFILE.O_PSW_INPUT,
							input_data: {
								value: props.passwordForm.fields.oldPassword,
								error: props.passwordForm.errors.oldPassword,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.oldPassword,
							name: E_FORM_FIELDS_NAME.oldPassword,
							placeholder: '',
							type: 'password',
							onChange: (params: IInputChangeParams<Block>) => {
								console.log('onChange old password: ', { params, currentThis: this });

								this.onFormInputChange(
									{
										...params,
										...(params.info.event === 'blur' && {
											data: {
												...params.data,
												error: fieldsValidator({
													valueToValidate: params.data.value,
													fieldName: E_FORM_FIELDS_NAME.oldPassword,
												}),
											},
										}),
									},
									[IDS.PROFILE.O_PSW_INPUT, IDS.PROFILE.O_PSW_FIELD],
									E_FORM_FIELDS_NAME.oldPassword,
									IDS.FORMS.PROFILE_USER_PSW_FORM,
								);

							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${IDS.PROFILE.O_PSW_INPUT}"></div>`,
					},
				}),

				[IDS.PROFILE.AVATAR]: new InputBlock({
					id: IDS.PROFILE.AVATAR,
					dataset: E_FORM_FIELDS_NAME.avatar,
					name: E_FORM_FIELDS_NAME.avatar,
					placeholder: '',
					type: 'file',
					onChange: (params: IInputChangeParams<Block>) => {
						console.log('onChange avatar: ', { params, t: this });
					},
				}),
				[IDS.PROFILE.ASIDE_BTN]: new ButtonRoundBlock({
					id: IDS.PROFILE.ASIDE_BTN,
					type: 'button',
					dataset: PAGES.AUTHORIZATION,
					icon: SvgArrowLeft,
					onClick: (event: Event) => {
						console.log('click aside: ', this);

						event.preventDefault();
						event.stopPropagation();

						this.eventBus().emit(Block.EVENTS.FLOW_CWU, { page: PAGES.AUTHORIZATION });
					},
				}),
				[IDS.PROFILE.CHANGE_DATA_BTN]: new ButtonBlock({
					id: IDS.PROFILE.CHANGE_DATA_BTN,
					type: 'button',
					dataset: IDS.PROFILE.CHANGE_DATA_BTN,
					text: 'Изменить данные',
					class: 'plain blue',
					onClick: (event: Event) => {
						console.log('click change data: ', this);

						event.preventDefault();
						event.stopPropagation();
					},
				}),
				[IDS.PROFILE.CHANGE_PSW_BTN]: new ButtonBlock({
					id: IDS.PROFILE.CHANGE_PSW_BTN,
					type: 'button',
					dataset: IDS.PROFILE.CHANGE_PSW_BTN,
					text: 'Изменить пароль',
					class: 'plain blue',
					onClick: (event: Event) => {
						console.log('click change psw: ', this);

						event.preventDefault();
						event.stopPropagation();
					},
				}),
				[IDS.PROFILE.LOGOUT_BTN]: new ButtonBlock({
					id: IDS.PROFILE.LOGOUT_BTN,
					type: 'button',
					dataset: IDS.PROFILE.LOGOUT_BTN,
					text: 'Выйти из аккаунта',
					class: 'plain red',
					onClick: (event: Event) => {
						console.log('click logout: ', this);

						event.preventDefault();
						event.stopPropagation();
					},
				}),
			},
		});
	}

	override render(): string {
		console.log('Render block ProfileBlock: ', this);

		return compile(template, this.props);
	}
}
