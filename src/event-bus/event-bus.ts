import type {
	TEbCallback,
	TEbListener,
} from '@/types';

export class EventBus {
	private listeners: TEbListener = {};

	constructor() {
		this.listeners = {};
	}

	on(event: string, callback: TEbCallback): void {
		console.log('on: ', { event, callback });

		if (!Array.isArray(this.listeners[event])) {
			this.listeners[event] = [];
		}

		this.listeners[event] = [...this.listeners[event], callback];
	}

	off(event: string, callback: TEbCallback) {
		if (!Array.isArray(this.listeners[event])) {
			throw new Error(`Нет события: ${ event }`);
		} else {
			this.listeners[event] = this.listeners[event].filter(
				listener => listener !== callback,
			);
		}
	}

	emit(event: string, ...args: unknown[]): void {
		console.log('emit: ', { event, args });

		if (!Array.isArray(this.listeners[event])) {
			throw new Error(`Нет события: ${ event }`);
		} else {
			this.listeners[event].forEach((listener: TEbCallback) => {
				listener(...args);
			});
		}
	}
}
