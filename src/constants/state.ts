import type { IFormState, ILoginForm, IRegistrationForm } from '@/types';

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

export const INIT_REGISTRATION_STATE: IFormState<IRegistrationForm> = {
    fields: {
        first_name: '',
        second_name: '',
    },
    errors: {
        first_name: '',
        second_name: '',
    },
};
