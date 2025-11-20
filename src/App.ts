import * as Handlebars from 'handlebars';
import * as Pages from './pages';
import {
    IDS,
    INIT_LOGIN_STATE,
    INIT_REGISTRATION_STATE,
    PAGES,
} from './constants';
import type {
    IState,
    TPages,
    TFormsFields,
} from './types';
import Button from './components/button';
import Field from './components/field';

Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Field', Field);

export default class App {
    private appElement: HTMLElement | null;
    private state: IState;

    constructor() {
        this.appElement = document.getElementById('app');
        this.state = {
            currentPage: PAGES.AUTHORIZATION,
            focusElement: null,
            pages: {
                authorization: { form: INIT_LOGIN_STATE },
                registration: { form: INIT_REGISTRATION_STATE },
            }
        }
    }

    render() {
        if (this.state.currentPage === PAGES.AUTHORIZATION) {
            if (this.appElement && "innerHTML" in this.appElement) {
                this.appElement.innerHTML = Pages.GetLoginPage(this.state.pages.authorization.form);
            }
        }
        else if (this.state.currentPage === PAGES.REGISTRATION) {
            if (this.appElement && "innerHTML" in this.appElement) {
                this.appElement.innerHTML = Pages.GetRegistrationPage(this.state.pages.registration.form);
            }
        }
        this.attachEventListener();
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
                                console.log('authorizing...');
                            }
                            else if (this.state.currentPage === PAGES.REGISTRATION) {
                                this.changePage(targetDataSet);
                            }
                            break;
                        }
                        case PAGES.REGISTRATION: {
                            if (this.state.currentPage === PAGES.AUTHORIZATION) {
                                this.changePage(targetDataSet);
                            }
                            else if (this.state.currentPage === PAGES.REGISTRATION) {
                                console.log('registration...');
                            }
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
    };

    changePage(page: TPages) {
        this.state.currentPage = page;
        this.render();
    }
}
