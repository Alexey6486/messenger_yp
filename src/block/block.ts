import { EventBus } from '@/event-bus';
import * as Pages from '@/pages';
import { IDS } from '@/constants';
import { isFunction } from '@/utils/is-function';
import type {
	IComponent,
	IComponentProps,
	IEventBus,
	IFormState,
	IInputChangeParams,
	TNullable,
	TPages,
} from '@/types';
import {
	E_FORM_FIELDS_NAME,
	EB_EVENTS,
} from '@/types';

export abstract class Block<T, P extends IComponentProps<T> = IComponentProps<T>> implements IComponent<T> {
	static EVENTS = {
		INIT: EB_EVENTS.INIT,
		FLOW_CDM: EB_EVENTS.FLOW_CDM,
		FLOW_CDU: EB_EVENTS.FLOW_CDU,
		FLOW_CWU: EB_EVENTS.FLOW_CWU,
		FLOW_RENDER: EB_EVENTS.FLOW_RENDER,
	} as const;

	_id: string;
	_element: TNullable<Element | HTMLElement | HTMLInputElement> = null;
	parent: TNullable<Element | HTMLElement> = null;
	data: T;
	children;
	childrenList;
	allInstances;
	events: Record<string, (e: Event) => void> | undefined = undefined;
	attr: Record<string, string> | undefined = undefined;
	eventBus: () => IEventBus;

