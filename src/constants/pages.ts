import type { TPages } from '@/types';

export const PAGES: Record<string, TPages> = {
	AUTHORIZATION: 'authorization',
	REGISTRATION: 'registration',
	MAIN: 'main',
	ERROR: 'error',
	PROFILE: 'profile',
};

export const PAGES_URL: Record<string, string> = {
	AUTHORIZATION: '/messenger_yp/',
	REGISTRATION: '/messenger_yp/sign-up',
	MAIN: '/messenger_yp/messenger',
	PROFILE: '/messenger_yp/setting',
	NOT_FOUND: '/messenger_yp/404',
};
