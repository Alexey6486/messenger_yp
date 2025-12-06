import { EventBus } from '@/event-bus';
import type {
	IChildren,
	IInputData,
} from '@/types';

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
	protected children: IChildren<Block>;

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
				Object.entries(value as Record<string, Block>).forEach((el) => {
					if (el.length === 2 && el[1] instanceof Block) {
						children_part[el[1].props.id] = el[1];
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

		Object.entries(this.children).forEach((el) => {
			if (el.length === 2) {
				const stub = temp.content.getElementById(el[1].props.id);
				if (stub) {
					stub.replaceWith(el[1].getContent());
				}
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

	/** getChildrenToUpdate собирает для обновления все инстансы, указынных компонент
	 * @param {IChildren<Block>} children
	 * @param {string[]} idsList
	 * @param {IChildren<Block>} childrenBlocks
	 *
	 * @returns {IChildren<Block>}
	 */
	getChildrenToUpdate = (
		children: IChildren<Block>, idsList: string[], childrenBlocks?: IChildren<Block>,
	): IChildren<Block> => {
		const targetChildren: IChildren<Block> = childrenBlocks || {};
		Object.entries(children).forEach(([id, instance]) => {
			if (idsList.includes(id)) {
				targetChildren[id] = instance;

				if (instance.children) {
					return this.getChildrenToUpdate(instance.children, idsList, targetChildren);
				}
			}
		});

		return targetChildren;
	};

	/** changePropsDrill функция по id дочерних компонент (по отношению к компоненте текущей страницы)
	 * вызывает обновление пропсов setProps у целевых компонент, для обновления их данных.
	 * Последний вызов this.setProps, вызов обновления данных самой родительсткой компоненты.
	 * (необходимо т.к. данные в пропсах дочерних компонент, которые пробрасываются от родителя, при изменении
	 * только в самом родителе this.setProps не обновляются у дочерних компонент)
	 * @param {string[]} childrenIdList
	 * @param {IInputData} data
	 * @param {string} fieldName
	 *
	 * @returns {void}
	 */
	changePropsDrill = (childrenIdList: string[], data: IInputData, fieldName: string): void => {
		const targetChildren = this.getChildrenToUpdate(this.children, childrenIdList);

		childrenIdList.forEach((childId) => {
			targetChildren[childId].setProps(data);
		});

		this.setProps({
			fields: { [fieldName]: data.value },
			errors: { [fieldName]: data.error },
		});
	};

	setProps = (nextProps) => {
		console.log('setProps: ', { tp: this.props, nextProps, ch: this.children });

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
				console.log('proxy set: ', { self, target, p, newValue });

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
