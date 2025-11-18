import * as Handlebars from 'handlebars';
import * as Pages from './pages';
import { EPages } from './enum';
import Button from './components/button';

Handlebars.registerPartial('Button', Button);

export default class App {
    private appElement: HTMLElement | null;
    private state: {
        loginForm: { password: string; name: string };
        currentPage: EPages;
        registrationForm: { second_name: string; first_name: string }
    };

    constructor() {
        this.appElement = document.getElementById('app');
        this.state = {
            currentPage: EPages.AUTHORIZATION,
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
        if (this.state.currentPage === EPages.AUTHORIZATION) {
            if ("innerHTML" in this.appElement) {
                this.appElement.innerHTML = Pages.GetLoginPage(this.state.loginForm);
            }
        }
        else if (this.state.currentPage === EPages.REGISTRATION) {
            if ("innerHTML" in this.appElement) {
                this.appElement.innerHTML = Pages.GetRegistrationPage(this.state.registrationForm);
            }
        }
        this.attachEventListener();
    }

    attachEventListener() {
        if (this.state.currentPage === EPages.AUTHORIZATION) {
            const btn = document.getElementById('to-registration');
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const dataset = e?.target?.dataset;
                if (dataset && dataset.page) {
                    this.changePage(e.target?.dataset?.page);
                }
            });
        }
        else if (this.state.currentPage === EPages.REGISTRATION) {
            const btn = document.getElementById('to-login');
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const dataset = e?.target?.dataset;
                if (dataset && dataset.page) {
                    this.changePage(e.target?.dataset?.page);
                }
            });
        }
    };

    changePage(page) {
        this.state.currentPage = page;
        this.render();
    }
}
