import type { TPages } from '@/types/pages';

export interface IState {
    authorization: IFormState<ILoginForm>
    registration: IFormState<IRegistrationForm>
    currentPage: TPages
    focusElement: string | null
}

export interface ILoginForm {
    login: string
    password: string
}

export interface IRegistrationForm {
    second_name: string
    first_name: string
}

export interface IFormState<T> {
    data: T
    errors: T
}

export type TFormsFields = ILoginForm | IRegistrationForm;
