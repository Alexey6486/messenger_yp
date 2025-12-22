import { EventBus } from '@/event-bus';

export enum StoreEvents {
	Updated = 'updated',
}

export interface Indexed {

}

class Store extends EventBus {
	private state: Indexed = {};

	public getState() {
		return state;
	}

	public set(path: string, value: unknown) {
		set(this.state, path, value);

		// метод EventBus
		this.emit(StoreEvents.Updated);
	};
}

export default new Store();
