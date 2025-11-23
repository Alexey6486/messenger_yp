import type {
    IFormState,
    ILoginForm,
    IMainPageState,
    IRegistrationFormUi,
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

export const INIT_MAIN_PAGE_STATE: IMainPageState = {
    user: null,
    currentChatId: null,
    search: '',
    chats: [
        {
            id: 'chat_id',
            title: 'title',
            avatar: 'chat_avatar',
            unread_count: 'unread_count',
            created_by: 'created_by',
            last_message: {
                time: 'time',
                content: 'content',
                user: {
                    id: 'user_id',
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
};
