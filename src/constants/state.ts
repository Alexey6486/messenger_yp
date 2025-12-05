import type {
	IFormState,
	ILoginForm,
	IMainPageState,
	IRegistrationFormUi,
	IProfilePageState,
	ISearchForm,
	IUserPasswordForm,
	IUserDataForm,
	IUserResponse,
	IErrorPageState,
	IAddUserModalState,
	IModalState,
} from '@/types';

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
	fields: { search: '' },
	errors: { search: '' },
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
	id: 'logged_user',
	first_name: 'Иван',
	second_name: 'Иванов',
	display_name: 'Иван',
	avatar: '',
	login: 'ivan',
	email: 'ivan@yandex.ru',
	phone: '123456789',
};

export const INIT_PROFILE_USER_DATA_STATE: IFormState<IUserDataForm> = {
	fields: INIT_USER_DATA,
	errors: {
		id: '',
		first_name: '',
		second_name: '',
		display_name: '',
		avatar: '',
		login: '',
		email: '',
		phone: 'Формат телефона укзана не верно',
	},
};

export const INIT_PROFILE_PAGE_STATE: IProfilePageState = {
	isDataEdit: false,
	isPasswordEdit: false,
	passwordForm: INIT_PROFILE_USER_PASSWORD_STATE,
	userForm: INIT_PROFILE_USER_DATA_STATE,
};

export const INIT_MAIN_PAGE_STATE: IMainPageState = {
	currentChatId: '',
	searchForm: INIT_SEARCH_STATE,
	message: '',
	chats: [
		{
			id: 'chat_id_1',
			title: 'title',
			avatar: '',
			unread_count: '12',
			created_by: 'created_by',
			last_message: {
				time: 'time',
				content: 'contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentc3',
				user: {
					id: 'user_id_1',
					first_name: 'first_name',
					second_name: 'second_name',
					display_name: 'display_name',
					avatar: 'user_avatar',
					login: 'login',
					email: 'email',
					phone: 'phone',
				},
			},
		},
		{
			id: 'chat_id_2',
			title: 'title',
			avatar: '',
			unread_count: '2',
			created_by: 'created_by',
			last_message: {
				time: 'time',
				content: 'content content content content content content content content content content content',
				user: {
					id: 'user_id_2',
					first_name: 'first_name',
					second_name: 'second_name',
					display_name: 'display_name',
					avatar: 'user_avatar',
					login: 'login',
					email: 'email',
					phone: 'phone',
				},
			},
		},
	],
	messages: [
		{
			id: 'msg_1',
			title: 'title',
			avatar: '',
			unread_count: '12',
			created_by: 'user_id_1',
			last_message: {
				time: '12:45',
				content: 'contentcon tentcontentco ntentc on tent conten tconte ntcon tentco n tentcon tentcon tentc3',
				user: {
					id: 'user_id_1',
					first_name: 'first_name',
					second_name: 'second_name',
					display_name: 'display_name',
					avatar: 'user_avatar',
					login: 'login',
					email: 'email',
					phone: 'phone',
				},
			},
		},
		{
			id: 'msg_2',
			title: 'title',
			avatar: '',
			unread_count: '12',
			created_by: 'logged_user',
			last_message: {
				time: '16:55',
				content: 'content ont en',
				user: {
					id: 'logged_user',
					first_name: 'Иван',
					second_name: 'Иванов',
					display_name: 'Иван',
					avatar: 'user_avatar',
					login: 'login',
					email: 'email',
					phone: 'phone',
				},
			},
		},
	],
};

export const INIT_ADD_USER_MODAL_STATE: IModalState<IAddUserModalState> = {
	title: 'Добавить пользователя',
	button: {
		save: {
			text: 'Добавить',
			id: 'Добавить',
			dataset: 'add-user',
		},
	},
	form: {
		fields: { login: '' },
		errors: { login: '' },
	},
	error: '',
};
