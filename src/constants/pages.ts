import type { TPages } from '@/types';

export const PAGES: Record<string, TPages> = {
    AUTHORIZATION: 'authorization',
    REGISTRATION: 'registration',
    MAIN: 'main',
    ERROR: 'error',
};

export const IDS: Record<string, string> = {
    FORM_BUTTONS_ID: 'form-buttons',
    FORM_LOGIN_ID: 'form-login',
    FORM_REGISTRATION_ID: 'form-registration',
    ERROR_RETURN_ID: 'error-return-btn',
    CHATS_LIST_ID: 'chats-list',
};

export const DATASET: Record<string, string> = {
    CHAT: 'chat',
};
