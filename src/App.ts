import * as Handlebars from 'handlebars';
import * as Pages from './pages';
import {
    IDS,
    INIT_LOGIN_STATE,
    INIT_REGISTRATION_STATE,
    INIT_MAIN_PAGE_STATE,
    PAGES,
    DATASET,
} from './constants';
import type {
    IState,
    TPages,
    TFormsFields,
} from './types';
import { searchChatId } from './utils';
import Button from './components/button';
import Field from './components/field';
import Chat from './components/chat';
import DropDownOption from './components/drop-down-option';
import DropDown from './components/drop-down';

Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Field', Field);
Handlebars.registerPartial('Chat', Chat);
Handlebars.registerPartial('DropDownOption', DropDownOption);
Handlebars.registerPartial('DropDown', DropDown);

Handlebars.registerHelper('lookup', function(obj, key) {
    return obj[key] || obj;
});
Handlebars.registerHelper('map', function(array, transformFn, options) {
    if (!Array.isArray(array)) return '';

    const mapped = array.map((item, index) =>
        transformFn(item, index, options.hash)
    );

    return options.fn(mapped);
});
Handlebars.registerHelper('isChatActive', function(obj, key) {
    return obj.currentChatId === key;
});
Handlebars.registerHelper('isDdActive', function(obj) {
    return obj.openedDropDownId === obj.id;
});

export default class App {
    private appElement: HTMLElement | null;
    private state: IState;

    constructor() {
        this.appElement = document.getElementById('app');
        this.state = {
            currentPage: PAGES.MAIN,
            focusElement: null,
            openedDropDownId: null,
            error: {
                code: '404',
                text: 'Страница не найдена',
            },
            pages: {
                authorization: { form: JSON.parse(JSON.stringify(INIT_LOGIN_STATE)) },
                registration: { form: JSON.parse(JSON.stringify(INIT_REGISTRATION_STATE)) },
                main: JSON.parse(JSON.stringify(INIT_MAIN_PAGE_STATE)),
            }
        }
    }

    render(openDropDown?: boolean) {
        if (!(this.appElement && "innerHTML" in this.appElement)) {
            return;
        }

        if (this.state.openedDropDownId && !openDropDown) {
            this.state.openedDropDownId = null;
        }

        if (this.state.currentPage === PAGES.AUTHORIZATION) {
            this.appElement.innerHTML = Pages.GetLoginPage(this.state.pages.authorization.form);
        }
        else if (this.state.currentPage === PAGES.REGISTRATION) {
            this.appElement.innerHTML = Pages.GetRegistrationPage(this.state.pages.registration.form);
        }
        else if (this.state.currentPage === PAGES.MAIN) {
            this.appElement.innerHTML = Pages.GetMainPage(this.state.pages.main, this.state.openedDropDownId);
        }
        else if (this.state.currentPage === PAGES.ERROR) {
            this.appElement.innerHTML = Pages.GetErrorPage(this.state.error);
        }

        this.attachEventListener();
    }

    resetForm(targetPageState: TPages) {
        switch (targetPageState) {
            case PAGES.AUTHORIZATION: {
                this.state.pages.authorization.form = JSON.parse(JSON.stringify(INIT_LOGIN_STATE));
                break;
            }
            case PAGES.REGISTRATION: {
                this.state.pages.registration.form = JSON.parse(JSON.stringify(INIT_REGISTRATION_STATE));
                break;
            }
            default:
                break;
        }
    }

    setFocusAndCursor() {
        if (this.state.focusElement) {
            const input: HTMLInputElement | null = document.querySelector(`[data-input=${this.state.focusElement}]`);
            if (input) {
                (input as HTMLInputElement).focus();
                (input as HTMLInputElement).setSelectionRange(input.value.length, input.value.length);
            }
            this.state.focusElement = null;
        }
    }

