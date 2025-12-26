import { EventBus } from '@/event-bus';
import { IDS } from '@/constants';
import type {
	BlockProps,
	IChildren,
	IInputChangeParams,
	Nullable,
} from '@/types';
import { IEbEvents } from '@/types';
import { isFunction } from '@/utils';

export abstract class Block<T = unknown, K extends BlockProps<T> = BlockProps<T>> {
	static EVENTS = {
		INIT: IEbEvents.INIT,
		FLOW_CDM: IEbEvents.FLOW_CDM,
		FLOW_CDU: IEbEvents.FLOW_CDU,
		FLOW_CWU: IEbEvents.FLOW_CWU,
		FLOW_RENDER: IEbEvents.FLOW_RENDER,
	} as const;

	_element: Nullable<Element | HTMLElement | HTMLInputElement> = null;
	props: Omit<BlockProps, 'children' | 'childrenList'>;
	children: IChildren<Block<T, K>>;
	childrenList: IChildren<Block<T, K>>;
	allInstances: IChildren<Block<T, K>>;
	protected eventBus: () => EventBus;

	/** JSDoc
	 * @param {BlockProps} props
	 *
	 * @returns {void}
	 */
	constructor(props: K = {} as K) {
		const { children_part, children_list_part, all_instances_part, props_part } = this._getPropsParts(props);

		this.props = this._makePropsProxy({ ...props_part });
		this.children = children_part;
		this.childrenList = children_list_part;
		this.allInstances = all_instances_part;

		const eventBus = new EventBus();
		this.eventBus = () => eventBus;
		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	get element() {
		return this._element;
	}

	private _getPropsParts(props: K) {
		const children_part: Record<string, Block<T, K>> = {};
		const children_list_part: Record<string, Block<T, K>> = {};
		const all_instances_part: Record<string, Block<T, K>> = {};
		const props_part: Omit<BlockProps, 'children' | 'childrenList'> = {};

		Object.entries(props).forEach(([props_name, value]) => {
			if (props_name === 'children') {
				Object.values(value as Record<string, Block<T, K>>).forEach((instance) => {
					if (instance.props.id) {
						children_part[instance.props.id] = instance;
						all_instances_part[instance.props.id] = instance;
					}
				});
			} else if (props_name === 'childrenList' && Array.isArray(value)) {
				value.forEach((instance) => {
					if (instance.props.id) {
						children_list_part[instance.props.id] = instance;
						all_instances_part[instance.props.id] = instance;
					}
				});
			} else {
				props_part[props_name as keyof typeof props_part] = value;
			}
		});

		return { children_part, children_list_part, all_instances_part, props_part };
	}

	private _addEvents() {
		const { events = null } = this.props;

		if (this._element && events) {
			Object.keys(events).forEach(eventName => {
				(this._element as Element).addEventListener(eventName, events[eventName]);
			});
		}
	}

	private _removeEvents() {
		const { events = null } = this.props;

		if (this._element && events) {
			Object.keys(events).forEach(eventName => {
				(this._element as Element).removeEventListener(eventName, events[eventName]);
			});
		}
	}

	private _registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _init() {
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	private _componentDidMount(): void {
		this.componentDidMount();
		Object.values(this.children).forEach(child => {
			child.dispatchComponentDidMount();
		});
	}

	componentDidMount(): void {
	}

	dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	dispatchComponentWillUnmount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CWU);
	}

	private _componentDidUpdate() {
		const response = this.componentDidUpdate();
		if (!response) {
			return;
		}

		this._render();
	}

	componentDidUpdate(): boolean {
		return true;
	}

	private _componentWillUnmount(props: K) {
		this._removeEvents();
		if (this._element && this._element.parentNode && 'removeChild' in this._element.parentNode) {
			this._element.parentNode.removeChild(this._element);
			this._element = null;
		}

		if (this.allInstances) {
			const childrenInstancesList = Object.values(this.allInstances);

			if (Array.isArray(childrenInstancesList) && childrenInstancesList.length) {
				childrenInstancesList.forEach(child => {
					child.dispatchComponentWillUnmount();
				});
			}
		}

		const targetPage = props?.page;
		if (targetPage) {
			this?.props?.changePage?.(targetPage);
		}
	}

