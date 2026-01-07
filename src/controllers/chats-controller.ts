import type { Block } from '@/block';
import { Store } from '@/store';
import { ChatAPI } from '@/api';
import { handleRequestError } from '@/utils';
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
