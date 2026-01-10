import { Block } from '@/block';
import {
	Store,
	StoreEvents,
} from '@/store';
import {
	FocusManager,
	getFocusData,
} from '@/focus-manager';
import {
	IDS,
	INIT_ADD_CHAT_STATE,
} from '@/constants';
import {
	cloneDeep,
	compile,
	fieldsValidator,
	getInputStateSlice,
} from '@/utils';
import type {
	BlockProps,
	IAddChatModalForm,
	IFormState,
	IInputChangeParams,
	TNullable,
} from '@/types';
import { E_FORM_FIELDS_NAME } from '@/types';
import { FieldBlock } from '@/components/form-fields/field-block';
import { InputBlock } from '@/components/input/input-block';
import { ButtonBlock } from '@/components/button/button-block';
import template from './add-chat-template';
import styles from '../styles.module.pcss';

export class ModalAddChatBlock extends Block {
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
				[IDS.MODAL.ADD_CHAT_FIELD]: `<div id="${ IDS.MODAL.ADD_CHAT_FIELD }"></div>`,
				[IDS.MODAL.ADD_CHAT_SUBMIT]: `<div id="${ IDS.MODAL.ADD_CHAT_SUBMIT }"></div>`,
			},
			children: {
				[IDS.MODAL.ADD_CHAT_FIELD]: new FieldBlock({
					id: IDS.MODAL.ADD_CHAT_FIELD,
					id_label: IDS.MODAL.ADD_CHAT_INPUT,
					input_data: {
						value: props.modalAddChatForm?.fields?.title ?? '',
						error: props.modalAddChatForm?.errors?.title ?? '',
					},
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return getInputStateSlice(data?.modalAddChatForm, 'title');
					},
					label: 'Название чата',
					isRequired: true,
					storeEvent: StoreEvents.Updated_modal,
					children: {
						[IDS.MODAL.ADD_CHAT_INPUT]: new InputBlock({
							id: IDS.MODAL.ADD_CHAT_INPUT,
							input_data: {
								value: props.modalAddChatForm?.fields?.title ?? '',
								error: props.modalAddChatForm?.errors?.title ?? '',
							},
							mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
								return getInputStateSlice(data?.modalAddChatForm, 'title');
							},
							dataset: E_FORM_FIELDS_NAME.title,
							name: E_FORM_FIELDS_NAME.title,
							placeholder: '',
							type: 'text',
							storeEvent: StoreEvents.Updated_modal,
							onInputChange: (params: IInputChangeParams) => {
								const data = {
									...params,
									...(params.info.event === 'blur' && {
										data: {
											...params.data,
											error: fieldsValidator({
												valueToValidate: params.data.value,
												fieldName: E_FORM_FIELDS_NAME.title,
											}),
										},
									}),
								};
								FocusManager.set(getFocusData(params.info));
								Store.set(
									'modalAddChatForm',
									{
										fields: {
											...props?.modalAddChatForm?.fields,
											title: data?.data?.value ?? '',
										},
										errors: {
											...props?.modalAddChatForm?.errors,
											title: data?.data?.error ?? '',
										},
									},
									'modalAddChatForm' as BlockProps,
									false,
									StoreEvents.Updated_modal,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.MODAL.ADD_CHAT_INPUT }"></div>`,
					},
				}),
				[IDS.MODAL.ADD_CHAT_SUBMIT]: new ButtonBlock({
					id: IDS.MODAL.ADD_CHAT_SUBMIT,
					type: 'submit',
					text: props?.buttonText ?? 'Создать',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						let validationResult = '';
						let pageProps = { modalAddChatForm: { ...this.props.modalAddChatForm } };

						Object.entries(this.children).forEach(([fieldId, fieldInstance]) => {
							if (fieldId.includes('field')) {
								Object.entries(fieldInstance.children).forEach(([inputId, inputInstance]) => {
									if (inputId.includes('input')) {
										const fieldName = inputInstance.props.name as keyof IAddChatModalForm;
										validationResult = fieldsValidator({
											valueToValidate: inputInstance?.props?.input_data?.value,
											fieldName: fieldName ?? '',
											requiredOnly: true,
										});

										if (validationResult.length) {
											const modalAddChatForm = pageProps?.modalAddChatForm as BlockProps['modalAddChatForm'];
											const modalAddChatErrors = modalAddChatForm?.errors;

											if (modalAddChatErrors) {
												pageProps = {
													modalAddChatForm: {
														...modalAddChatForm,
														errors: {
															...modalAddChatErrors,
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

						const modalAddChatForm: TNullable<IFormState<IAddChatModalForm>> | undefined = pageProps?.modalAddChatForm as BlockProps['modalAddChatForm'];
						console.log({ pageProps, t: this });

						if (
							modalAddChatForm
							&& modalAddChatForm.errors
						) {
							const errorsList = Object.values(modalAddChatForm.errors).filter((el) => Boolean(el));
							console.log({ errorsList });

							if (errorsList.length) {
								const { modalAddChatForm: { errors, fields } } = pageProps;
								Store.set(
									'modalAddChatForm',
									{ fields, errors },
									'modalAddChatForm' as BlockProps,
									false,
									StoreEvents.Updated_modal,
								);
							} else {
								console.log('Add chat form submit: ', this.props?.modalAddChatForm?.fields ?? '');
								this.props?.onSubmit?.(
									event,
									this.props?.modalAddChatForm?.fields,
								);
								this.props?.onCloseModal?.();
							}
						}
					},
				}),
			},
		});
	}

	override componentWillUnmount() {
		console.log(this);
		Store.set('modalAddChatForm', cloneDeep(INIT_ADD_CHAT_STATE), 'modalAddChatForm' as BlockProps, true, StoreEvents.Updated_modal);
		Store.clearTargetSubs(StoreEvents.Updated_modal);
	}

	override render(): string {
		console.log('Render ModalAddChat', this);
		return compile(template, { ...this.props, class: styles['add-modal-form'] });
	}
}
