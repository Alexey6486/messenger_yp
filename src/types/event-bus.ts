export const EB_EVENTS = {
	INIT: 'init',
	FLOW_CDM: 'flow:component-did-mount',
	FLOW_CDU: 'flow:component-did-update',
	FLOW_CWU: 'flow:component-will-unmount',
	FLOW_RENDER: 'flow:render',
} as const;

// export type TEbCallback = (...args: unknown[]) => void;
// export type TEbCallback<T extends unknown[] = unknown[]> = (...args: T) => void;
// export type TEbListener = Record<string, TEbCallback[]>;

export type TEbCallback<T = unknown> = (data: T) => void;
export type TEbListener = Record<string, TEbCallback[]>;

export interface IEventBus {
	on<T = unknown>(event: string, handler: TEbCallback<T>): void;

	off<T = unknown>(event: string, handler: TEbCallback<T>): void;

	emit<T = unknown>(event: string, data?: T): void;
}
