import { Block } from '@/block';
import {
	Store,
	StoreEvents,
} from '@/store';
import { UserController } from '@/controllers';
import {
	FocusManager,
	getFocusData,
} from '@/focus-manager';
import { IDS } from '@/constants';
import {
	compile,
	getInputStateSlice,
	isArray,
} from '@/utils';
import type {
	BlockProps,
	IChatUserResponse,
	IInputChangeParams,
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
				[IDS.MODAL.ADD_USER_LIST]: `<div id="${ IDS.MODAL.ADD_USER_LIST }"></div>`,
				[IDS.MODAL.ADD_USER_SUBMIT]: `<div id="${ IDS.MODAL.ADD_USER_SUBMIT }"></div>`,
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
					storeEvent: StoreEvents.Updated_modal,
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
							storeEvent: StoreEvents.Updated_modal,
							onInputChange: (params: IInputChangeParams) => {
								FocusManager.set(getFocusData(params.info));
								Store.set(
									'modalAddUsersForm',
									{
										fields: {
											...props?.modalAddUsersForm?.fields,
											login: params?.data?.value ?? '',
										},
										errors: { ...props?.modalAddUsersForm?.errors },
									},
									'modalAddUsersForm' as BlockProps,
									false,
									StoreEvents.Updated_modal,
								);

								if (params.info.event !== 'blur' && params?.data?.value && params.data.value.length > 2) {
									UserController.searchUser({ data: JSON.stringify({ login: params.data.value }) });
								} else {
									Store.set('searchUsersList', null, 'searchUsersList' as BlockProps, false, StoreEvents.Updated_modal);
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
					storeEvent: StoreEvents.Updated_modal,
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return {
							searchUsersList: data?.searchUsersList,
						};
					},
					onSetChildrenList: (data: Partial<BlockProps>) => {
						const childrenList: { [key: string]: Block } = {};
						if (isArray(data?.searchUsersList) && data?.searchUsersList.length) {
							data.searchUsersList.forEach((user: IChatUserResponse) => {
								const { login, id, avatar } = user;
								if (
									props.currentChatData
									&& !props.currentChatData?.users.find((el) => el.id === id)
								) {
									childrenList[id] = new ChatUserBlock({
										id,
										avatar,
										name: login,
										text: login.substring(0, 1).toUpperCase(),
										isAdd: !props?.addUsersList
											|| (props.addUsersList && !props.addUsersList.find((el) => el.id === id)),
										onClick: (event: Event, data) => {
											event.preventDefault();
											event.stopImmediatePropagation();

											console.log('ModalAddUsersBlock onClick: ', { data });
											if (data === IDS.CHAT_USER.ADD) {
												Store.set(
													'addUsersList',
													[user],
													'addUsersList' as BlockProps,
													false,
													StoreEvents.Updated_modal,
												);
											}
										},
									});
								}
							});
						}

						return childrenList;
					},
				}),
				[IDS.MODAL.ADD_USER_SUBMIT]: new ButtonBlock({
					id: IDS.MODAL.ADD_USER_SUBMIT,
					type: 'submit',
					text: props?.buttonText ?? 'Добавить',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						console.log('Add users form submit: ', this.props?.modalAddUsersForm?.fields ?? '');
						this.props?.onCloseModal?.();
						this.props?.onSubmit?.(
							event,
							{ modalAddUsersForm: props?.modalAddUsersForm },
						);
					},
				}),
			},
		});
	}

	// override dispatchComponentWillUnmount() {
	// 	this.eventBus().emit(Block.EVENTS.FLOW_CWU);
	// }

	override render(): string {
		return compile(template, { ...this.props, styles });
	}
}
