import { Block } from '@/block';
import { compile } from '@/utils';
import {
	IDS,
	PAGES,
} from '@/constants';
import { Field } from '@/components/field/field-block';
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
				[IDS.AUTHORIZATION.LOGIN]: `<div id="${IDS.AUTHORIZATION.LOGIN}"></div>`,
			},
			children: {
				[IDS.AUTHORIZATION.LOGIN]: {
					instance: new Field({
						id: IDS.AUTHORIZATION.LOGIN,
						placeholder: 'Логин',
						type: 'text',
						label: 'Логин',
						error: props.errors.login,
						value: props.fields.login,
						dataset: 'login',
						name: 'login',
						onInput: (event: Event, sourceThis) => {
							console.log('input login: ', { t: this, event, sourceThis });
							event.preventDefault();
							event.stopPropagation();
							if (event.target && event.target instanceof HTMLInputElement) {
								// sourceThis.setProps({
								// 	value: event.target.value,
								// });
								this.setProps({ fields: { login: event.target.value } });
							}
						},
					}),
					markup: `<div id="${IDS.AUTHORIZATION.LOGIN}"></div>`,
				},
				password: {
					instance: new Field({
						id: IDS.AUTHORIZATION.PASSWORD,
						placeholder: 'Пароль',
						type: 'password',
						label: 'Пароль',
						error: props.errors.password,
						value: props.fields.password,
						dataset: 'password',
						name: 'password',
						onInput: (event: Event) => {
							console.log('input password: ', { t: this, event });
							event.preventDefault();
							event.stopImmediatePropagation();
							if (event.target && event.target instanceof HTMLInputElement) {
								this.setProps({ fields: { password: event.target.value } });
							}
						},
					}),
					markup: `<div id="${IDS.AUTHORIZATION.PASSWORD}"></div>`,
				},
				submit: {
					instance: new Button({
						id: IDS.AUTHORIZATION.SUBMIT,
						type: 'submit',
						dataset: PAGES.AUTHORIZATION,
						text: 'Войти',
						onClick: (event: Event) => {
							console.log('click submit: ', this);
							event.preventDefault();
							event.stopPropagation();
						},
					}),
					markup: `<div id="${IDS.AUTHORIZATION.SUBMIT}"></div>`,
				},
				signup: {
					instance: new Button({
						id: IDS.AUTHORIZATION.SIGNUP,
						type: 'button',
						dataset: PAGES.AUTHORIZATION,
						text: 'Зарегистрироваться',
						onClick: (event: Event) => {
							console.log('click signup');
							event.preventDefault();
							event.stopPropagation();
						},
					}),
					markup: `<div id="${IDS.AUTHORIZATION.SIGNUP}"></div>`,
				},
			},
		});

	}

	override render(): string {
		console.log('LoginBlock props: ', this.props, this);
		return compile(template, this.props);
	}
}
