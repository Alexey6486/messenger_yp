import type { Block } from '@/block';
import { Store } from '@/store';
import { ChatAPI } from '@/api';
import { Socket } from '@/web-socket';
import {
	handleRequestError,
	isArray,
} from '@/utils';
import type {
	BlockProps,
	IChat,
	IChatUserResponse,
	TChatTokenPromiseResponse,
} from '@/types';
import type { RequestOptions } from 'http';
import type { IRequestOptions } from '@/http';

const api = new ChatAPI();

class ChatsController {
	public async getChats(userId?: string, instance?: Block) {
		try {
			const chatsListResult: IChat[] = await api.getChats() as IChat[];
			console.log('ChatController.getChats result: ', { chatsListResult });

			const promiseList = chatsListResult.map((chat: IChat) => {
				return this.getChatToken(chat.id, instance);
			});
			console.log('ChatController.getChats promiseList: ', { promiseList });

			const promiseListResult = await Promise.allSettled<TChatTokenPromiseResponse[]>(promiseList);
			console.log('ChatController.getChats allSettled promiseListResult: ', { promiseListResult });

			const successfulPromises: PromiseSettledResult<Awaited<TChatTokenPromiseResponse>>[] = promiseListResult.filter(result => result.status === 'fulfilled');

			if (isArray(successfulPromises) && successfulPromises.length) {
				const chatsTokens: Map<number, string> = new Map();
				successfulPromises.forEach((el: TChatTokenPromiseResponse, idx) => {
					console.log('successfulPromises forEach', { el, idx });
					chatsTokens.set(el.value.chatId, el.value.token);
					if (idx === 0 && userId) {
						Socket.connect(userId, el.value.chatId, el.value.token);
					}
				});

				console.log('ChatController.getChats chatsTokens: ', { chatsTokens });
				Store.set('chats', chatsListResult, 'chats' as BlockProps);
				Store.set('chatsTokens', chatsTokens, 'chatsTokens' as BlockProps);
			}

		} catch (e: unknown) {
			console.log('ChatController.getChats Error: ', { e });
			handleRequestError(e, instance);
		}
	}

	public async getChatToken(chatId: string, instance?: Block) {
		try {
			const result: { token: string } = await api.getChatToken(chatId) as { token: string };
			console.log('ChatController.getChatToken result: ', { result });
			return { chatId, token: result.token };
		} catch (e: unknown) {
			console.log('ChatController.getChatToken Error: ', { e });
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
					info: chat,
					owner: result.find((el) => el.id === chat.created_by),
				},
				'currentChatData' as BlockProps,
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
}

export default new ChatsController();
