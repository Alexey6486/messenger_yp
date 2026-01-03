import { Block } from '@/block';
import { IDS } from '@/constants';
import {
	compile,
	fieldsValidator,
} from '@/utils';
import type {
	BlockProps,
	IInputChangeParams,
	IAddUserModalForm,
	IFormState,
	TNullable,
} from '@/types';
import {
	E_FORM_FIELDS_NAME,
} from '@/types';
import { FieldBlock } from '@/components/form-fields/field-block';
import { InputBlock } from '@/components/input/input-block';
import { ButtonBlock } from '@/components/button/button-block';
import template from './add-user-template';
import styles from './styles.module.pcss';

export class ModalAddUser extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			id: IDS.MODAL.CONTENT,
			events: {
				submit: (e: Event) => {
					e.preventDefault();
					e.stopPropagation();
				},
			},
			markup: {
				[IDS.MODAL.ADD_USER_FIELD]: `<div id="${IDS.MODAL.ADD_USER_FIELD}"></div>`,
				[IDS.MODAL.ADD_USER_SUBMIT]: `<div id="${IDS.MODAL.ADD_USER_SUBMIT}"></div>`,
			},
			children: {
				[IDS.MODAL.ADD_USER_FIELD]: new FieldBlock({
					id: IDS.MODAL.ADD_USER_FIELD,
					id_label: IDS.MODAL.ADD_USER_INPUT,
					input_data: {
						value: props.modalAddUserForm?.fields?.login ?? '',
						error: props.modalAddUserForm?.errors?.login ?? '',
					},
					label: 'Логин',
					isRequired: true,
					children: {
						[IDS.MODAL.ADD_USER_INPUT]: new InputBlock({
							id: IDS.MODAL.ADD_USER_INPUT,
							input_data: {
								value: props.modalAddUserForm?.fields?.login ?? '',
								error: props.modalAddUserForm?.errors?.login ?? '',
							},
							dataset: E_FORM_FIELDS_NAME.login,
							name: E_FORM_FIELDS_NAME.login,
							placeholder: '',
							type: 'login',
							onInputChange: (params: IInputChangeParams) => {
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
									[IDS.MODAL.ADD_USER_INPUT, IDS.MODAL.ADD_USER_FIELD],
									E_FORM_FIELDS_NAME.login,
									IDS.FORMS.MODAL_ADD_USER_FORM,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${IDS.MODAL.ADD_USER_INPUT}"></div>`,
					},
				}),
				[IDS.MODAL.ADD_USER_SUBMIT]: new ButtonBlock({
					id: IDS.MODAL.ADD_USER_SUBMIT,
					type: 'submit',
					text: props?.buttonText ?? 'Сохранить',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						let validationResult = '';
						let pageProps = { modalAddUserForm: { ...this.props.modalAddUserForm } };

						Object.entries(this.children).forEach(([fieldId, fieldInstance]) => {
							if (fieldId.includes('field')) {
								Object.entries(fieldInstance.children).forEach(([inputId, inputInstance]) => {
									if (
										inputId.includes('input')
										&& !inputInstance.props?.input_data?.error.length
									) {
										const fieldName = inputInstance.props.name as keyof IAddUserModalForm;
										validationResult = fieldsValidator({
											valueToValidate: inputInstance?.props?.input_data?.value,
											fieldName: fieldName ?? '',
											requiredOnly: true,
										});

										if (validationResult.length) {
											const childProps = {
												input_data: {
													value: inputInstance?.props?.input_data?.value ?? '',
													error: validationResult,
												},
											};
											inputInstance.setProps(childProps);
											fieldInstance.setProps(childProps);

											const modalAddUserForm = pageProps?.modalAddUserForm as BlockProps['modalAddUserForm'];
											const modalAddUserErrors = modalAddUserForm?.errors;
											if (modalAddUserErrors) {
												pageProps = {
													modalAddUserForm: {
														...modalAddUserForm,
														errors: {
															...modalAddUserErrors,
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

						const modalAddUserForm: TNullable<IFormState<IAddUserModalForm>> | undefined = pageProps?.modalAddUserForm as BlockProps['modalAddUserForm'];
						if (
							modalAddUserForm
							&& modalAddUserForm.errors
						) {
							const errorsList = Object.values(modalAddUserForm.errors).filter((el) => Boolean(el));
							if (!errorsList.length) {
								console.log('Add user form submit: ', this.props?.modalAddUserForm?.fields ?? '');
								this.props?.onCloseModal?.();
							}
						}

						if (validationResult.length) {
							this.setProps(pageProps as BlockProps);
						}
					},
				}),
			},
		});
	}

	override render(): string {
		return compile(template, { ...this.props, class: styles['add-user-form'] });
	}
}
