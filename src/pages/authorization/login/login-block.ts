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
			children: {
				login: {
					instance: new Field({
						id: IDS.AUTHORIZATION.LOGIN,
						placeholder: 'Логин',
						type: 'text',
						label: 'Логин',
						error: props.errors.login,
						value: props.fields.login,
						dataset: 'login',
						name: 'login',
						onClick: (event: Event) => {
							console.log('CLICK login');
							event.preventDefault();
							event.stopPropagation();
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
						onClick: (event: Event) => {
							console.log('CLICK password');
							event.preventDefault();
							event.stopPropagation();
						},
					}),
					markup: `<div id="${IDS.AUTHORIZATION.PASSWORD}"></div>`,
				},
				submit: {
					instance: new Button({
						id: IDS.AUTHORIZATION.SUBMIT,
						type: 'submit',
						class: styles,
						dataset: PAGES.AUTHORIZATION,
						text: 'Войти',
						onClick: (event: Event) => {
							console.log('CLICK submit');
							event.preventDefault();
							event.stopPropagation();
						},
					}),
					markup: `<div id="${IDS.AUTHORIZATION.SUBMIT}"></div>`,
				},
			},
		});
	}

	override render(): string {
		console.log('LoginBlock props: ', this.props);
		return compile(template, this.props);
	}
}
