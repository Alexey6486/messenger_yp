import type { TPages } from '@/types';

export interface ILoginForm {
    login: string
    password: string
}

export interface IRegistrationFormDto {
    first_name: string
    second_name: string
    login: string
    email: string
    password: string
    phone: string
}

export interface IRegistrationFormUi extends IRegistrationFormDto {
    confirmPassword: string
}

export interface IFormState<T> {
    fields: T
    errors: T
}

export interface IPageState<T> {
    form: IFormState<T>
}

export type TFormsFields = ILoginForm & IRegistrationFormUi;

export interface IUserBase {
    id: string
    first_name: string
    second_name: string
    display_name: string
    avatar: string
    login: string
}

export type TUserRole = 'admin' | 'regular';

export interface IChatUserResponse extends IUserBase {
    role: TUserRole[]
}

export interface IUserResponse extends IUserBase {
    email: string
    phone: string
}

export interface IChatLastMessage {
    user: IUserResponse,
    time: string
    content: string
}

export interface IChat {
    id: string
    title: string
    avatar: string
    unread_count: string
    created_by: string
    last_message: IChatLastMessage
}

export interface IMainPageState {
    user: IUserResponse | null
    currentChatId: string | null
    search: string
    chats: IChat[]
}

export interface IErrorPageState {
    text: string
    code: string
}

export interface IState {
    currentPage: TPages
    focusElement: string | null
    error: IErrorPageState
    openedDropDownId: string | null
    pages: {
        authorization: IPageState<ILoginForm>
        registration: IPageState<IRegistrationFormUi>
        main: any
    }
}
