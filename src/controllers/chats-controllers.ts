import { ChatAPI } from '@/api';
import store from '@/store/store';

const api = new ChatAPI();

export class ChatController {
	public getChats() {
		api.request().then(data => store.set('chats', data));
	}
}
