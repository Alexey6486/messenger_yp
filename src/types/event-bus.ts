export enum E_EB_EVENTS {
	INIT = 'init',
	FLOW_CDM = 'flow:component-did-mount',
	FLOW_CDU = 'flow:component-did-update',
	FLOW_CWU = 'flow:component-will-unmount',
	FLOW_RENDER = 'flow:render',
}

export type TEbEventMap = {
	[E_EB_EVENTS.INIT]: Array<unknown>;
	[E_EB_EVENTS.FLOW_CDM]: Array<unknown>;
	[E_EB_EVENTS.FLOW_CDU]: Array<unknown>;
	[E_EB_EVENTS.FLOW_CWU]: Array<unknown>;
	[E_EB_EVENTS.FLOW_RENDER]: Array<unknown>;
};

export type TEbCallback = (...args: TEbEventMap[E_EB_EVENTS]) => void
