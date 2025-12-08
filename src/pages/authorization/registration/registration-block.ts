import { Block } from '@/block';
import {
	IDS,
	PAGES,
} from '@/constants';
import { compile } from '@/utils';
import type { IInputChangeParams } from '@/types';
import { Button } from '@/components/button/button-block';
import { FieldBlock } from '@/components/form-fields/field-block';
import { InputBlock } from '@/components/input/input-block';
import template from './registration-template.hbs?raw';
import styles from '../styles.module.pcss';

export class RegistrationBlock extends Block {
	constructor(props) {
		super(undefined, {
			...props,
			styles,
			ids: {
				form: IDS.REGISTRATION.FORM,
			},
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
						value: props.form.fields.email,
						error: props.form.errors.email,
						currentFocus: props.currentFocus,
					},
					label: 'Почта',

					children: {
						[IDS.REGISTRATION.EMAIL_INPUT]: new InputBlock({
							id: IDS.REGISTRATION.EMAIL_INPUT,
							input_data: {
								value: props.form.fields.email,
								error: props.form.errors.email,
								currentFocus: props.currentFocus,
							},
							dataset: 'email',
							name: 'email',
							placeholder: 'Почта',
							type: 'text',
							onChange: (params: IInputChangeParams<Block>) => {
								console.log('onChange email: ', { params, currentThis: this });

								this.onFormInputChange(
									params,
									[IDS.REGISTRATION.EMAIL_INPUT, IDS.REGISTRATION.EMAIL_FIELD],
									'email',
								);
							},
							validation: {
								isRequired: true,
								// regex: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
								// message: 'От 3 до 20 символов: -, _, латиница, 0-9 (только цифры запрещено)',
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
						value: props.form.fields.login,
						error: props.form.errors.login,
						currentFocus: props.currentFocus,
					},
					label: 'Логин',

					children: {
						[IDS.REGISTRATION.LOGIN_INPUT]: new InputBlock({
							id: IDS.REGISTRATION.LOGIN_INPUT,
							input_data: {
								value: props.form.fields.login,
								error: props.form.errors.login,
								currentFocus: props.currentFocus,
							},
							dataset: 'login',
							name: 'login',
							placeholder: 'Логин',
							type: 'text',
							onChange: (params: IInputChangeParams<Block>) => {
								console.log('onChange login: ', { params, currentThis: this });

								this.onFormInputChange(
									params,
									[IDS.REGISTRATION.LOGIN_INPUT, IDS.REGISTRATION.LOGIN_FIELD],
									'login',
								);
							},
							validation: {
								// от 3 до 20 символов,
								// латиница,
								// может содержать цифры, но не состоять из них,
								// без пробелов,
								// допустимы спецсимволы дефис и нижнее подчёркивание
								isRequired: true,
								regex: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
								message: 'От 3 до 20 символов: -, _, латиница, 0-9 (только цифры запрещено)',
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
						value: props.form.fields.first_name,
						error: props.form.errors.first_name,
						currentFocus: props.currentFocus,
					},
					label: 'Имя',

					children: {
						[IDS.REGISTRATION.LOGIN_INPUT]: new InputBlock({
							id: IDS.REGISTRATION.F_NAME_INPUT,
							input_data: {
								value: props.form.fields.first_name,
								error: props.form.errors.first_name,
								currentFocus: props.currentFocus,
							},
							dataset: 'first_name',
							name: 'first_name',
							placeholder: 'Имя',
							type: 'text',
							onChange: (params: IInputChangeParams<Block>) => {
								console.log('onChange first_name: ', { params, currentThis: this });

								this.onFormInputChange(
									params,
									[IDS.REGISTRATION.F_NAME_INPUT, IDS.REGISTRATION.F_NAME_FIELD],
									'first_name',
								);
							},
							validation: {
								isRequired: true,
								// regex: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
								// message: 'От 3 до 20 символов: -, _, латиница, 0-9 (только цифры запрещено)',
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
						value: props.form.fields.second_name,
						error: props.form.errors.second_name,
						currentFocus: props.currentFocus,
					},
					label: 'Фамилия',

					children: {
						[IDS.REGISTRATION.S_NAME_INPUT]: new InputBlock({
							id: IDS.REGISTRATION.S_NAME_INPUT,
							input_data: {
								value: props.form.fields.second_name,
								error: props.form.errors.second_name,
								currentFocus: props.currentFocus,
							},
							dataset: 'second_name',
							name: 'second_name',
							placeholder: 'Фамилия',
							type: 'text',
							onChange: (params: IInputChangeParams<Block>) => {
								console.log('onChange second_name: ', { params, currentThis: this });

								this.onFormInputChange(
									params,
									[IDS.REGISTRATION.S_NAME_INPUT, IDS.REGISTRATION.S_NAME_FIELD],
									'second_name',
								);
							},
							validation: {
								isRequired: true,
								// regex: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
								// message: 'От 3 до 20 символов: -, _, латиница, 0-9 (только цифры запрещено)',
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
						value: props.form.fields.phone,
						error: props.form.errors.phone,
						currentFocus: props.currentFocus,
					},
					label: 'Телефон',

					children: {
						[IDS.REGISTRATION.PHONE_INPUT]: new InputBlock({
							id: IDS.REGISTRATION.PHONE_INPUT,
							input_data: {
								value: props.form.fields.phone,
								error: props.form.errors.phone,
								currentFocus: props.currentFocus,
							},
							dataset: 'phone',
							name: 'phone',
							placeholder: 'Телефон',
							type: 'text',
							onChange: (params: IInputChangeParams<Block>) => {
								console.log('onChange phone: ', { params, currentThis: this });

								this.onFormInputChange(
									params,
									[IDS.REGISTRATION.PHONE_INPUT, IDS.REGISTRATION.PHONE_FIELD],
									'phone',
								);
							},
							validation: {
								isRequired: true,
								// regex: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
								// message: 'От 3 до 20 символов: -, _, латиница, 0-9 (только цифры запрещено)',
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
						value: props.form.fields.password,
						error: props.form.errors.password,
						currentFocus: props.currentFocus,
					},
					label: 'Пароль',

					children: {
						[IDS.REGISTRATION.PSW_INPUT]: new InputBlock({
							id: IDS.REGISTRATION.PSW_INPUT,
							input_data: {
								value: props.form.fields.password,
								error: props.form.errors.password,
								currentFocus: props.currentFocus,
							},
							dataset: 'password',
							name: 'password',
							placeholder: 'Пароль',
							type: 'password',
							onChange: (params: IInputChangeParams<Block>) => {
								console.log('onChange password: ', { params, currentThis: this });

								this.onFormInputChange(
									params,
									[IDS.REGISTRATION.PSW_INPUT, IDS.REGISTRATION.PSW_FIELD],
									'password',
								);
							},
							validation: {
								isRequired: true,
								// regex: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
								// message: 'От 3 до 20 символов: -, _, латиница, 0-9 (только цифры запрещено)',
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
						value: props.form.fields.confirmPassword,
						error: props.form.errors.confirmPassword,
						currentFocus: props.currentFocus,
					},
					label: 'Пароль (еще раз)',

					children: {
						[IDS.REGISTRATION.C_PSW_INPUT]: new InputBlock({
							id: IDS.REGISTRATION.C_PSW_INPUT,
							input_data: {
								value: props.form.fields.confirmPassword,
								error: props.form.errors.confirmPassword,
								currentFocus: props.currentFocus,
							},
							dataset: 'confirmPassword',
							name: 'confirmPassword',
							placeholder: 'Пароль (еще раз)',
							type: 'password',
							onChange: (params: IInputChangeParams<Block>) => {
								console.log('onChange confirmPassword: ', { params, currentThis: this });

								this.onFormInputChange(
									params,
									[IDS.REGISTRATION.C_PSW_INPUT, IDS.REGISTRATION.C_PSW_FIELD],
									'confirmPassword',
								);
							},
							validation: {
								isRequired: true,
								// regex: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
								// message: 'От 3 до 20 символов: -, _, латиница, 0-9 (только цифры запрещено)',
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${IDS.REGISTRATION.C_PSW_INPUT}"></div>`,
					},
				}),
				[IDS.REGISTRATION.SUBMIT]: new Button({
					id: IDS.REGISTRATION.SUBMIT,
					type: 'submit',
					dataset: PAGES.REGISTRATION,
					text: 'Войти',
					onClick: (event: Event) => {
						console.log('click submit: ', this);

						event.preventDefault();
						event.stopPropagation();

						console.log('Registration data: ', this.props.form.fields);
					},
				}),
				[IDS.REGISTRATION.SIGNIN]: new Button({
					id: IDS.REGISTRATION.SIGNIN,
					type: 'button',
					dataset: PAGES.REGISTRATION,
					text: 'Назад',
					onClick: (event: Event) => {
						console.log('click signin: ', this);

						event.preventDefault();
						event.stopPropagation();

						this.eventBus().emit(Block.EVENTS.FLOW_CWU, PAGES.AUTHORIZATION);
					},
				}),
			},
		});
	}

	override render(): string {
		console.log('RegistrationBlock props: ', this);

		return compile(template, this.props);
	}
}
