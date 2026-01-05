import type { Block } from '@/block';
import { Store } from '@/store';
import { ChatAPI } from '@/api';
import { isErrorWithMessage } from '@/utils';
import type {
	BlockProps,
	IErrorPageState,
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

			if (isErrorWithMessage(e)) {
				const error = JSON.parse(e.message);
				console.log('ChatController.getChats Error Data: ', { ...error });

				if (instance) {
					Store.set('modalError', { ...error });
					instance.createModal<IErrorPageState>(
						'modalError',
						'Ошибка',
					);
				}
			} else {
				throw new Error('Unknown error');
			}
		}
	}

	public async createChat(options: Partial<RequestOptions & IRequestOptions>, instance?: Block) {
		try {
			const result = await api.createChat(options);
			console.log('ChatController.createChat result: ', { result });
			await this.getChats(instance);
		} catch (e: unknown) {
			console.log('ChatController.createChat Error: ', { e });

			if (isErrorWithMessage(e)) {
				const error = JSON.parse(e.message);
				console.log('ChatController.createChat Error Data: ', { ...error });

				if (instance) {
					Store.set('modalError', { ...error });
					instance.createModal<IErrorPageState>(
						'modalError',
						'Ошибка',
					);
				}
			} else {
				throw new Error('Unknown error');
			}
		}
	}
}

export default new ChatsController();
