export class WebSocketService {
	private socket: WebSocket | null = null;
	private pingInterval: NodeJS.Timeout | null = null;

	connect(userId: string, chatId: string, token: string) {
		console.log('socket connect', { userId, chatId, token });
		if (!userId || !chatId || !token) return;

		this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${ userId }/${ chatId }/${ token }`) as WebSocket | null;

		if (!this.socket) return;

		this.socket.addEventListener('open', () => {
			console.log('socket open');
			this.getOldMessages();

			this.pingInterval = setInterval(() => {
				this.send({ type: 'ping' });
			}, 10000);
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
		console.log('socket send: ', { data, s: this.socket });
		if (this.socket?.readyState === WebSocket.OPEN) {
			this.socket.send(JSON.stringify(data));
		}
	}

	private handleMessage(data: string) {
		try {
			console.log('socket handleMessage', { data });
			// const message = JSON.parse(data);

			// if (Array.isArray(message)) {
			// store.setState({
			// 	messages: {
			// 		...store.getState().messages,
			// 		[store.getState().activeChatId!]: message.reverse(),
			// 	},
			// });
			// } else if (message.type === 'message') {
			// const activeChatId = Store.getState().activeChatId;
			// if (activeChatId) {
			// const currentMessages = store.getState().messages[activeChatId] || [];
			// store.setState({
			// 	messages: {
			// 		...store.getState().messages,
			// 		[activeChatId]: [...currentMessages, message],
			// 	},
			// });
			// }
			// }
		} catch (error) {
			console.error('socket handleMessage error:', error);
		}
	}

	disconnect() {
		console.log('socket disconnect');
		if (this.socket) {
			this.socket.close();
			this.socket = null;
		}
		if (this.pingInterval) {
			clearInterval(this.pingInterval);
		}
	}
}
