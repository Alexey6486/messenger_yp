import { ButtonBlock } from '@/components';

const CONTAINER_ID = 'app';
const BUTTON_ID = 'btn-test-id';
const mockClick = jest.fn();

const BUTTON = new ButtonBlock({
	id: BUTTON_ID,
	type: 'submit',
	text: 'Тест кнопка',
	onClick: mockClick,
});

describe('Button component', () => {
	let container: HTMLElement | null;

	beforeEach(() => {
		container = document.createElement('div');
		container.id = CONTAINER_ID;
		document.body.appendChild(container);
		container.appendChild(BUTTON.getContent())
	});

	afterEach(() => {
		if (container) {
			document.body.removeChild(container);
		}
	});

	test('render button', () => {
		if (container) {
			expect(container.children.length).toBe(1);
		}
	});

	test('click button', () => {
		if (container) {
			const btn = document.getElementById(BUTTON_ID);

			if (btn) {
				btn.click();
				expect(mockClick).toHaveBeenCalledTimes(1);
			}
		}
	});
});
