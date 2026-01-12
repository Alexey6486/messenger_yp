import { Block } from '@/block';
import {
	Store,
	StoreEvents,
} from '@/store';
import { IDS } from '@/constants';
import {
	cloneDeep,
	compile,
	isArray,
} from '@/utils';
import type {
	BlockProps,
	IChatUserResponse,
} from '@/types';
import { UlBlock } from '@/components/ul/ul-block';
import { ChatUserBlock } from '@/components/chat-user/chat-user-block';
import template from './remove-users-template';
import styles from '../styles.module.pcss';

export class ModalRemoveUsersBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			styles,
			id: IDS.MODAL.CONTENT,
			events: {
				submit: (e: Event) => {
					e.preventDefault();
					e.stopPropagation();
				},
			},
			markup: {
				[IDS.MODAL.CHAT_USERS_LIST]: `<div id="${ IDS.MODAL.CHAT_USERS_LIST }"></div>`,
			},
			children: {
				[IDS.MODAL.CHAT_USERS_LIST]: new UlBlock({
					id: IDS.MODAL.CHAT_USERS_LIST,
					clearChildrenListOnStateChange: true,
					storeEvent: StoreEvents.Updated_modal,
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return {
							currentChatData: cloneDeep(data?.currentChatData),
						};
					},
					onSetChildrenList: (data: Partial<BlockProps>) => {
						const childrenList: Block[] = [];

						if (isArray(data?.currentChatData?.users, true)) {
							data.currentChatData.users.forEach((user: IChatUserResponse) => {
								const { login, id, avatar } = user;
								if (id !== props?.currentChatData?.owner.id) {
									childrenList.push(new ChatUserBlock({
										id,
										avatar,
										name: login,
										text: login.substring(0, 1).toUpperCase(),
										isAdd: false,
										isRemove: true,
										storeEvent: StoreEvents.Updated_modal,
										onClick: (event: Event, actionId) => {
											event.preventDefault();
											event.stopImmediatePropagation();

											console.log('ModalAddUsersBlock onClick: ', { actionId, props });
											if (actionId === IDS.CHAT_USER.REMOVE) {
												Store.set(
													'currentChatData',
													{
														owner: cloneDeep(data.currentChatData?.owner),
														info: cloneDeep(data.currentChatData?.info),
														users: isArray(data?.currentChatData?.users, true)
															? cloneDeep(data?.currentChatData?.users.filter((el: IChatUserResponse) => el.id !== id))
															: [],
													},
													undefined,
													false,
													StoreEvents.Updated_modal,
												);
												this.props?.onSubmit?.(
													event,
													[id],
												);
											}
										},
									}));
								}
							});
						}

						return childrenList;
					},
					childrenList: props.currentChatData?.users.map((user: IChatUserResponse) => {
						const { login, id, avatar } = user;
						if (id !== props?.currentChatData?.owner.id) {
							return new ChatUserBlock({
								id,
								avatar,
								name: login,
								text: login.substring(0, 1).toUpperCase(),
								isAdd: false,
								isRemove: true,
								storeEvent: StoreEvents.Updated_modal,
								onClick: (event: Event, actionId) => {
									event.preventDefault();
									event.stopImmediatePropagation();

									console.log('ModalAddUsersBlock onClick: ', { actionId, props });
									if (actionId === IDS.CHAT_USER.REMOVE) {
										Store.set(
											'currentChatData',
											{
												owner: cloneDeep(props.currentChatData?.owner),
												info: cloneDeep(props.currentChatData?.info),
												users: isArray(props?.currentChatData?.users, true)
													? cloneDeep(props?.currentChatData?.users.filter((el: IChatUserResponse) => el.id !== id))
													: [],
											},
											undefined,
											false,
											StoreEvents.Updated_modal,
										);
										this.props?.onSubmit?.(
											event,
											[id],
										);
									}
								},
							});
						}
					}).filter((el) => el),
				}),
			},
		});
	}

	override componentWillUnmount() {
		console.log('ModalRemoveUsersBlock componentWillUnmount: ', this);
		Store.clearTargetSubs(StoreEvents.Updated_modal);
	}

	override render(): string {
		console.log('Render ModalRemoveUsersBlock', this, Store);
		return compile(template, this.props);
	}
}
