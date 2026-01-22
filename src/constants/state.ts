import type {
	IAddChatModalForm,
	IAddUsersModalForm,
	IErrorPageState,
	IFormState,
	ILoginForm,
	IMessageForm,
	IRegistrationFormUi,
	ISearchForm,
	IUserDataForm,
	IUserPasswordForm,
	IUserResponse,
} from '../types';

export const INIT_LOGIN_STATE: IFormState<ILoginForm> = {
	fields: {
		login: '',
		password: '',
	},
	errors: {
		login: '',
		password: '',
	},
};

export const INIT_REGISTRATION_STATE: IFormState<IRegistrationFormUi> = {
	fields: {
		first_name: '',
		second_name: '',
		login: '',
		email: '',
		password: '',
		phone: '',
		confirmPassword: '',
	},
	errors: {
		first_name: '',
		second_name: '',
		login: '',
		email: '',
		password: '',
		phone: '',
		confirmPassword: '',
	},
};

export const INIT_SEARCH_STATE: IFormState<ISearchForm> = {
	fields: { login: '' },
	errors: { login: '' },
};

export const INIT_ADD_CHAT_STATE: IFormState<IAddChatModalForm> = {
	fields: { title: '' },
	errors: { title: '' },
};

export const INIT_ADD_USERS_STATE: IFormState<IAddUsersModalForm> = {
	fields: { login: '' },
	errors: { login: '' },
};

export const INIT_MESSAGE_STATE: IFormState<IMessageForm> = {
	fields: { message: '' },
	errors: { message: '' },
};

export const INIT_ERROR_STATE: IErrorPageState = {
	code: '404',
	text: 'Страница не найдена',
};

export const INIT_PROFILE_USER_PASSWORD_STATE: IFormState<IUserPasswordForm> = {
	fields: {
		oldPassword: '',
		newPassword: '',
		confirmPassword: '',
	},
	errors: {
		oldPassword: '',
		newPassword: '',
		confirmPassword: '',
	},
};

export const INIT_USER_DATA: IUserResponse = {
	id: '',
	first_name: '',
	second_name: '',
	display_name: '',
	login: '',
	email: '',
	phone: '',
	avatar: '',
};

export const INIT_PROFILE_USER_DATA_STATE: IFormState<IUserDataForm> = {
	fields: {
		id: '',
		first_name: '',
		second_name: '',
		display_name: '',
		login: '',
		email: '',
		phone: '',
		avatar: '',
	},
	errors: {
		id: '',
		first_name: '',
		second_name: '',
		display_name: '',
		login: '',
		email: '',
		phone: '',
		avatar: '',
	},
};
