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
			markup: {
				[IDS.PROFILE.EMAIL_FIELD]: `<div id="${IDS.PROFILE.EMAIL_FIELD}"></div>`,
				[IDS.PROFILE.LOGIN_FIELD]: `<div id="${IDS.PROFILE.LOGIN_FIELD}"></div>`,
				[IDS.PROFILE.F_NAME_FIELD]: `<div id="${IDS.PROFILE.F_NAME_FIELD}"></div>`,
				[IDS.PROFILE.S_NAME_FIELD]: `<div id="${IDS.PROFILE.S_NAME_FIELD}"></div>`,
				[IDS.PROFILE.D_NAME_FIELD]: `<div id="${IDS.PROFILE.D_NAME_FIELD}"></div>`,
				[IDS.PROFILE.PHONE_FIELD]: `<div id="${IDS.PROFILE.PHONE_FIELD}"></div>`,

				[IDS.PROFILE.O_PSW_FIELD]: `<div id="${IDS.PROFILE.O_PSW_FIELD}"></div>`,
				[IDS.PROFILE.N_PSW_FIELD]: `<div id="${IDS.PROFILE.N_PSW_FIELD}"></div>`,
				[IDS.PROFILE.C_PSW_FIELD]: `<div id="${IDS.PROFILE.C_PSW_FIELD}"></div>`,

				[IDS.PROFILE.AVATAR]: `<div id="${IDS.PROFILE.AVATAR}"></div>`,

				[IDS.PROFILE.ASIDE_BTN]: `<div id="${IDS.PROFILE.ASIDE_BTN}"></div>`,
				[IDS.PROFILE.CHANGE_DATA_BTN]: `<div id="${IDS.PROFILE.CHANGE_DATA_BTN}"></div>`,
				[IDS.PROFILE.CHANGE_PSW_BTN]: `<div id="${IDS.PROFILE.CHANGE_PSW_BTN}"></div>`,
				[IDS.PROFILE.LOGOUT_BTN]: `<div id="${IDS.PROFILE.LOGOUT_BTN}"></div>`,

				[IDS.PROFILE.SAVE_PSW_BTN]: `<div id="${IDS.PROFILE.SAVE_PSW_BTN}"></div>`,
				[IDS.PROFILE.CANCEL_PSW_EDIT_BTN]: `<div id="${IDS.PROFILE.CANCEL_PSW_EDIT_BTN}"></div>`,

				[IDS.PROFILE.SAVE_DATA_BTN]: `<div id="${IDS.PROFILE.SAVE_DATA_BTN}"></div>`,
				[IDS.PROFILE.CANCEL_DATA_EDIT_BTN]: `<div id="${IDS.PROFILE.CANCEL_DATA_EDIT_BTN}"></div>`,
			},
			children: {
				[IDS.PROFILE.EMAIL_FIELD]: new ProfileFieldBlock({
					styles,
					id: IDS.PROFILE.EMAIL_FIELD,
					fieldName: 'Почта',
					input_data: {
						value: props[IDS.FORMS.PROFILE_USER_DATA_FORM].fields.email,
						error: props[IDS.FORMS.PROFILE_USER_DATA_FORM].errors.email,
						currentFocus: props.currentFocus,
					},
					parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
					children: {
						[IDS.PROFILE.EMAIL_INPUT]: new InputBlock({
							id: IDS.PROFILE.EMAIL_INPUT,
							input_data: {
								value: props[IDS.FORMS.PROFILE_USER_DATA_FORM].fields.email,
								error: props[IDS.FORMS.PROFILE_USER_DATA_FORM].errors.email,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.email,
							name: E_FORM_FIELDS_NAME.email,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
							onChange: (params: IInputChangeParams<Block>) => {
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
				[IDS.PROFILE.LOGIN_FIELD]: new ProfileFieldBlock({
					styles,
					id: IDS.PROFILE.LOGIN_FIELD,
					fieldName: 'Логин',
					input_data: {
						value: props[IDS.FORMS.PROFILE_USER_DATA_FORM].fields.login,
						error: props[IDS.FORMS.PROFILE_USER_DATA_FORM].errors.login,
						currentFocus: props.currentFocus,
					},
					parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
					children: {
						[IDS.PROFILE.LOGIN_INPUT]: new InputBlock({
							id: IDS.PROFILE.LOGIN_INPUT,
							input_data: {
								value: props[IDS.FORMS.PROFILE_USER_DATA_FORM].fields.login,
								error: props[IDS.FORMS.PROFILE_USER_DATA_FORM].errors.login,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.login,
							name: E_FORM_FIELDS_NAME.login,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
							onChange: (params: IInputChangeParams<Block>) => {
								this.onFormInputChange(
									{
										...params,
										...(params.info.event === 'blur' && {
											data: {
												...params.data,
												error: fieldsValidator({
													valueToValidate: params.data.value,
													fieldName: E_FORM_FIELDS_NAME.login,
												}),
											},
										}),
									},
									[IDS.PROFILE.LOGIN_INPUT, IDS.PROFILE.LOGIN_FIELD],
									E_FORM_FIELDS_NAME.login,
									IDS.FORMS.PROFILE_USER_DATA_FORM,
								);

							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${IDS.PROFILE.LOGIN_INPUT}"></div>`,
					},
				}),
				[IDS.PROFILE.F_NAME_FIELD]: new ProfileFieldBlock({
					styles,
					id: IDS.PROFILE.F_NAME_FIELD,
					fieldName: 'Имя',
					input_data: {
						value: props[IDS.FORMS.PROFILE_USER_DATA_FORM].fields.first_name,
						error: props[IDS.FORMS.PROFILE_USER_DATA_FORM].errors.first_name,
						currentFocus: props.currentFocus,
					},
					parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
					children: {
						[IDS.PROFILE.F_NAME_INPUT]: new InputBlock({
							id: IDS.PROFILE.F_NAME_INPUT,
							input_data: {
								value: props[IDS.FORMS.PROFILE_USER_DATA_FORM].fields.first_name,
								error: props[IDS.FORMS.PROFILE_USER_DATA_FORM].errors.first_name,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.first_name,
							name: E_FORM_FIELDS_NAME.first_name,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
							onChange: (params: IInputChangeParams<Block>) => {
								this.onFormInputChange(
									{
										...params,
										...(params.info.event === 'blur' && {
											data: {
												...params.data,
												error: fieldsValidator({
													valueToValidate: params.data.value,
													fieldName: E_FORM_FIELDS_NAME.first_name,
												}),
											},
										}),
									},
									[IDS.PROFILE.F_NAME_INPUT, IDS.PROFILE.F_NAME_FIELD],
									E_FORM_FIELDS_NAME.first_name,
									IDS.FORMS.PROFILE_USER_DATA_FORM,
								);

							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${IDS.PROFILE.F_NAME_INPUT}"></div>`,
					},
				}),
				[IDS.PROFILE.S_NAME_FIELD]: new ProfileFieldBlock({
					styles,
					id: IDS.PROFILE.S_NAME_FIELD,
					fieldName: 'Фамилия',
					input_data: {
						value: props[IDS.FORMS.PROFILE_USER_DATA_FORM].fields.second_name,
						error: props[IDS.FORMS.PROFILE_USER_DATA_FORM].errors.second_name,
						currentFocus: props.currentFocus,
					},
					parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
					children: {
						[IDS.PROFILE.S_NAME_INPUT]: new InputBlock({
							id: IDS.PROFILE.S_NAME_INPUT,
							input_data: {
								value: props[IDS.FORMS.PROFILE_USER_DATA_FORM].fields.second_name,
								error: props[IDS.FORMS.PROFILE_USER_DATA_FORM].errors.second_name,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.second_name,
							name: E_FORM_FIELDS_NAME.second_name,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
							onChange: (params: IInputChangeParams<Block>) => {
								this.onFormInputChange(
									{
										...params,
										...(params.info.event === 'blur' && {
											data: {
												...params.data,
												error: fieldsValidator({
													valueToValidate: params.data.value,
													fieldName: E_FORM_FIELDS_NAME.second_name,
												}),
											},
										}),
									},
									[IDS.PROFILE.S_NAME_INPUT, IDS.PROFILE.S_NAME_FIELD],
									E_FORM_FIELDS_NAME.second_name,
									IDS.FORMS.PROFILE_USER_DATA_FORM,
								);

							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${IDS.PROFILE.S_NAME_INPUT}"></div>`,
					},
				}),
				[IDS.PROFILE.D_NAME_FIELD]: new ProfileFieldBlock({
					styles,
					id: IDS.PROFILE.D_NAME_FIELD,
					fieldName: 'Имя в чате',
					input_data: {
						value: props[IDS.FORMS.PROFILE_USER_DATA_FORM].fields.display_name,
						error: props[IDS.FORMS.PROFILE_USER_DATA_FORM].errors.display_name,
						currentFocus: props.currentFocus,
					},
					parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
					children: {
						[IDS.PROFILE.D_NAME_INPUT]: new InputBlock({
							id: IDS.PROFILE.D_NAME_INPUT,
							input_data: {
								value: props[IDS.FORMS.PROFILE_USER_DATA_FORM].fields.display_name,
								error: props[IDS.FORMS.PROFILE_USER_DATA_FORM].errors.display_name,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.display_name,
							name: E_FORM_FIELDS_NAME.display_name,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
							onChange: (params: IInputChangeParams<Block>) => {
								this.onFormInputChange(
									{
										...params,
										...(params.info.event === 'blur' && {
											data: {
												...params.data,
												error: fieldsValidator({
													valueToValidate: params.data.value,
													fieldName: E_FORM_FIELDS_NAME.display_name,
												}),
											},
										}),
									},
									[IDS.PROFILE.D_NAME_INPUT, IDS.PROFILE.D_NAME_FIELD],
									E_FORM_FIELDS_NAME.display_name,
									IDS.FORMS.PROFILE_USER_DATA_FORM,
								);

							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${IDS.PROFILE.D_NAME_INPUT}"></div>`,
					},
				}),
				[IDS.PROFILE.PHONE_FIELD]: new ProfileFieldBlock({
					styles,
					id: IDS.PROFILE.PHONE_FIELD,
					fieldName: 'Телефон',
					input_data: {
						value: props[IDS.FORMS.PROFILE_USER_DATA_FORM].fields.phone,
						error: props[IDS.FORMS.PROFILE_USER_DATA_FORM].errors.phone,
						currentFocus: props.currentFocus,
					},
					parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
					children: {
						[IDS.PROFILE.PHONE_INPUT]: new InputBlock({
							id: IDS.PROFILE.PHONE_INPUT,
							input_data: {
								value: props[IDS.FORMS.PROFILE_USER_DATA_FORM].fields.phone,
								error: props[IDS.FORMS.PROFILE_USER_DATA_FORM].errors.phone,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.phone,
							name: E_FORM_FIELDS_NAME.phone,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
							onChange: (params: IInputChangeParams<Block>) => {
								this.onFormInputChange(
									{
										...params,
										...(params.info.event === 'blur' && {
											data: {
												...params.data,
												error: fieldsValidator({
													valueToValidate: params.data.value,
													fieldName: E_FORM_FIELDS_NAME.phone,
												}),
											},
										}),
									},
									[IDS.PROFILE.PHONE_INPUT, IDS.PROFILE.PHONE_FIELD],
									E_FORM_FIELDS_NAME.phone,
									IDS.FORMS.PROFILE_USER_DATA_FORM,
								);

							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${IDS.PROFILE.PHONE_INPUT}"></div>`,
					},
				}),

				[IDS.PROFILE.O_PSW_FIELD]: new ProfileFieldBlock({
					styles,
					id: IDS.PROFILE.O_PSW_FIELD,
					fieldName: 'Старый пароль',
					input_data: {
						value: props[IDS.FORMS.PROFILE_USER_PSW_FORM].fields.oldPassword,
						error: props[IDS.FORMS.PROFILE_USER_PSW_FORM].errors.oldPassword,
						currentFocus: props.currentFocus,
					},
					parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
					children: {
						[IDS.PROFILE.O_PSW_INPUT]: new InputBlock({
							id: IDS.PROFILE.O_PSW_INPUT,
							input_data: {
								value: props[IDS.FORMS.PROFILE_USER_PSW_FORM].fields.oldPassword,
								error: props[IDS.FORMS.PROFILE_USER_PSW_FORM].errors.oldPassword,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.oldPassword,
							name: E_FORM_FIELDS_NAME.oldPassword,
							placeholder: '',
							type: 'password',
							parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
							onChange: (params: IInputChangeParams<Block>) => {
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
				[IDS.PROFILE.N_PSW_FIELD]: new ProfileFieldBlock({
					styles,
					id: IDS.PROFILE.N_PSW_FIELD,
					fieldName: 'Новый пароль',
					input_data: {
						value: props[IDS.FORMS.PROFILE_USER_PSW_FORM].fields.newPassword,
						error: props[IDS.FORMS.PROFILE_USER_PSW_FORM].errors.newPassword,
						currentFocus: props.currentFocus,
					},
					parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
					children: {
						[IDS.PROFILE.N_PSW_INPUT]: new InputBlock({
							id: IDS.PROFILE.N_PSW_INPUT,
							input_data: {
								value: props[IDS.FORMS.PROFILE_USER_PSW_FORM].fields.newPassword,
								error: props[IDS.FORMS.PROFILE_USER_PSW_FORM].errors.newPassword,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.newPassword,
							name: E_FORM_FIELDS_NAME.newPassword,
							placeholder: '',
							type: 'password',
							parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
							onChange: (params: IInputChangeParams<Block>) => {
								this.onFormInputChange(
									{
										...params,
										...(params.info.event === 'blur' && {
											data: {
												...params.data,
												error: fieldsValidator({
													valueToValidate: params.data.value,
													fieldName: E_FORM_FIELDS_NAME.newPassword,
												}),
											},
										}),
									},
									[IDS.PROFILE.N_PSW_INPUT, IDS.PROFILE.N_PSW_FIELD],
									E_FORM_FIELDS_NAME.newPassword,
									IDS.FORMS.PROFILE_USER_PSW_FORM,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${IDS.PROFILE.N_PSW_INPUT}"></div>`,
					},
				}),
				[IDS.PROFILE.C_PSW_FIELD]: new ProfileFieldBlock({
					styles,
					id: IDS.PROFILE.C_PSW_FIELD,
					fieldName: 'Повторите новый пароль',
					input_data: {
						value: props[IDS.FORMS.PROFILE_USER_PSW_FORM].fields.confirmPassword,
						error: props[IDS.FORMS.PROFILE_USER_PSW_FORM].errors.confirmPassword,
						currentFocus: props.currentFocus,
					},
					parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
					children: {
						[IDS.PROFILE.C_PSW_INPUT]: new InputBlock({
							id: IDS.PROFILE.C_PSW_INPUT,
							input_data: {
								value: props[IDS.FORMS.PROFILE_USER_PSW_FORM].fields.confirmPassword,
								error: props[IDS.FORMS.PROFILE_USER_PSW_FORM].errors.confirmPassword,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.confirmPassword,
							name: E_FORM_FIELDS_NAME.confirmPassword,
							placeholder: '',
							type: 'password',
							parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
							onChange: (params: IInputChangeParams<Block>) => {
								this.onFormInputChange(
									{
										...params,
										...(params.info.event === 'blur' && {
											data: {
												...params.data,
												error: fieldsValidator({
													valueToValidate: params.data.value,
													fieldName: E_FORM_FIELDS_NAME.confirmPassword,
													valueToCompare: this.props[IDS.FORMS.PROFILE_USER_PSW_FORM].fields.newPassword,
												}),
											},
										}),
									},
									[IDS.PROFILE.C_PSW_INPUT, IDS.PROFILE.C_PSW_FIELD],
									E_FORM_FIELDS_NAME.confirmPassword,
									IDS.FORMS.PROFILE_USER_PSW_FORM,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${IDS.PROFILE.C_PSW_INPUT}"></div>`,
					},
				}),

				[IDS.PROFILE.AVATAR]: new InputBlock({
					id: IDS.PROFILE.AVATAR,
					dataset: E_FORM_FIELDS_NAME.avatar,
					name: E_FORM_FIELDS_NAME.avatar,
					placeholder: '',
					type: 'file',
					input_data: null,
					onChange: () => {
					},
				}),
				[IDS.PROFILE.ASIDE_BTN]: new ButtonRoundBlock({
					id: IDS.PROFILE.ASIDE_BTN,
					type: 'button',
					icon: SvgArrowLeft,
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						this.eventBus().emit(Block.EVENTS.FLOW_CWU, { page: PAGES.AUTHORIZATION });
					},
				}),
				[IDS.PROFILE.CHANGE_DATA_BTN]: new ButtonBlock({
					id: IDS.PROFILE.CHANGE_DATA_BTN,
					type: 'button',
					text: 'Изменить данные',
					class: 'plain blue',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						this.toggleInputsDisable();

						this.setProps({
							isDataEdit: true,
						});
					},
				}),
				[IDS.PROFILE.CHANGE_PSW_BTN]: new ButtonBlock({
					id: IDS.PROFILE.CHANGE_PSW_BTN,
					type: 'button',
					text: 'Изменить пароль',
					class: 'plain blue',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						this.setProps({
							isPasswordEdit: true,
						});
					},
				}),
				[IDS.PROFILE.LOGOUT_BTN]: new ButtonBlock({
					id: IDS.PROFILE.LOGOUT_BTN,
					type: 'button',
					text: 'Выйти из аккаунта',
					class: 'plain red',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						this.eventBus().emit(Block.EVENTS.FLOW_CWU, { page: PAGES.AUTHORIZATION });
					},
				}),
				[IDS.PROFILE.SAVE_PSW_BTN]: new ButtonBlock({
					id: IDS.PROFILE.SAVE_PSW_BTN,
					type: 'button',
					text: 'Обновить пароль',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						console.log('Profile password form submit: ', this.props[IDS.FORMS.PROFILE_USER_PSW_FORM].fields);
					},
				}),
				[IDS.PROFILE.SAVE_DATA_BTN]: new ButtonBlock({
					id: IDS.PROFILE.SAVE_DATA_BTN,
					type: 'button',
					text: 'Обновить данные',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						console.log('Profile data form submit: ', this.props[IDS.FORMS.PROFILE_USER_PSW_FORM].fields);
					},
				}),
				[IDS.PROFILE.CANCEL_PSW_EDIT_BTN]: new ButtonBlock({
					id: IDS.PROFILE.CANCEL_PSW_EDIT_BTN,
					type: 'button',
					text: 'Назад',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						this.resetTargetForm(IDS.FORMS.PROFILE_USER_PSW_FORM);

						this.setProps({
							isPasswordEdit: false,
						});
					},
				}),
				[IDS.PROFILE.CANCEL_DATA_EDIT_BTN]: new ButtonBlock({
					id: IDS.PROFILE.CANCEL_DATA_EDIT_BTN,
					type: 'button',
					text: 'Назад',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						this.toggleInputsDisable();
						this.resetTargetForm(IDS.FORMS.PROFILE_USER_DATA_FORM, props.userData);

						this.setProps({
							isDataEdit: false,
						});
					},
				}),
			},
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
