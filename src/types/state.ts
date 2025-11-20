import type { TPages } from '@/types';

export interface ILoginForm {
    login: string
    password: string
}

export interface IRegistrationForm {
    second_name: string
    first_name: string
}

export interface IFormState<T> {
    fields: T
    errors: T
}

export interface IPageState<T> {
    form: IFormState<T>
}

export interface IState {
    currentPage: TPages
    focusElement: string | null
    pages: {
        authorization: IPageState<ILoginForm>
        registration: IPageState<IRegistrationForm>
    }
}

export type TFormsFields = ILoginForm & IRegistrationForm;
