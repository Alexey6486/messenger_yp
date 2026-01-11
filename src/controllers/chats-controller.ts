import type { Block } from '@/block';
import {
	Store,
	StoreEvents,
} from '@/store';
import { ChatAPI } from '@/api';
import { WebSocketService } from '@/web-socket';
import {
	cloneDeep,
	handleRequestError,
	isArray,
} from '@/utils';
import type {
	BlockProps,
	IChat,
	IChatToken,
	IChatUnreadCounter,
	IChatUnreadCounterResponse,
	IChatUserResponse,
	ISocketChatMessage,
	TPromiseResponse,
} from '@/types';
import { PROMISE_STATUS } from '@/constants';
import type { RequestOptions } from 'http';
import type { IRequestOptions } from '@/http';

const api = new ChatAPI();

class ChatsController {
	public async getChats(userId?: string, instance?: Block, options?: Partial<RequestOptions & IRequestOptions>) {
		try {
			const chatsListResult: IChat[] = await api.getChats(options) as IChat[];
			console.log('ChatController.getChats result: ', { chatsListResult });

			const sockets = Store.getState().chatsSockets;
			if (sockets && sockets.size > 0) {
				sockets.forEach((s) => s.disconnect());
			}

			if (chatsListResult.length) {
				const promiseTokensList: Promise<IChatToken | undefined>[] = [];
				const promiseChatUnreadCounterList: Promise<IChatUnreadCounter | undefined>[] = [];
				chatsListResult.forEach((chat: IChat) => {
					promiseTokensList.push(this.getChatToken(chat.id, instance));
					promiseChatUnreadCounterList.push(this.getChatUnreadCounter(chat.id, instance));
				});

				const promiseTokensListResult: PromiseSettledResult<Awaited<Promise<IChatToken | undefined>>>[] = await Promise.allSettled(promiseTokensList);
				console.log('ChatController.getChats allSettled promiseTokensListResult: ', { promiseTokensListResult });

				const promiseChatUnreadCounterListResult: PromiseSettledResult<Awaited<Promise<IChatUnreadCounter | undefined>>>[] = await Promise.allSettled(promiseChatUnreadCounterList);
				console.log('ChatController.getChats allSettled promiseChatUnreadCounterListResult: ', { promiseChatUnreadCounterListResult });

				if (isArray(promiseTokensListResult, true)) {
					const chatsSockets: Map<string, WebSocketService> = new Map();
					promiseTokensListResult.forEach((el: TPromiseResponse<IChatToken>) => {
						console.log('successfulPromises forEach', { el });
						if (el.status === PROMISE_STATUS.FULFILLED && userId) {
							const socket: WebSocketService = new WebSocketService();
							socket.connect(userId, el.value.chatId, el.value.token);
							chatsSockets.set(el.value.chatId, socket);
						}
					});

					console.log('ChatController.getChats chatsSockets: ', { chatsSockets });
					Store.set(
						'chats',
						chatsListResult.map((ch) => {
							let unread_count = '';
							if (isArray(promiseChatUnreadCounterListResult, true)) {
								promiseChatUnreadCounterListResult.forEach((el: TPromiseResponse<IChatUnreadCounter>) => {
									console.log('successfulPromises forEach', { el });
									if (el.status === PROMISE_STATUS.FULFILLED && el.value.chatId === ch.id) {
										unread_count = el.value.unread_count;
									}
								});

								if (unread_count) {
									return {
										...ch,
										unread_count,
									};
								}
							}

							return ch;
						}),
						'chats' as BlockProps,
					);
					Store.set('chatsSockets', chatsSockets, 'chatsSockets' as BlockProps);
				}
			} else {
				Store.set('chats', null, 'chats' as BlockProps);
				Store.set('chatsSockets', null, 'chatsSockets' as BlockProps);
			}
		} catch (e: unknown) {
			console.log('ChatController.getChats Error: ', { e });
			handleRequestError(e, instance);
		}
	}

