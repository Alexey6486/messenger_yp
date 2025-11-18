import * as Pages from './pages/index';
import { EPages } from './enum/index';

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
                name: 'test',
                password: '',
            },
            registrationForm: {
                first_name: '',
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
    }
}
