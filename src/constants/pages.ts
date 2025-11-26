import type { TPages } from '@/types';

export const PAGES: Record<string, TPages> = {
    AUTHORIZATION: 'authorization',
    REGISTRATION: 'registration',
    MAIN: 'main',
    ERROR: 'error',
    PROFILE: 'profile',
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
    DD: 'drop-down',
    OPTION: 'option',
    MESSAGE: 'message',
    PROFILE_BTN: 'profileBtn',
    ERROR: 'error',
    PAGE_LINK: 'pageLink',
};

export const CLASSES: Record<string, string> = {
    DDO: 'drop-down-options',
    PL: 'profile-link',
    ACT: 'active',
};
