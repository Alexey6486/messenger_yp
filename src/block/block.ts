import { EventBus } from '@/event-bus';
import * as Pages from '@/pages';
import { IDS } from '@/constants';
import { isFunction } from '@/utils';
import type {
	IChildren,
	IFormState,
	IInputChangeParams,
	Nullable,
	BlockProps,
} from '@/types';
import {
	E_EB_EVENTS,
	E_FORM_FIELDS_NAME,
} from '@/types';

export abstract class Block<Props = BlockProps<Block<undefined>>> {
	static EVENTS = {
		INIT: E_EB_EVENTS.INIT,
		FLOW_CDM: E_EB_EVENTS.FLOW_CDM,
		FLOW_CDU: E_EB_EVENTS.FLOW_CDU,
		FLOW_CWU: E_EB_EVENTS.FLOW_CWU,
		FLOW_RENDER: E_EB_EVENTS.FLOW_RENDER,
	} as const;

	_element: Nullable<Element | HTMLElement | HTMLInputElement> = null;
	data;
	base;
	callbacks;
	children;
	childrenList;
	allInstances;
	protected eventBus;

	/** JSDoc
	 * @param {Props} props
	 *
	 * @returns {void}
	 */
	constructor(props) {
		const {
			children_part, children_list_part, all_instances_part, data_part, callbacks_part, base_part,
		} = this._getPropsParts(props);

		this.base = this._makePropsProxy({ ...base_part });
		this.data = this._makePropsProxy({ ...data_part });
		this.callbacks = callbacks_part;
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

	private _getPropsParts(props: Props) {
		const children_part = {};
		const children_list_part = {};
		const all_instances_part = {};
		const data_part = {};
		const callbacks_part = {};
		const base_part = {};

		Object.entries(props).forEach(([props_key, props_value]) => {
			if (props_key === 'children') {
				Object.values(props_value).forEach((instance) => {
					const instanceId: string | undefined = instance?.data?.id;
					if (instanceId) {
						children_part[instanceId] = instance;
						all_instances_part[instanceId] = instance;
					}

				});
			} else if (props_key === 'childrenList' && Array.isArray(props_value)) {
				props_value.forEach((instance) => {
					const instanceId: string | undefined = instance?.data?.id;
					if (instanceId) {
						children_list_part[instanceId] = instance;
						all_instances_part[instanceId] = instance;
					}
				});
			} else if (props_key === 'data') {
				Object.entries(props_value).forEach(([data_name, data_value]) => {
					data_part[data_name] = data_value;
				});
			} else if (props_key === 'callbacks') {
				Object.entries(props_value).forEach(([cb_name, cb]) => {
					callbacks_part[cb_name] = cb;
				});
			} else {
				base_part[props_key] = props_value;
			}
		});

		return { children_part, children_list_part, all_instances_part, data_part, callbacks_part, base_part };
	}

	private _addEvents() {
		const { events = null } = this.base;

		if (this._element && events) {
			Object.keys(events).forEach(eventName => {
				(this._element as Element).addEventListener(eventName, events[eventName]);
			});
		}
	}

	private _removeEvents() {
		const { events = null } = this.base;

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

	private _componentWillUnmount(props: Props) {
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

		if (props?.page && isFunction(this.callbacks.changePage)) {
			this.callbacks.changePage(props.page);
		}
	}

	private _render() {
		this._removeEvents();

		const temp = this._createDocumentElement('template') as HTMLTemplateElement;
		temp.innerHTML = this.render();

		Object.values(this.children).forEach((instance) => {
			const instanceId: string | undefined = instance?.props?.id;
			if (instanceId) {
				const element = temp.content.getElementById(instanceId);

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

	setProps(nextProps: Props) {
		if (!nextProps) {
			return;
		}

		Object.assign(this.data, nextProps);
	}

	private _makePropsProxy(props: Props): Props {
		const self = this;

		return new Proxy<Props>(props, {
			get(target: Props, p: string) {
				const value = target[p];
				if (isFunction(value)) {
					return value.bind(target);
				}
				return value;
			},
			set(target: Props, p: string, newValue) {
				const oldTarget = { ...target };
				if (p === 'input_data') {
					const { value, error, currentFocus } = newValue;

					target.data[p] = {
						...target.data[p],
						value,
						error,
						currentFocus,
					};
				} else if (p.toLowerCase().includes('form')) {
					const { fields, errors } = newValue;

					target.data[p] = {
						...target.data[p],
						fields: { ...target.data[p].fields, ...fields },
						errors: { ...target.data[p].errors, ...errors },
					};
				} else {
					target.data[p] = newValue;
				}

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
		const { attr = {} } = this.data;

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
		children: IChildren<Block>, idsList: string[], childrenBlocks?: IChildren<Block>,
	): IChildren<Block> {
		const targetChildren: IChildren<Block> = childrenBlocks || {};

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
		params: IInputChangeParams<Block>,
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

		childrenIdList.forEach((childId) => {
			targetChildren[childId].setProps({
				input_data: {
					value: data.value,
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
			if (fieldId.includes('field') && formName === fieldInstance.data.parentFormId) {
				Object.entries(fieldInstance.children).forEach(([inputId, inputInstance]) => {
					if (inputId.includes('input')) {
						if (
							(originData
								&& originData?.[inputInstance.data.name] !== inputInstance.data.input_data.value)
							|| (!originData && inputInstance.data.input_data.value !== '')
						) {
							if (!shouldBeUpdated) {
								shouldBeUpdated = true;
							}

							const childProps = {
								input_data: {
									value: originData?.[inputInstance.data.name] ?? '',
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
										[inputInstance.data.name]: originData?.[inputInstance.data.name] ?? '',
									},
									errors: {
										...pageProps[formName].errors,
										[inputInstance.data.name]: '',
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

		if (this.data.appElement) {
			const content = modal.getContent();

			if (content) {
				this.data.appElement.parentNode.appendChild(content);
				modal.dispatchComponentDidMount();
			}
		}
	}
}
