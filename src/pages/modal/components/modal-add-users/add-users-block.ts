import { Block } from '@/block';
import { Store } from '@/store';
import { UserController } from '@/controllers';
import {
	FocusManager,
	getFocusData,
} from '@/focus-manager';
import { IDS } from '@/constants';
import {
	compile,
	fieldsValidator,
	getInputStateSlice,
	isArray,
} from '@/utils';
import type {
	BlockProps,
	IAddUsersModalForm,
	IChatUserResponse,
	IFormState,
	IInputChangeParams,
	TNullable,
} from '@/types';
import { E_FORM_FIELDS_NAME } from '@/types';
import { FieldBlock } from '@/components/form-fields/field-block';
import { InputBlock } from '@/components/input/input-block';
import { ButtonBlock } from '@/components/button/button-block';
import { UlBlock } from '@/components/ul/ul-block';
import { ChatUserBlock } from '@/components/chat-user/chat-user-block';
import template from './add-users-template';
import styles from '../styles.module.pcss';

export class ModalAddUsersBlock extends Block {
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
				[IDS.MODAL.ADD_USER_FIELD]: `<div id="${ IDS.MODAL.ADD_USER_FIELD }"></div>`,
				[IDS.MODAL.ADD_USER_SUBMIT]: `<div id="${ IDS.MODAL.ADD_USER_SUBMIT }"></div>`,
				[IDS.MODAL.ADD_USER_LIST]: `<div id="${ IDS.MODAL.ADD_USER_LIST }"></div>`,
			},
			children: {
				[IDS.MODAL.ADD_USER_FIELD]: new FieldBlock({
					id: IDS.MODAL.ADD_USER_FIELD,
					id_label: IDS.MODAL.ADD_USER_INPUT,
					input_data: {
						value: props.modalAddUsersForm?.fields?.login ?? '',
						error: props.modalAddUsersForm?.errors?.login ?? '',
					},
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return getInputStateSlice(data?.modalAddUsersForm, 'login');
					},
					label: 'Логин',
					isRequired: true,
					children: {
						[IDS.MODAL.ADD_USER_INPUT]: new InputBlock({
							id: IDS.MODAL.ADD_USER_INPUT,
							input_data: {
								value: props.modalAddUsersForm?.fields?.login ?? '',
								error: props.modalAddUsersForm?.errors?.login ?? '',
							},
							mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
								const fieldData = getInputStateSlice(data?.modalAddUsersForm, 'login');
								return {
									...fieldData,
									searchUsersList: data?.searchUsersList,
								};
							},
							dataset: E_FORM_FIELDS_NAME.login,
							name: E_FORM_FIELDS_NAME.login,
							placeholder: '',
							type: 'text',
							onInputChange: (params: IInputChangeParams) => {
								const data = {
									...params,
									...(params.info.event === 'blur' && {
										data: {
											...params.data,
											error: fieldsValidator({
												valueToValidate: params.data.value,
												fieldName: E_FORM_FIELDS_NAME.login,
											}),
										},
									}),
								};
								FocusManager.set(getFocusData(params.info));
								Store.set(
									'modalAddUsersForm',
									{
										fields: {
											...props?.modalAddUsersForm?.fields,
											login: data?.data?.value ?? '',
										},
										errors: {
											...props?.modalAddUsersForm?.errors,
											login: data?.data?.error ?? '',
										},
									},
									'modalAddUsersForm' as BlockProps,
								);

								if (params.info.event !== 'blur' && data?.data?.value && data.data.value.length > 2) {
									UserController.searchUser({ data: JSON.stringify({ login: data.data.value }) });
								} else {
									Store.set('searchUsersList', null, 'searchUsersList' as BlockProps);
								}
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.MODAL.ADD_USER_INPUT }"></div>`,
					},
				}),
				[IDS.MODAL.ADD_USER_LIST]: new UlBlock({
					id: IDS.MODAL.ADD_USER_LIST,
					clearChildrenList: true,
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return {
							searchUsersList: data?.searchUsersList,
						};
					},
					onSetChildrenList: (data: Partial<BlockProps>) => {
						const childrenList: { [key: string]: Block } = {};
						if (isArray(data?.searchUsersList) && data?.searchUsersList.length) {
							console.log({ data });
							data.searchUsersList.forEach((user: IChatUserResponse) => {
								const { login, id, avatar } = user;
								childrenList[id] = new ChatUserBlock({
									id,
									avatar,
									name: login,
									text: login.substring(0, 1).toUpperCase(),
									isAdd: true,
									onClick: (event: Event, data) => {
										event.preventDefault();
										event.stopPropagation();

										console.log('ModalAddUsersBlock onClick: ', { data });
										// if (data === IDS.CHAT_USER.ADD) {
										//
										// }
									},
								});
							});
						}

						return childrenList;
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
						let pageProps = { modalAddUsersForm: { ...this.props.modalAddUsersForm } };

						Object.entries(this.children).forEach(([fieldId, fieldInstance]) => {
							if (fieldId.includes('field')) {
								Object.entries(fieldInstance.children).forEach(([inputId, inputInstance]) => {
									if (inputId.includes('input')) {
										const fieldName = inputInstance.props.name as keyof IAddUsersModalForm;
										validationResult = fieldsValidator({
											valueToValidate: inputInstance?.props?.input_data?.value,
											fieldName: fieldName ?? '',
											requiredOnly: true,
										});

										if (validationResult.length) {
											const modalAddUsersForm = pageProps?.modalAddUsersForm as BlockProps['modalAddUsersForm'];
											const modalAddUsersErrors = modalAddUsersForm?.errors;
											if (modalAddUsersErrors) {
												pageProps = {
													modalAddUsersForm: {
														...modalAddUsersForm,
														errors: {
															...modalAddUsersErrors,
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

						const modalAddUsersForm: TNullable<IFormState<IAddUsersModalForm>> | undefined = pageProps?.modalAddUsersForm as BlockProps['modalAddUsersForm'];
						console.log({ pageProps, t: this });

						if (
							modalAddUsersForm
							&& modalAddUsersForm.errors
						) {
							const errorsList = Object.values(modalAddUsersForm.errors).filter((el) => Boolean(el));
							console.log({ errorsList });

							if (errorsList.length) {
								const { modalAddUsersForm: { errors, fields } } = pageProps;
								Store.set(
									'modalAddUsersForm',
									{ fields, errors },
								);
							} else {
								console.log('Add users form submit: ', this.props?.modalAddUsersForm?.fields ?? '');
								this.props?.onCloseModal?.();
								this.props?.onSubmit?.(
									event,
									{ modalAddUsersForm: props?.modalAddUsersForm },
								);
							}
						}
					},
				}),
			},
		});
	}

	override render(): string {
		return compile(template, { ...this.props, styles });
	}
}
