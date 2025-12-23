import * as Pages from './pages';
import { Router } from '@/router';
import { INIT_ERROR_STATE } from './constants';
import type { Nullable } from './types';

export default class App {
	private appElement: Nullable<HTMLElement>;

	constructor() {
		this.appElement = document.getElementById('app');
	}

	init() {
		if (this.appElement) {
			const router = new Router(this.appElement);

			if (router !) {
				router
					.use('/', Pages.LoginBlock, router)
					.use('/404', Pages.ErrorBlock, router, { ...INIT_ERROR_STATE })
					.start();
			}
		}
	}
}
