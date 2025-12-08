import type { TPages } from '@/types';

export interface ISearchForm {
	search: string;
}

export interface ILoginForm {
	login: string;
	password: string;
}

export interface IRegistrationFormDto {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
}

export interface IRegistrationFormUi extends IRegistrationFormDto {
	confirmPassword: string;
}

export interface IUserDataForm {
	id: string;
	first_name: string;
	second_name: string;
	display_name: string;
	avatar: string;
	login: string;
	email: string;
	phone: string;
}

export interface IUserPasswordForm {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
}

export interface IFormState<T> {
	fields: T;
	errors: T;
}

export interface IPageState<T> {
	form: IFormState<T>;
}

export type TFormsFields = ILoginForm & IRegistrationFormUi & ISearchForm;

export interface IUserBase {
	id: string;
	first_name: string;
	second_name: string;
	display_name: string;
	avatar: string;
	login: string;
}

export type TUserRole = 'admin' | 'regular';

export interface IChatUserResponse extends IUserBase {
	role: TUserRole[];
}

export interface IUserResponse extends IUserBase {
	email: string;
	phone: string;
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

export interface IModalState<T> {
	title: string;
	button: {
		save: {
			text: string
			id: string
			dataset: string
		}
	};
	form: IFormState<T>;
	error: string;
}

export interface IAddUserModalState {
	login: string;
}

export type TModalFields = IAddUserModalState;

export interface IMainPageState {
	currentChatId: string | null;
	searchForm: IFormState<ISearchForm>;
	message: string;
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
	focusElement: string | null
	user: IUserResponse,
	pages: {
		authorization: IPageState<ILoginForm>
		registration: IPageState<IRegistrationFormUi>
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
