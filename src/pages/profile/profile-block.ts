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

interface IProfileBlockForms extends BlockProps<FormBlock<ProfileDataFormBlock> | ButtonBlock> {
	userData: IUserDataForm,
	passwordForm: {
		fields: IUserPasswordForm,
		errors: IUserPasswordForm,
	},
	userForm: {
		fields: IUserDataForm,
		errors: IUserDataForm,
	},
	isDataEdit: boolean,
	isPasswordEdit: boolean,
	// children?: Record<string, FormBlock<ProfileDataFormBlock> | ButtonBlock>
}

export class ProfileBlock extends Block<FormBlock<ProfileDataFormBlock> | ButtonBlock, IProfileBlockForms> {
	constructor(props: IProfileBlockForms) {
		super({
			...props,
			styles,
			markup: {
				[IDS.PROFILE.D_FORM_CONTAINER]: `<div id="${IDS.PROFILE.D_FORM_CONTAINER}"></div>`,
				[IDS.PROFILE.LOGOUT_BTN]: `<div id="${IDS.PROFILE.LOGOUT_BTN}"></div>`,
			},
			children: {
				[IDS.PROFILE.D_FORM_CONTAINER]: new FormBlock<ProfileDataFormBlock | ProfileSubmitFormBlock>({
					id: IDS.PROFILE.D_FORM_CONTAINER,
					class: styles.form,
					onSubmit: () => {
						console.log('DataFormBlock submit: ', this);
					},
					childrenList: [
						new ProfileDataFormBlock({
							id: IDS.PROFILE.P_FORM_FIELDS,
							userForm: props.userForm,
						}),
						new ProfileSubmitFormBlock({
							id: IDS.PROFILE.D_FORM_SUBMIT,
							isVisible: props.isDataEdit,
							onClick: (event: Event) => {
								event.preventDefault();
								event.stopPropagation();

								let validationResult = '';
								let pageProps: Partial<IProfileBlockForms> = { userForm: { ...props.userForm } };

								Object.entries(this.allInstances).forEach(([fieldId, fieldInstance]) => {
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
								const userForm = props?.userForm;
								if (
									userForm
									&& userForm.errors
								) {
									const errorsList = Object.values(userForm.errors).filter((el) => Boolean(el));
									if (!errorsList.length) {
										// console.log('Profile data form submit: ', this.props?.userForm?.fields ?? '');
										console.log('Profile data form submit: ', props?.userForm?.fields ?? '');
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
			},
		});
	}

	override render(): string {
		console.log('Render ProfileBlock', this);
		return compile(template, this.props);
	}
}
