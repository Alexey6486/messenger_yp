import type { TPages } from '@/types';

export enum E_FORM_FIELDS_NAME {
	first_name = 'first_name',
	second_name = 'second_name',
	display_name = 'display_name',
	login = 'login',
	password = 'password',
	oldPassword = 'oldPassword',
	newPassword = 'newPassword',
	confirmPassword = 'confirmPassword',
	email = 'email',
	phone = 'phone',
	avatar = 'avatar',
	title = 'title',
	message = 'message',
}

export interface ISearchForm {
	[E_FORM_FIELDS_NAME.title]: string;
}

export interface IMessageForm {
	[E_FORM_FIELDS_NAME.message]: string;
}

export interface ILoginForm {
	[E_FORM_FIELDS_NAME.login]: string;
	[E_FORM_FIELDS_NAME.password]: string;
}

export interface IRegistrationFormDto {
	[E_FORM_FIELDS_NAME.first_name]: string;
	[E_FORM_FIELDS_NAME.second_name]: string;
	[E_FORM_FIELDS_NAME.login]: string;
	[E_FORM_FIELDS_NAME.email]: string;
	[E_FORM_FIELDS_NAME.password]: string;
	[E_FORM_FIELDS_NAME.phone]: string;
}

export interface IRegistrationFormUi extends IRegistrationFormDto {
	[E_FORM_FIELDS_NAME.confirmPassword]: string;
}

export interface IUserDataForm {
	id: string;
	[E_FORM_FIELDS_NAME.first_name]: string;
	[E_FORM_FIELDS_NAME.second_name]: string;
	[E_FORM_FIELDS_NAME.display_name]: string;
	[E_FORM_FIELDS_NAME.avatar]: string;
	[E_FORM_FIELDS_NAME.login]: string;
	[E_FORM_FIELDS_NAME.email]: string;
	[E_FORM_FIELDS_NAME.phone]: string;
}

export interface IUserPasswordForm {
	[E_FORM_FIELDS_NAME.oldPassword]: string;
	[E_FORM_FIELDS_NAME.newPassword]: string;
	[E_FORM_FIELDS_NAME.confirmPassword]: string;
}

export interface IFormState<T> {
	fields: T;
	errors: T;
}

export type TFormsFields = ILoginForm & IRegistrationFormUi & ISearchForm;

export interface IUserBase {
	id: string;
	[E_FORM_FIELDS_NAME.first_name]: string;
	[E_FORM_FIELDS_NAME.second_name]: string;
	[E_FORM_FIELDS_NAME.display_name]: string;
	[E_FORM_FIELDS_NAME.avatar]: string;
	[E_FORM_FIELDS_NAME.login]: string;
}

export type TUserRole = 'admin' | 'regular';

export interface IChatUserResponse extends IUserBase {
	role: TUserRole[];
}

export interface IUserResponse extends IUserBase {
	[E_FORM_FIELDS_NAME.email]: string;
	[E_FORM_FIELDS_NAME.phone]: string;
}

export interface IChatLastMessage {
	user: IUserResponse;
	time: string;
	content: string;
}

export interface IChat {
	id: string;
	title: string;
	avatar: string;
	unread_count: string;
	created_by: string;
	last_message: IChatLastMessage;
}

export interface IMainPageState {
	currentChatId: string | null;
	chatsSearchForm: IFormState<ISearchForm>;
	newMessageForm: IFormState<IMessageForm>;
	chats: IChat[];
	messages: IChat[] | null;
}

export interface IMainPageHbsState extends IMainPageState {
	user: IUserResponse;
}

export interface IErrorPageState {
	text: string;
	code: string;
}

export interface IProfilePageState {
	isDataEdit: boolean
	isPasswordEdit: boolean
	passwordForm: IFormState<IUserPasswordForm>,
	userForm: IFormState<IUserDataForm>,
}

export interface IProfilePageHbsState extends IProfilePageState {
	user: IUserResponse,
}

export interface IState {
	currentPage: TPages
	user: IUserResponse,
	pages: {
		authorization: { authorizationForm: IFormState<ILoginForm> }
		registration: { registrationForm: IFormState<IRegistrationFormUi> }
		main: IMainPageState
		profile: IProfilePageState
		error: IErrorPageState
	}
}

export type IChildren<T> = Record<string, T>;

export interface IInputData {
	value?: string;
	error?: string;
}

export interface IInputInfo<T> {
	event: string;
	element: T;
	selectionStart?: number | null;
}

export interface IInputChangeParams<T> {
	data: IInputData;
	info: IInputInfo<T>;
}
