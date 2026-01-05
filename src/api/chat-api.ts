import type { IRequestOptions } from '@/http';
import { HTTPTransport } from '@/http';
import type { RequestOptions } from 'http';
import { responseHandler } from '@/api/utils';

const chatAPIInstance = new HTTPTransport();
const baseChatApi = '/api/v2/chats/';

export class ChatAPI {
	public getChats() {
		return chatAPIInstance.get(`${ baseChatApi }`).then(resolve => {
			console.log('ChatAPI.getChats resolve: ', { resolve });

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

	public addUser(options?: Partial<RequestOptions & IRequestOptions>) {
		return chatAPIInstance.put(
			`${ baseChatApi }users`,
			{
				...options,
				headers: {
					'content-type': 'application/json',
				},
				credentials: 'include',
			},
		).then(resolve => {
			console.log('ChatAPI.addUser resolve: ', { resolve });

			return responseHandler(resolve);
		});
	}

	public deleteUser(options?: Partial<RequestOptions & IRequestOptions>) {
		return chatAPIInstance.delete(
			`${ baseChatApi }users`,
			{
				...options,
				headers: {
					'content-type': 'application/json',
				},
				credentials: 'include',
			},
		).then(resolve => {
			console.log('ChatAPI.deleteUser resolve: ', { resolve });

			return responseHandler(resolve);
		});
	}
}
