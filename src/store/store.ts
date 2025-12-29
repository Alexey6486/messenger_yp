import { EventBus } from '@/event-bus';
import {
	cloneDeep,
	setProps,
} from '@/utils';
import { StoreEvents } from '@/store/types';
import type {
	BlockProps,
	IErrorPageState,
	IFormState,
	ILoginForm,
	IRegistrationFormUi,
} from '@/types';
import {
	INIT_ERROR_STATE,
	INIT_LOGIN_STATE,
	INIT_REGISTRATION_STATE,
} from '@/constants';

class Store extends EventBus {
	private state: Partial<BlockProps> = {
		authorizationForm: cloneDeep(INIT_LOGIN_STATE) as IFormState<ILoginForm>,
		registrationForm: cloneDeep(INIT_REGISTRATION_STATE) as IFormState<IRegistrationFormUi>,
		error: cloneDeep(INIT_ERROR_STATE) as IErrorPageState,
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
