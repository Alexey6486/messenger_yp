import { EventBus } from '@/event-bus';
import { FocusManager } from '@/focus-manager';
import * as Pages from '@/pages';
import { IDS } from '@/constants';
import type {
	BlockProps,
	IChildren,
	TNullable,
} from '@/types';
import { IEbEvents } from '@/types';

export abstract class Block {
	static EVENTS = {
		INIT: IEbEvents.INIT,
		FLOW_CDM: IEbEvents.FLOW_CDM,
		FLOW_CDU: IEbEvents.FLOW_CDU,
		FLOW_CWU: IEbEvents.FLOW_CWU,
		FLOW_RENDER: IEbEvents.FLOW_RENDER,
	} as const;

	_element: TNullable<Element | HTMLElement | HTMLInputElement> = null;
	props: BlockProps;
	children: IChildren<Block>;
	childrenList: IChildren<Block>;
	allInstances: IChildren<Block>;
	eventBus: () => EventBus;

	/** JSDoc
	 * @param {BlockProps} props
	 *
	 * @returns {void}
	 */
	constructor(props: BlockProps = {}) {
		const { children_part, children_list_part, all_instances_part, props_part } = this._getPropsParts(props);

		this.props = this._makePropsProxy({ ...props_part });
		this.childrenList = this._makeChildrenListProxy({ ...children_list_part });
		this.children = children_part;
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
				props_part[props_name as keyof BlockProps] = value;
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

	private _componentWillUnmount() {
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
			console.log({ element, t: this });
			if (element) {
				let children: Array<Element | HTMLElement | HTMLInputElement> = [];

				Object.values(this.childrenList).forEach((instance) => {
					console.log({ instance });
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
		const { element: focusElement, selectionStart } = FocusManager.getState();
		if (this.element === focusElement?.element) {
			this._setFocus(selectionStart);
		}
	}

	private _setFocus(selectionStart: TNullable<number>) {
		if (this._element instanceof HTMLInputElement) {
			setTimeout(() => {
				if (this._element && 'focus' in this._element && 'setSelectionRange' in this._element) {
					this._element.focus();
					if (selectionStart !== null) {
						this._element.setSelectionRange(
							selectionStart,
							selectionStart,
						);
					}
				}
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

	clearChildrenList() {
		Object.entries(this.childrenList).forEach((entry) => {
			const [key] = entry;
			delete this.childrenList[key];
		});
	}

	setChildrenList(childrenList: IChildren<Block>) {
		console.log(childrenList);
		if (!childrenList) {
			return;
		}

		Object.assign(this.childrenList, childrenList);
	}

	setProps(nextProps: BlockProps) {
		console.log('Block setProps: ', nextProps);
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	}

	private _makeChildrenListProxy(props: IChildren<Block>) {
		const self = this;

		return new Proxy<IChildren<Block>>(props, {
			get(target: IChildren<Block>, p: string) {
				return target[p];
			},
			set(target: IChildren<Block>, p: string, newValue: Block) {
				console.log('_makeChildrenListProxy set: ', { target, newValue });
				const oldTarget = { ...target };

				target[p] = newValue;

				self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
				return true;
			},
			deleteProperty(target: IChildren<Block>, p: string) {
				if (!(p in target)) {
					throw new Error('Property not found');
				}

				target[p].eventBus().emit(Block.EVENTS.FLOW_CWU);
				delete target[p];
				return true;
			},
		});
	}

	private _makePropsProxy(props: BlockProps) {
		const self = this;

		return new Proxy<BlockProps>(props, {
			get(target: BlockProps, p: keyof BlockProps) {
				const value = target[p];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target: BlockProps, p: keyof BlockProps, newValue) {
				console.log('Block setProps: ', { target, p, newValue });
				const oldTarget = { ...target };

				if (
					p === 'authorizationForm'
					|| p === 'registrationForm'
					|| p === 'passwordForm'
					|| p === 'userForm'
					|| p === 'chatsSearchForm'
					|| p === 'newMessageForm'
					|| p === 'modalAddUsersForm'
					|| p === 'modalAddChatForm'
				) {
					const errors = target[p]?.errors ?? {};
					const fields = target[p]?.fields ?? {};

					if (errors && fields) {
						target[p] = {
							errors: {
								...errors,
								...newValue?.errors,
							},
							fields: {
								...fields,
								...newValue?.fields,
							},
						};
					}

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

	createModal(
		contentId: keyof BlockProps,
		title: string,
		onSubmit?: (event?: Event, data?: unknown) => void,
	) {
		const modal = new Pages.ModalBlock({
			contentId,
			title,
			onSubmit,
		});
		console.log('Block createModal: ', { contentId, title, modal, t: this });

		if (this?.props?.container) {
			const content = modal.getContent();

			if (content) {
				if (this?.props?.container?.parentNode) {
					this.props.container.parentNode.appendChild(content);
					modal.dispatchComponentDidMount();
				}
			}
		}
	}
}
