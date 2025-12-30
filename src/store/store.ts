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
	IUserResponse,
	IUserDataForm,
	IUserPasswordForm,
} from '@/types';
import {
	INIT_ERROR_STATE,
	INIT_LOGIN_STATE,
	INIT_REGISTRATION_STATE,
	INIT_USER_DATA,
	INIT_PROFILE_USER_DATA_STATE,
	INIT_PROFILE_USER_PASSWORD_STATE,
} from '@/constants';

class Store extends EventBus {
	private state: Partial<BlockProps> = {
		authorizationForm: cloneDeep(INIT_LOGIN_STATE) as IFormState<ILoginForm>,
		registrationForm: cloneDeep(INIT_REGISTRATION_STATE) as IFormState<IRegistrationFormUi>,
		error: cloneDeep(INIT_ERROR_STATE) as IErrorPageState,
		userData: cloneDeep(INIT_USER_DATA) as IUserResponse,
		isDataEdit: false,
		isPasswordEdit: false,
		passwordForm: cloneDeep(INIT_PROFILE_USER_PASSWORD_STATE) as IFormState<IUserPasswordForm>,
		userForm: cloneDeep(INIT_PROFILE_USER_DATA_STATE) as IFormState<IUserDataForm>,
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