    setChangePageListener(buttonsBlockId: string) {
        const targetBlock = document.getElementById(buttonsBlockId);
        if (targetBlock) {
            targetBlock.addEventListener('click', (e) => {
                const targetElement = e?.target as HTMLElement | undefined;
                const targetDataSet = targetElement?.dataset?.btn as TPages | undefined;
                if (targetDataSet) {
                    switch (targetDataSet) {
                        case PAGES.AUTHORIZATION: {
                            if (this.state.currentPage === PAGES.AUTHORIZATION) {
                                this.changePage(PAGES.MAIN, true);
                            }
                            else if (this.state.currentPage === PAGES.REGISTRATION) {
                                this.changePage(targetDataSet, true);
                            }
                            break;
                        }
                        case PAGES.REGISTRATION: {
                            if (this.state.currentPage === PAGES.AUTHORIZATION) {
                                this.changePage(targetDataSet, true);
                            }
                            else if (this.state.currentPage === PAGES.REGISTRATION) {
                                this.changePage(PAGES.MAIN, true);
                            }
                            break;
                        }
                        case PAGES.ERROR: {
                            this.changePage(PAGES.MAIN);
                            break;
                        }
                        default:
                            break;
                    }
                }
            })
        }
    }

    setInputListener(state: Partial<TFormsFields>) {
        const fields = document.querySelectorAll('[data-input]');
        fields.forEach((el) => {
            el.addEventListener('input', (e) => {
                const targetElement = e?.target as HTMLInputElement | undefined;
                const targetValue = targetElement?.value;
                const targetInput: keyof Partial<TFormsFields> | undefined = targetElement?.dataset?.input as keyof Partial<TFormsFields> | undefined;
                if (targetValue !== undefined && targetInput !== undefined) {
                    state[targetInput] = targetValue;
                    this.state.focusElement = targetInput;
                    this.render();
                }
            })
        })
    }

    setChatSwitchListener(chatsId: string) {
        const targetBlock = document.getElementById(chatsId);
        if (targetBlock) {
            targetBlock.addEventListener('click', (e) => {
                e.stopImmediatePropagation()
                const targetElement = e?.target as HTMLElement | undefined;
                if (targetElement) {
                    const chatId = searchChatId(targetElement, DATASET.CHAT, IDS.CHATS_LIST_ID);
                    if (chatId) {
                        this.state.pages.main.currentChatId = chatId;
                        this.render();
                    }
                }
            });
        }
    }

    setDropDownListener(dataset: string) {
        const dropdowns = document.querySelectorAll(`[data-dd=${dataset}]`);

        dropdowns.forEach(dropdown => {
            const toggleBtn = dropdown.querySelector('.drop-down-button');

            if (toggleBtn) {
                toggleBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    if (dropdown.classList.contains('active')) {
                        dropdown.classList.remove('active');
                    } else {
                        dropdown.classList.add('active');
                    }
                });

                document.addEventListener('click', function(e) {
                    const target = e.target as Node | null;
                    if (!dropdown.contains(target)) {
                        dropdown.classList.remove('active');
                    }
                });
            }
        });
    }

    attachEventListener() {
        this.setFocusAndCursor();
        if (this.state.currentPage === PAGES.AUTHORIZATION) {
            this.setChangePageListener(IDS.FORM_BUTTONS_ID);
            this.setInputListener(this.state.pages.authorization.form.fields);
        }
        else if (this.state.currentPage === PAGES.REGISTRATION) {
            this.setChangePageListener(IDS.FORM_BUTTONS_ID);
            this.setInputListener(this.state.pages.registration.form.fields);
        }
        else if (this.state.currentPage === PAGES.ERROR) {
            this.setChangePageListener(IDS.ERROR_RETURN_ID);
        }
        else if (this.state.currentPage === PAGES.MAIN) {
            this.setChatSwitchListener(IDS.CHATS_LIST_ID);
            this.setDropDownListener(DATASET.DD);
        }
    };

    changePage(targetPage: TPages, isFormReset?: boolean) {
        if (isFormReset) {
            this.resetForm(this.state.currentPage);
        }
        this.state.currentPage = targetPage;
        this.render();
    }
}
