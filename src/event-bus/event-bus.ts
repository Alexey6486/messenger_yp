import type {
	ILoginForm,
	IRegistrationFormDto,
} from '@/types';

interface IEbEvents {
	'user:login': ILoginForm;
	'user:logout': null;
	'user:registration': IRegistrationFormDto;
	'init': 'init',
	'flow:component-did-mount': 'flow:component-did-mount',
	'flow:component-did-update': 'flow:component-did-update',
	'flow:render': 'flow:render',
}

type TEbCallback<K extends keyof IEbEvents> = (...args: any[]) => void;
type TEbListener =
	{ [K in keyof IEbEvents]: TEbCallback<K>[] }
	| {};

export class EventBus {
	private listeners: TEbListener = {};

	constructor() {
		this.listeners = {};
	}

	on<K extends keyof IEbEvents>(event: K, callback: TEbCallback<K>): void {
		console.log('on: ', { event, callback });

		if (!Array.isArray(this.listeners[event])) {
			this.listeners[event] = [];
		}

		this.listeners[event] = [...this.listeners[event], callback];
	}

	off<K extends keyof IEbEvents>(event: K, callback: TEbCallback<K>) {
		if (!Array.isArray(this.listeners[event])) {
			throw new Error(`Нет события: ${ event }`);
		} else {
			this.listeners[event] = this.listeners[event].filter(
				listener => listener !== callback,
			);
		}
	}

	emit<K extends keyof IEbEvents>(event: K, ...args): void {
		console.log('emit: ', { event, args });

		if (!Array.isArray(this.listeners[event])) {
			throw new Error(`Нет события: ${ event }`);
		} else {
			(this.listeners[event] as []).forEach(listener => {
				listener(...args);
			});
		}
	}
}
