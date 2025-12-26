import { EventBus } from '@/event-bus';
import {
	cloneDeep,
	setProps,
} from '@/utils';
import { StoreEvents } from '@/store/types';
import type { BlockProps } from '@/types';
import { INIT_LOGIN_STATE } from '@/constants';
import type {
	IFormState,
	ILoginForm,
} from '@/types';

class Store extends EventBus {
	private state: Partial<BlockProps> = {
		authorizationForm: cloneDeep(INIT_LOGIN_STATE) as IFormState<ILoginForm>,
	};

	public getState() {
		return this.state;
	}

	public set(path: string, value: unknown) {
		setProps(this.state, path, value);

		this.emit(StoreEvents.Updated);
	}
}

export default new Store();
