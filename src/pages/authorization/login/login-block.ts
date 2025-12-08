import { Block } from '@/block';
import {
	IDS,
	PAGES,
} from '@/constants';
import { compile } from '@/utils';
import type { IInputChangeParams } from '@/types';
import { FieldBlock } from '@/components/form-fields/field-block';
import { InputBlock } from '@/components/input/input-block';
import { Button } from '@/components/button/button-block';
import template from './login-template.hbs?raw';
import styles from '../styles.module.pcss';

export class LoginBlock extends Block {
	constructor(props) {
		super(undefined, {
			...props,
			styles,
			ids: {
				form: IDS.AUTHORIZATION.FORM,
			},
			markup: {
				[IDS.AUTHORIZATION.LOGIN_FIELD]: `<div id="${IDS.AUTHORIZATION.LOGIN_FIELD}"></div>`,
				[IDS.AUTHORIZATION.PSW_FIELD]: `<div id="${IDS.AUTHORIZATION.PSW_FIELD}"></div>`,
				[IDS.AUTHORIZATION.SUBMIT]: `<div id="${IDS.AUTHORIZATION.SUBMIT}"></div>`,
				[IDS.AUTHORIZATION.SIGNUP]: `<div id="${IDS.AUTHORIZATION.SIGNUP}"></div>`,
			},
			children: {
				[IDS.AUTHORIZATION.LOGIN_FIELD]: new FieldBlock({
					id: IDS.AUTHORIZATION.LOGIN_FIELD,
					id_label: IDS.AUTHORIZATION.LOGIN_INPUT,
					input_data: {
						value: props.form.fields.login,
						error: props.form.errors.login,
						currentFocus: props.currentFocus,
					},
					label: 'Логин',

					children: {
						[IDS.AUTHORIZATION.LOGIN_INPUT]: new InputBlock({
							id: IDS.AUTHORIZATION.LOGIN_INPUT,
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
									[IDS.AUTHORIZATION.LOGIN_INPUT, IDS.AUTHORIZATION.LOGIN_FIELD],
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
								// message: 'От 3 до 20 символов: -, _, латиница, 0-9 (только цифры запрещено)',
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${IDS.AUTHORIZATION.LOGIN_INPUT}"></div>`,
					},
				}),
				[IDS.AUTHORIZATION.PSW_FIELD]: new FieldBlock({
					id: IDS.AUTHORIZATION.PSW_FIELD,
					id_label: IDS.AUTHORIZATION.PSW_INPUT,
					value: props.form.fields.password,
					error: props.form.errors.password,
					label: 'Пароль',

					children: {
						[IDS.AUTHORIZATION.PSW_INPUT]: new InputBlock({
							id: IDS.AUTHORIZATION.PSW_INPUT,
							value: props.form.fields.password,
							error: props.form.errors.password,
							dataset: 'password',
							name: 'password',
							placeholder: 'Пароль',
							type: 'password',
							onChange: (params: IInputChangeParams<Block>) => {
								console.log('onChange password: ', { params, currentThis: this });

								this.onFormInputChange(
									params,
									[IDS.AUTHORIZATION.PSW_INPUT, IDS.AUTHORIZATION.PSW_FIELD],
									'password',
								);
							},
							validation: {
								isRequired: true,
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${IDS.AUTHORIZATION.PSW_INPUT}"></div>`,
					},
				}),
				[IDS.AUTHORIZATION.SUBMIT]: new Button({
					id: IDS.AUTHORIZATION.SUBMIT,
					type: 'submit',
					dataset: PAGES.AUTHORIZATION,
					text: 'Войти',
					onClick: (event: Event) => {
						console.log('click submit: ', this);

						event.preventDefault();
						event.stopPropagation();

						console.log('Login data: ', this.props.form.fields);
					},
				}),
				[IDS.AUTHORIZATION.SIGNUP]: new Button({
					id: IDS.AUTHORIZATION.SIGNUP,
					type: 'button',
					dataset: PAGES.AUTHORIZATION,
					text: 'Зарегистрироваться',
					onClick: (event: Event) => {
						console.log('click signup: ', this);

						event.preventDefault();
						event.stopPropagation();

						this.props.changePage(PAGES.REGISTRATION);
					},
				}),
			},
		});
	}

	override render(): string {
		console.log('LoginBlock props: ', this);

		return compile(template, this.props);
	}
}
