import { Block } from '@/block';
import {
	IDS,
	PAGES,
} from '@/constants';
import {
	compile,
	fieldsValidator,
} from '@/utils';
import type {
	BlockProps,
	IInputChangeParams,
	IFormState,
	IRegistrationFormUi,
	TPages,
} from '@/types';
import {
	E_FORM_FIELDS_NAME,
} from '@/types';
import { ButtonBlock } from '@/components/button/button-block';
import { FieldBlock } from '@/components/form-fields/field-block';
import { InputBlock } from '@/components/input/input-block';
import template from './registration-template.hbs?raw';
import styles from '../styles.module.pcss';

interface IRegistrationBlock extends BlockProps {
	registrationForm: IFormState<IRegistrationFormUi>;
	changePage: (page: TPages) => void;
	children: Record<string, FieldBlock | ButtonBlock>;
}

export class RegistrationBlock extends Block {
	constructor(props: IRegistrationBlock) {
		super({
			...props,
			styles,
			markup: {
				[IDS.REGISTRATION.EMAIL_FIELD]: `<div id="${IDS.REGISTRATION.EMAIL_FIELD}"></div>`,
				[IDS.REGISTRATION.LOGIN_FIELD]: `<div id="${IDS.REGISTRATION.LOGIN_FIELD}"></div>`,
				[IDS.REGISTRATION.F_NAME_FIELD]: `<div id="${IDS.REGISTRATION.F_NAME_FIELD}"></div>`,
				[IDS.REGISTRATION.S_NAME_FIELD]: `<div id="${IDS.REGISTRATION.S_NAME_FIELD}"></div>`,
				[IDS.REGISTRATION.PHONE_FIELD]: `<div id="${IDS.REGISTRATION.PHONE_FIELD}"></div>`,
				[IDS.REGISTRATION.PSW_FIELD]: `<div id="${IDS.REGISTRATION.PSW_FIELD}"></div>`,
				[IDS.REGISTRATION.C_PSW_FIELD]: `<div id="${IDS.REGISTRATION.C_PSW_FIELD}"></div>`,
				[IDS.REGISTRATION.SUBMIT]: `<div id="${IDS.REGISTRATION.SUBMIT}"></div>`,
				[IDS.REGISTRATION.SIGNIN]: `<div id="${IDS.REGISTRATION.SIGNIN}"></div>`,
			},
			children: {
				[IDS.REGISTRATION.EMAIL_FIELD]: new FieldBlock({
					id: IDS.REGISTRATION.EMAIL_FIELD,
					id_label: IDS.REGISTRATION.EMAIL_INPUT,
					input_data: {
						value: props[IDS.FORMS.REGISTRATION_FORM].fields.email,
						error: props[IDS.FORMS.REGISTRATION_FORM].errors.email,
						currentFocus: props.currentFocus,
					},
					label: 'Почта',
					isRequired: true,
					children: {
						[IDS.REGISTRATION.EMAIL_INPUT]: new InputBlock({
							id: IDS.REGISTRATION.EMAIL_INPUT,
							input_data: {
								value: props[IDS.FORMS.REGISTRATION_FORM].fields.email,
								error: props[IDS.FORMS.REGISTRATION_FORM].errors.email,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.email,
							name: E_FORM_FIELDS_NAME.email,
							placeholder: '',
							type: 'text',
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
									[IDS.REGISTRATION.EMAIL_INPUT, IDS.REGISTRATION.EMAIL_FIELD],
									E_FORM_FIELDS_NAME.email,
									IDS.FORMS.REGISTRATION_FORM,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${IDS.REGISTRATION.EMAIL_INPUT}"></div>`,
					},
				}),
				[IDS.REGISTRATION.LOGIN_FIELD]: new FieldBlock({
					id: IDS.REGISTRATION.LOGIN_FIELD,
					id_label: IDS.REGISTRATION.LOGIN_INPUT,
					input_data: {
						value: props[IDS.FORMS.REGISTRATION_FORM].fields.login,
						error: props[IDS.FORMS.REGISTRATION_FORM].errors.login,
						currentFocus: props.currentFocus,
					},
					label: 'Логин',
					isRequired: true,
					children: {
						[IDS.REGISTRATION.LOGIN_INPUT]: new InputBlock({
							id: IDS.REGISTRATION.LOGIN_INPUT,
							input_data: {
								value: props[IDS.FORMS.REGISTRATION_FORM].fields.login,
								error: props[IDS.FORMS.REGISTRATION_FORM].errors.login,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.login,
							name: E_FORM_FIELDS_NAME.login,
							placeholder: '',
							type: 'text',
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
									[IDS.REGISTRATION.LOGIN_INPUT, IDS.REGISTRATION.LOGIN_FIELD],
									E_FORM_FIELDS_NAME.login,
									IDS.FORMS.REGISTRATION_FORM,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${IDS.REGISTRATION.LOGIN_INPUT}"></div>`,
					},
				}),
				[IDS.REGISTRATION.F_NAME_FIELD]: new FieldBlock({
					id: IDS.REGISTRATION.F_NAME_FIELD,
					id_label: IDS.REGISTRATION.F_NAME_INPUT,
					input_data: {
						value: props[IDS.FORMS.REGISTRATION_FORM].fields.first_name,
						error: props[IDS.FORMS.REGISTRATION_FORM].errors.first_name,
						currentFocus: props.currentFocus,
					},
					label: 'Имя',
					isRequired: true,
					children: {
						[IDS.REGISTRATION.LOGIN_INPUT]: new InputBlock({
							id: IDS.REGISTRATION.F_NAME_INPUT,
							input_data: {
								value: props[IDS.FORMS.REGISTRATION_FORM].fields.first_name,
								error: props[IDS.FORMS.REGISTRATION_FORM].errors.first_name,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.first_name,
							name: E_FORM_FIELDS_NAME.first_name,
							placeholder: '',
							type: 'text',
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
									[IDS.REGISTRATION.F_NAME_INPUT, IDS.REGISTRATION.F_NAME_FIELD],
									E_FORM_FIELDS_NAME.first_name,
									IDS.FORMS.REGISTRATION_FORM,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${IDS.REGISTRATION.F_NAME_INPUT}"></div>`,
					},
				}),
				[IDS.REGISTRATION.S_NAME_FIELD]: new FieldBlock({
					id: IDS.REGISTRATION.S_NAME_FIELD,
					id_label: IDS.REGISTRATION.S_NAME_INPUT,
					input_data: {
						value: props[IDS.FORMS.REGISTRATION_FORM].fields.second_name,
						error: props[IDS.FORMS.REGISTRATION_FORM].errors.second_name,
						currentFocus: props.currentFocus,
					},
					label: 'Фамилия',
					isRequired: true,
					children: {
						[IDS.REGISTRATION.S_NAME_INPUT]: new InputBlock({
							id: IDS.REGISTRATION.S_NAME_INPUT,
							input_data: {
								value: props[IDS.FORMS.REGISTRATION_FORM].fields.second_name,
								error: props[IDS.FORMS.REGISTRATION_FORM].errors.second_name,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.second_name,
							name: E_FORM_FIELDS_NAME.second_name,
							placeholder: '',
							type: 'text',
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
									[IDS.REGISTRATION.S_NAME_INPUT, IDS.REGISTRATION.S_NAME_FIELD],
									E_FORM_FIELDS_NAME.second_name,
									IDS.FORMS.REGISTRATION_FORM,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${IDS.REGISTRATION.S_NAME_INPUT}"></div>`,
					},
				}),
				[IDS.REGISTRATION.PHONE_FIELD]: new FieldBlock({
					id: IDS.REGISTRATION.PHONE_FIELD,
					id_label: IDS.REGISTRATION.PHONE_INPUT,
					input_data: {
						value: props[IDS.FORMS.REGISTRATION_FORM].fields.phone,
						error: props[IDS.FORMS.REGISTRATION_FORM].errors.phone,
						currentFocus: props.currentFocus,
					},
					label: 'Телефон',
					isRequired: true,
					children: {
						[IDS.REGISTRATION.PHONE_INPUT]: new InputBlock({
							id: IDS.REGISTRATION.PHONE_INPUT,
							input_data: {
								value: props[IDS.FORMS.REGISTRATION_FORM].fields.phone,
								error: props[IDS.FORMS.REGISTRATION_FORM].errors.phone,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.phone,
							name: E_FORM_FIELDS_NAME.phone,
							placeholder: '',
							type: 'text',
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
									[IDS.REGISTRATION.PHONE_INPUT, IDS.REGISTRATION.PHONE_FIELD],
									E_FORM_FIELDS_NAME.phone,
									IDS.FORMS.REGISTRATION_FORM,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${IDS.REGISTRATION.PHONE_INPUT}"></div>`,
					},
				}),
				[IDS.REGISTRATION.PSW_FIELD]: new FieldBlock({
					id: IDS.REGISTRATION.PSW_FIELD,
					id_label: IDS.REGISTRATION.PSW_INPUT,
					input_data: {
						value: props[IDS.FORMS.REGISTRATION_FORM].fields.password,
						error: props[IDS.FORMS.REGISTRATION_FORM].errors.password,
						currentFocus: props.currentFocus,
					},
					label: 'Пароль',
					isRequired: true,
					children: {
						[IDS.REGISTRATION.PSW_INPUT]: new InputBlock({
							id: IDS.REGISTRATION.PSW_INPUT,
							input_data: {
								value: props[IDS.FORMS.REGISTRATION_FORM].fields.password,
								error: props[IDS.FORMS.REGISTRATION_FORM].errors.password,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.password,
							name: E_FORM_FIELDS_NAME.password,
							placeholder: '',
							type: 'password',
							onChange: (params: IInputChangeParams<Block>) => {
								this.onFormInputChange(
									{
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
									},
									[IDS.REGISTRATION.PSW_INPUT, IDS.REGISTRATION.PSW_FIELD],
									E_FORM_FIELDS_NAME.password,
									IDS.FORMS.REGISTRATION_FORM,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${IDS.REGISTRATION.PSW_INPUT}"></div>`,
					},
				}),
				[IDS.REGISTRATION.C_PSW_FIELD]: new FieldBlock({
					id: IDS.REGISTRATION.C_PSW_FIELD,
					id_label: IDS.REGISTRATION.C_PSW_INPUT,
					input_data: {
						value: props[IDS.FORMS.REGISTRATION_FORM].fields.confirmPassword,
						error: props[IDS.FORMS.REGISTRATION_FORM].errors.confirmPassword,
						currentFocus: props.currentFocus,
					},
					label: 'Пароль (еще раз)',
					isRequired: true,
					children: {
						[IDS.REGISTRATION.C_PSW_INPUT]: new InputBlock({
							id: IDS.REGISTRATION.C_PSW_INPUT,
							input_data: {
								value: props[IDS.FORMS.REGISTRATION_FORM].fields.confirmPassword,
								error: props[IDS.FORMS.REGISTRATION_FORM].errors.confirmPassword,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.confirmPassword,
							name: E_FORM_FIELDS_NAME.confirmPassword,
							placeholder: '',
							type: 'password',
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
													valueToCompare: this.props[IDS.FORMS.REGISTRATION_FORM].fields.password,
												}),
											},
										}),
									},
									[IDS.REGISTRATION.C_PSW_INPUT, IDS.REGISTRATION.C_PSW_FIELD],
									E_FORM_FIELDS_NAME.confirmPassword,
									IDS.FORMS.REGISTRATION_FORM,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${IDS.REGISTRATION.C_PSW_INPUT}"></div>`,
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
						let pageProps = { [IDS.FORMS.REGISTRATION_FORM]: { ...this.props[IDS.FORMS.REGISTRATION_FORM] } };

						Object.entries(this.children).forEach(([fieldId, fieldInstance]) => {
							if (fieldId.includes('field')) {
								Object.entries(fieldInstance.children).forEach(([inputId, inputInstance]) => {
									if (inputId.includes('input') && !inputInstance.props.input_data.error.length) {
										validationResult = fieldsValidator({
											valueToValidate: inputInstance.props.input_data.value,
											fieldName: inputInstance.props.name,
											...(inputInstance.props.name === E_FORM_FIELDS_NAME.confirmPassword && {
												valueToCompare: this.props[IDS.FORMS.REGISTRATION_FORM].fields.password,
											}),
										});

										if (validationResult.length) {
											const data = {
												input_data: {
													value: inputInstance.props.input_data.value,
													error: validationResult,
													currentFocus: { element: null, selectionStart: null },
												},
											};
											inputInstance.setProps(data);
											fieldInstance.setProps(data);

											pageProps = {
												[IDS.FORMS.REGISTRATION_FORM]: {
													...pageProps[IDS.FORMS.REGISTRATION_FORM],
													errors: {
														...pageProps[IDS.FORMS.REGISTRATION_FORM].errors,
														[inputInstance.props.name]: validationResult,
													},
												},
											};
										}
									}
								});
							}
						});

						console.log('Registration data submit: ', this.props[IDS.FORMS.REGISTRATION_FORM].fields);

						if (validationResult.length) {
							this.setProps(pageProps);
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

						this.eventBus().emit(Block.EVENTS.FLOW_CWU, { page: PAGES.AUTHORIZATION });
					},
				}),
			},
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
