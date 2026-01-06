import { Block } from '@/block';
import {
	AuthController,
	UserController,
} from '@/controllers';
import { Store } from '@/store';
import {
	FocusManager,
	getFocusData,
} from '@/focus-manager';
import {
	IDS,
	INIT_PROFILE_USER_DATA_STATE,
	INIT_PROFILE_USER_PASSWORD_STATE,
	PAGES_URL,
	STORAGE_KEY,
} from '@/constants';
import {
	cloneDeep,
	compile,
	fieldsValidator,
	getInputStateSlice,
	isEmpty,
	isEqual,
} from '@/utils';
import { mapUserToPropsUserData } from '@/pages/profile/utils';
import type {
	BlockProps,
	IFormState,
	IInputChangeParams,
	IUserDataForm,
	IUserPasswordForm,
	IUserResponse,
	TNullable,
	TPlainObject,
} from '@/types';
import { E_FORM_FIELDS_NAME } from '@/types';
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
				[IDS.PROFILE.EMAIL_FIELD]: `<div id="${ IDS.PROFILE.EMAIL_FIELD }"></div>`,
				[IDS.PROFILE.LOGIN_FIELD]: `<div id="${ IDS.PROFILE.LOGIN_FIELD }"></div>`,
				[IDS.PROFILE.F_NAME_FIELD]: `<div id="${ IDS.PROFILE.F_NAME_FIELD }"></div>`,
				[IDS.PROFILE.S_NAME_FIELD]: `<div id="${ IDS.PROFILE.S_NAME_FIELD }"></div>`,
				[IDS.PROFILE.D_NAME_FIELD]: `<div id="${ IDS.PROFILE.D_NAME_FIELD }"></div>`,
				[IDS.PROFILE.PHONE_FIELD]: `<div id="${ IDS.PROFILE.PHONE_FIELD }"></div>`,

				[IDS.PROFILE.O_PSW_FIELD]: `<div id="${ IDS.PROFILE.O_PSW_FIELD }"></div>`,
				[IDS.PROFILE.N_PSW_FIELD]: `<div id="${ IDS.PROFILE.N_PSW_FIELD }"></div>`,
				[IDS.PROFILE.C_PSW_FIELD]: `<div id="${ IDS.PROFILE.C_PSW_FIELD }"></div>`,

				[IDS.PROFILE.AVATAR]: `<div id="${ IDS.PROFILE.AVATAR }"></div>`,

				[IDS.PROFILE.ASIDE_BTN]: `<div id="${ IDS.PROFILE.ASIDE_BTN }"></div>`,
				[IDS.PROFILE.CHANGE_DATA_BTN]: `<div id="${ IDS.PROFILE.CHANGE_DATA_BTN }"></div>`,
				[IDS.PROFILE.CHANGE_PSW_BTN]: `<div id="${ IDS.PROFILE.CHANGE_PSW_BTN }"></div>`,
				[IDS.PROFILE.LOGOUT_BTN]: `<div id="${ IDS.PROFILE.LOGOUT_BTN }"></div>`,

				[IDS.PROFILE.SAVE_PSW_BTN]: `<div id="${ IDS.PROFILE.SAVE_PSW_BTN }"></div>`,
				[IDS.PROFILE.CANCEL_PSW_EDIT_BTN]: `<div id="${ IDS.PROFILE.CANCEL_PSW_EDIT_BTN }"></div>`,

				[IDS.PROFILE.SAVE_DATA_BTN]: `<div id="${ IDS.PROFILE.SAVE_DATA_BTN }"></div>`,
				[IDS.PROFILE.CANCEL_DATA_EDIT_BTN]: `<div id="${ IDS.PROFILE.CANCEL_DATA_EDIT_BTN }"></div>`,
			},
			children: {
				[IDS.PROFILE.AVATAR]: new InputBlock({
					id: IDS.PROFILE.AVATAR,
					dataset: E_FORM_FIELDS_NAME.avatar,
					name: E_FORM_FIELDS_NAME.avatar,
					placeholder: '',
					type: 'file',
					accept: 'image/*',
					input_data: null,
					onFileChange: (fileList: FileList) => {
						console.log('Avatar onInputChange: ', { fileList });
						const formData = new FormData();
						formData.append('avatar', fileList[0]);
						UserController.changeAvatar({ data: formData as FormData }, this);
					},
				}),

				[IDS.PROFILE.EMAIL_FIELD]: new ProfileFieldBlock({
					styles,
					id: IDS.PROFILE.EMAIL_FIELD,
					fieldName: 'Почта',
					input_data: {
						value: props?.userForm?.fields?.email ?? '',
						error: props?.userForm?.errors?.email ?? '',
					},
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return getInputStateSlice(data?.userForm, 'email');
					},
					parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
					children: {
						[IDS.PROFILE.EMAIL_INPUT]: new InputBlock({
							id: IDS.PROFILE.EMAIL_INPUT,
							input_data: {
								value: props?.userForm?.fields?.email ?? '',
								error: props?.userForm?.errors?.email ?? '',
							},
							mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
								const fieldData = getInputStateSlice(data?.userForm, 'email');
								return {
									...fieldData,
									isDisabled: !data.isDataEdit,
								};
							},
							dataset: E_FORM_FIELDS_NAME.email,
							name: E_FORM_FIELDS_NAME.email,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
							onInputChange: (params: IInputChangeParams) => {
								const data = {
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
								};
								FocusManager.set(getFocusData(params.info));
								Store.set(
									'userForm',
									{
										fields: {
											...props?.userForm?.fields,
											email: data?.data?.value ?? '',
										},
										errors: {
											...props?.userForm?.errors,
											email: data?.data?.error ?? '',
										},
									},
									'userForm' as BlockProps,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.PROFILE.EMAIL_INPUT }"></div>`,
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
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return getInputStateSlice(data?.userForm, 'login');
					},
					parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
					children: {
						[IDS.PROFILE.LOGIN_INPUT]: new InputBlock({
							id: IDS.PROFILE.LOGIN_INPUT,
							input_data: {
								value: props?.userForm?.fields?.login ?? '',
								error: props?.userForm?.errors?.login ?? '',
							},
							mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
								const fieldData = getInputStateSlice(data?.userForm, 'login');
								return {
									...fieldData,
									isDisabled: !data.isDataEdit,
								};
							},
							dataset: E_FORM_FIELDS_NAME.login,
							name: E_FORM_FIELDS_NAME.login,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
							onInputChange: (params: IInputChangeParams) => {
								const data = {
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
								};
								FocusManager.set(getFocusData(params.info));
								Store.set(
									'userForm',
									{
										fields: {
											...props?.userForm?.fields,
											login: data?.data?.value ?? '',
										},
										errors: {
											...props?.userForm?.errors,
											login: data?.data?.error ?? '',
										},
									},
									'userForm' as BlockProps,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.PROFILE.LOGIN_INPUT }"></div>`,
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
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return getInputStateSlice(data?.userForm, 'first_name');
					},
					parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
					children: {
						[IDS.PROFILE.F_NAME_INPUT]: new InputBlock({
							id: IDS.PROFILE.F_NAME_INPUT,
							input_data: {
								value: props?.userForm?.fields?.first_name ?? '',
								error: props?.userForm?.errors?.first_name ?? '',
							},
							mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
								const fieldData = getInputStateSlice(data?.userForm, 'first_name');
								return {
									...fieldData,
									isDisabled: !data.isDataEdit,
								};
							},
							dataset: E_FORM_FIELDS_NAME.first_name,
							name: E_FORM_FIELDS_NAME.first_name,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
							onInputChange: (params: IInputChangeParams) => {
								const data = {
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
								};
								FocusManager.set(getFocusData(params.info));
								Store.set(
									'userForm',
									{
										fields: {
											...props?.userForm?.fields,
											first_name: data?.data?.value ?? '',
										},
										errors: {
											...props?.userForm?.errors,
											first_name: data?.data?.error ?? '',
										},
									},
									'userForm' as BlockProps,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.PROFILE.F_NAME_INPUT }"></div>`,
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
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return getInputStateSlice(data?.userForm, 'second_name');
					},
					parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
					children: {
						[IDS.PROFILE.S_NAME_INPUT]: new InputBlock({
							id: IDS.PROFILE.S_NAME_INPUT,
							input_data: {
								value: props?.userForm?.fields?.second_name ?? '',
								error: props?.userForm?.errors?.second_name ?? '',
							},
							mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
								const fieldData = getInputStateSlice(data?.userForm, 'second_name');
								return {
									...fieldData,
									isDisabled: !data.isDataEdit,
								};
							},
							dataset: E_FORM_FIELDS_NAME.second_name,
							name: E_FORM_FIELDS_NAME.second_name,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
							onInputChange: (params: IInputChangeParams) => {
								const data = {
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
								};
								FocusManager.set(getFocusData(params.info));
								Store.set(
									'userForm',
									{
										fields: {
											...props?.userForm?.fields,
											second_name: data?.data?.value ?? '',
										},
										errors: {
											...props?.userForm?.errors,
											second_name: data?.data?.error ?? '',
										},
									},
									'userForm' as BlockProps,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.PROFILE.S_NAME_INPUT }"></div>`,
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
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return getInputStateSlice(data?.userForm, 'display_name');
					},
					parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
					children: {
						[IDS.PROFILE.D_NAME_INPUT]: new InputBlock({
							id: IDS.PROFILE.D_NAME_INPUT,
							input_data: {
								value: props?.userForm?.fields?.display_name ?? '',
								error: props?.userForm?.errors?.display_name ?? '',
							},
							mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
								const fieldData = getInputStateSlice(data?.userForm, 'display_name');
								return {
									...fieldData,
									isDisabled: !data.isDataEdit,
								};
							},
							dataset: E_FORM_FIELDS_NAME.display_name,
							name: E_FORM_FIELDS_NAME.display_name,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
							onInputChange: (params: IInputChangeParams) => {
								const data = {
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
								};
								FocusManager.set(getFocusData(params.info));
								Store.set(
									'userForm',
									{
										fields: {
											...props?.userForm?.fields,
											display_name: data?.data?.value ?? '',
										},
										errors: {
											...props?.userForm?.errors,
											display_name: data?.data?.error ?? '',
										},
									},
									'userForm' as BlockProps,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.PROFILE.D_NAME_INPUT }"></div>`,
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
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return getInputStateSlice(data?.userForm, 'phone');
					},
					parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
					children: {
						[IDS.PROFILE.PHONE_INPUT]: new InputBlock({
							id: IDS.PROFILE.PHONE_INPUT,
							input_data: {
								value: props?.userForm?.fields?.phone ?? '',
								error: props?.userForm?.errors?.phone ?? '',
							},
							mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
								const fieldData = getInputStateSlice(data?.userForm, 'phone');
								return {
									...fieldData,
									isDisabled: !data.isDataEdit,
								};
							},
							dataset: E_FORM_FIELDS_NAME.phone,
							name: E_FORM_FIELDS_NAME.phone,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
							onInputChange: (params: IInputChangeParams) => {
								const data = {
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
								};
								FocusManager.set(getFocusData(params.info));
								Store.set(
									'userForm',
									{
										fields: {
											...props?.userForm?.fields,
											phone: data?.data?.value ?? '',
										},
										errors: {
											...props?.userForm?.errors,
											phone: data?.data?.error ?? '',
										},
									},
									'userForm' as BlockProps,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.PROFILE.PHONE_INPUT }"></div>`,
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
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return getInputStateSlice(data?.passwordForm, 'oldPassword');
					},
					parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
					children: {
						[IDS.PROFILE.O_PSW_INPUT]: new InputBlock({
							id: IDS.PROFILE.O_PSW_INPUT,
							input_data: {
								value: props.passwordForm?.fields?.oldPassword ?? '',
								error: props.passwordForm?.errors?.oldPassword ?? '',
							},
							mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
								return getInputStateSlice(data?.passwordForm, 'oldPassword');
							},
							dataset: E_FORM_FIELDS_NAME.oldPassword,
							name: E_FORM_FIELDS_NAME.oldPassword,
							placeholder: '',
							type: 'password',
							parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
							onInputChange: (params: IInputChangeParams) => {
								const data = {
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
								};
								FocusManager.set(getFocusData(params.info));
								Store.set(
									'passwordForm',
									{
										fields: {
											...props?.passwordForm?.fields,
											oldPassword: data?.data?.value ?? '',
										},
										errors: {
											...props?.passwordForm?.errors,
											oldPassword: data?.data?.error ?? '',
										},
									},
									'passwordForm' as BlockProps,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.PROFILE.O_PSW_INPUT }"></div>`,
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
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return getInputStateSlice(data?.passwordForm, 'newPassword');
					},
					parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
					children: {
						[IDS.PROFILE.N_PSW_INPUT]: new InputBlock({
							id: IDS.PROFILE.N_PSW_INPUT,
							input_data: {
								value: props.passwordForm?.fields?.newPassword ?? '',
								error: props.passwordForm?.errors?.newPassword ?? '',
							},
							mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
								return getInputStateSlice(data?.passwordForm, 'newPassword');
							},
							dataset: E_FORM_FIELDS_NAME.newPassword,
							name: E_FORM_FIELDS_NAME.newPassword,
							placeholder: '',
							type: 'password',
							parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
							onInputChange: (params: IInputChangeParams) => {
								const data = {
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
								};
								FocusManager.set(getFocusData(params.info));
								Store.set(
									'passwordForm',
									{
										fields: {
											...props?.passwordForm?.fields,
											newPassword: data?.data?.value ?? '',
										},
										errors: {
											...props?.passwordForm?.errors,
											newPassword: data?.data?.error ?? '',
										},
									},
									'passwordForm' as BlockProps,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.PROFILE.N_PSW_INPUT }"></div>`,
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
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return getInputStateSlice(data?.passwordForm, 'confirmPassword');
					},
					parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
					children: {
						[IDS.PROFILE.C_PSW_INPUT]: new InputBlock({
							id: IDS.PROFILE.C_PSW_INPUT,
							input_data: {
								value: props.passwordForm?.fields?.confirmPassword ?? '',
								error: props.passwordForm?.errors?.confirmPassword ?? '',
							},
							mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
								return getInputStateSlice(data?.passwordForm, 'confirmPassword');
							},
							dataset: E_FORM_FIELDS_NAME.confirmPassword,
							name: E_FORM_FIELDS_NAME.confirmPassword,
							placeholder: '',
							type: 'password',
							parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
							onInputChange: (params: IInputChangeParams) => {
								const data = {
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
								};
								FocusManager.set(getFocusData(params.info));
								Store.set(
									'passwordForm',
									{
										fields: {
											...props?.passwordForm?.fields,
											confirmPassword: data?.data?.value ?? '',
										},
										errors: {
											...props?.passwordForm?.errors,
											confirmPassword: data?.data?.error ?? '',
										},
									},
									'passwordForm' as BlockProps,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.PROFILE.C_PSW_INPUT }"></div>`,
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

						Store.set(
							'isDataEdit',
							true,
							'isDataEdit' as BlockProps,
						);
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
									if (inputId.includes('input')) {
										const fieldName = inputInstance.props.name as keyof IUserDataForm;
										validationResult = fieldsValidator({
											valueToValidate: inputInstance?.props?.input_data?.value,
											fieldName: fieldName ?? '',
										});

										if (validationResult.length) {
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

						const userForm: TNullable<IFormState<IUserDataForm>> | undefined = this.props?.userForm as BlockProps['userForm'];
						console.log({ pageProps });

						if (
							userForm
							&& userForm.errors
						) {
							const errorsList = Object.values(userForm.errors).filter((el) => Boolean(el));
							console.log({ errorsList });

							if (errorsList.length) {
								const { userForm: { errors, fields } } = pageProps;
								Store.set(
									'userForm',
									{ fields, errors },
									'userForm' as BlockProps,
								);
							} else {
								console.log('Profile data form submit: ', this.props?.userForm?.fields ?? '');
								if (this.props?.userData && this.props?.userForm?.fields) {
									if (
										!isEqual(
											this.props.userData as unknown as TPlainObject,
											this.props.userForm.fields as unknown as TPlainObject,
										)
									) {
										const data = JSON.stringify(this.props?.userForm?.fields);
										UserController.changeUserData({ data }, this);
									} else {
										Store.set(
											'isDataEdit',
											false,
											'isDataEdit' as BlockProps,
										);
									}
								}
							}
						}
					},
				}),
				[IDS.PROFILE.CANCEL_DATA_EDIT_BTN]: new ButtonBlock({
					id: IDS.PROFILE.CANCEL_DATA_EDIT_BTN,
					type: 'button',
					text: 'Назад',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						Store.set(
							'isDataEdit',
							false,
							'isDataEdit' as BlockProps,
						);

						if (this.props?.userData && this.props?.userForm?.fields) {
							if (
								!isEqual(
									this.props.userData as unknown as TPlainObject,
									this.props.userForm.fields as unknown as TPlainObject,
								)
							) {
								const { errors } = cloneDeep(INIT_PROFILE_USER_DATA_STATE);
								Store.set(
									'userForm',
									{
										fields: cloneDeep(this.props.userData),
										errors,
									},
									'userForm' as BlockProps,
								);
							}
						}
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

						Store.set(
							'isPasswordEdit',
							true,
							'isPasswordEdit' as BlockProps,
						);
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
									if (inputId.includes('input')) {
										const fieldName = inputInstance.props.name as keyof IUserPasswordForm;
										validationResult = fieldsValidator({
											valueToValidate: inputInstance?.props?.input_data?.value,
											fieldName: fieldName ?? '',
										});

										if (validationResult.length) {
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

						const passwordForm: TNullable<IFormState<IUserPasswordForm>> | undefined = this.props?.passwordForm as BlockProps['passwordForm'];
						console.log({ pageProps });

						if (
							passwordForm
							&& passwordForm.errors
						) {
							const errorsList = Object.values(passwordForm.errors).filter((el) => Boolean(el));
							console.log({ errorsList });

							if (errorsList.length) {
								const { passwordForm: { errors, fields } } = pageProps;
								Store.set(
									'passwordForm',
									{ fields, errors },
									'passwordForm' as BlockProps,
								);
							} else {
								console.log('Profile password form submit: ', this);
								const fields = this.props?.passwordForm?.fields;
								if (fields) {
									const { oldPassword, newPassword } = fields;
									const data = JSON.stringify({ oldPassword, newPassword });
									UserController.changePassword({ data }, this);
								}
							}
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

						Store.set(
							'isPasswordEdit',
							false,
							'isPasswordEdit' as BlockProps,
						);

						const { fields, errors } = cloneDeep(INIT_PROFILE_USER_PASSWORD_STATE);
						Store.set(
							'passwordForm',
							{
								fields,
								errors,
							},
							'passwordForm' as BlockProps,
						);
					},
				}),

				[IDS.PROFILE.ASIDE_BTN]: new ButtonRoundBlock({
					id: IDS.PROFILE.ASIDE_BTN,
					type: 'button',
					icon: SvgArrowLeft,
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						Store.clearSubs();
						this?.props?.router?.go?.(PAGES_URL.MAIN);
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

						AuthController.logout(this.props.router, this);
					},
				}),
			},
		});
	}

	override componentDidMount() {
		const userData: TNullable<IUserResponse> = mapUserToPropsUserData(Store.getState());
		const { errors } = cloneDeep(INIT_PROFILE_USER_DATA_STATE) as IFormState<IUserDataForm>;
		console.log('ProfileBlock componentDidMount override', { userData, t: this });

		if (!isEmpty(userData) && userData?.id) {
			Store.set(
				'userForm',
				{ fields: { ...userData }, errors },
				'userForm' as BlockProps,
			);
			Store.set(
				'userData',
				userData,
				'userData' as BlockProps,
			);
		} else {
			const storageData = sessionStorage.getItem(STORAGE_KEY);
			if (storageData) {
				const userStorageData = JSON.parse(storageData);
				Store.set(
					'userForm',
					{ fields: { ...userStorageData }, errors },
					'userForm' as BlockProps,
				);
				Store.set(
					'userData',
					userStorageData,
					'userData' as BlockProps,
				);
			}
		}
	}

	override render(): string {
		console.log('Render ProfileBlock', this);
		return compile(template, this.props);
	}
}
