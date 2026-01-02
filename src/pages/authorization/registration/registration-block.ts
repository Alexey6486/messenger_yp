import { Block } from '@/block';
import { AuthController } from '@/controllers';
import { Store } from '@/store';
import {
	FocusManager,
	getFocusData,
} from '@/focus-manager';
import {
	IDS,
	PAGES_URL,
} from '@/constants';
import {
	compile,
	fieldsValidator,
	getInputStateSlice,
} from '@/utils';
import type {
	BlockProps,
	IFormState,
	IInputChangeParams,
	IRegistrationFormUi,
} from '@/types';
import { E_FORM_FIELDS_NAME } from '@/types';
import { ButtonBlock } from '@/components/button/button-block';
import { FieldBlock } from '@/components/form-fields/field-block';
import { InputBlock } from '@/components/input/input-block';
import template from './registration-template.hbs?raw';
import styles from '../styles.module.pcss';

export class RegistrationBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			styles,
			markup: {
				[IDS.REGISTRATION.EMAIL_FIELD]: `<div id="${ IDS.REGISTRATION.EMAIL_FIELD }"></div>`,
				[IDS.REGISTRATION.LOGIN_FIELD]: `<div id="${ IDS.REGISTRATION.LOGIN_FIELD }"></div>`,
				[IDS.REGISTRATION.F_NAME_FIELD]: `<div id="${ IDS.REGISTRATION.F_NAME_FIELD }"></div>`,
				[IDS.REGISTRATION.S_NAME_FIELD]: `<div id="${ IDS.REGISTRATION.S_NAME_FIELD }"></div>`,
				[IDS.REGISTRATION.PHONE_FIELD]: `<div id="${ IDS.REGISTRATION.PHONE_FIELD }"></div>`,
				[IDS.REGISTRATION.PSW_FIELD]: `<div id="${ IDS.REGISTRATION.PSW_FIELD }"></div>`,
				[IDS.REGISTRATION.C_PSW_FIELD]: `<div id="${ IDS.REGISTRATION.C_PSW_FIELD }"></div>`,
				[IDS.REGISTRATION.SUBMIT]: `<div id="${ IDS.REGISTRATION.SUBMIT }"></div>`,
				[IDS.REGISTRATION.SIGNIN]: `<div id="${ IDS.REGISTRATION.SIGNIN }"></div>`,
			},
			children: {
				[IDS.REGISTRATION.EMAIL_FIELD]: new FieldBlock({
					id: IDS.REGISTRATION.EMAIL_FIELD,
					id_label: IDS.REGISTRATION.EMAIL_INPUT,
					input_data: {
						value: props?.registrationForm?.fields?.email ?? '',
						error: props?.registrationForm?.errors?.email ?? '',
					},
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return getInputStateSlice(data?.registrationForm, 'email');
					},
					label: 'Почта',
					isRequired: true,
					children: {
						[IDS.REGISTRATION.EMAIL_INPUT]: new InputBlock({
							id: IDS.REGISTRATION.EMAIL_INPUT,
							input_data: {
								value: props?.registrationForm?.fields?.email ?? '',
								error: props?.registrationForm?.errors?.email ?? '',
							},
							mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
								return getInputStateSlice(data?.registrationForm, 'email');
							},
							dataset: E_FORM_FIELDS_NAME.email,
							name: E_FORM_FIELDS_NAME.email,
							placeholder: '',
							type: 'text',
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
									'registrationForm',
									{
										fields: {
											...props?.registrationForm?.fields,
											email: data?.data?.value ?? '',
										},
										errors: {
											...props?.registrationForm?.errors,
											email: data?.data?.error ?? '',
										},
									},
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.REGISTRATION.EMAIL_INPUT }"></div>`,
					},
				}),
				[IDS.REGISTRATION.LOGIN_FIELD]: new FieldBlock({
					id: IDS.REGISTRATION.LOGIN_FIELD,
					id_label: IDS.REGISTRATION.LOGIN_INPUT,
					input_data: {
						value: props?.registrationForm?.fields?.login ?? '',
						error: props?.registrationForm?.errors?.login ?? '',
					},
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return getInputStateSlice(data?.registrationForm, 'login');
					},
					label: 'Логин',
					isRequired: true,
					children: {
						[IDS.REGISTRATION.LOGIN_INPUT]: new InputBlock({
							id: IDS.REGISTRATION.LOGIN_INPUT,
							input_data: {
								value: props?.registrationForm?.fields?.login ?? '',
								error: props?.registrationForm?.errors?.login ?? '',
							},
							mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
								return getInputStateSlice(data?.registrationForm, 'login');
							},
							dataset: E_FORM_FIELDS_NAME.login,
							name: E_FORM_FIELDS_NAME.login,
							placeholder: '',
							type: 'text',
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
									'registrationForm',
									{
										fields: {
											...props?.registrationForm?.fields,
											login: data?.data?.value ?? '',
										},
										errors: {
											...props?.registrationForm?.errors,
											login: data?.data?.error ?? '',
										},
									},
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.REGISTRATION.LOGIN_INPUT }"></div>`,
					},
				}),
				[IDS.REGISTRATION.F_NAME_FIELD]: new FieldBlock({
					id: IDS.REGISTRATION.F_NAME_FIELD,
					id_label: IDS.REGISTRATION.F_NAME_INPUT,
					input_data: {
						value: props?.registrationForm?.fields?.first_name ?? '',
						error: props?.registrationForm?.errors?.first_name ?? '',
					},
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return getInputStateSlice(data?.registrationForm, 'first_name');
					},
					label: 'Имя',
					isRequired: true,
					children: {
						[IDS.REGISTRATION.LOGIN_INPUT]: new InputBlock({
							id: IDS.REGISTRATION.F_NAME_INPUT,
							input_data: {
								value: props?.registrationForm?.fields?.first_name ?? '',
								error: props?.registrationForm?.errors?.first_name ?? '',
							},
							mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
								return getInputStateSlice(data?.registrationForm, 'first_name');
							},
							dataset: E_FORM_FIELDS_NAME.first_name,
							name: E_FORM_FIELDS_NAME.first_name,
							placeholder: '',
							type: 'text',
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
									'registrationForm',
									{
										fields: {
											...props?.registrationForm?.fields,
											first_name: data?.data?.value ?? '',
										},
										errors: {
											...props?.registrationForm?.errors,
											first_name: data?.data?.error ?? '',
										},
									},
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.REGISTRATION.F_NAME_INPUT }"></div>`,
					},
				}),
				[IDS.REGISTRATION.S_NAME_FIELD]: new FieldBlock({
					id: IDS.REGISTRATION.S_NAME_FIELD,
					id_label: IDS.REGISTRATION.S_NAME_INPUT,
					input_data: {
						value: props?.registrationForm?.fields?.second_name ?? '',
						error: props?.registrationForm?.errors?.second_name ?? '',
					},
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return getInputStateSlice(data?.registrationForm, 'second_name');
					},
					label: 'Фамилия',
					isRequired: true,
					children: {
						[IDS.REGISTRATION.S_NAME_INPUT]: new InputBlock({
							id: IDS.REGISTRATION.S_NAME_INPUT,
							input_data: {
								value: props?.registrationForm?.fields?.second_name ?? '',
								error: props?.registrationForm?.errors?.second_name ?? '',
							},
							mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
								return getInputStateSlice(data?.registrationForm, 'second_name');
							},
							dataset: E_FORM_FIELDS_NAME.second_name,
							name: E_FORM_FIELDS_NAME.second_name,
							placeholder: '',
							type: 'text',
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
									'registrationForm',
									{
										fields: {
											...props?.registrationForm?.fields,
											second_name: data?.data?.value ?? '',
										},
										errors: {
											...props?.registrationForm?.errors,
											second_name: data?.data?.error ?? '',
										},
									},
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.REGISTRATION.S_NAME_INPUT }"></div>`,
					},
				}),
				[IDS.REGISTRATION.PHONE_FIELD]: new FieldBlock({
					id: IDS.REGISTRATION.PHONE_FIELD,
					id_label: IDS.REGISTRATION.PHONE_INPUT,
					input_data: {
						value: props?.registrationForm?.fields?.phone ?? '',
						error: props?.registrationForm?.errors?.phone ?? '',
					},
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return getInputStateSlice(data?.registrationForm, 'phone');
					},
					label: 'Телефон',
					isRequired: true,
					children: {
						[IDS.REGISTRATION.PHONE_INPUT]: new InputBlock({
							id: IDS.REGISTRATION.PHONE_INPUT,
							input_data: {
								value: props?.registrationForm?.fields?.phone ?? '',
								error: props?.registrationForm?.errors?.phone ?? '',
							},
							mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
								return getInputStateSlice(data?.registrationForm, 'phone');
							},
							dataset: E_FORM_FIELDS_NAME.phone,
							name: E_FORM_FIELDS_NAME.phone,
							placeholder: '',
							type: 'text',
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
									'registrationForm',
									{
										fields: {
											...props?.registrationForm?.fields,
											phone: data?.data?.value ?? '',
										},
										errors: {
											...props?.registrationForm?.errors,
											phone: data?.data?.error ?? '',
										},
									},
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.REGISTRATION.PHONE_INPUT }"></div>`,
					},
				}),
				[IDS.REGISTRATION.PSW_FIELD]: new FieldBlock({
					id: IDS.REGISTRATION.PSW_FIELD,
					id_label: IDS.REGISTRATION.PSW_INPUT,
					input_data: {
						value: props?.registrationForm?.fields?.password ?? '',
						error: props?.registrationForm?.errors?.password ?? '',
					},
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return getInputStateSlice(data?.registrationForm, 'password');
					},
					label: 'Пароль',
					isRequired: true,
					children: {
						[IDS.REGISTRATION.PSW_INPUT]: new InputBlock({
							id: IDS.REGISTRATION.PSW_INPUT,
							input_data: {
								value: props?.registrationForm?.fields?.password ?? '',
								error: props?.registrationForm?.errors?.password ?? '',
							},
							mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
								return getInputStateSlice(data?.registrationForm, 'password');
							},
							dataset: E_FORM_FIELDS_NAME.password,
							name: E_FORM_FIELDS_NAME.password,
							placeholder: '',
							type: 'password',
							onInputChange: (params: IInputChangeParams) => {
								const data = {
									...params,
									...(params.info.event === 'blur' && {
										data: {
											...params.data,
											error: fieldsValidator({
												valueToValidate: params.data.value,
												fieldName: E_FORM_FIELDS_NAME.password,
											}),
										},
									}),
								};
								FocusManager.set(getFocusData(params.info));
								Store.set(
									'registrationForm',
									{
										fields: {
											...props?.registrationForm?.fields,
											password: data?.data?.value ?? '',
										},
										errors: {
											...props?.registrationForm?.errors,
											password: data?.data?.error ?? '',
										},
									},
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.REGISTRATION.PSW_INPUT }"></div>`,
					},
				}),
				[IDS.REGISTRATION.C_PSW_FIELD]: new FieldBlock({
					id: IDS.REGISTRATION.C_PSW_FIELD,
					id_label: IDS.REGISTRATION.C_PSW_INPUT,
					input_data: {
						value: props?.registrationForm?.fields?.confirmPassword ?? '',
						error: props?.registrationForm?.errors?.confirmPassword ?? '',
					},
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return getInputStateSlice(data?.registrationForm, 'confirmPassword');
					},
					label: 'Пароль (еще раз)',
					isRequired: true,
					children: {
						[IDS.REGISTRATION.C_PSW_INPUT]: new InputBlock({
							id: IDS.REGISTRATION.C_PSW_INPUT,
							input_data: {
								value: props?.registrationForm?.fields?.confirmPassword ?? '',
								error: props?.registrationForm?.errors?.confirmPassword ?? '',
							},
							mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
								return getInputStateSlice(data?.registrationForm, 'confirmPassword');
							},
							dataset: E_FORM_FIELDS_NAME.confirmPassword,
							name: E_FORM_FIELDS_NAME.confirmPassword,
							placeholder: '',
							type: 'password',
							onInputChange: (params: IInputChangeParams) => {
								const data = {
									...params,
									...(params.info.event === 'blur' && {
										data: {
											...params.data,
											error: fieldsValidator({
												valueToValidate: params.data.value,
												fieldName: E_FORM_FIELDS_NAME.confirmPassword,
												valueToCompare: this.props?.registrationForm?.fields?.password ?? '',
											}),
										},
									}),
								};
								FocusManager.set(getFocusData(params.info));
								Store.set(
									'registrationForm',
									{
										fields: {
											...props?.registrationForm?.fields,
											confirmPassword: data?.data?.value ?? '',
										},
										errors: {
											...props?.registrationForm?.errors,
											confirmPassword: data?.data?.error ?? '',
										},
									},
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.REGISTRATION.C_PSW_INPUT }"></div>`,
					},
				}),

				[IDS.REGISTRATION.SUBMIT]: new ButtonBlock({
					id: IDS.REGISTRATION.SUBMIT,
					type: 'submit',
					text: 'Зарегистрироваться',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						let validationResult = '';
						let pageProps = { registrationForm: { ...this.props.registrationForm } };

						Object.entries(this.children).forEach(([fieldId, fieldInstance]) => {
							if (fieldId.includes('field')) {
								Object.entries(fieldInstance.children).forEach(([inputId, inputInstance]) => {
									if (inputId.includes('input')) {
										const fieldName = inputInstance.props.name as keyof IRegistrationFormUi;
										validationResult = fieldsValidator({
											valueToValidate: inputInstance?.props?.input_data?.value,
											fieldName: inputInstance?.props?.name ?? '',
											...(fieldName === 'confirmPassword' && {
												valueToCompare: this.props?.registrationForm?.fields?.password ?? '',
											}),
										});

										if (validationResult.length) {
											const registrationForm = pageProps?.registrationForm as BlockProps['registrationForm'];
											const registrationErrors = registrationForm?.errors;

											if (registrationErrors) {
												pageProps = {
													registrationForm: {
														...registrationForm,
														errors: {
															...registrationErrors,
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

						const registrationForm: IFormState<IRegistrationFormUi> | undefined = pageProps?.registrationForm as BlockProps['registrationForm'];
						console.log({ pageProps });

						if (
							registrationForm
							&& registrationForm.errors
						) {
							const errorsList = Object.values(registrationForm.errors).filter((el) => Boolean(el));
							console.log({ errorsList });

							if (errorsList.length) {
								const { registrationForm: { errors, fields } } = pageProps;
								Store.set(
									'registrationForm',
									{ fields, errors },
								);
							} else {
								console.log('Registration form submit: ', this.props?.registrationForm?.fields ?? '');
								const data = JSON.stringify(this.props?.registrationForm?.fields);
								AuthController.signup({ data }, this.props.router);
							}
						}
					},
				}),
				[IDS.REGISTRATION.SIGNIN]: new ButtonBlock({
					id: IDS.REGISTRATION.SIGNIN,
					type: 'button',
					text: 'Назад',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						this?.props?.router?.go?.(PAGES_URL.AUTHORIZATION);
					},
				}),
			},
		});
	}

	override render(): string {
		console.log('Render RegistrationBlock', this);
		return compile(template, this.props);
	}
}
