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
		if (!Array.isArray(this.listeners[event])) {
			throw new Error(`Нет события: ${ event }`);
		} else {
			this.listeners[event].forEach((listener: TEbCallback) => {
				listener(...args);
			});
		}
	}

	clearSubs() {
		this.listeners = {};
	}
}
