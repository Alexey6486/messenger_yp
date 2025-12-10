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
			},
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
							isDisabled: !props.isDataEdit,
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
				[IDS.PROFILE.LOGIN_FIELD]: new ProfileFieldBlock({
					styles,
					id: IDS.PROFILE.LOGIN_FIELD,
					fieldName: 'Логин',
					input_data: {
						value: props.userForm.fields.login,
						error: props.userForm.errors.login,
						currentFocus: props.currentFocus,
					},

					children: {
						[IDS.PROFILE.LOGIN_INPUT]: new InputBlock({
							id: IDS.PROFILE.LOGIN_INPUT,
							input_data: {
								value: props.userForm.fields.login,
								error: props.userForm.errors.login,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.login,
							name: E_FORM_FIELDS_NAME.login,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							onChange: (params: IInputChangeParams<Block>) => {
								console.log('onChange login: ', { params, currentThis: this });

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
						value: props.userForm.fields.first_name,
						error: props.userForm.errors.first_name,
						currentFocus: props.currentFocus,
					},

					children: {
						[IDS.PROFILE.F_NAME_INPUT]: new InputBlock({
							id: IDS.PROFILE.F_NAME_INPUT,
							input_data: {
								value: props.userForm.fields.first_name,
								error: props.userForm.errors.first_name,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.first_name,
							name: E_FORM_FIELDS_NAME.first_name,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							onChange: (params: IInputChangeParams<Block>) => {
								console.log('onChange first_name: ', { params, currentThis: this });

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
						value: props.userForm.fields.second_name,
						error: props.userForm.errors.second_name,
						currentFocus: props.currentFocus,
					},

					children: {
						[IDS.PROFILE.S_NAME_INPUT]: new InputBlock({
							id: IDS.PROFILE.S_NAME_INPUT,
							input_data: {
								value: props.userForm.fields.second_name,
								error: props.userForm.errors.second_name,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.second_name,
							name: E_FORM_FIELDS_NAME.second_name,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							onChange: (params: IInputChangeParams<Block>) => {
								console.log('onChange second_name: ', { params, currentThis: this });

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
						value: props.userForm.fields.display_name,
						error: props.userForm.errors.display_name,
						currentFocus: props.currentFocus,
					},

					children: {
						[IDS.PROFILE.D_NAME_INPUT]: new InputBlock({
							id: IDS.PROFILE.D_NAME_INPUT,
							input_data: {
								value: props.userForm.fields.display_name,
								error: props.userForm.errors.display_name,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.display_name,
							name: E_FORM_FIELDS_NAME.display_name,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							onChange: (params: IInputChangeParams<Block>) => {
								console.log('onChange display_name: ', { params, currentThis: this });

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
						value: props.userForm.fields.phone,
						error: props.userForm.errors.phone,
						currentFocus: props.currentFocus,
					},

					children: {
						[IDS.PROFILE.PHONE_INPUT]: new InputBlock({
							id: IDS.PROFILE.PHONE_INPUT,
							input_data: {
								value: props.userForm.fields.phone,
								error: props.userForm.errors.phone,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.phone,
							name: E_FORM_FIELDS_NAME.phone,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							onChange: (params: IInputChangeParams<Block>) => {
								console.log('onChange phone: ', { params, currentThis: this });

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
				[IDS.PROFILE.N_PSW_FIELD]: new ProfileFieldBlock({
					styles,
					id: IDS.PROFILE.N_PSW_FIELD,
					fieldName: 'Новый пароль',
					input_data: {
						value: props.passwordForm.fields.newPassword,
						error: props.passwordForm.errors.newPassword,
						currentFocus: props.currentFocus,
					},

					children: {
						[IDS.PROFILE.N_PSW_INPUT]: new InputBlock({
							id: IDS.PROFILE.N_PSW_INPUT,
							input_data: {
								value: props.passwordForm.fields.newPassword,
								error: props.passwordForm.errors.newPassword,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.newPassword,
							name: E_FORM_FIELDS_NAME.newPassword,
							placeholder: '',
							type: 'password',
							onChange: (params: IInputChangeParams<Block>) => {
								console.log('onChange new password: ', { params, currentThis: this });

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
						value: props.passwordForm.fields.confirmPassword,
						error: props.passwordForm.errors.confirmPassword,
						currentFocus: props.currentFocus,
					},

					children: {
						[IDS.PROFILE.C_PSW_INPUT]: new InputBlock({
							id: IDS.PROFILE.C_PSW_INPUT,
							input_data: {
								value: props.passwordForm.fields.confirmPassword,
								error: props.passwordForm.errors.confirmPassword,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.confirmPassword,
							name: E_FORM_FIELDS_NAME.confirmPassword,
							placeholder: '',
							type: 'password',
							onChange: (params: IInputChangeParams<Block>) => {
								console.log('onChange confirm password: ', { params, currentThis: this });

								this.onFormInputChange(
									{
										...params,
										...(params.info.event === 'blur' && {
											data: {
												...params.data,
												error: fieldsValidator({
													valueToValidate: params.data.value,
													fieldName: E_FORM_FIELDS_NAME.confirmPassword,
													valueToCompare: this.props.passwordForm.fields.newPassword,
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

						this.toggleInputsDisable();

						this.setProps({
							isDataEdit: true,
						});
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

						this.setProps({
							isPasswordEdit: true,
						});
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

						this.eventBus().emit(Block.EVENTS.FLOW_CWU, { page: PAGES.AUTHORIZATION });
					},
				}),
				[IDS.PROFILE.SAVE_PSW_BTN]: new ButtonBlock({
					id: IDS.PROFILE.SAVE_PSW_BTN,
					type: 'button',
					dataset: IDS.PROFILE.SAVE_PSW_BTN,
					text: 'Обновить пароль',
					onClick: (event: Event) => {
						console.log('click save psw edit: ', this);

						event.preventDefault();
						event.stopPropagation();

						console.log('Profile password form: ', this.props.passwordForm.fields);
					},
				}),
				[IDS.PROFILE.SAVE_DATA_BTN]: new ButtonBlock({
					id: IDS.PROFILE.SAVE_DATA_BTN,
					type: 'button',
					dataset: IDS.PROFILE.SAVE_DATA_BTN,
					text: 'Обновить данные',
					onClick: (event: Event) => {
						console.log('click save data edit: ', this);

						event.preventDefault();
						event.stopPropagation();

						console.log('Profile data form: ', this.props.userForm.fields);
					},
				}),
				[IDS.PROFILE.CANCEL_PSW_EDIT_BTN]: new ButtonBlock({
					id: IDS.PROFILE.CANCEL_PSW_EDIT_BTN,
					type: 'button',
					dataset: IDS.PROFILE.CANCEL_PSW_EDIT_BTN,
					text: 'Назад',
					onClick: (event: Event) => {
						console.log('click cancel psw edit: ', this);

						event.preventDefault();
						event.stopPropagation();

						this.setProps({
							isPasswordEdit: false,
						});
					},
				}),
				[IDS.PROFILE.CANCEL_DATA_EDIT_BTN]: new ButtonBlock({
					id: IDS.PROFILE.CANCEL_DATA_EDIT_BTN,
					type: 'button',
					dataset: IDS.PROFILE.CANCEL_DATA_EDIT_BTN,
					text: 'Назад',
					onClick: (event: Event) => {
						console.log('click cancel data edit: ', this);

						event.preventDefault();
						event.stopPropagation();

						this.toggleInputsDisable();
						// this.resetForm();

						this.setProps({
							isDataEdit: false,
						});
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
