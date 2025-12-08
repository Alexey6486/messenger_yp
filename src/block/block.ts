import { EventBus } from '@/event-bus';
import type {
	IChildren,
	IInputChangeParams,
	TPages,
} from '@/types';

interface BlockProps {
	[key: string]: any;
}

export class Block {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_CWU: 'flow:component-will-unmount',
		FLOW_RENDER: 'flow:render',
	};

	protected _element;
	protected props: BlockProps;
	protected children: IChildren<Block>;
	protected eventBus: () => EventBus;

	/** JSDoc
	 * @param {BlockProps} props
	 *
	 * @returns {void}
	 */
	constructor(props = {}) {
		const { children_part, props_part } = this._getPropsParts(props);

		this.props = this._makePropsProxy({ ...props_part });
		this.children = children_part;

		const eventBus = new EventBus();
		this.eventBus = () => eventBus;
		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	get element() {
		return this._element;
	}

	private _getPropsParts(props) {
		const children_part: Record<string, Block> = {};
		const props_part: BlockProps = {};

		Object.entries(props).forEach(([props_name, value]) => {
			if (props_name === 'children') {
				Object.values(value as Record<string, Block>).forEach((instance) => {
					children_part[instance.props.id] = instance;
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
		eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _init() {
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

	componentDidMount(): void {
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

	componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
		console.log('componentDidUpdate: ', { oldProps, newProps });

		return true;
	}

	private _componentWillUnmount(page?: TPages) {
		this._removeEvents();
		this._element.parentNode.removeChild(this._element);

		if (page) {
			this.props.changePage(page);
		}
	}

	private _render() {
		console.log('_render: ', this);

		this._removeEvents();

		const temp = this._createDocumentElement('template');
		temp.innerHTML = this.render();

		Object.values(this.children).forEach((instance) => {
			const element = temp.content.getElementById(instance.props.id);
			if (element) {
				element.replaceWith(instance.getContent());
			}
		});

		const newElement = temp.content.firstElementChild as HTMLElement;
		if (this._element && newElement) {
			(this._element as Element).replaceWith(newElement);
		}

		this._element = newElement;

		this._addEvents();

		if (this.props?.input_data?.currentFocus?.element && this._element instanceof HTMLInputElement) {
			setTimeout(() => {
				this._element.focus();
				this._element.setSelectionRange(
					this.props.input_data.currentFocus.selectionStart,
					this.props.input_data.currentFocus.selectionStart,
				);
			}, 0);
		}
	}

	render(): string {
		return '';
	}

	getContent() {
		if (!this.element) {
			throw new Error('Элемент не создан');
		}
		return this.element;
	}

	setProps(nextProps) {
		// console.log('setProps: ', { tp: this.props, nextProps, ch: this.children });

		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	private _makePropsProxy(props) {
		const self = this;

		return new Proxy<BlockProps>(props, {
			get(target, p) {
				const value = target[p];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target, p, newValue) {
				console.log('proxy set: ', { self, target, p, newValue });

				const oldTarget = { ...target };
				if (p === 'input_data') {
					target[p] = { ...target[p], ...newValue };
				} else if (p === 'form') {
					const { fields, errors } = newValue;
					target[p] = {
						...target[p],
						fields: { ...target[p].fields, ...fields },
						errors: { ...target[p].errors, ...errors },
					};
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

	/** getChildrenToUpdate собирает для обновления все инстансы, указынных компонент
	 * @param {IChildren<Block>} children
	 * @param {string[]} idsList
	 * @param {IChildren<Block>} childrenBlocks
	 *
	 * @returns {IChildren<Block>}
	 */
	private _getChildrenToUpdate(
		children: IChildren<Block>, idsList: string[], childrenBlocks?: IChildren<Block>,
	): IChildren<Block> {
		const targetChildren: IChildren<Block> = childrenBlocks || {};

		Object.entries(children).forEach(([id, instance]) => {
			if (idsList.includes(id)) {
				targetChildren[id] = instance;

				if (instance.children) {
					return this._getChildrenToUpdate(instance.children, idsList, targetChildren);
				}
			}
		});

		return targetChildren;
	};

	/** onFormInputChange функция для работы с полями форм, по id дочерних компонент (по отношению
	 * к компоненте текущей страницы) вызывает обновление пропсов setProps у целевых компонент,
	 * для обновления их данных.
	 * Последний вызов this.setProps, вызов обновления данных самой родительской компоненты.
	 * (необходимо т.к. данные в пропсах дочерних компонент, которые пробрасываются от родителя, при изменении
	 * только в самом родителе this.setProps не обновляются у дочерних компонент)
	 * @param {string[]} childrenIdList
	 * @param {IInputChangeParams} params
	 * @param {string} fieldName
	 *
	 * @returns {void}
	 */
	onFormInputChange(params: IInputChangeParams<Block>, childrenIdList: string[], fieldName: string): void {
		const { data, info } = params;
		const { element, selectionStart } = info;

		const targetChildren = this._getChildrenToUpdate(this.children, childrenIdList);

		childrenIdList.forEach((childId) => {
			targetChildren[childId].setProps({
				input_data: {
					value: data.value,
					error: data.error,
					currentFocus: { element, selectionStart },
				},
			});
		});

		this.setProps({
			form: {
				fields: { [fieldName]: data.value },
				errors: { [fieldName]: data.error },
			},
		});
	};
}
