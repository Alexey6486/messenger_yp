import { AuthAPI } from '@/api';
import { Store } from '@/store';
import type { RequestOptions } from 'http';
import type { IRequestOptions } from '@/http';
import type { Router } from '@/router';
import { PAGES_URL } from '@/constants';
import { isErrorWithMessage } from '@/utils';

const api = new AuthAPI();

class AuthController {
	public async signin(options: Partial<RequestOptions & IRequestOptions>, router?: Router) {
		try {
			const result = await api.signin(options);
			console.log('AuthController.signin: ', { result });

			if (router) {
				// router.go(PAGES_URL.MAIN);
			}
		} catch (e: unknown) {
			console.log('AuthController.signin Error: ', { e });

			if (isErrorWithMessage(e)) {
				const error = JSON.parse(e.message);
				console.log('AuthController.signin Error Data: ', { ...error }, router);

				if (router) {
					Store.set('error', { ...error });
					router.go(PAGES_URL.ERROR);
				}
			} else {
				throw new Error('Unknown error');
			}
		}
	}

	public async signup(options: Partial<RequestOptions & IRequestOptions>, router?: Router) {
		try {
			const result = await api.signup(options);
			console.log('AuthController.signup: ', { result });

			if (router) {
				router.go(PAGES_URL.AUTHORIZATION);
			}
		} catch (e: unknown) {
			console.log('AuthController.signup Error: ', { e });

			if (isErrorWithMessage(e)) {
				const error = JSON.parse(e.message);
				console.log('AuthController.signup Error Data: ', { ...error }, router);

				if (router) {
					Store.set('error', { ...error });
					router.go(PAGES_URL.ERROR);
				}
			} else {
				throw new Error('Unknown error');
			}
		}
	}
}

export default new AuthController();
