import type { IFormState, ILoginForm, IRegistrationForm } from '@/types';

export const INIT_LOGIN_STATE: IFormState<ILoginForm> = {
    data: {
        login: '',
        password: '',
    },
    errors: {
        login: '',
        password: '',
    },
};

export const INIT_REGISTRATION_STATE: IFormState<IRegistrationForm> = {
    data: {
        first_name: '',
        second_name: '',
    },
    errors: {
        first_name: '',
        second_name: '',
    },
};