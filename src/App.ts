import * as Handlebars from 'handlebars';
import * as Pages from './pages';
import {
	ICONS,
	INIT_ERROR_STATE,
	INIT_LOGIN_STATE,
	INIT_MAIN_PAGE_STATE,
	INIT_PROFILE_PAGE_STATE,
	INIT_REGISTRATION_STATE,
	INIT_USER_DATA,
	MODALS,
	PAGES,
	PARTIALS_TYPES,
	VARIOUS,
} from './constants';
import type {
	IState,
	TPages,
} from './types';

import Button from './components/button/button-template';
import ButtonRound from './components/button-round';
import Field from './components/form-fields/field-template';
import DropDownOption from './components/drop-down-option';
import DropDown from './components/drop-down';
import Chat from './pages/main/components/chat';
import Messages from './pages/main/components/messages';
import MessagesHeader from './pages/main/components/messages-header';
import MessagesFooter from './pages/main/components/messages-footer';
import Message from './pages/main/components/message';
import DatePlate from './pages/main/components/date-plate';
import ProfileField from './pages/profile/components/profile-field.hbs?raw';
import PartialPlaceholder from './components/placeholder';

import ModalAddUser from './pages/modal/components/add-user';

import IconDots from './components/icons/icon-dots';
import IconPaperclip from './components/icons/icon-paperclip';
import IconPlus from './components/icons/icon-plus';
import IconCross from './components/icons/icon-cross';
import IconCenter from './components/icons/icon-center';
import IconPhoto from './components/icons/icon-photo';
import IconFile from './components/icons/icon-file';
import IconArrowRight from './components/icons/icon-arrow-right';
import IconArrowLeft from './components/icons/icon-arrow-left';
import IconPlaceholder from './components/icons/icon-placeholder';

import PaperclipSvg from './icons-svg/paperclip';
import PhotoSvg from './icons-svg/photo';
import FileSvg from './icons-svg/file';
import CrossSvg from './icons-svg/cross';
import PlusSvg from './icons-svg/plus';
import CenterSvg from './icons-svg/center';
import DotsSvg from './icons-svg/dots';
import ArrowRightSvg from './icons-svg/arrow-right';
import ArrowLeftSvg from './icons-svg/arrow-left';

Handlebars.registerPartial(ICONS.IconDots, IconDots);
Handlebars.registerPartial(ICONS.IconPaperclip, IconPaperclip);
Handlebars.registerPartial(ICONS.IconPlus, IconPlus);
Handlebars.registerPartial(ICONS.IconCross, IconCross);
Handlebars.registerPartial(ICONS.IconCenter, IconCenter);
Handlebars.registerPartial(ICONS.IconPhoto, IconPhoto);
Handlebars.registerPartial(ICONS.IconFile, IconFile);
Handlebars.registerPartial(ICONS.IconArrowRight, IconArrowRight);
Handlebars.registerPartial(ICONS.IconArrowLeft, IconArrowLeft);
Handlebars.registerPartial(ICONS.IconPlaceholder, IconPlaceholder);

Handlebars.registerPartial('PaperclipSvg', PaperclipSvg);
Handlebars.registerPartial('PhotoSvg', PhotoSvg);
Handlebars.registerPartial('FileSvg', FileSvg);
Handlebars.registerPartial('PlusSvg', PlusSvg);
Handlebars.registerPartial('CenterSvg', CenterSvg);
Handlebars.registerPartial('CrossSvg', CrossSvg);
Handlebars.registerPartial('DotsSvg', DotsSvg);
Handlebars.registerPartial('ArrowRightSvg', ArrowRightSvg);
Handlebars.registerPartial('ArrowLeftSvg', ArrowLeftSvg);

Handlebars.registerPartial(VARIOUS.PartialPlaceholder, PartialPlaceholder);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('ButtonRound', ButtonRound);
Handlebars.registerPartial('Field', Field);
Handlebars.registerPartial('Chat', Chat);
Handlebars.registerPartial('DropDownOption', DropDownOption);
Handlebars.registerPartial('DropDown', DropDown);
Handlebars.registerPartial('Messages', Messages);
Handlebars.registerPartial('MessagesHeader', MessagesHeader);
Handlebars.registerPartial('MessagesFooter', MessagesFooter);
Handlebars.registerPartial('Message', Message);
Handlebars.registerPartial('DatePlate', DatePlate);
Handlebars.registerPartial('ProfileField', ProfileField);

Handlebars.registerPartial(MODALS.AddUserModal, ModalAddUser);

