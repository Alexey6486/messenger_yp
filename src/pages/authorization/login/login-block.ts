import { Block } from '@/block';
import {
	IDS,
	PAGES,
} from '@/constants';
import { compile } from '@/utils';
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
				[IDS.AUTHORIZATION.LOGIN]: `<div id="${ IDS.AUTHORIZATION.LOGIN }"></div>`,
				[IDS.AUTHORIZATION.PASSWORD]: `<div id="${ IDS.AUTHORIZATION.PASSWORD }"></div>`,
				[IDS.AUTHORIZATION.SUBMIT]: `<div id="${ IDS.AUTHORIZATION.SUBMIT }"></div>`,
				[IDS.AUTHORIZATION.SIGNUP]: `<div id="${ IDS.AUTHORIZATION.SIGNUP }"></div>`,
			},
			children: {
				[IDS.AUTHORIZATION.LOGIN]: new Field({
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
							this.setProps({ fields: { login: event.target.value } });
						}
					},
				}),
				[IDS.AUTHORIZATION.PASSWORD]: new Field({
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
				[IDS.AUTHORIZATION.SUBMIT]: new Button({
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
				[IDS.AUTHORIZATION.SIGNUP]: new Button({
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
			},
		});

	}

	override render(): string {
		console.log('LoginBlock props: ', this.props, this);

		return compile(template, this.props);
	}
}
