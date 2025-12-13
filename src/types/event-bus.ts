export const IEbEvents = {
	INIT: 'init',
	FLOW_CDM: 'flow:component-did-mount',
	FLOW_CDU: 'flow:component-did-update',
	FLOW_CWU: 'flow:component-will-unmount',
	FLOW_RENDER: 'flow:render',
} as const;

export type TEbCallback = (...args: unknown[]) => void;
// export type TEbCallback<T extends unknown[] = unknown[]> = (...args: T) => void;
export type TEbListener = Record<string, TEbCallback[]>;
