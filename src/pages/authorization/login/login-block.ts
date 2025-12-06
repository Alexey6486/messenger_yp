import { Block } from '@/block';
import { IDS } from '@/constants';
import { compile } from '@/utils';
import type { IInputData } from '@/types';
import { FieldBlock } from '@/components/form-fields/field-block';
import { InputBlock } from '@/components/input/input-block';
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
				[IDS.AUTHORIZATION.LOGIN]: `<div id="${ IDS.AUTHORIZATION.LOGIN }"></div>`,
				[IDS.AUTHORIZATION.PASSWORD]: `<div id="${ IDS.AUTHORIZATION.PASSWORD }"></div>`,
				// [IDS.AUTHORIZATION.SUBMIT]: `<div id="${ IDS.AUTHORIZATION.SUBMIT }"></div>`,
				// [IDS.AUTHORIZATION.SIGNUP]: `<div id="${ IDS.AUTHORIZATION.SIGNUP }"></div>`,
			},
			children: {
				[IDS.AUTHORIZATION.LOGIN]: new FieldBlock({
					id: IDS.AUTHORIZATION.LOGIN,
					id_label: IDS.AUTHORIZATION.LOGIN_INPUT,
					value: props.fields.login,
					error: props.errors.login,
					label: 'Логин',

					children: {
						[IDS.AUTHORIZATION.LOGIN_INPUT]: new InputBlock({
							id: IDS.AUTHORIZATION.LOGIN_INPUT,
							value: props.fields.login,
							error: props.errors.login,
							dataset: 'login',
							name: 'login',
							placeholder: 'Логин',
							type: 'text',
							onInput: (data: IInputData) => {
								console.log('onInput login: ', { data, currentThis: this });

								this.changePropsDrill(
									[IDS.AUTHORIZATION.LOGIN_INPUT, IDS.AUTHORIZATION.LOGIN],
									data,
									'login',
								);
							},
							onBlur: (data: IInputData) => {
								console.log('onBlur login: ', { data, currentThis: this });

								this.changePropsDrill(
									[IDS.AUTHORIZATION.LOGIN_INPUT, IDS.AUTHORIZATION.LOGIN],
									data,
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
								// regex: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
								// message: 'От 3 до 20 символов: -, _, латиница, 0-9 (только цифры запрещено)',
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.AUTHORIZATION.LOGIN_INPUT }"></div>`,
					},
				}),
				[IDS.AUTHORIZATION.PASSWORD]: new FieldBlock({
					id: IDS.AUTHORIZATION.PASSWORD,
					id_label: IDS.AUTHORIZATION.PSW_INPUT,
					value: props.fields.password,
					error: props.errors.password,
					label: 'Пароль',

					children: {
						[IDS.AUTHORIZATION.PSW_INPUT]: new InputBlock({
							id: IDS.AUTHORIZATION.PSW_INPUT,
							value: props.fields.password,
							error: props.errors.password,
							dataset: 'password',
							name: 'password',
							placeholder: 'Пароль',
							type: 'password',
							onInput: (data: IInputData) => {
								console.log('onInput password: ', { data, currentThis: this });

								this.changePropsDrill(
									[IDS.AUTHORIZATION.PSW_INPUT, IDS.AUTHORIZATION.PASSWORD],
									data,
									'password',
								);
							},
							onBlur: (data: IInputData) => {
								console.log('onBlur password: ', { data, currentThis: this });

								this.changePropsDrill(
									[IDS.AUTHORIZATION.PSW_INPUT, IDS.AUTHORIZATION.PASSWORD],
									data,
									'password',
								);
							},
							validation: {
								// от 3 до 20 символов,
								// латиница,
								// может содержать цифры, но не состоять из них,
								// без пробелов,
								// допустимы спецсимволы дефис и нижнее подчёркивание
								isRequired: true,
								// regex: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
								// message: 'От 3 до 20 символов: -, _, латиница, 0-9 (только цифры запрещено)',
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.AUTHORIZATION.PSW_INPUT }"></div>`,
					},
				}),
				// [IDS.AUTHORIZATION.SUBMIT]: new Button({
				// 	id: IDS.AUTHORIZATION.SUBMIT,
				// 	type: 'submit',
				// 	dataset: PAGES.AUTHORIZATION,
				// 	text: 'Войти',
				// 	onClick: (event: Event) => {
				// 		console.log('click submit: ', this);
				//
				// 		event.preventDefault();
				// 		event.stopPropagation();
				// 	},
				// }),
				// [IDS.AUTHORIZATION.SIGNUP]: new Button({
				// 	id: IDS.AUTHORIZATION.SIGNUP,
				// 	type: 'button',
				// 	dataset: PAGES.AUTHORIZATION,
				// 	text: 'Зарегистрироваться',
				// 	onClick: (event: Event) => {
				// 		console.log('click signup');
				//
				// 		event.preventDefault();
				// 		event.stopPropagation();
				// 	},
				// }),
			},
		});
	}

	override render(): string {
		console.log('LoginBlock props: ', this);

		return compile(template, this.props);
	}
}
