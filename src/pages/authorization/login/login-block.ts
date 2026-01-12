import { Block } from '@/block';
import { AuthController } from '@/controllers';
import { Store } from '@/store';
import {
	FocusManager,
	getFocusData,
} from '@/focus-manager';
import {
	IDS,
	INIT_LOGIN_STATE,
	PAGES_URL,
} from '@/constants';
import {
	cloneDeep,
	compile,
	fieldsValidator,
	getInputStateSlice,
} from '@/utils';
import type {
	BlockProps,
	IFormState,
	IInputChangeParams,
	ILoginForm,
	TNullable,
} from '@/types';
import { E_FORM_FIELDS_NAME } from '@/types';
import { ButtonBlock } from '@/components/button/button-block';
import { FieldBlock } from '@/components/form-fields/field-block';
import { InputBlock } from '@/components/input/input-block';
import template from './login-template.hbs?raw';
import styles from '../styles.module.pcss';

export class LoginBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			styles,
			markup: {
				[IDS.AUTHORIZATION.LOGIN_FIELD]: `<div id="${ IDS.AUTHORIZATION.LOGIN_FIELD }"></div>`,
				[IDS.AUTHORIZATION.PSW_FIELD]: `<div id="${ IDS.AUTHORIZATION.PSW_FIELD }"></div>`,
				[IDS.AUTHORIZATION.SUBMIT]: `<div id="${ IDS.AUTHORIZATION.SUBMIT }"></div>`,
				[IDS.AUTHORIZATION.SIGNUP]: `<div id="${ IDS.AUTHORIZATION.SIGNUP }"></div>`,
				['logout']: `<div id="logout"></div>`,
			},
			children: {
				[IDS.AUTHORIZATION.LOGIN_FIELD]: new FieldBlock({
					id: IDS.AUTHORIZATION.LOGIN_FIELD,
					id_label: IDS.AUTHORIZATION.LOGIN_INPUT,
					input_data: {
						value: props?.authorizationForm?.fields?.login ?? '',
						error: props?.authorizationForm?.errors?.login ?? '',
					},
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return getInputStateSlice(data?.authorizationForm, 'login');
					},
					label: 'Логин',
					isRequired: true,
					children: {
						[IDS.AUTHORIZATION.LOGIN_INPUT]: new InputBlock({
							id: IDS.AUTHORIZATION.LOGIN_INPUT,
							input_data: {
								value: props?.authorizationForm?.fields?.login ?? '',
								error: props?.authorizationForm?.errors?.login ?? '',
							},
							mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
								return getInputStateSlice(data?.authorizationForm, 'login');
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
									'authorizationForm',
									{
										fields: {
											...props?.authorizationForm?.fields,
											login: data?.data?.value ?? '',
										},
										errors: {
											...props?.authorizationForm?.errors,
											login: data?.data?.error ?? '',
										},
									},
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.AUTHORIZATION.LOGIN_INPUT }"></div>`,
					},
				}),
				[IDS.AUTHORIZATION.PSW_FIELD]: new FieldBlock({
					id: IDS.AUTHORIZATION.PSW_FIELD,
					id_label: IDS.AUTHORIZATION.PSW_INPUT,
					input_data: {
						value: props?.authorizationForm?.fields?.password ?? '',
						error: props?.authorizationForm?.errors?.password ?? '',
					},
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return getInputStateSlice(data?.authorizationForm, 'password');
					},
					label: 'Пароль',
					isRequired: true,
					children: {
						[IDS.AUTHORIZATION.PSW_INPUT]: new InputBlock({
							id: IDS.AUTHORIZATION.PSW_INPUT,
							input_data: {
								value: props?.authorizationForm?.fields?.password ?? '',
								error: props?.authorizationForm?.errors?.password ?? '',
							},
							mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
								return getInputStateSlice(data?.authorizationForm, 'password');
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
									'authorizationForm',
									{
										fields: {
											...props?.authorizationForm?.fields,
											password: data?.data?.value ?? '',
										},
										errors: {
											...props?.authorizationForm?.errors,
											password: data?.data?.error ?? '',
										},
									},
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.AUTHORIZATION.PSW_INPUT }"></div>`,
					},
				}),

				[IDS.AUTHORIZATION.SUBMIT]: new ButtonBlock({
					id: IDS.AUTHORIZATION.SUBMIT,
					type: 'submit',
					text: 'Войти',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						let validationResult = '';
						let pageProps = { authorizationForm: { ...this.props.authorizationForm } };

						Object.entries(this.children).forEach(([fieldId, fieldInstance]) => {
							if (fieldId.includes('field')) {
								Object.entries(fieldInstance.children).forEach(([inputId, inputInstance]) => {
									if (inputId.includes('input')) {
										const fieldName = inputInstance.props.name as keyof ILoginForm;
										validationResult = fieldsValidator({
											valueToValidate: inputInstance?.props?.input_data?.value,
											fieldName: fieldName ?? '',
										});

										if (validationResult.length) {
											const authorizationForm = pageProps?.authorizationForm as BlockProps['authorizationForm'];
											const authorizationErrors = authorizationForm?.errors;

											if (authorizationErrors) {
												pageProps = {
													authorizationForm: {
														...authorizationForm,
														errors: {
															...authorizationErrors,
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

						const authorizationForm: TNullable<IFormState<ILoginForm>> | undefined = pageProps?.authorizationForm as BlockProps['authorizationForm'];
						if (authorizationForm && authorizationForm.errors) {
							const errorsList = Object.values(authorizationForm.errors).filter((el) => Boolean(el));

							if (errorsList.length) {
								const { authorizationForm: { errors, fields } } = pageProps;
								Store.set(
									'authorizationForm',
									{ fields, errors },
								);
							} else {
								const data = JSON.stringify(this.props?.authorizationForm?.fields);
								AuthController.signin({ data }, this.props.router, this);
							}
						}
					},
				}),
				[IDS.AUTHORIZATION.SIGNUP]: new ButtonBlock({
					id: IDS.AUTHORIZATION.SIGNUP,
					type: 'button',
					text: 'Зарегистрироваться',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						Store.clearAllSubs();
						Store.set('authorizationForm', cloneDeep(INIT_LOGIN_STATE), undefined, true);
						this?.props?.router?.go?.(PAGES_URL.REGISTRATION);
					},
				}),
				['logout']: new ButtonBlock({
					id: 'logout',
					type: 'button',
					text: 'temp_logout',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						AuthController.logout(undefined, this);
					},
				}),
			},
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
