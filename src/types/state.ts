import type { Block } from '@/block';
import type { WebSocketService } from '@/web-socket';
import type { TNullable } from '@/types';

export const E_FORM_FIELDS_NAME = {
	first_name: 'first_name',
	second_name: 'second_name',
	display_name: 'display_name',
	login: 'login',
	password: 'password',
	oldPassword: 'oldPassword',
	newPassword: 'newPassword',
	confirmPassword: 'confirmPassword',
	email: 'email',
	phone: 'phone',
	avatar: 'avatar',
	title: 'title',
	message: 'message',
	search: 'search',
} as const;

export interface ISearchForm {
	login: string;
}

export interface IMessageForm {
	message: string;
}

export interface IAddUsersModalForm {
	login: string;
}

export interface IAddChatModalForm {
	title: string;
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

export type TFormsFields = ILoginForm & IRegistrationFormUi & ISearchForm;

export interface IUserBase {
	id: string;
	first_name: string;
	second_name: string;
	display_name: string;
	avatar: string;
	login: string;
}

export interface IUserResponse extends IUserBase {
	email: string;
	phone: string;
}

export type TUserRole = 'admin' | 'regular';

export interface IChatUserResponse extends IUserBase {
	role: TUserRole[];
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

export type TSocketChatDataType = 'message' | 'file';

export interface ISocketChatFile {
	id: string;
	user_id: string;
	path: string;
	filename: string;
	content_type: string;
	content_size: string;
	upload_date: string;
}

export interface ISocketChatMessage {
	chat_id: string;
	content: string;
	file: ISocketChatFile;
	id: string;
	is_read: boolean;
	time: string;
	type: TSocketChatDataType;
	user_id: string;
	login: string;
}

export interface IErrorPageState {
	text: string;
	code: string;
}

export interface IErrorState {
	error: IErrorPageState;
}

export type IChildren<T> = Record<string, T>;

export interface IInputData {
	value?: string;
	error?: string;
}

export interface IInputInfo {
	event: string;
	element: TNullable<Block>;
	selectionStart?: TNullable<number>;
}

export interface IInputChangeParams {
	data: IInputData;
	info: IInputInfo;
}

export interface ICurrentFocus {
	element: TNullable<Block>;
	selectionStart: TNullable<number>;
}

export interface IInputState {
	value: string;
	error: string;
}

export interface ICurrentChatData {
	users: IChatUserResponse[];
	info: IChat;
	owner: IChatUserResponse;
}

export interface IChatToken {
	chatId: string;
	token: string;
}

export interface IChatsSockets {
	chatsSockets: Map<string, WebSocketService>;
}

export interface IChatUnreadCounterResponse {
	unread_count: string;
}

export interface IChatUnreadCounter {
	chatId: string;
	unread_count: string;
}
