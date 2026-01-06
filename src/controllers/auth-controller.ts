import { AuthAPI } from '@/api';
import { Store } from '@/store';
import {
	INIT_LOGIN_STATE,
	INIT_REGISTRATION_STATE,
	PAGES_URL,
	STORAGE_KEY,
} from '@/constants';
import type { RequestOptions } from 'http';
import type { IRequestOptions } from '@/http';
import type { Router } from '@/router';
import type { Block } from '@/block';
import {
	cloneDeep,
	handleRequestError,
} from '@/utils';

const api = new AuthAPI();

class AuthController {
	public async signin(options: Partial<RequestOptions & IRequestOptions>, router?: Router, instance?: Block) {
		try {
			await api.signin(options);

			const result = await api.user();
			sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
			Store.set('userData', result, undefined, true);

			if (router) {
				Store.clearSubs();
				Store.set('authorizationForm', cloneDeep(INIT_LOGIN_STATE), undefined, true);
				router.go(PAGES_URL.MAIN);
			}
		} catch (e: unknown) {
			console.log('AuthController.signin Error: ', { e });
			handleRequestError(e, instance);
		}
	}

	public async signup(options: Partial<RequestOptions & IRequestOptions>, router?: Router, instance?: Block) {
		try {
			const result = await api.signup(options);
			console.log('AuthController.signup: ', { result });

			if (router) {
				Store.clearSubs();
				Store.set('registrationForm', cloneDeep(INIT_REGISTRATION_STATE), undefined, true);
				router.go(PAGES_URL.AUTHORIZATION);
			}
		} catch (e: unknown) {
			console.log('AuthController.signup Error: ', { e });
			handleRequestError(e, instance);
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
				Store.clearSubs();
				router.go(PAGES_URL.AUTHORIZATION);
			}
		} catch (e: unknown) {
			console.log('AuthController.logout Error: ', { e });
			if (sessionStorage.getItem(STORAGE_KEY)) {
				sessionStorage.removeItem(STORAGE_KEY);
			}
			handleRequestError(e, instance);
		}
	}
}

export default new AuthController();
