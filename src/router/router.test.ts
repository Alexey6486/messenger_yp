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
	let mockApp: HTMLElement;

	beforeEach(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: 'test' }));
		mockApp = document.createElement('div');
		mockApp.id = 'app';
		document.body.appendChild(mockApp);

		router = new Router(mockApp);

		if (router) {
			router
				.use(PAGES_URL.AUTHORIZATION, AuthorizationPage, router)
				.use(PAGES_URL.MAIN, MainPage, router)
				.use(PAGES_URL.NOT_FOUND, UnknownPage, router)
				.start();
		}
	});

	afterEach(() => {
		document.body.removeChild(mockApp);
		router = null;
		localStorage.removeItem(STORAGE_KEY);
	});

	test('renders 404 for unknown routes', () => {
		if (router) {
			router.go('/unknown');

			expect(mockApp.innerHTML).toBe(UNKNOWN_PAGE_INNER);
		}
	});
});

// const sum = (a: number, b: number) => {
// 	return a + b;
// }
// describe('sum module', () => {
// 	test('adds 1 + 2 to equal 3', () => {
// 		expect(sum(1, 2)).toBe(3);
// 	});
// });