Handlebars.registerHelper('lookup', function (obj, key) {
	return obj[key] || obj;
});
Handlebars.registerHelper('map', function (array, transformFn, options) {
	if (!Array.isArray(array)) return '';
	const mapped = array.map((item, index) => transformFn(item, index, options.hash));
	return options.fn(mapped);
});
Handlebars.registerHelper('isChatActive', function (obj, key) {
	return obj.currentChatId === key;
});
Handlebars.registerHelper('getPartialComponent', function (partialName: string, partialType: string) {
	switch (partialType) {
		case PARTIALS_TYPES.ICON: {
			return ICONS[partialName] || ICONS.IconPlaceholder;
		}
		case PARTIALS_TYPES.MODAL: {
			return MODALS[partialName] || VARIOUS.PartialPlaceholder;
		}
		default: {
			return VARIOUS.PartialPlaceholder;
		}
	}
});
Handlebars.registerHelper('isMe', function (authorId, myId) {
	return myId === authorId;
});
Handlebars.registerHelper('not', function (value) {
	return !value;
});

export default class App {
	private appElement: HTMLElement | null;
	private state: IState;

	constructor() {
		this.appElement = document.getElementById('app');
		this.state = {
			currentPage: PAGES.AUTHORIZATION,
			focusElement: null,
			user: JSON.parse(JSON.stringify(INIT_USER_DATA)),
			pages: {
				authorization: { form: JSON.parse(JSON.stringify(INIT_LOGIN_STATE)) },
				registration: { form: JSON.parse(JSON.stringify(INIT_REGISTRATION_STATE)) },
				main: JSON.parse(JSON.stringify(INIT_MAIN_PAGE_STATE)),
				profile: JSON.parse(JSON.stringify(INIT_PROFILE_PAGE_STATE)),
				error: INIT_ERROR_STATE,
			},
		};
	}

	render() {
		if (!(this.appElement && 'innerHTML' in this.appElement)) {
			return;
		}

		if (this.state.currentPage === PAGES.AUTHORIZATION) {
			const loginPage = new Pages.LoginBlock(this.state.pages.authorization.form);

			if (this.appElement) {
				const content = loginPage.getContent();
				console.log('app render: ', { loginPage, c: content });

				if (content) {
					this.appElement.appendChild(content);
					loginPage.dispatchComponentDidMount();
				}
			}
		}

		return '';
		// this.attachEventListener();
	}

	// resetForm(targetPageState: TPages) {
	// 	switch (targetPageState) {
	// 		case PAGES.AUTHORIZATION: {
	// 			this.state.pages.authorization.form = JSON.parse(JSON.stringify(INIT_LOGIN_STATE));
	// 			break;
	// 		}
	// 		case PAGES.REGISTRATION: {
	// 			this.state.pages.registration.form = JSON.parse(JSON.stringify(INIT_REGISTRATION_STATE));
	// 			break;
	// 		}
	// 		case PAGES.PROFILE: {
	// 			this.state.pages.profile = JSON.parse(JSON.stringify(INIT_PROFILE_PAGE_STATE));
	// 			break;
	// 		}
	// 		default:
	// 			break;
	// 	}
	// }

	// setFocusAndCursor() {
	// 	if (this.state.focusElement) {
	// 		const input: HTMLInputElement | null = document.querySelector(`[data-input=${ this.state.focusElement }]`);
	// 		if (input && input instanceof HTMLInputElement) {
	// 			(input as HTMLInputElement).focus();
	// 			(input as HTMLInputElement).setSelectionRange(input.value.length, input.value.length);
	// 		}
	// 		this.state.focusElement = null;
	// 	}
	// }

	// setChangePageListener(buttonsBlockId: string) {
	// 	const targetBlock: HTMLElement | null = document.getElementById(buttonsBlockId);
	// 	if (targetBlock) {
	// 		targetBlock.addEventListener('click', (e) => {
	// 			e.preventDefault();
	// 			const targetElement = e?.target as HTMLElement | undefined;
	// 			const targetDataSet = targetElement?.dataset?.btn as TPages | undefined;
	// 			if (targetDataSet) {
	// 				switch (targetDataSet) {
	// 					case PAGES.AUTHORIZATION: {
	// 						if (this.state.currentPage === PAGES.REGISTRATION) {
	// 							this.changePage(targetDataSet, true);
	// 						}
	// 						break;
	// 					}
	// 					case PAGES.REGISTRATION: {
	// 						if (this.state.currentPage === PAGES.AUTHORIZATION) {
	// 							this.changePage(targetDataSet, true);
	// 						}
	// 						break;
	// 					}
	// 					case PAGES.ERROR: {
	// 						this.changePage(PAGES.MAIN);
	// 						break;
	// 					}
	// 					default:
	// 						break;
	// 				}
	// 			}
	// 		});
	// 	}
	// }

