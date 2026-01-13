import type { TPages } from '@/types';

export const PAGES: Record<string, TPages> = {
	AUTHORIZATION: 'authorization',
	REGISTRATION: 'registration',
	MAIN: 'main',
	ERROR: 'error',
	PROFILE: 'profile',
};

export const PAGES_URL: Record<string, string> = {
	AUTHORIZATION: '/',
	REGISTRATION: '/sign-up',
	MAIN: '/messenger',
	PROFILE: '/setting',
	NOT_FOUND: '/404',
};
