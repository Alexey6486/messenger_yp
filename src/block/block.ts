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
	constructor(tagName = 'template', props = {}) {

		const eventBus = new EventBus();

		this._meta = {
			tagName,
			props,
		};

		const { children_part, props_part } = this._getChildren(props);

		this.props = this._makePropsProxy({ ...props_part });

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);


		this.children = children_part;

		eventBus.emit(Block.EVENTS.INIT);

		console.log('constructor: ', { props: this.props, children_part });
	}

	private _getChildren(props) {
		const children_part: Record<string, Block> = {};
		const props_part: BlockProps = {};

		Object.entries(props).forEach(([props_name, value]) => {
			if (props_name === 'children') {
				Object.entries(value as string).forEach(([component_name, instance]) => {
					if (instance instanceof Block) {
						children_part[component_name] = instance;
					}
				});
			} else {
				props_part[props_name] = value;
			}
		});

		return { children_part, props_part };
	}

	private _addEvents() {
		const { events = null } = this.props;
		console.log('_addEvents: ', this.props, this._element);

		if (this._element && events) {
			Object.keys(events).forEach(eventName => {
				this._element.addEventListener(eventName, events[eventName]);
			});
		}
	}

	private _removeEvents() {
		const { events = null } = this.props;
		console.log('_removeEvents: ', this.props, this._element);

		if (this._element && events) {
			Object.keys(events).forEach(eventName => {
				this._element.removeEventListener(eventName, events[eventName]);
			});
		}
	}

	private _registerEvents(eventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	protected init() {
		console.log('init');

		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	private _componentDidMount(): void {
		console.log('_componentDidMount');

		this.componentDidMount();
		Object.values(this.children).forEach(child => {
			child.dispatchComponentDidMount();
		});
	}

	protected componentDidMount(): void {
		console.log('componentDidMount');
	}

	dispatchComponentDidMount() {
		console.log('dispatchComponentDidMount');

		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	private _componentDidUpdate(oldProps, newProps) {
		console.log('_componentDidUpdate: ', { oldProps, newProps });

		const response = this.componentDidUpdate(oldProps, newProps);
		if (!response) {
			return;
		}

		this._render();
	}

	protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
		console.log('componentDidUpdate: ', { oldProps, newProps });

		return true;
	}

	get element() {
		return this._element;
	}

	private _render() {
		console.log('_render: ', {
			e: this._element,
			c: this._element instanceof HTMLTemplateElement,
			ch: this.children,
			p: this.props,
		});

		this._removeEvents();

		const temp = this._createDocumentElement('template');
		temp.innerHTML = this.render();

		Object.entries(this.children).forEach(([childName, instance]) => {
			const stub = temp.content.getElementById(childName);
			if (stub) {
				stub.replaceWith(instance.getContent());
			}
		});

		const newElement = temp.content.firstElementChild as HTMLElement;
		if (this._element && newElement) {
			this._element.replaceWith(newElement);
		}

		this._element = newElement;
		this._addEvents();

		console.log('res 4: ', this._element);

		this._addEvents();
	}

	render(): string {
		return '';
	}

	getContent() {
		console.log('getContent: ', { e: this._element, m: this._meta, p: this.props });

		if (!this.element) {
			throw new Error('Element is not created');
		}
		return this.element;
	}

	setProps = (nextProps) => {
		console.log('setProps: ', { tp: this.props, nextProps });

		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	private _makePropsProxy(props) {
		const self = this;

		return new Proxy<BlockProps>(props, {
			get(target, p) {
				// console.log('proxy get: ', { target, p });
				const value = target[p];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target, p, newValue) {
				console.log('proxy set: ', { target, p, newValue });

				const oldTarget = { ...target };
				if (p === 'fields') {
					target[p] = { ...target[p], ...newValue };
				} else {
					target[p] = newValue;
				}

				self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
				return true;
			},
			deleteProperty() {
				console.log('proxy delete');

				// throw new Error('No access');
				return false;
			},
		});
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
