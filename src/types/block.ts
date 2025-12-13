import type { TNullable } from '@/types/general';
import type { IEventBus } from '@/types/event-bus';

export interface BlockProps {
	markup?: Record<string, string>;
	events?: Record<string, (e: Event) => void>;

	styles?: { [key: string]: string };

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: unknown;
}

export interface IComponent<T> {
	_id: string;
	_element: TNullable<Element | HTMLElement | HTMLInputElement>;
	data?: T;
	attr?: Record<string, string>;
	children?: Record<string, IComponent<T>>;
	childrenList?: Record<string, IComponent<T>>;
	allInstances?: Record<string, IComponent<T>>;
	events?: Record<string, (e: Event) => void>;
	eventBus: () => IEventBus;

	setProps(nextProps: T): void;

	getContent(): Element | HTMLElement | HTMLInputElement;

	dispatchComponentDidMount(): void;

	dispatchComponentWillUnmount(): void;

	render(): string;

	toggleClassList(className: string, elementId?: string): void;
}

export interface IComponentProps<T> {
	parent: TNullable<Element | HTMLElement>;
	markup?: Record<string, string>;
	children?: Record<string, IComponent<T>>;
	childrenList?: Record<string, IComponent<T>>;
	allInstances?: Record<string, IComponent<T>>;
	events?: Record<string, (e: Event) => void>;
	attr?: Record<string, string>;
	data?: T;
}