	// setFormSubmitListener(formIdList: string[]) {
	// 	formIdList.forEach((targetId) => {
	// 		const targetForm: HTMLElement | null = document.getElementById(targetId);
	// 		if (targetForm) {
	// 			targetForm.addEventListener('submit', (e) => {
	// 				e.preventDefault();
	// 				if (this.state.currentPage === PAGES.AUTHORIZATION) {
	// 					this.changePage(PAGES.MAIN, true);
	// 				} else if (this.state.currentPage === PAGES.REGISTRATION) {
	// 					this.changePage(PAGES.MAIN, true);
	// 				} else if (this.state.currentPage === PAGES.PROFILE) {
	// 					this.changePage(PAGES.PROFILE, true);
	// 				} else if (this.state.currentPage === PAGES.MAIN) {
	// 					return;
	// 				}
	// 			});
	// 		}
	// 	});
	// }

	// setInputListener(state: Partial<TFormsFields>) {
	// 	const fields: NodeListOf<HTMLInputElement> | undefined = document.querySelectorAll('[data-input]');
	// 	if (fields) {
	// 		fields.forEach((el) => {
	// 			if (el instanceof HTMLInputElement) {
	// 				el.addEventListener('input', (e) => {
	// 					const targetElement = e?.target as HTMLInputElement | undefined;
	// 					const targetValue = targetElement?.value;
	// 					const targetInput: keyof Partial<TFormsFields> | undefined = targetElement?.dataset?.input as keyof Partial<TFormsFields> | undefined;
	// 					if (targetValue !== undefined && targetInput !== undefined) {
	// 						state[targetInput] = targetValue;
	// 						this.state.focusElement = targetInput;
	// 						this.render();
	// 					}
	// 				});
	// 			}
	// 		});
	// 	}
	// }

	// setChatSwitchListener(chatsId: string) {
	// 	const targetBlock: HTMLElement | null = document.getElementById(chatsId);
	// 	if (targetBlock) {
	// 		targetBlock.addEventListener('click', (e) => {
	// 			e.stopImmediatePropagation();
	// 			const targetElement = e?.target as HTMLElement | undefined;
	// 			if (targetElement && targetElement instanceof HTMLElement) {
	// 				const chatId = searchDataset(targetElement, DATASET.CHAT, IDS.CHL);
	// 				if (chatId) {
	// 					this.state.pages.main.currentChatId = chatId;
	// 					this.render();
	// 				}
	// 			}
	// 		});
	// 	}
	// }

	// setModalListener() {
	// 	const modal: Element | null = document.querySelector(`[data-modal=${ DATASET.MODAL }]`);
	//
	// 	if (modal) {
	// 		modal.addEventListener('click', function (e) {
	// 			e.stopImmediatePropagation();
	// 			const targetElement = e?.target as HTMLInputElement | undefined;
	// 			if (targetElement && targetElement?.dataset[DATASET.CLOSE] === DATASET.CLOSE) {
	// 				if (modal.remove) {
	// 					modal.remove();
	// 				} else if (modal.parentNode) {
	// 					modal.parentNode.removeChild(modal);
	// 				}
	// 			}
	// 		});
	// 	}
	// }

	// setDropDownListener(dataset: string) {
	// 	const dropdowns: NodeListOf<Element> | undefined = document.querySelectorAll(`[data-dd=${ dataset }]`);
	//
	// 	if (dropdowns) {
	// 		dropdowns.forEach((dropdown) => {
	// 			const toggleBtn: Element | null = dropdown.querySelector(`.${ CLASSES.DDB }`);
	// 			const options: Element | null = dropdown.querySelector(`.${ CLASSES.DDO }`);
	//
	// 			if (toggleBtn) {
	// 				toggleBtn.addEventListener('click', function (e) {
	// 					e.stopPropagation();
	// 					if (dropdown.classList.contains(CLASSES.ACT)) {
	// 						dropdown.classList.remove(CLASSES.ACT);
	// 					} else {
	// 						dropdown.classList.add(CLASSES.ACT);
	// 					}
	// 				});
	//
	// 				document.addEventListener('click', function (e) {
	// 					const target = e.target as Node | null;
	// 					if (!dropdown.contains(target)) {
	// 						dropdown.classList.remove(CLASSES.ACT);
	// 					}
	// 				});
	// 			}
	//
	// 			if (options) {
	// 				options.addEventListener('click', (e) => {
	// 					e.stopImmediatePropagation();
	// 					const targetElement = e?.target as HTMLElement | undefined;
	// 					if (targetElement) {
	// 						const optionId = searchDataset(targetElement, DATASET.OPTION, undefined, CLASSES.DDO);
	// 						if (optionId) {
	// 							switch (optionId) {
	// 								case PAGES.AUTHORIZATION: {
	// 									this.changePage(PAGES.AUTHORIZATION);
	// 									break;
	// 								}
	// 								case PAGES.REGISTRATION: {
	// 									this.changePage(PAGES.REGISTRATION);
	// 									break;
	// 								}
	// 								case PAGES.ERROR: {
	// 									this.changePage(PAGES.ERROR);
	// 									break;
	// 								}
	// 								case DD_ACTIONS.ADD_USER_MODAL: {
	// 									if (!(this.appElement && 'innerHTML' in this.appElement)) {
	// 										break;
	// 									}
	// 									this.appElement.insertAdjacentHTML(
	// 										'afterend',
	// 										Pages.GetModal(INIT_ADD_USER_MODAL_STATE, MODALS.AddUserModal),
	// 									);
	// 									if (dropdown.classList.contains(CLASSES.ACT)) {
	// 										dropdown.classList.remove(CLASSES.ACT);
	// 									}
	// 									this.setModalListener();
	// 									break;
	// 								}
	// 								default: {
	// 									break;
	// 								}
	// 							}
	// 						}
	// 					}
	// 				});
	// 			}
	// 		});
	// 	}
	// }

