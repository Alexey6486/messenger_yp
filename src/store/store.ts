import { EventBus } from '@/event-bus';
import {
	cloneDeep,
	setProps,
} from '@/utils';
import { StoreEvents } from '@/store/types';
import type {
	BlockProps,
	IFormState,
	ILoginForm,
	IMessageForm,
	IRegistrationFormUi,
	ISearchForm,
	IUserDataForm,
	IUserPasswordForm,
	IUserResponse,
} from '@/types';
import {
	INIT_LOGIN_STATE,
	INIT_MESSAGE_STATE,
	INIT_PROFILE_USER_DATA_STATE,
	INIT_PROFILE_USER_PASSWORD_STATE,
	INIT_REGISTRATION_STATE,
	INIT_SEARCH_STATE,
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

		currentChatId: null,
		chatsSearchForm: cloneDeep(INIT_SEARCH_STATE) as IFormState<ISearchForm>,
		newMessageForm: cloneDeep(INIT_MESSAGE_STATE) as IFormState<IMessageForm>,
		chats: [],
		messages: [],
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
