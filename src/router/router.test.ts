import { Block } from '@/block';
import { Router } from '@/router';
import {
	PAGES_URL,
	STORAGE_KEY,
} from '@/constants';
import type { BlockProps } from '@/types';
import { compile } from '@/utils';

const MAIN_PAGE_INNER = '<h1>Main Page</h1>';
const UNKNOWN_PAGE_INNER = '<h1>Page not found</h1>';
const AUTH_PAGE_INNER = '<h1>Authorization page</h1>';
const SETTINGS_PAGE_INNER = '<h1>Settings page</h1>';
const UNKNOWN_URL = '/unknown';
const USER_ID = 'test';
const CONTAINER_ID = 'app';

class MainPage extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
		});
	}

	override render(): string {
		return compile(MAIN_PAGE_INNER, this.props);
	}
}

class AuthorizationPage extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
		});
	}

	override render(): string {
		return compile(AUTH_PAGE_INNER, this.props);
	}
}

class UnknownPage extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
		});
	}

	override render(): string {
		return compile(UNKNOWN_PAGE_INNER, this.props);
	}
}

class SettingsPage extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
		});
	}

	override render(): string {
		return compile(SETTINGS_PAGE_INNER, this.props);
	}
}

describe('Router', () => {
	let router: Router | null;
	let container: HTMLElement | null;

	beforeEach(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: USER_ID }));

		container = document.createElement('div');
		container.id = CONTAINER_ID;
		document.body.appendChild(container);

		router = new Router(container);

		if (router) {
			router
				.use(PAGES_URL.AUTHORIZATION, AuthorizationPage, router)
				.use(PAGES_URL.MAIN, MainPage, router)
				.use(PAGES_URL.NOT_FOUND, UnknownPage, router)
				.use(PAGES_URL.PROFILE, SettingsPage, router)
				.start();
		}
	});

	afterEach(() => {
		if (container) {
			document.body.removeChild(container);
		}

		if (router && 'clearInstance' in router) {
			router.clearInstance();
		}
	});

	test('redirect to page 404 if route doesn\'t exist', () => {
		if (router && container) {
			router.go(UNKNOWN_URL);
			expect(container.innerHTML).toBe(UNKNOWN_PAGE_INNER);
		}
	});

	test('redirect to authorization page if user is not authorized', () => {
		localStorage.removeItem(STORAGE_KEY);
		if (router && container) {
			router.go(PAGES_URL.MAIN);
			expect(container.innerHTML).toBe(AUTH_PAGE_INNER);
		}
	});

	test('redirect to main page if user is authorized', () => {
		if (router && container) {
			router.go(PAGES_URL.AUTHORIZATION);
			expect(container.innerHTML).toBe(MAIN_PAGE_INNER);
		}
	});

	test('if user is authorized settings page is available', () => {
		if (router && container) {
			router.go(PAGES_URL.PROFILE);
			expect(container.innerHTML).toBe(SETTINGS_PAGE_INNER);
		}
	});
});
