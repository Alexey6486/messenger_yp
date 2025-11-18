import { EPages } from './enum';

export default class App {
    constructor() {
        this.appElement = document.getElementById('app');
        this.state = {
            currentPage: EPages.AUTHORIZATION,
            loginForm: {
                name: '',
                password: '',
            },
            registrationForm: {
                first_name: '',
                second_name: '',
            },
        }
    }

    render() {
        let template;
        if (this.state.currentPage === EPages.AUTHORIZATION) {
            // template = Handlebars.compile();
        }
    }
}
