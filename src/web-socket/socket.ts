import { Store } from '@/store';
import type {
	BlockProps,
	IChat,
} from '@/types';
import {
	cloneDeep,
	isArray,
	isPlainObject,
} from '@/utils';

export class WebSocketService {
	private socket: WebSocket | null = null;
	private chatId: string | null = null;
	private pingInterval: NodeJS.Timeout | null = null;

	connect(userId: string, chatId: string, token: string) {
		console.log('socket connect', { userId, chatId, token });
		if (!userId || !chatId || !token) return;

		this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${ userId }/${ chatId }/${ token }`) as WebSocket | null;
		this.chatId = chatId;

		if (!this.socket) return;

		this.socket.addEventListener('open', () => {
			console.log('socket open');
			this.getOldMessages();

			this.pingInterval = setInterval(() => {
				this.send({ type: 'ping' });
			}, 30000);
		});

		this.socket.addEventListener('message', (event) => {
			console.log('socket message', { event });
			this.handleMessage(event.data);
		});

		this.socket.addEventListener('close', (event) => {
			console.log('socket closed', { event });
			if (this.pingInterval) {
				clearInterval(this.pingInterval);
			}
		});

		this.socket.addEventListener('error', (error) => {
			console.log('socket error', { error });
		});
	}

	sendMessage(content: string) {
		console.log('socket sendMessage: ', { content, s: this.socket });
		if (this.socket?.readyState === WebSocket.OPEN) {
			this.send({
				type: 'message',
				content,
			});
		}
	}

	getOldMessages(offset = 0) {
		this.send({
			type: 'get old',
			content: offset.toString(),
		});
	}

	private send(data: unknown) {
		// console.log('socket send: ', { data, s: this.socket });
		if (this.socket?.readyState === WebSocket.OPEN) {
			this.socket.send(JSON.stringify(data));
		}
	}

	private handleMessage(data: string) {
		try {
			console.log('socket handleMessage data', { data });
			const newMessages = JSON.parse(data);
			console.log('socket handleMessage message', { newMessages, chatId: this.chatId });
			const storeMessages = Store.getState().messages;

			if (isArray(newMessages, true)) {
				let result = new Map();
				if (storeMessages) {
					result = cloneDeep(storeMessages);
					console.log('socket handleMessage messages 1', { result, storeMessages });
					const oldMessages: IChat[] = result.get(this.chatId);
					const newMessagesList = [
						...(isArray(oldMessages, true) ? oldMessages : []),
						...newMessages.reverse(),
					];
					result.set(this.chatId, newMessagesList);
				} else {
					result.set(this.chatId, newMessages.reverse());
				}
				console.log('socket handleMessage messages 2', { result });
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
					console.log('socket handleMessage messages 21', { result, storeMessages });
					const oldMessages: IChat[] = result.get(this.chatId);
					const newMessagesList = [
						...(isArray(oldMessages, true) ? oldMessages.reverse() : []),
						newMessages,
					];
					result.set(this.chatId, newMessagesList);
					console.log('socket handleMessage messages 22', { result });
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
		console.log('socket disconnect');
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
