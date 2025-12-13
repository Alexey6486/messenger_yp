import { E_EB_EVENTS } from '@/types';
import type {
	TEbEventMap,
	TEbCallback,
} from '@/types';

export class EventBus {
	private listeners: Partial<{ [K in keyof TEbEventMap]: TEbCallback[] }> = {};

	constructor() {
		this.listeners = {};
	}

	on(event: E_EB_EVENTS, callback: (...args: TEbEventMap[E_EB_EVENTS]) => void) {
		let eventArray: TEbCallback[] | undefined = this.listeners[event];
		if (!Array.isArray(eventArray)) {
			eventArray = [];
		}
		eventArray.push(callback);
	}

	off(event: E_EB_EVENTS, callback: TEbCallback) {
		let eventArray: TEbCallback[] | undefined = this.listeners[event];
		if (!Array.isArray(eventArray)) {
			throw new Error(`Нет события: ${event}`);
		} else {
			this.listeners[event] = eventArray.filter(
				listener => listener !== callback,
			);
		}
	}

	emit(event: E_EB_EVENTS, ...args: TEbEventMap[E_EB_EVENTS]) {
		let eventArray: TEbCallback[] | undefined = this.listeners[event];
		if (!Array.isArray(eventArray)) {
			throw new Error(`Нет события: ${event}`);
		} else {
			eventArray.forEach((listener) => {
				listener(...args);
			});
		}
	}
}
