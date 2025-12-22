import { HTTPTransport } from '@/http';
import { BaseAPI } from './base-api';

const chatAPIInstance = new HTTPTransport();
const baseChatApi = '/api/v1/chats/';

export class ChatAPI extends BaseAPI {
	create() {
		return chatAPIInstance.post(`${baseChatApi}`);
	}
	request() {
		return chatAPIInstance.get(`${baseChatApi}full`);
	}
}
