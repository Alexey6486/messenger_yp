import { EventBus } from '@/event-bus';

interface BlockProps {
	[key: string]: any;
}

export class Block {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	};

	_element = null;
	_meta = null;
	protected eventBus: () => EventBus;
	protected props: BlockProps;
	protected children: Record<string, Block>;

	/** JSDoc
	 * @param {string} tagName
	 * @param {Object} props
	 *
	 * @returns {void}
	 */
	constructor(tagName = 'div', props = {}) {

		const eventBus = new EventBus();

		this._meta = {
			tagName,
			props,
		};

		this.props = this._makePropsProxy(props);

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);

		const { children } = this._getChildren(props);
		this.children = children;

		eventBus.emit(Block.EVENTS.INIT);

		console.log('constructor: ', { props });
	}

	private _getChildren(props) {
		const children: Record<string, Block> = {};

		Object.entries(props).forEach(([key, value]) => {
			if (value instanceof Block) {
				children[key] = value;
			}
		});

		return { children };
	}

	private _addEvents() {
		const { events = {} } = this.props;

		Object.keys(events).forEach(eventName => {
			this._element.addEventListener(eventName, events[eventName]);
		});
	}

	private _removeEvents() {
		const { events = {} } = this.props;

		Object.keys(events).forEach(eventName => {
			this._element.removeEventListener(eventName, events[eventName]);
		});
	}

	private _registerEvents(eventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _createResources() {
		const { tagName } = this._meta;
		console.log('_createResources: ', { tagName });
		this._element = this._createDocumentElement(tagName);
	}

	protected init() {
		console.log('init');
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	private _componentDidMount(): void {
		this.componentDidMount();
		Object.values(this.children).forEach(child => {
			child.dispatchComponentDidMount();
		});
	}

	protected componentDidMount(): void {
	}

	dispatchComponentDidMount() {
		// this._eventBus().emit(Block.EVENTS.FLOW_CDM);
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	private _componentDidUpdate(oldProps, newProps) {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (!response) {
			return;
		}
		this._render();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
		console.log('componentDidUpdate: ', { oldProps, newProps });
		return true;
	}

	setProps = nextProps => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	get element() {
		return this._element;
	}

	private _render() {
		const block = this.render();
		console.log('_render: ', { block, e: this._element });
		this._removeEvents();
		// Это небезопасный метод для упрощения логики
		// Используйте шаблонизатор из npm или напишите свой безопасный
		// Нужно компилировать не в строку (или делать это правильно),
		// либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду
		this._element = block;
		this._addEvents();
	}

	// Переопределяется пользователем. Необходимо вернуть разметку
	render() {

	}

	getContent() {
		console.log('getContent: ', { e: this._element, m: this._meta, p: this.props });
		if (!this.element) {
			throw new Error('Element is not created');
		}
		return this.element;
	}

	private _makePropsProxy(props) {
		// Ещё один способ передачи this, но он больше не применяется с приходом ES6+
		const self = this;

		// Здесь вам предстоит реализовать метод
		return props;
		// // eslint-disable-next-line @typescript-eslint/no-this-alias
		// const self = this;
		//
		// return new Proxy(props, {
		// 	get(target: any, prop: string) {
		// 		const value = target[prop];
		// 		return typeof value === 'function' ? value.bind(target) : value;
		// 	},
		// 	set(target: any, prop: string, value: any) {
		// 		const oldTarget = { ...target };
		// 		target[prop] = value;
		// 		self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
		// 		return true;
		// 	},
		// 	deleteProperty() {
		// 		throw new Error('No access');
		// 	},
		// });
	}

	private _createDocumentElement(tagName) {
		console.log('_createDocumentElement: ', { tagName });
		// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
		return document.createElement(tagName);
	}

	show() {
		this.getContent().style.display = 'block';
	}

	hide() {
		this.getContent().style.display = 'none';
	}
}
