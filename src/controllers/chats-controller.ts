import type { Block } from '@/block';
import { Store } from '@/store';
import { ChatAPI } from '@/api';
import {
	handleRequestError,
	isJsonString,
} from '@/utils';
import type {
	BlockProps,
	IChat,
	IChatUserResponse,
} from '@/types';
import type { RequestOptions } from 'http';
import type { IRequestOptions } from '@/http';

const api = new ChatAPI();

class ChatsController {
	public async getChats(instance?: Block) {
		try {
			const result = await api.getChats();
			console.log('ChatController.getChats result: ', { result });
			Store.set('chats', result, 'chats' as BlockProps);
		} catch (e: unknown) {
			console.log('ChatController.getChats Error: ', { e });
			handleRequestError(e, instance);
		}
	}

	public async createChat(options: Partial<RequestOptions & IRequestOptions>, instance?: Block) {
		try {
			const result = await api.createChat(options);
			console.log('ChatController.createChat result: ', { result });
			await this.getChats(instance);
		} catch (e: unknown) {
			console.log('ChatController.createChat Error: ', { e });
			handleRequestError(e, instance);
		}
	}

	public async getChatUsers(options: Partial<RequestOptions & IRequestOptions>, instance?: Block) {
		try {
			if (options.data && isJsonString(options.data)) {
				const chatData: IChat = JSON.parse(options.data as string);
				if (chatData.id) {
					const result = await api.getChatUsers(chatData.id) as IChatUserResponse[];
					console.log('ChatController.getChatUsers result: ', { result });
					Store.set(
						'currentChatData',
						{
							users: result,
							info: chatData,
							owner: result.find((el) => el.id === chatData.created_by),
						},
						'currentChatData' as BlockProps,
					);
				}
			}
		} catch (e: unknown) {
			console.log('ChatController.getChatUsers Error: ', { e });
			handleRequestError(e, instance);
		}
	}

	public async addUsers(options: Partial<RequestOptions & IRequestOptions>, instance?: Block) {
		try {
			const result = await api.addUsers(options);
			console.log('ChatController.addUsers result: ', { result });
		} catch (e: unknown) {
			console.log('ChatController.addUsers Error: ', { e });
			handleRequestError(e, instance);
		}
	}
}

export default new ChatsController();