	private _render() {
		this._removeEvents();

		const temp = this._createDocumentElement('template') as HTMLTemplateElement;
		temp.innerHTML = this.render();

		Object.values(this.children).forEach((instance) => {
			if (typeof instance.props.id === 'string') {
				const element = temp.content.getElementById(instance.props.id);

				if (element) {
					element.replaceWith(instance.getContent());
				}
			}
		});

		if (this.childrenList) {
			const element = temp.content.getElementById(IDS.COMMON.COMPONENTS_LIST);

			if (element) {
				let children: Array<Element | HTMLElement | HTMLInputElement> = [];

				Object.values(this.childrenList).forEach((instance) => {
					children = [...children, instance.getContent()];
				});

				element.replaceWith(...children);
			}
		}

		const newElement = temp.content.firstElementChild as HTMLElement;
		if (this._element && newElement) {
			(this._element as Element).replaceWith(newElement);
		}

		this._element = newElement;

		this._addEvents();
		this._addAttributes();
		this._setFocus();
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

	setProps(nextProps: Partial<K>) {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	}

	private _makePropsProxy(props: K) {
		const self = this;

		return new Proxy<K>(props, {
			get(target: K, p: keyof K) {
				const value = target[p];
				return isFunction(value) ? value.bind(target) : value;
			},
			set(target: K, p: keyof K, newValue: K[keyof K]) {
				const oldTarget = { ...target };

				target[p] = newValue;

				self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
				return true;
			},
			deleteProperty() {
				// throw new Error('No access');
				return false;
			},
		});
	}

	private _createDocumentElement(tagName: string) {
		// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
		return document.createElement(tagName);
	}

	private _addAttributes(): void {
		const { attr = {} } = this.props;

		if (this._element && attr) {
			Object.entries(attr).forEach(([key, value]) => {
				(this._element as Element).setAttribute(key, value as string);
			});
		}
	}

	setAttributes(attr: Record<string, string | boolean>): void {
		Object.entries(attr).forEach(([key, value]) => {
			if (this._element) {
				this._element.setAttribute(key, value as string);
			}
		});
	}

	toggleClassList(className: string, elementId?: string): void {
		const target = this._element;

		if (elementId) {
			Object.entries(this.allInstances).forEach(([id, instance]) => {
				if (elementId == id) {
					instance.toggleClassList(className);
				}
			});
		} else {
			if (target) {
				if (target.classList.contains(className)) {
					target.classList.remove(className);
				} else {
					target.classList.add(className);
				}
			}
		}
	}

	removeAttributes(attrName: string): void {
		if (this._element && attrName) {
			this._element.removeAttribute(attrName);
		}
	}

	show() {
		const content = this.getContent();
		if (content && 'style' in content) {
			content.style.display = 'block';
		}
	}

	hide() {
		const content = this.getContent();
		if (content && 'style' in content) {
			content.style.display = 'none';
		}
	}

	/** getChildrenToUpdate собирает для обновления все инстансы, указынных компонент
	 * @param {IChildren<Block>} children
	 * @param {string[]} idsList
	 * @param {IChildren<Block>} childrenBlocks
	 *
	 * @returns {IChildren<Block>}
	 */
	private _getChildrenToUpdate(
		children: IChildren<Block<T, K>>, idsList: string[], childrenBlocks?: IChildren<Block<T, K>>,
	): IChildren<Block<T, K>> {
		const targetChildren: IChildren<Block<T, K>> = childrenBlocks || {};

		Object.entries(children).forEach(([id, instance]) => {
			if (idsList.includes(id)) {
				targetChildren[id] = instance;

				if (instance.allInstances) {
					return this._getChildrenToUpdate(instance.allInstances, idsList, targetChildren);
				}
			}
		});

		return targetChildren;
	}

	/** onFormInputChange функция для работы с полями форм, по id дочерних компонент (по отношению
	 * к общей компоненте страницы) вызывает обновление пропсов setProps у целевых компонент,
	 * зависящих/использующих эти данные (childrenIdList).
	 * Последний вызов this.setProps, вызов обновления данных самой родительской компоненты.
	 * (необходимо т.к. данные в пропсах дочерних компонент, которые пробрасываются от родителя, при изменении
	 * только в самом родителе this.setProps не обновляются у дочерних компонент)
	 * @param {string[]} childrenIdList список id компонент, которые используют данные input
	 * @param {IInputChangeParams} params данные от компоненты input
	 * @param {string} fieldName имя поля формы
	 * @param {string} formName имя формы
	 *
	 * @returns {void}
	 */
	onFormInputChange(
		params: IInputChangeParams,
		childrenIdList: string[],
		fieldName: string,
		formName: string,
	): void {
		const { data, info } = params;
		const { element, selectionStart = 0 } = info;

		const targetChildren = this._getChildrenToUpdate(
			this.allInstances,
			childrenIdList,
		);

		childrenIdList.forEach((childId) => {
			targetChildren[childId].setProps({
				input_data: {
					value: data.value ?? '',
					error: data.error ?? '',
					currentFocus: { element, selectionStart },
				},
			});
		});

		this.setProps({
			[formName]: {
				fields: { [fieldName]: data.value },
				errors: { [fieldName]: data.error ?? '' },
			},
		} as BlockProps);
	}

	protected toggleInputsDisable() {
		Object.entries(this.children).forEach(([fieldId, fieldInstance]) => {
			if (fieldId.includes('field')) {
				Object.entries(fieldInstance.children).forEach(([inputId, inputInstance]) => {
					if (inputId.includes('input')) {
						inputInstance.setProps({
							isDisabled: !inputInstance.props.isDisabled,
						});
					}
				});
			}
		});
	}

	private _setFocus() {
		if (this.props?.input_data?.currentFocus?.element && this._element instanceof HTMLInputElement) {
			setTimeout(() => {
				if (this._element && 'focus' in this._element && 'setSelectionRange' in this._element) {
					this._element.focus();
					if (
						this?.props?.input_data
						&& this?.props?.input_data?.currentFocus
						&& this.props.input_data.currentFocus?.selectionStart !== null
					) {
						this._element.setSelectionRange(
							this.props.input_data.currentFocus.selectionStart,
							this.props.input_data.currentFocus.selectionStart,
						);
					}
				}
			}, 0);
		}
	}
}
