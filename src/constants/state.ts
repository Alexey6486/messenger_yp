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
};
