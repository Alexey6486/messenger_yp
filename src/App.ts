import * as Handlebars from 'handlebars';
import * as Pages from './pages';
import { PAGES } from './constants';
import type {
    ILoginState,
    IRegistrationState,
    TPages,
} from './types';
import Button from './components/button';

Handlebars.registerPartial('Button', Button);

export default class App {
    private appElement: HTMLElement | null;
    private state: {
        loginForm: ILoginState;
        currentPage: TPages;
        registrationForm: IRegistrationState;
    };

    constructor() {
        this.appElement = document.getElementById('app');
        this.state = {
            currentPage: PAGES.AUTHORIZATION,
            loginForm: {
                name: 'name',
                password: '',
            },
            registrationForm: {
                first_name: 'first_name',
                second_name: '',
            },
        }
    }

    render() {
        if (this.state.currentPage === PAGES.AUTHORIZATION) {
            if (this.appElement && "innerHTML" in this.appElement) {
                this.appElement.innerHTML = Pages.GetLoginPage(this.state.loginForm);
            }
        }
        else if (this.state.currentPage === PAGES.REGISTRATION) {
            if (this.appElement && "innerHTML" in this.appElement) {
                this.appElement.innerHTML = Pages.GetRegistrationPage(this.state.registrationForm);
            }
        }
        this.attachEventListener();
    }

    attachEventListener() {
        if (this.state.currentPage === PAGES.AUTHORIZATION) {
            const btn = document.getElementById('to-registration');
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
        else if (this.state.currentPage === PAGES.REGISTRATION) {
            const btn = document.getElementById('to-login');
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
    };

    changePage(page: TPages) {
        this.state.currentPage = page;
        this.render();
    }
}
