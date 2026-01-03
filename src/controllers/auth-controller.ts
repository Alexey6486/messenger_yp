import { AuthAPI } from '@/api';
import { Store } from '@/store';
import {
	PAGES_URL,
	STORAGE_KEY,
} from '@/constants';
import type { RequestOptions } from 'http';
import type { IRequestOptions } from '@/http';
import type { Router } from '@/router';
import type { Block } from '@/block';
import type { IErrorPageState } from '@/types';
import { isErrorWithMessage } from '@/utils';

const api = new AuthAPI();

class AuthController {
	public async signin(options: Partial<RequestOptions & IRequestOptions>, router?: Router, instance?: Block) {
		try {
			await api.signin(options);

			const result = await api.user();
			sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
			Store.set('userData', result);

			if (router) {
				Store.clear();
				router.go(PAGES_URL.PROFILE);
			}
		} catch (e: unknown) {
			console.log('AuthController.signin Error: ', { e });

			if (isErrorWithMessage(e)) {
				const error = JSON.parse(e.message);
				console.log('AuthController.signin Error Data: ', { ...error }, router);

				if (instance) {
					Store.set('modalError', { ...error });
					instance.createModal<IErrorPageState>(
						'modalError',
						'Ошибка',
					);
				}
			} else {
				throw new Error('Unknown error');
			}
		}
	}

	public async signup(options: Partial<RequestOptions & IRequestOptions>, router?: Router, instance?: Block) {
		try {
			const result = await api.signup(options);
			console.log('AuthController.signup: ', { result });

			if (router) {
				Store.clear();
				router.go(PAGES_URL.AUTHORIZATION);
			}
		} catch (e: unknown) {
			console.log('AuthController.signup Error: ', { e });

			if (isErrorWithMessage(e)) {
				const error = JSON.parse(e.message);
				console.log('AuthController.signup Error Data: ', { ...error }, router);

				if (instance) {
					Store.set('modalError', { ...error });
					instance.createModal<IErrorPageState>(
						'modalError',
						'Ошибка',
					);
				}
			} else {
				throw new Error('Unknown error');
			}
		}
	}

	public async logout(router?: Router, instance?: Block) {
		try {
			const result = await api.logout();
			console.log('AuthController.logout: ', { result });

			if (sessionStorage.getItem(STORAGE_KEY)) {
				sessionStorage.removeItem(STORAGE_KEY);
			}

			if (router) {
				Store.clear();
				router.go(PAGES_URL.AUTHORIZATION);
			}
		} catch (e: unknown) {
			console.log('AuthController.logout Error: ', { e });
			if (sessionStorage.getItem(STORAGE_KEY)) {
				sessionStorage.removeItem(STORAGE_KEY);
			}

			if (isErrorWithMessage(e)) {
				const error = JSON.parse(e.message);
				console.log('AuthController.logout Error Data: ', { ...error }, router);

				if (instance) {
					Store.set('modalError', { ...error });
					instance.createModal<IErrorPageState>(
						'modalError',
						'Ошибка',
					);
				}
			} else {
				throw new Error('Unknown error');
			}
		}
	}
}

export default new AuthController();
