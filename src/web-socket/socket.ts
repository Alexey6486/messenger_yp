import { Store } from '../store';
import {
	MSG_OFFSET,
	SCK_PING,
	WS_BASE_URL,
} from '../constants';
import type {
	BlockProps,
	IChat,
} from '../types';
import {
	cloneDeep,
	isArray,
	isPlainObject,
} from '../utils';

export class WebSocketService {
	private socket: WebSocket | null = null;
	private chatId: string | null = null;
	private pingInterval: NodeJS.Timeout | null = null;

	connect(userId: string, chatId: string, token: string) {
		if (!userId || !chatId || !token) return;

		this.socket = new WebSocket(`${ WS_BASE_URL }/${ userId }/${ chatId }/${ token }`) as WebSocket | null;
		this.chatId = chatId;

		if (!this.socket) return;

		this.socket.addEventListener('open', () => {
			this.getOldMessages();
			this.pingInterval = setInterval(() => {
				this.send({ type: 'ping' });
			}, SCK_PING);
		});

		this.socket.addEventListener('message', (event) => {
			this.handleMessage(event.data);
		});

		this.socket.addEventListener('close', () => {
			if (this.pingInterval) {
				clearInterval(this.pingInterval);
			}
		});

		this.socket.addEventListener('error', (error) => {
			console.log('socket error', { error });
		});
	}

	sendMessage(content: string) {
		if (this.socket?.readyState === WebSocket.OPEN) {
			this.send({
				type: 'message',
				content,
			});
		}
	}

	getOldMessages(offset = MSG_OFFSET) {
		this.send({
			type: 'get old',
			content: offset.toString(),
		});
	}

	private send(data: unknown) {
		if (this.socket?.readyState === WebSocket.OPEN) {
			this.socket.send(JSON.stringify(data));
		}
	}

	private handleMessage(data: string) {
		try {
			const newMessages = JSON.parse(data);
			const storeMessages = Store.getState().messages;

			if (isArray(newMessages, true)) {
				let result = new Map();
				if (storeMessages) {
					result = cloneDeep(storeMessages);
					const oldMessages: IChat[] = result.get(this.chatId);
					const newMessagesList = [
						...(isArray(oldMessages, true) ? oldMessages : []),
						...newMessages.reverse(),
					];
					result.set(this.chatId, newMessagesList);
				} else {
					result.set(this.chatId, newMessages.reverse());
				}

				Store.set(
					'messages',
					result,
					'messages' as BlockProps,
				);
			} else if (isPlainObject(newMessages) && newMessages.type === 'message') {
				const storeChats = Store.getState().chats;
				const currentChatData = Store.getState().currentChatData;
				const storeMessages = Store.getState().messages;
				let result = new Map();
				if (storeMessages) {
					result = cloneDeep(storeMessages);
					const oldMessages: IChat[] = result.get(this.chatId);
					const newMessagesList = [
						...(isArray(oldMessages, true) ? oldMessages.reverse() : []),
						newMessages,
					];
					result.set(this.chatId, newMessagesList);
					Store.set(
						'messages',
						result,
						'messages' as BlockProps,
					);
					const messagesList = Store.getState().messagesList;
					Store.set(
						'messagesList',
						isArray(messagesList, true) ? cloneDeep([...messagesList, newMessages]) : [newMessages],
						'messagesList' as BlockProps,
					);
				}

				if (isArray(storeChats, true) && this.chatId) {
					Store.set(
						'chats',
						storeChats.map((el: IChat) => {
							if (el.id === this.chatId) {
								return {
									...el,
									...(currentChatData?.info?.id !== this.chatId && { unread_count: Number(el.unread_count) + 1 }),
									last_message: {
										time: newMessages.time,
										content: newMessages.content,
									},
								};
							}
							return el;
						}),
						'chats' as BlockProps,
					);
				}
			}
		} catch (error) {
			console.error('socket handleMessage error:', error);
		}
	}

	disconnect() {
		if (this.socket) {
			this.socket.close();
			this.socket = null;
			this.chatId = null;
		}
		if (this.pingInterval) {
			clearInterval(this.pingInterval);
		}
	}
}
