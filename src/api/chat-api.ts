import type { IRequestOptions } from '@/http';
import { HTTPTransport } from '@/http';
import type { RequestOptions } from 'http';
import { responseHandler } from '@/utils';

const chatAPIInstance = new HTTPTransport();
const baseChatApi = '/api/v2/chats';

export class ChatAPI {
	public getChats(options?: Partial<RequestOptions & IRequestOptions>) {
		return chatAPIInstance.get(
			`${ baseChatApi }`,
			{ ...options },
		).then(resolve => {
			console.log('ChatAPI.getChats resolve: ', { resolve });
			return responseHandler(resolve);
		});
	}

	public getChatToken(id: string): unknown {
		return chatAPIInstance.post(`${ baseChatApi }/token/${ id }`).then(resolve => {
			console.log('ChatAPI.getChatToken resolve: ', { resolve });
			return responseHandler(resolve);
		});
	}

	public unreadCounter(id: string): unknown {
		return chatAPIInstance.get(`${ baseChatApi }/new/${ id }`).then(resolve => {
			console.log('ChatAPI.unreadCounter resolve: ', { resolve });
			return responseHandler(resolve);
		});
	}

	public createChat(options?: Partial<RequestOptions & IRequestOptions>) {
		return chatAPIInstance.post(
			`${ baseChatApi }`,
			{
				...options,
				headers: {
					'content-type': 'application/json',
				},
				credentials: 'include',
			},
		).then(resolve => {
			console.log('ChatAPI.createChat resolve: ', { resolve });
			return responseHandler(resolve);
		});
	}

	public addUsers(options?: Partial<RequestOptions & IRequestOptions>) {
		return chatAPIInstance.put(
			`${ baseChatApi }/users`,
			{
				...options,
				headers: {
					'content-type': 'application/json',
				},
				credentials: 'include',
			},
		).then(resolve => {
			console.log('ChatAPI.addUsers resolve: ', { resolve });
			return responseHandler(resolve);
		});
	}

	public getChatUsers(chatId: string) {
		return chatAPIInstance.get(`${ baseChatApi }/${ chatId }/users`).then(resolve => {
			console.log('ChatAPI.getChatUsers resolve: ', { resolve });
			return responseHandler(resolve);
		});
	}

	public deleteUsers(options?: Partial<RequestOptions & IRequestOptions>) {
		return chatAPIInstance.delete(
			`${ baseChatApi }/users`,
			{
				...options,
				headers: {
					'content-type': 'application/json',
				},
				credentials: 'include',
			},
		).then(resolve => {
			console.log('ChatAPI.deleteUsers resolve: ', { resolve });
			return responseHandler(resolve);
		});
	}

	public avatar(options?: Partial<RequestOptions & IRequestOptions>) {
		console.log('ChatAPI.avatar options: ', { options });

		return chatAPIInstance.put(
			`${ baseChatApi }/avatar`,
			{
				...options,
				credentials: 'include',
			},
		).then(resolve => {
			console.log('ChatAPI.avatar resolve: ', { resolve });
			return responseHandler(resolve);
		});
	}
}
