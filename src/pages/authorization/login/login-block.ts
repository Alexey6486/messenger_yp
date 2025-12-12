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
	IAddUserModalForm,
} from '@/types';
import {
	E_FORM_FIELDS_NAME,
} from '@/types';
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
				[IDS.AUTHORIZATION.LOGIN_FIELD]: `<div id="${IDS.AUTHORIZATION.LOGIN_FIELD}"></div>`,
				[IDS.AUTHORIZATION.PSW_FIELD]: `<div id="${IDS.AUTHORIZATION.PSW_FIELD}"></div>`,
				[IDS.AUTHORIZATION.SUBMIT]: `<div id="${IDS.AUTHORIZATION.SUBMIT}"></div>`,
				[IDS.AUTHORIZATION.SIGNUP]: `<div id="${IDS.AUTHORIZATION.SIGNUP}"></div>`,

				// Временные кнопки для перехода на другие страницы
				[IDS.AUTHORIZATION.TEMP_ERROR]: `<div id="${IDS.AUTHORIZATION.TEMP_ERROR}"></div>`,
				[IDS.AUTHORIZATION.TEMP_PROFILE]: `<div id="${IDS.AUTHORIZATION.TEMP_PROFILE}"></div>`,
				[IDS.AUTHORIZATION.TEMP_MAIN]: `<div id="${IDS.AUTHORIZATION.TEMP_MAIN}"></div>`,
				[IDS.AUTHORIZATION.TEMP_MODAL]: `<div id="${IDS.AUTHORIZATION.TEMP_MODAL}"></div>`,
			},
			children: {
				[IDS.AUTHORIZATION.LOGIN_FIELD]: new FieldBlock({
					id: IDS.AUTHORIZATION.LOGIN_FIELD,
					id_label: IDS.AUTHORIZATION.LOGIN_INPUT,
					input_data: {
						value: props[IDS.FORMS.AUTHORIZATION_FORM].fields.login,
						error: props[IDS.FORMS.AUTHORIZATION_FORM].errors.login,
						currentFocus: props.currentFocus,
					},
					label: 'Логин',
					isRequired: true,
					children: {
						[IDS.AUTHORIZATION.LOGIN_INPUT]: new InputBlock({
							id: IDS.AUTHORIZATION.LOGIN_INPUT,
							input_data: {
								value: props[IDS.FORMS.AUTHORIZATION_FORM].fields.login,
								error: props[IDS.FORMS.AUTHORIZATION_FORM].errors.login,
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
													requiredOnly: true,
												}),
											},
										}),
									},
									[IDS.AUTHORIZATION.LOGIN_INPUT, IDS.AUTHORIZATION.LOGIN_FIELD],
									E_FORM_FIELDS_NAME.login,
									IDS.FORMS.AUTHORIZATION_FORM,
								);
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
					input_data: {
						value: props[IDS.FORMS.AUTHORIZATION_FORM].fields.password,
						error: props[IDS.FORMS.AUTHORIZATION_FORM].errors.password,
						currentFocus: props.currentFocus,
					},
					label: 'Пароль',
					isRequired: true,
					children: {
						[IDS.AUTHORIZATION.PSW_INPUT]: new InputBlock({
							id: IDS.AUTHORIZATION.PSW_INPUT,
							input_data: {
								value: props[IDS.FORMS.AUTHORIZATION_FORM].fields.password,
								error: props[IDS.FORMS.AUTHORIZATION_FORM].errors.password,
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
													requiredOnly: true,
												}),
											},
										}),
									},
									[IDS.AUTHORIZATION.PSW_INPUT, IDS.AUTHORIZATION.PSW_FIELD],
									E_FORM_FIELDS_NAME.password,
									IDS.FORMS.AUTHORIZATION_FORM,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${IDS.AUTHORIZATION.PSW_INPUT}"></div>`,
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
						let pageProps = { [IDS.FORMS.AUTHORIZATION_FORM]: { ...this.props[IDS.FORMS.AUTHORIZATION_FORM] } };

						Object.entries(this.children).forEach(([fieldId, fieldInstance]) => {
							if (fieldId.includes('field')) {
								Object.entries(fieldInstance.children).forEach(([inputId, inputInstance]) => {
									if (inputId.includes('input') && !inputInstance.props.input_data.error.length) {
										validationResult = fieldsValidator({
											valueToValidate: inputInstance.props.input_data.value,
											fieldName: inputInstance.props.name,
											requiredOnly: true,
										});

										if (validationResult.length) {
											const childProps = {
												input_data: {
													value: inputInstance.props.input_data.value,
													error: validationResult,
													currentFocus: { element: null, selectionStart: null },
												},
											};
											inputInstance.setProps(childProps);
											fieldInstance.setProps(childProps);

											pageProps = {
												[IDS.FORMS.AUTHORIZATION_FORM]: {
													...pageProps[IDS.FORMS.AUTHORIZATION_FORM],
													errors: {
														...pageProps[IDS.FORMS.AUTHORIZATION_FORM].errors,
														[inputInstance.props.name]: validationResult,
													},
												},
											};
										}
									}
								});
							}
						});

						console.log('Login data submit: ', this.props[IDS.FORMS.AUTHORIZATION_FORM].fields);

						if (validationResult.length) {
							this.setProps(pageProps);
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

						this.eventBus().emit(Block.EVENTS.FLOW_CWU, { page: PAGES.REGISTRATION });
					},
				}),

				// Временные кнопки для перехода на другие страницы
				[IDS.AUTHORIZATION.TEMP_ERROR]: new ButtonBlock({
					id: IDS.AUTHORIZATION.TEMP_ERROR,
					type: 'button',
					text: 'Страница ошибки',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						this.eventBus().emit(Block.EVENTS.FLOW_CWU, { page: PAGES.ERROR });
					},
				}),
				[IDS.AUTHORIZATION.TEMP_PROFILE]: new ButtonBlock({
					id: IDS.AUTHORIZATION.TEMP_PROFILE,
					type: 'button',
					text: 'Профиль',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						this.eventBus().emit(Block.EVENTS.FLOW_CWU, { page: PAGES.PROFILE });
					},
				}),
				[IDS.AUTHORIZATION.TEMP_MAIN]: new ButtonBlock({
					id: IDS.AUTHORIZATION.TEMP_MAIN,
					type: 'button',
					text: 'Главная',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						this.eventBus().emit(Block.EVENTS.FLOW_CWU, { page: PAGES.MAIN });
					},
				}),
				[IDS.AUTHORIZATION.TEMP_MODAL]: new ButtonBlock({
					id: IDS.AUTHORIZATION.TEMP_MODAL,
					type: 'button',
					text: 'Модальное окно',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						this.createModal<IAddUserModalForm>(
							IDS.FORMS.MODAL_ADD_USER_FORM,
							{
								[IDS.FORMS.MODAL_ADD_USER_FORM]: {
									fields: { login: '' },
									errors: { login: '' },
								},
							},
							'Добавить пользователя',
						);
					},
				}),
			},
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
