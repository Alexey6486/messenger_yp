import * as Pages from './pages';
import { Router } from '@/router';
import { PAGES_URL } from './constants';
import type { TNullable } from './types';

export default class App {
	private _appElement: TNullable<HTMLElement>;

	constructor() {
		this._appElement = document.getElementById('app');
	}

	get element() {
		return this._appElement;
	}

	init() {
		const container = this.element;
		if (container) {
			const router = new Router(container);

			if (router) {
				router
					.use(PAGES_URL.AUTHORIZATION, Pages.LoginPage, router, { container })
					.use(PAGES_URL.NOT_FOUND, Pages.ErrorPage, router)
					.use(PAGES_URL.REGISTRATION, Pages.RegistrationPage, router, { container })
					.use(PAGES_URL.PROFILE, Pages.ProfilePage, router, { container })
					.use(PAGES_URL.MAIN, Pages.MainBlock, router)
					.start();
			}
		}
	}
}