	public async getChatToken(chatId: string, instance?: Block): Promise<IChatToken | undefined> {
		try {
			const result: { token: string } = await api.getChatToken(chatId) as { token: string };
			console.log('ChatController.getChatToken result: ', { result });
			return { chatId, token: result.token };
		} catch (e: unknown) {
			console.log('ChatController.getChatToken Error: ', { e });
			handleRequestError(e, instance);
		}
	}

	public async getChatUnreadCounter(chatId: string, instance?: Block): Promise<IChatUnreadCounter | undefined> {
		try {
			const result: IChatUnreadCounterResponse = await api.unreadCounter(chatId) as IChatUnreadCounterResponse;
			console.log('ChatController.getChatUnreadCounter result: ', { result });
			return { chatId, unread_count: result.unread_count };
		} catch (e: unknown) {
			console.log('ChatController.getChatUnreadCounter Error: ', { e });
			handleRequestError(e, instance);
		}
	}

	public async createChat(options: Partial<RequestOptions & IRequestOptions>, instance?: Block) {
		try {
			const result = await api.createChat(options);
			console.log('ChatController.createChat result: ', { result });
			await this.getChats(undefined, instance);
		} catch (e: unknown) {
			console.log('ChatController.createChat Error: ', { e });
			handleRequestError(e, instance);
		}
	}

	public async getChatUsers(chat: IChat, instance?: Block) {
		try {
			const result = await api.getChatUsers(chat.id) as IChatUserResponse[];
			console.log('ChatController.getChatUsers result: ', { result });

			Store.set(
				'currentChatData',
				{
					users: result,
					info: cloneDeep(chat),
					owner: result.find((el) => el.id === chat.created_by),
				},
				'currentChatData' as BlockProps,
			);

			Store.set(
				'chats',
				Store.getState().chats?.map((el) => {
					if (el.id === chat.id) {
						return {
							...el,
							unread_count: 0,
						};
					}
					return el;
				}),
				'chats' as BlockProps,
			);

			const messages = Store.getState().messages?.get(chat.id);
			Store.set(
				'messagesList',
				isArray(messages, true)
					? cloneDeep(messages.map((el: ISocketChatMessage) => {
						const target = result.find((usr) => usr.id === el.user_id);
						return { ...el, login: target ? target.login : el.user_id };
					}))
					: [],
				'messagesList' as BlockProps,
			);
		} catch (e: unknown) {
			console.log('ChatController.getChatUsers Error: ', { e });
			handleRequestError(e, instance);
		}
	}

	public async addUsers(users: number[], chat: IChat, instance?: Block) {
		try {
			console.log('ChatsController addUsers: ', { users, chat });
			await api.addUsers({ data: JSON.stringify({ users, chatId: chat.id }) });
			await this.getChatUsers(chat, instance);
		} catch (e: unknown) {
			console.log('ChatController.addUsers Error: ', { e });
			handleRequestError(e, instance);
		}
	}

	public async removeUsers(users: number[], chat: IChat, instance?: Block) {
		try {
			console.log('ChatsController removeUsers: ', { users, chat });
			await api.deleteUsers({ data: JSON.stringify({ users, chatId: chat.id }) });
			await this.getChatUsers(chat, instance);
		} catch (e: unknown) {
			console.log('ChatController.removeUsers Error: ', { e });
			handleRequestError(e, instance);
		}
	}

	public async changeAvatar(options: Partial<RequestOptions & IRequestOptions>, instance?: Block) {
		try {
			const result: IChat = await api.avatar(options) as IChat;
			console.log('ChatController.changeAvatar: ', { result });
			const chats = Store.getState().chats;
			Store.set('currentChatData.info', result, 'currentChatData' as BlockProps, false, StoreEvents.Updated_modal);
			Store.set('currentChatData.info', result, 'currentChatData' as BlockProps);
			if (chats) {
				Store.set(
					'chats',
					chats.map((el) => {
						if (el.id === result.id) {
							return {
								...el,
								avatar: result.avatar,
							};
						}
						return el;
					}),
					'chats' as BlockProps,
				);
			}

		} catch (e: unknown) {
			console.log('ChatController.changeAvatar Error: ', { e });
			handleRequestError(e, instance);
		}
	}
}

export default new ChatsController();
