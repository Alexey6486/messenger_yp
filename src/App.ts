import * as Pages from './pages';
import { Router } from '@/router';
import { PAGES_URL } from './constants';
import type { TNullable } from './types';

export default class App {
	private appElement: TNullable<HTMLElement>;

	constructor() {
		this.appElement = document.getElementById('app');
	}

	init() {
		if (this.appElement) {
			const router = new Router(this.appElement);

			if (router) {
				router
					.use(PAGES_URL.AUTHORIZATION, Pages.LoginPage, router)
					.use(PAGES_URL.ERROR, Pages.ErrorPage, router)
					.use(PAGES_URL.REGISTRATION, Pages.RegistrationPage, router)
					.use(PAGES_URL.PROFILE, Pages.ProfileBlock, router)
					.use(PAGES_URL.MAIN, Pages.MainBlock, router)
					.start();
			}
		}
	}
}
