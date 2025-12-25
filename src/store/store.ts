import { EventBus } from '@/event-bus';
import { setProps } from '@/utils';
import { StoreEvents } from '@/store/types';
import type { BlockProps } from '@/types';

class Store extends EventBus {
	private state: Partial<BlockProps> = {};

	public getState() {
		return this.state;
	}

	public set(path: string, value: unknown) {
		setProps(this.state, path, value);

		this.emit(StoreEvents.Updated);
	};
}

export default new Store();
