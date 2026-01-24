import { Block } from '@/block';
import type { BlockProps } from '@/types';

const CONTAINER_ID = 'app';
const MODAL_ID = 'test-modal-id';
const MODAL_CONTENT = 'modal';
const TEST_CLASS = 'test-class';
const SOME_PAGE_INNER = '<h1>Some Page</h1>';
const MODAL_INNER = `<h1 id="${ MODAL_ID }">${ MODAL_CONTENT }</h1>`;

class SomePage extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
		});
	}

	override render(): string {
		return SOME_PAGE_INNER;
	}
}

class Modal extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
		});
	}

	override render(): string {
		return MODAL_INNER;
	}
}

describe('Jest block test', () => {
	let container: HTMLElement | null;
	let pageInstance: Block | null;

	beforeEach(() => {
		container = document.createElement('div');
		container.id = CONTAINER_ID;
		document.body.appendChild(container);
		pageInstance = new SomePage({ container });
		container.appendChild(pageInstance.getContent());
	});

	afterEach(() => {
		if (container) {
			document.body.removeChild(container);
		}
	});

	test('block renders component', () => {
		if (container) {
			expect(container.innerHTML).toBe(SOME_PAGE_INNER);
		}
	});

	test('block toggles class', () => {
		if (container && pageInstance) {
			let target: HTMLElement | null;

			target = document.querySelector(`.${ TEST_CLASS }`);
			expect(target).toBeNull();

			pageInstance.toggleClassList(TEST_CLASS);
			target = document.querySelector(`.${ TEST_CLASS }`);
			expect(target).not.toBeNull();

			pageInstance.toggleClassList(TEST_CLASS);
			target = document.querySelector(`.${ TEST_CLASS }`);
			expect(target).toBeNull();
		}
	});

	test('block creates modal from page instance', () => {
		if (pageInstance && container) {
			pageInstance.createModal(new Modal({
				contentId: MODAL_ID,
				title: 'Модальное окно',
			}));

			const modal = document.getElementById(MODAL_ID);

			expect(document.body.children.length).toBe(2);

			if (modal) {
				expect(modal.id).toBe(MODAL_ID);
				expect(modal.innerHTML).toBe(MODAL_CONTENT);
			}
		}
	});
});
