import type {
	IEventBus,
	TEbCallback,
	TEbListener,
} from '@/types';

export class EventBus implements IEventBus {
	private listeners: TEbListener = {};

	constructor() {
		this.listeners = {};
	}

	on<T = unknown>(event: string, callback: TEbCallback<T>): void {
		if (!Array.isArray(this.listeners[event])) {
			this.listeners[event] = [];
		}

		this.listeners[event] = [...this.listeners[event], callback];
	}

	off<T = unknown>(event: string, callback: TEbCallback<T>): void {
		if (!Array.isArray(this.listeners[event])) {
			throw new Error(`Нет события: ${ event }`);
		} else {
			this.listeners[event] = this.listeners[event].filter(
				listener => listener !== callback,
			);
		}
	}

	emit<T = unknown>(event: string, data?: T): void {
		if (!Array.isArray(this.listeners[event])) {
			throw new Error(`Нет события: ${ event }`);
		} else {
			this.listeners[event].forEach((listener: TEbCallback) => {
				listener(data);
			});
		}
	}
}
