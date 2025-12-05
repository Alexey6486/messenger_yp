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
		const { children, props2 } = this._getChildren(props);
		// this.props = this._makePropsProxy({ ...props2 });
		this.props = this._makePropsProxy({ ...props2 });

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);


		this.children = children;

		eventBus.emit(Block.EVENTS.INIT);

		console.log('constructor: ', { props: this.props, children });
	}

	private _getChildren(props) {
		const children: Record<string, Block> = {};
		const props2: BlockProps = {};
		console.log('_getChildren: ', { props, props2 });

		Object.entries(props).forEach(([key, value]) => {
			console.log('_getChildren forEach: ', { key, value });
			if (key === 'children') {
				Object.entries(value).forEach(([key2, value2]) => {
					if (value2.instance && value2.instance instanceof Block) {
						children[key2] = value2.instance;
					}
				});
			} else {
				props2[key] = value;
			}
		});

		// if (props?.children) {
		// 	Object.entries(props.children).forEach(([key, value]) => {
		// 		console.log('_getChildren forEach: ', { key, value });
		// 		if (value.instance && value.instance instanceof Block) {
		// 			children[key] = value.instance;
		// 		}
		// 	});
		// }
		console.log('!!!', { children, props2 });
		return { children, props2 };
	}

	private _addEvents() {
		const { events = {} } = this.props;
		console.log('_addEvents: ', this.props, this._element);
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
		const block = this.render();
		console.log('_render: ', {
			block,
			e: this._element,
			c: this._element instanceof HTMLTemplateElement,
			ch: this.children,
			p: this.props,
		});

		this._removeEvents();

		if (this._element instanceof HTMLTemplateElement) {
			console.log('_render if: ', this._element);
			this._element.innerHTML = block;

			Object.entries(this.children).forEach(([childName, instance]) => {
				const target = this._element.content.getElementById(instance.props.id);
				console.log('_render forEach 1: ', { childName, instance, target, ID: instance.props.id });
				if (target) {
					target.replaceWith(instance.getContent());
				}
			});

			this._element = this._element.content.firstElementChild;
		} else if (this._element instanceof HTMLElement) {
			console.log('_render else if: ', this._element);
			const template = this._createDocumentElement('template');
			template.innerHTML = block;

			Object.entries(this.children).forEach(([childName, instance]) => {
				const target = template.content.getElementById(instance.props.id);
				console.log('_render forEach 2: ', { childName, instance, target });
				if (target) {
					target.replaceWith(instance.getContent());
				}
			});
			console.log('res 1: ', this._element);
			// console.log('_render else if template: ', template.content.firstElementChild);
			this._element.replaceWith(template.content.firstElementChild);
			// console.log('res 2: ', this._element);
			this._element = template.content.firstElementChild;
			// console.log('res 3: ', this._element);
		}
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
				console.log('proxy get: ', { target, p });
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
