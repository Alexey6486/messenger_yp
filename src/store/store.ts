import { EventBus } from '@/event-bus';
import {
	cloneDeep,
	setProps,
} from '@/utils';
import { StoreEvents } from '@/store/types';
import type {
	BlockProps,
	IFormState,
	IUserDataForm,
	IUserPasswordForm,
	ILoginForm,
	IRegistrationFormUi,
	IUserResponse,
} from '@/types';
import {
	INIT_LOGIN_STATE,
	INIT_PROFILE_USER_DATA_STATE,
	INIT_PROFILE_USER_PASSWORD_STATE,
	INIT_REGISTRATION_STATE,
	INIT_USER_DATA,
} from '@/constants';

class Store extends EventBus {
	private state: Partial<BlockProps> = {
		authorizationForm: cloneDeep(INIT_LOGIN_STATE) as IFormState<ILoginForm>,
		registrationForm: cloneDeep(INIT_REGISTRATION_STATE) as IFormState<IRegistrationFormUi>,
		userData: cloneDeep(INIT_USER_DATA) as IUserResponse,
		passwordForm: cloneDeep(INIT_PROFILE_USER_PASSWORD_STATE) as IFormState<IUserPasswordForm>,
		userForm: cloneDeep(INIT_PROFILE_USER_DATA_STATE) as IFormState<IUserDataForm>,
		error: null,
		isDataEdit: false,
		isPasswordEdit: false,
		modalError: null,
	};

	public getState() {
		return this.state;
	}

	public set(path: string, value: unknown, stateKey?: BlockProps, noEmit?: boolean) {
		console.log('Store set: ', { path, value });
		setProps(this.state, path, value);

		if (!noEmit) {
			if (stateKey) {
				this.emit(StoreEvents.Updated, stateKey);
			} else {
				this.emit(StoreEvents.Updated);
			}
		}
	}
}

export default new Store();
