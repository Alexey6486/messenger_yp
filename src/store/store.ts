import { EventBus } from '../event-bus';
import {
	cloneDeep,
	setProps,
} from '../utils';
import { StoreEvents } from './types';
import type {
	BlockProps,
	IAddChatModalForm,
	IAddUsersModalForm,
	IFormState,
	ILoginForm,
	IMessageForm,
	IRegistrationFormUi,
	ISearchForm,
	IUserDataForm,
	IUserPasswordForm,
	IUserResponse,
} from '../types';
import {
	INIT_ADD_CHAT_STATE,
	INIT_ADD_USERS_STATE,
	INIT_LOGIN_STATE,
	INIT_MESSAGE_STATE,
	INIT_PROFILE_USER_DATA_STATE,
	INIT_PROFILE_USER_PASSWORD_STATE,
	INIT_REGISTRATION_STATE,
	INIT_SEARCH_STATE,
	INIT_USER_DATA,
} from '../constants';

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
		chatsSearchForm: cloneDeep(INIT_SEARCH_STATE) as IFormState<ISearchForm>,
		newMessageForm: cloneDeep(INIT_MESSAGE_STATE) as IFormState<IMessageForm>,
		chats: null,
		messages: null,
		messagesList: null,
		modalAddChatForm: cloneDeep(INIT_ADD_CHAT_STATE) as IFormState<IAddChatModalForm>,
		modalAddUsersForm: cloneDeep(INIT_ADD_USERS_STATE) as IFormState<IAddUsersModalForm>,
		currentChatData: null,
		searchUsersList: null,
		addUsersList: null,
		chatsSockets: null,
	};

	public getState() {
		return this.state;
	}

	public set(
		path: string,
		value: unknown,
		stateKey?: BlockProps,
		noEmit?: boolean,
		storeEvent = StoreEvents.Updated,
	) {
		setProps(this.state, path, value);

		if (!noEmit) {
			if (stateKey) {
				this.emit(storeEvent, stateKey);
			} else {
				this.emit(storeEvent);
			}
		}
	}
}

export default new Store();