	/** JSDoc
	 * @param {IComponentProps} props
	 *
	 * @returns {void}
	 */
	constructor(props: P) {
		const { children_part, children_list_part, all_instances_part, props_part } = this._getPropsParts(props);

		this._id = this.generateId();
		this.data = this._makePropsProxy({ ...props_part });
		this.children = children_part;
		this.childrenList = children_list_part;
		this.allInstances = all_instances_part;

		const eventBus = new EventBus();
		this.eventBus = () => eventBus;
		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	private generateId(): string {
		return `component-${ Date.now() }-${ Math.random().toString(36).substring(2, 9) }`;
	}

	get element() {
		return this._element;
	}

	private getPropsValue<O, K extends keyof O>(obj: O, key: K) {
		if (key in obj) {
			return obj[key];
		}
		return undefined;
	}

	private _getPropsParts(props: IComponentProps<T>): {
		props_part: T;
		children_list_part: Record<string, IComponent<T>>;
		all_instances_part: Record<string, IComponent<T>>;
		children_part: Record<string, IComponent<T>>,
	} {
		let children_part = {} as Record<string, IComponent<T>>;
		let children_list_part = {} as Record<string, IComponent<T>>;
		let all_instances_part = {} as Record<string, IComponent<T>>;
		let props_part = {} as T;

		const children = this.getPropsValue(props, 'children');
		if (children) {
			Object.values(children).forEach((instance: Block<T>) => {
				if (typeof instance.data.id === 'string') {
					children_part[instance.data.id] = instance;
					all_instances_part[instance.data.id] = instance;
				}
			});
		}

		const childrenList = this.getPropsValue(props, 'childrenList');
		if (childrenList && Array.isArray(childrenList)) {
			childrenList.forEach((instance: Block<T>) => {
				children_list_part[instance.data.id] = instance;
				all_instances_part[instance.data.id] = instance;
			});
		}

		Object.entries(props).forEach(([props_name, value]) => {
			if (
				props_name !== 'children'
				&& props_name !== 'childrenList'
				&& props_name !== 'parent'
				&& props_name !== 'markup'
				&& props_name !== 'events'
				&& props_name !== 'attr'
			) {
				props_part[props_name] = value;
			}
		});

		return { children_part, children_list_part, all_instances_part, props_part };
	}

	private _addEvents() {
		if (this._element && this.events) {
			Object.keys(this.events).forEach(eventName => {
				if (this.events) {
					(this._element as Element).addEventListener(eventName, this.events[eventName]);
				}
			});
		}
	}

	private _removeEvents() {
		if (this._element && this.events) {
			Object.keys(this.events).forEach(eventName => {
				if (this.events) {
					(this._element as Element).removeEventListener(eventName, this.events[eventName]);
				}
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

	private _componentDidUpdate(props: { old: T, new: T }) {
		const response = this.componentDidUpdate();
		if (!response) {
			return;
		}

		this._render();
	}

	componentDidUpdate(): boolean {
		return true;
	}

	private _componentWillUnmount(page: TPages) {
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

		if (page && isFunction(this.data.changePage)) {
			this.data.changePage(page);
		}
	}

	private _render() {
		this._removeEvents();

		const temp = this._createDocumentElement('template') as HTMLTemplateElement;
		temp.innerHTML = this.render();

		Object.values(this.children).forEach((instance) => {
			const id = this.getPropsValue(instance.data, 'id');

			if (id) {
				const element = temp.content.getElementById(id);

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

	setProps(nextProps: T) {
		if (!nextProps) {
			return;
		}

		Object.assign(this.data, nextProps);
	}

	private _makePropsProxy(props: T) {
		const self = this;

		return new Proxy<T>(props, {
			get(target: T, p: string) {
				const value = target[p];
				if (isFunction(value)) {
					return value.bind(target);
				}
				return value;
			},
			set(target: T, p: string, newValue) {
				const oldTarget = { ...target };
				if (p === 'input_data') {
					const { value, error, currentFocus } = newValue;

					target[p] = {
						...target[p],
						value,
						error,
						currentFocus,
					};
				} else if (p.toLowerCase().includes('form')) {
					const { fields, errors } = newValue;

					target[p] = {
						...target[p],
						fields: { ...target[p].fields, ...fields },
						errors: { ...target[p].errors, ...errors },
					};
				} else {
					target[p] = newValue;
				}

				self.eventBus().emit<{ old: T, new: T }>(Block.EVENTS.FLOW_CDU, {
					old: oldTarget,
					new: target,
				});
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
		if (this._element && this.attr) {
			Object.entries(this.attr).forEach(([key, value]) => {
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

	removeAttributes(attrName: string): void {
		if (this._element && attrName) {
			this._element.removeAttribute(attrName);
		}
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
	 * @param {Record<string, IComponent>} children
	 * @param {string[]} idsList
	 * @param {Record<string, IComponent>} childrenBlocks
	 *
	 * @returns {IChildren<Block>}
	 */
	private _getChildrenToUpdate(
		children: Record<string, IComponent<T>>, idsList: string[], childrenBlocks?: Record<string, IComponent<T>>,
	): Record<string, IComponent<T>> | undefined {
		const targetChildren: Record<string, IComponent<T>> | undefined = childrenBlocks;

		Object.entries(children).forEach(([id, instance]) => {
			if (targetChildren && idsList.includes(id)) {
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
		params: IInputChangeParams<Element | HTMLElement | HTMLInputElement>,
		childrenIdList: string[],
		fieldName: E_FORM_FIELDS_NAME,
		formName: string,
	): void {
		const { data, info } = params;
		const { element, selectionStart } = info;

		const targetChildren = this._getChildrenToUpdate(
			this.allInstances,
			childrenIdList,
		);

		if (targetChildren) {
			childrenIdList.forEach((childId) => {
				targetChildren[childId].setProps({
					input_data: {
						value: data.value,
						error: data.error ?? '',
						currentFocus: { element, selectionStart },
					},
				});
			});
		}

		this.setProps({
			[formName]: {
				fields: { [fieldName]: data.value },
				errors: { [fieldName]: data.error ?? '' },
			},
		});
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

	protected resetTargetForm(formName: string, originData?: Record<string, string>) {
		let pageProps = { [formName]: { ...this.data[formName] } };
		let shouldBeUpdated = false;

		Object.entries(this.children).forEach(([fieldId, fieldInstance]) => {
			const parentFormId = this.getPropsValue(fieldInstance.data, 'parentFormId');

			if (fieldId.includes('field') && formName === parentFormId) {
				Object.entries(fieldInstance.children).forEach(([inputId, inputInstance]) => {
					if (inputId.includes('input')) {
						if (
							(originData
								&& originData?.[inputInstance.props.name] !== inputInstance.props.input_data.value)
							|| (!originData && inputInstance.props.input_data.value !== '')
						) {
							if (!shouldBeUpdated) {
								shouldBeUpdated = true;
							}

							const childProps = {
								input_data: {
									value: originData?.[inputInstance.props.name] ?? '',
									error: '',
									currentFocus: { element: null, selectionStart: null },
								},
							};

							inputInstance.setProps(childProps);
							fieldInstance.setProps(childProps);

							pageProps = {
								[formName]: {
									...pageProps[formName],
									fields: {
										...pageProps[formName].fields,
										[inputInstance.props.name]: originData?.[inputInstance.props.name] ?? '',
									},
									errors: {
										...pageProps[formName].errors,
										[inputInstance.props.name]: '',
									},
								},
							};
						}
					}
				});
			}
		});

		if (shouldBeUpdated) {
			this.setProps(pageProps);
		}
	}

	private _setFocus() {
		if (this.data?.input_data?.currentFocus?.element && this._element instanceof HTMLInputElement) {
			setTimeout(() => {
				if (this._element && 'focus' in this._element && 'setSelectionRange' in this._element) {
					this._element.focus();
					this._element.setSelectionRange(
						this.data.input_data.currentFocus.selectionStart,
						this.data.input_data.currentFocus.selectionStart,
					);
				}
			}, 0);
		}
	}

	protected createModal<T>(
		contentId: string,
		contentForms: Record<string, IFormState<T>>,
		title: string,
	) {
		const modal = new Pages.ModalBlock<T>({
			contentId,
			contentForms,
			title,
			error: '',
			children: {},
		});

		// if (this.data.appElement) {
		// 	const content = modal.getContent();
		//
		// 	if (content) {
		// 		this.data.appElement.parentNode.appendChild(content);
		// 		modal.dispatchComponentDidMount();
		// 	}
		// }
	}
}
