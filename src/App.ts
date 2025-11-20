import * as Handlebars from 'handlebars';
import * as Pages from './pages';
import { INIT_LOGIN_STATE, INIT_REGISTRATION_STATE, PAGES } from './constants';
import type {
    IState,
    TPages,
    TFormsFields,
    ILoginForm,
    IRegistrationForm,
    IFormState,
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
            authorization: INIT_LOGIN_STATE,
            registration: INIT_REGISTRATION_STATE,
        }
    }

    render() {
        if (this.state.currentPage === PAGES.AUTHORIZATION) {
            if (this.appElement && "innerHTML" in this.appElement) {
                this.appElement.innerHTML = Pages.GetLoginPage(this.state.authorization);
            }
        }
        else if (this.state.currentPage === PAGES.REGISTRATION) {
            if (this.appElement && "innerHTML" in this.appElement) {
                this.appElement.innerHTML = Pages.GetRegistrationPage(this.state.registration);
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

    setChangePageListener(buttonId: string) {
        const btn = document.getElementById(buttonId);
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e?.target as HTMLElement;
                if (target?.dataset?.page) {
                    this.changePage(target.dataset.page as TPages);
                }
            });
        }
    }

    setInputListener<T extends TFormsFields>(page: TPages) {
        const fields = document.querySelectorAll('[data-input]');
        fields.forEach((el) => {
            el.addEventListener('input', (e) => {
                const targetElement = e?.target as HTMLInputElement | undefined;
                const targetValue = targetElement?.value;
                const targetInput: keyof T | undefined = targetElement?.dataset?.input as keyof T | undefined;
                if (targetValue !== undefined && targetInput) {
                    // @ts-ignore
                    ((this.state[page] as IFormState<T>).data as T)[targetInput] = targetValue;
                    this.state.focusElement = targetInput as string;
                    this.render();
                }
            })
        })
    }

    attachEventListener() {
        this.setFocusAndCursor();
        if (this.state.currentPage === PAGES.AUTHORIZATION) {
            this.setChangePageListener('to-registration');
            this.setInputListener<ILoginForm>(PAGES.AUTHORIZATION);
        }
        else if (this.state.currentPage === PAGES.REGISTRATION) {
            this.setChangePageListener('to-login');
            this.setInputListener<IRegistrationForm>(PAGES.REGISTRATION);
        }
    };

    changePage(page: TPages) {
        this.state.currentPage = page;
        this.render();
    }
}
