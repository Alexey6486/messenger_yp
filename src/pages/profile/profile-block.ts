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
	IUserDataForm,
	IUserPasswordForm,
	IFormState,
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
						value: props?.userForm?.fields?.email ?? '',
						error: props?.userForm?.errors?.email ?? '',
					},
					parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
					children: {
						[IDS.PROFILE.EMAIL_INPUT]: new InputBlock({
							id: IDS.PROFILE.EMAIL_INPUT,
							input_data: {
								value: props?.userForm?.fields?.email ?? '',
								error: props?.userForm?.errors?.email ?? '',
							},
							dataset: E_FORM_FIELDS_NAME.email,
							name: E_FORM_FIELDS_NAME.email,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
							onInputChange: (params: IInputChangeParams) => {
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
						value: props?.userForm?.fields?.login ?? '',
						error: props?.userForm?.errors?.login ?? '',
					},
					parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
					children: {
						[IDS.PROFILE.LOGIN_INPUT]: new InputBlock({
							id: IDS.PROFILE.LOGIN_INPUT,
							input_data: {
								value: props?.userForm?.fields?.login ?? '',
								error: props?.userForm?.errors?.login ?? '',
							},
							dataset: E_FORM_FIELDS_NAME.login,
							name: E_FORM_FIELDS_NAME.login,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
							onInputChange: (params: IInputChangeParams) => {
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
						value: props?.userForm?.fields?.first_name ?? '',
						error: props?.userForm?.errors?.first_name ?? '',
					},
					parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
					children: {
						[IDS.PROFILE.F_NAME_INPUT]: new InputBlock({
							id: IDS.PROFILE.F_NAME_INPUT,
							input_data: {
								value: props?.userForm?.fields?.first_name ?? '',
								error: props?.userForm?.errors?.first_name ?? '',
							},
							dataset: E_FORM_FIELDS_NAME.first_name,
							name: E_FORM_FIELDS_NAME.first_name,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
							onInputChange: (params: IInputChangeParams) => {
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
						value: props?.userForm?.fields?.second_name ?? '',
						error: props?.userForm?.errors?.second_name ?? '',
					},
					parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
					children: {
						[IDS.PROFILE.S_NAME_INPUT]: new InputBlock({
							id: IDS.PROFILE.S_NAME_INPUT,
							input_data: {
								value: props?.userForm?.fields?.second_name ?? '',
								error: props?.userForm?.errors?.second_name ?? '',
							},
							dataset: E_FORM_FIELDS_NAME.second_name,
							name: E_FORM_FIELDS_NAME.second_name,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
							onInputChange: (params: IInputChangeParams) => {
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
						value: props?.userForm?.fields?.display_name ?? '',
						error: props?.userForm?.errors?.display_name ?? '',
					},
					parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
					children: {
						[IDS.PROFILE.D_NAME_INPUT]: new InputBlock({
							id: IDS.PROFILE.D_NAME_INPUT,
							input_data: {
								value: props?.userForm?.fields?.display_name ?? '',
								error: props?.userForm?.errors?.display_name ?? '',
							},
							dataset: E_FORM_FIELDS_NAME.display_name,
							name: E_FORM_FIELDS_NAME.display_name,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
							onInputChange: (params: IInputChangeParams) => {
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
						value: props?.userForm?.fields?.phone ?? '',
						error: props?.userForm?.errors?.phone ?? '',
					},
					parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
					children: {
						[IDS.PROFILE.PHONE_INPUT]: new InputBlock({
							id: IDS.PROFILE.PHONE_INPUT,
							input_data: {
								value: props?.userForm?.fields?.phone ?? '',
								error: props?.userForm?.errors?.phone ?? '',
							},
							dataset: E_FORM_FIELDS_NAME.phone,
							name: E_FORM_FIELDS_NAME.phone,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
							onInputChange: (params: IInputChangeParams) => {
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
						value: props.passwordForm?.fields?.oldPassword ?? '',
						error: props.passwordForm?.errors?.oldPassword ?? '',
					},
					parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
					children: {
						[IDS.PROFILE.O_PSW_INPUT]: new InputBlock({
							id: IDS.PROFILE.O_PSW_INPUT,
							input_data: {
								value: props.passwordForm?.fields?.oldPassword ?? '',
								error: props.passwordForm?.errors?.oldPassword ?? '',
							},
							dataset: E_FORM_FIELDS_NAME.oldPassword,
							name: E_FORM_FIELDS_NAME.oldPassword,
							placeholder: '',
							type: 'password',
							parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
							onInputChange: (params: IInputChangeParams) => {
								this.onFormInputChange(
									{
										...params,
										...(params.info.event === 'blur' && {
											data: {
												...params.data,
												error: fieldsValidator({
													valueToValidate: params.data.value,
													fieldName: E_FORM_FIELDS_NAME.oldPassword,
													requiredOnly: true,
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
						value: props.passwordForm?.fields?.newPassword ?? '',
						error: props.passwordForm?.errors?.newPassword ?? '',
					},
					parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
					children: {
						[IDS.PROFILE.N_PSW_INPUT]: new InputBlock({
							id: IDS.PROFILE.N_PSW_INPUT,
							input_data: {
								value: props.passwordForm?.fields?.newPassword ?? '',
								error: props.passwordForm?.errors?.newPassword ?? '',
							},
							dataset: E_FORM_FIELDS_NAME.newPassword,
							name: E_FORM_FIELDS_NAME.newPassword,
							placeholder: '',
							type: 'password',
							parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
							onInputChange: (params: IInputChangeParams) => {
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
						value: props.passwordForm?.fields?.confirmPassword ?? '',
						error: props.passwordForm?.errors?.confirmPassword ?? '',
					},
					parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
					children: {
						[IDS.PROFILE.C_PSW_INPUT]: new InputBlock({
							id: IDS.PROFILE.C_PSW_INPUT,
							input_data: {
								value: props.passwordForm?.fields?.confirmPassword ?? '',
								error: props.passwordForm?.errors?.confirmPassword ?? '',
							},
							dataset: E_FORM_FIELDS_NAME.confirmPassword,
							name: E_FORM_FIELDS_NAME.confirmPassword,
							placeholder: '',
							type: 'password',
							parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
							onInputChange: (params: IInputChangeParams) => {
								this.onFormInputChange(
									{
										...params,
										...(params.info.event === 'blur' && {
											data: {
												...params.data,
												error: fieldsValidator({
													valueToValidate: params.data.value,
													fieldName: E_FORM_FIELDS_NAME.confirmPassword,
													valueToCompare: this.props?.passwordForm?.fields?.newPassword ?? '',
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
					onInputChange: () => {
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

						let validationResult = '';
						let pageProps = { passwordForm: { ...this.props.passwordForm } };

						Object.entries(this.children).forEach(([fieldId, fieldInstance]) => {
							if (fieldId.includes('password-field')) {
								Object.entries(fieldInstance.children).forEach(([inputId, inputInstance]) => {
									if (
										inputId.includes('input')
										&& !inputInstance.props?.input_data?.error.length
									) {
										const fieldName = inputInstance.props.name as keyof IUserPasswordForm;
										validationResult = fieldsValidator({
											valueToValidate: inputInstance?.props?.input_data?.value,
											fieldName: fieldName ?? '',
										});

										if (validationResult.length) {
											const childProps = {
												input_data: {
													value: inputInstance?.props?.input_data?.value ?? '',
													error: validationResult,
												},
											};
											inputInstance.setProps(childProps);
											fieldInstance.setProps(childProps);

											const passwordForm = pageProps?.passwordForm as BlockProps['passwordForm'];
											const passwordErrors = passwordForm?.errors;
											if (passwordErrors) {
												pageProps = {
													passwordForm: {
														...passwordForm,
														errors: {
															...passwordErrors,
															[fieldName]: validationResult,
														},
													},
												};
											}
										}
									}
								});
							}
						});

						const passwordForm: IFormState<IUserPasswordForm> | undefined = this.props?.passwordForm as BlockProps['passwordForm'];
						if (
							passwordForm
							&& passwordForm.errors
						) {
							const errorsList = Object.values(passwordForm.errors).filter((el) => Boolean(el));
							if (!errorsList.length) {
								console.log('Profile password form submit: ', this.props?.passwordForm?.fields ?? '');
							}
						}

						if (validationResult.length) {
							this.setProps(pageProps as BlockProps);
						}
					},
				}),
				[IDS.PROFILE.SAVE_DATA_BTN]: new ButtonBlock({
					id: IDS.PROFILE.SAVE_DATA_BTN,
					type: 'button',
					text: 'Обновить данные',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						let validationResult = '';
						let pageProps = { userForm: { ...this.props.userForm } };

						Object.entries(this.children).forEach(([fieldId, fieldInstance]) => {
							if (fieldId.includes('data-field')) {
								Object.entries(fieldInstance.children).forEach(([inputId, inputInstance]) => {
									if (
										inputId.includes('input')
										&& !inputInstance.props?.input_data?.error.length
									) {
										const fieldName = inputInstance.props.name as keyof IUserDataForm;
										validationResult = fieldsValidator({
											valueToValidate: inputInstance?.props?.input_data?.value,
											fieldName: fieldName ?? '',
										});

										if (validationResult.length) {
											const childProps = {
												input_data: {
													value: inputInstance?.props?.input_data?.value ?? '',
													error: validationResult,
												},
											};
											inputInstance.setProps(childProps);
											fieldInstance.setProps(childProps);

											const userForm = pageProps?.userForm as BlockProps['userForm'];
											const userErrors = userForm?.errors;
											if (userErrors) {
												pageProps = {
													userForm: {
														...userForm,
														errors: {
															...userErrors,
															[fieldName]: validationResult,
														},
													},
												};
											}
										}
									}
								});
							}
						});

						const userForm: IFormState<IUserDataForm> | undefined = this.props?.userForm as BlockProps['userForm'];
						if (
							userForm
							&& userForm.errors
						) {
							const errorsList = Object.values(userForm.errors).filter((el) => Boolean(el));
							if (!errorsList.length) {
								console.log('Profile data form submit: ', this.props?.userForm?.fields ?? '');
							}
						}

						if (validationResult.length) {
							this.setProps(pageProps as BlockProps);
						}
					},
				}),
				[IDS.PROFILE.CANCEL_PSW_EDIT_BTN]: new ButtonBlock({
					id: IDS.PROFILE.CANCEL_PSW_EDIT_BTN,
					type: 'button',
					text: 'Назад',
					onClick: (event: Event) => {
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
					text: 'Назад',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						this.toggleInputsDisable();

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
