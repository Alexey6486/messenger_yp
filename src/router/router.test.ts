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

describe('Router', () => {
	let router: Router | null;
	let container: HTMLElement | null;

	beforeEach(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: 'test' }));
		container = document.createElement('div');
		container.id = 'app';
		document.body.appendChild(container);

		router = new Router(container);

		if (router) {
			router
				.use(PAGES_URL.AUTHORIZATION, AuthorizationPage, router)
				.use(PAGES_URL.MAIN, MainPage, router)
				.use(PAGES_URL.NOT_FOUND, UnknownPage, router)
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
			router.go('/unknown');

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
});