	// setToPageListener(dataset: string, targetPage: TPages) {
	// 	const links: NodeListOf<Element> | undefined = document.querySelectorAll(dataset);
	// 	if (links) {
	// 		links.forEach((link) => {
	// 			link.addEventListener('click', (e) => {
	// 				e.stopImmediatePropagation();
	// 				this.changePage(targetPage);
	// 			});
	// 		});
	// 	}
	// }

	// setDataChangeButtonsListener(dataset: string) {
	// 	const links: NodeListOf<Element> | undefined = document.querySelectorAll(dataset);
	// 	if (links) {
	// 		links.forEach(link => {
	// 			link.addEventListener('click', (e) => {
	// 				e.stopImmediatePropagation();
	// 				const targetElement = e?.target as HTMLElement | undefined;
	// 				if (targetElement) {
	// 					const elementId = searchDataset(targetElement, DATASET.BTN, IDS.ABS);
	// 					switch (elementId) {
	// 						case IDS.ACD: {
	// 							this.state.pages.profile.isDataEdit = true;
	// 							this.render();
	// 							break;
	// 						}
	// 						case IDS.ACP: {
	// 							this.state.pages.profile.isPasswordEdit = true;
	// 							this.render();
	// 							break;
	// 						}
	// 						case IDS.ALG: {
	// 							this.changePage(PAGES.AUTHORIZATION, true);
	// 							break;
	// 						}
	// 						case IDS.ACL: {
	// 							this.state.pages.profile.isPasswordEdit = false;
	// 							this.state.pages.profile.isDataEdit = false;
	// 							this.render();
	// 							break;
	// 						}
	// 						default: {
	// 							break;
	// 						}
	// 					}
	// 				}
	// 			});
	// 		});
	// 	}
	// }

	// attachEventListener() {
	// 	this.setFocusAndCursor();
	// 	if (this.state.currentPage === PAGES.AUTHORIZATION) {
	// 		this.setChangePageListener(IDS.FBT);
	// 		this.setInputListener(this.state.pages.authorization.form.fields);
	// 		this.setFormSubmitListener([IDS.FLG]);
	// 	} else if (this.state.currentPage === PAGES.REGISTRATION) {
	// 		this.setChangePageListener(IDS.FBT);
	// 		this.setInputListener(this.state.pages.registration.form.fields);
	// 		this.setFormSubmitListener([IDS.FRG]);
	// 	} else if (this.state.currentPage === PAGES.ERROR) {
	// 		this.setChangePageListener(IDS.ERR);
	// 		this.setToPageListener(`[data-error=${ DATASET.PAGE_LINK }]`, PAGES.MAIN);
	// 	} else if (this.state.currentPage === PAGES.MAIN) {
	// 		this.setChatSwitchListener(IDS.CHL);
	// 		this.setDropDownListener(DATASET.DD);
	// 		this.setToPageListener(`[data-profile-btn=${ DATASET.PAGE_LINK }]`, PAGES.PROFILE);
	// 		this.setInputListener(this.state.pages.main.searchForm.fields);
	// 		this.setFormSubmitListener([IDS.FSR, IDS.FMS]);
	// 	} else if (this.state.currentPage === PAGES.PROFILE) {
	// 		this.setToPageListener(`[data-btn=${ DATASET.PAGE_LINK }]`, PAGES.MAIN);
	// 		this.setDataChangeButtonsListener(`[data-btn=${ DATASET.BTN }]`);
	// 		this.setInputListener(this.state.pages.profile.passwordForm.fields);
	// 		this.setInputListener(this.state.pages.profile.userForm.fields);
	// 		this.setFormSubmitListener([IDS.FAC]);
	// 	}
	// }

	changePage(targetPage: TPages, isFormReset?: boolean) {
		if (isFormReset) {
			this.resetForm(this.state.currentPage);
		}
		this.state.currentPage = targetPage;
		this.render();
	}
}
