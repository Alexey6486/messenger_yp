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
	IUserDataForm,
	IUserPasswordForm,
} from '@/types';
import { FormBlock } from '@/components/form/form-block';
import { ProfileSubmitFormBlock } from '@/pages/profile/components/form-submit/form-submit-block';
import { ProfileDataFormBlock } from '@/pages/profile/components/profile-data-form/profile-data-form-block';
import { ButtonBlock } from '@/components/button/button-block';
import template from './profile-template.hbs?raw';
import styles from './styles.module.pcss';

interface IProfileBlockForms extends BlockProps {
	forms: {
		passwordForm: {
			fields: IUserPasswordForm,
			errors: IUserPasswordForm,
		},
		userForm: {
			fields: IUserDataForm,
			errors: IUserDataForm,
		},
	};
}

export class ProfileBlock extends Block {
	constructor(props: IProfileBlockForms) {
		super({
			...props,
			styles,
			markup: {
				// [IDS.PROFILE.P_FORM_CONTAINER]: `<div id="${ IDS.PROFILE.P_FORM_CONTAINER }"></div>`,
				[IDS.PROFILE.D_FORM_CONTAINER]: `<div id="${IDS.PROFILE.D_FORM_CONTAINER}"></div>`,

				// [IDS.PROFILE.AVATAR]: `<div id="${ IDS.PROFILE.AVATAR }"></div>`,
				// [IDS.PROFILE.ASIDE_BTN]: `<div id="${ IDS.PROFILE.ASIDE_BTN }"></div>`,
				// [IDS.PROFILE.CHANGE_DATA_BTN]: `<div id="${ IDS.PROFILE.CHANGE_DATA_BTN }"></div>`,
				// [IDS.PROFILE.CHANGE_PSW_BTN]: `<div id="${ IDS.PROFILE.CHANGE_PSW_BTN }"></div>`,
				[IDS.PROFILE.LOGOUT_BTN]: `<div id="${IDS.PROFILE.LOGOUT_BTN}"></div>`,

				// [IDS.PROFILE.CANCEL_DATA_EDIT_BTN]: `<div id="${ IDS.PROFILE.CANCEL_DATA_EDIT_BTN }"></div>`,
				// [IDS.PROFILE.CANCEL_PSW_EDIT_BTN]: `<div id="${ IDS.PROFILE.CANCEL_PSW_EDIT_BTN }"></div>`,
			},
			children: {
				// [IDS.PROFILE.P_FORM_CONTAINER]: new FormBlock({
				// 	id: IDS.PROFILE.P_FORM_CONTAINER,
				// 	class: styles.form,
				// 	onSubmit: () => {
				// 		console.log('PasswordFormBlock submit: ', this);
				// 	},
				// 	childrenList: [
				// 		new PasswordFormBlock({
				// 			id: IDS.PROFILE.P_FORM_FIELDS,
				// 		}),
				// 		new ProfileSubmitFormBlock({
				// 			id: IDS.PROFILE.P_FORM_SUBMIT,
				// 			isVisible: props.isPasswordEdit,
				// 			onClick: (event: Event) => {
				// 				event.preventDefault();
				// 				event.stopPropagation();
				//
				// 				let validationResult = '';
				// 				let pageProps = { passwordForm: { ...this.props.passwordForm } };
				//
				// 				Object.entries(this.children).forEach(([fieldId, fieldInstance]) => {
				// 					if (fieldId.includes('password-field')) {
				// 						Object.entries(fieldInstance.children).forEach(([inputId, inputInstance]) => {
				// 							if (
				// 								inputId.includes('input')
				// 								&& !inputInstance.props?.input_data?.error.length
				// 							) {
				// 								const fieldName = inputInstance.props.name as keyof IUserPasswordForm;
				// 								validationResult = fieldsValidator({
				// 									valueToValidate: inputInstance?.props?.input_data?.value,
				// 									fieldName: fieldName ?? '',
				// 								});
				//
				// 								if (validationResult.length) {
				// 									const childProps = {
				// 										input_data: {
				// 											value: inputInstance?.props?.input_data?.value ?? '',
				// 											error: validationResult,
				// 											currentFocus: { element: null, selectionStart: null },
				// 										},
				// 									};
				// 									inputInstance.setProps(childProps);
				// 									fieldInstance.setProps(childProps);
				//
				// 									const passwordForm = pageProps?.passwordForm as BlockProps['passwordForm'];
				// 									const passwordErrors = passwordForm?.errors;
				// 									if (passwordErrors) {
				// 										pageProps = {
				// 											passwordForm: {
				// 												...passwordForm,
				// 												errors: {
				// 													...passwordErrors,
				// 													[fieldName]: validationResult,
				// 												},
				// 											},
				// 										};
				// 									}
				// 								}
				// 							}
				// 						});
				// 					}
				// 				});
				//
				// 				const passwordForm: IFormState<IUserPasswordForm> | undefined = this.props?.passwordForm as BlockProps['passwordForm'];
				// 				if (
				// 					passwordForm
				// 					&& passwordForm.errors
				// 				) {
				// 					const errorsList = Object.values(passwordForm.errors).filter((el) => Boolean(el));
				// 					if (!errorsList.length) {
				// 						console.log('Profile password form submit: ', this.props?.passwordForm?.fields ?? '');
				// 					}
				// 				}
				//
				// 				if (validationResult.length) {
				// 					this.setProps(pageProps as BlockProps);
				// 				}
				// 			},
				// 		}),
				// 	],
				// }),
				[IDS.PROFILE.D_FORM_CONTAINER]: new FormBlock({
					id: IDS.PROFILE.D_FORM_CONTAINER,
					class: styles.form,
					onSubmit: () => {
						console.log('DataFormBlock submit: ', this);
					},
					childrenList: [
						new ProfileDataFormBlock({
							id: IDS.PROFILE.P_FORM_FIELDS,
							userForm: props.forms.userForm,
						}),
						new ProfileSubmitFormBlock({
							id: IDS.PROFILE.D_FORM_SUBMIT,
							isVisible: props.isDataEdit,
							onClick: (event: Event) => {
								event.preventDefault();
								event.stopPropagation();

								let validationResult = '';
								let pageProps = { userForm: { ...props.forms.userForm } };

								Object.entries(this.children).forEach(([fieldId, fieldInstance]) => {
									if (fieldId.includes('data-field')) {
										Object.entries(fieldInstance.children).forEach(([inputId, inputInstance]) => {
											if (
												inputId.includes('input')
												&& !inputInstance.props?.input_data?.error.length
											) {
												const fieldName = inputInstance.props.name as keyof IUserDataForm;
												validationResult = fieldsValidator({
													valueToValidate: inputInstance?.props?.input_data?.value,
													fieldName: fieldName ?? '',
												});

												if (validationResult.length) {
													const childProps = {
														input_data: {
															value: inputInstance?.props?.input_data?.value ?? '',
															error: validationResult,
															currentFocus: { element: null, selectionStart: null },
														},
													};
													inputInstance.setProps(childProps);
													fieldInstance.setProps(childProps);

													// const userForm = pageProps?.userForm as BlockProps['userForm'];
													const userForm = pageProps?.userForm;
													const userErrors = userForm?.errors;
													if (userErrors && userForm) {
														pageProps = {
															userForm: {
																...userForm,
																errors: {
																	...userErrors,
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

								// const userForm: IFormState<IUserDataForm> | undefined = this.props?.userForm as BlockProps['userForm'];
								const userForm = props?.forms.userForm;
								if (
									userForm
									&& userForm.errors
								) {
									const errorsList = Object.values(userForm.errors).filter((el) => Boolean(el));
									if (!errorsList.length) {
										// console.log('Profile data form submit: ', this.props?.userForm?.fields ?? '');
										console.log('Profile data form submit: ', props?.forms?.userForm?.fields ?? '');
									}
								}

								if (validationResult.length) {
									// this.setProps(pageProps as BlockProps);
									this.setProps(pageProps);
								}
							},
						}),
					],
				}),

				// [IDS.PROFILE.AVATAR]: new InputBlock({
				// 	id: IDS.PROFILE.AVATAR,
				// 	dataset: E_FORM_FIELDS_NAME.avatar,
				// 	name: E_FORM_FIELDS_NAME.avatar,
				// 	placeholder: '',
				// 	type: 'file',
				// 	input_data: null,
				// 	onInputChange: () => {
				// 	},
				// }),
				[IDS.PROFILE.LOGOUT_BTN]: new ButtonBlock({
					id: IDS.PROFILE.LOGOUT_BTN,
					type: 'button',
					text: 'Выйти из аккаунта',
					class: 'plain red',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						this.eventBus().emit(Block.EVENTS.FLOW_CWU, { page: PAGES.AUTHORIZATION });
					},
				}),
				// [IDS.PROFILE.ASIDE_BTN]: new ButtonRoundBlock({
				// 	id: IDS.PROFILE.ASIDE_BTN,
				// 	type: 'button',
				// 	icon: SvgArrowLeft,
				// 	onClick: (event: Event) => {
				// 		event.preventDefault();
				// 		event.stopPropagation();
				//
				// 		this.eventBus().emit(Block.EVENTS.FLOW_CWU, { page: PAGES.AUTHORIZATION });
				// 	},
				// }),
				// [IDS.PROFILE.CHANGE_DATA_BTN]: new ButtonBlock({
				// 	id: IDS.PROFILE.CHANGE_DATA_BTN,
				// 	type: 'button',
				// 	text: 'Изменить данные',
				// 	class: 'plain blue',
				// 	onClick: (event: Event) => {
				// 		event.preventDefault();
				// 		event.stopPropagation();
				//
				// 		this.toggleInputsDisable();
				//
				// 		this.setProps({
				// 			isDataEdit: true,
				// 		});
				// 	},
				// }),
				// [IDS.PROFILE.CHANGE_PSW_BTN]: new ButtonBlock({
				// 	id: IDS.PROFILE.CHANGE_PSW_BTN,
				// 	type: 'button',
				// 	text: 'Изменить пароль',
				// 	class: 'plain blue',
				// 	onClick: (event: Event) => {
				// 		event.preventDefault();
				// 		event.stopPropagation();
				//
				// 		this.setProps({
				// 			isPasswordEdit: true,
				// 		});
				// 	},
				// }),
				// [IDS.PROFILE.CANCEL_DATA_EDIT_BTN]: new ButtonBlock({
				// 	id: IDS.PROFILE.CANCEL_DATA_EDIT_BTN,
				// 	type: 'button',
				// 	text: 'Назад',
				// 	onClick: (event: Event) => {
				// 		event.preventDefault();
				// 		event.stopPropagation();
				//
				// 		this.toggleInputsDisable();
				//
				// 		this.setProps({
				// 			isDataEdit: false,
				// 		});
				// 	},
				// }),
				// [IDS.PROFILE.CANCEL_PSW_EDIT_BTN]: new ButtonBlock({
				// 	id: IDS.PROFILE.CANCEL_PSW_EDIT_BTN,
				// 	type: 'button',
				// 	text: 'Назад',
				// 	onClick: (event: Event) => {
				// 		event.preventDefault();
				// 		event.stopPropagation();
				//
				// 		this.setProps({
				// 			isPasswordEdit: false,
				// 		});
				// 	},
				// }),
			},
		});
	}

	override render(): string {
		console.log('Render ProfileBlock', this);
		return compile(template, this.props);
	}
}
