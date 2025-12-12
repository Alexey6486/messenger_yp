import { EventBus } from '@/event-bus';
import * as Pages from '@/pages';
import { IDS } from '@/constants';
import type {
	BlockProps,
	IChildren,
	IFormState,
	IInputChangeParams,
	E_FORM_FIELDS_NAME,
	Nullable,
} from '@/types';
import {
	IEbEvents,
} from '@/types';

export class Block {
	static EVENTS: Record<string, string> = {
		INIT: IEbEvents.INIT,
		FLOW_CDM: IEbEvents.FLOW_CDM,
		FLOW_CDU: IEbEvents.FLOW_CDU,
		FLOW_CWU: IEbEvents.FLOW_CWU,
		FLOW_RENDER: IEbEvents.FLOW_RENDER,
	};

	_element: Nullable<Element | HTMLElement | HTMLInputElement> = null;
	props: BlockProps;
	children: IChildren<Block>;
	childrenList: IChildren<Block>;
	allInstances: IChildren<Block>;
	protected eventBus: () => EventBus;

	/** JSDoc
	 * @param {BlockProps} props
	 *
	 * @returns {void}
	 */
	constructor(props: BlockProps = {}) {
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

	private _getPropsParts(props: BlockProps) {
		const children_part: Record<string, Block> = {};
		const children_list_part: Record<string, Block> = {};
		const all_instances_part: Record<string, Block> = {};
		const props_part: BlockProps = {};

		Object.entries(props).forEach(([props_name, value]) => {
			if (props_name === 'children') {
				Object.values(value as Record<string, Block>).forEach((instance) => {
					children_part[instance.props.id] = instance;
					all_instances_part[instance.props.id] = instance;
				});
			} else if (props_name === 'childrenList' && Array.isArray(value)) {
				value.forEach((instance) => {
					children_list_part[instance.props.id] = instance;
					all_instances_part[instance.props.id] = instance;
				});
			} else {
				props_part[props_name] = value;
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

	private _componentWillUnmount(props: BlockProps) {
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

		if (props?.page) {
			this.props.changePage(props.page);
		}
	}

	private _render() {
		this._removeEvents();

		const temp = this._createDocumentElement('template') as HTMLTemplateElement;
		temp.innerHTML = this.render();

		Object.values(this.children).forEach((instance) => {
			const element = temp.content.getElementById(instance.props.id);

			if (element) {
				element.replaceWith(instance.getContent());
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

	setProps(nextProps: BlockProps) {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	}

	private _makePropsProxy(props: BlockProps) {
		const self = this;

		return new Proxy<BlockProps>(props, {
			get(target: BlockProps, p: string) {
				const value = target[p];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target: BlockProps, p: string, newValue) {
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
		let pageProps = { [formName]: { ...this.props[formName] } };
		let shouldBeUpdated = false;

		Object.entries(this.children).forEach(([fieldId, fieldInstance]) => {
			if (fieldId.includes('field') && formName === fieldInstance.props.parentFormId) {
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
		if (this.props?.input_data?.currentFocus?.element && this._element instanceof HTMLInputElement) {
			setTimeout(() => {
				if (this._element && 'focus' in this._element && 'setSelectionRange' in this._element) {
					this._element.focus();
					this._element.setSelectionRange(
						this.props.input_data.currentFocus.selectionStart,
						this.props.input_data.currentFocus.selectionStart,
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

		if (this.props.appElement) {
			const content = modal.getContent();

			if (content) {
				this.props.appElement.parentNode.appendChild(content);
				modal.dispatchComponentDidMount();
			}
		}
	}
}
