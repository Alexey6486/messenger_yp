import * as Pages from './pages';
import {
	INIT_ERROR_STATE,
	INIT_LOGIN_STATE,
	INIT_MAIN_PAGE_STATE,
	INIT_PROFILE_PAGE_STATE,
	INIT_REGISTRATION_STATE,
	INIT_USER_DATA,
	PAGES,
} from './constants';
import type {
	IState,
	TNullable,
	TPages,
} from './types';

export default class App {
	private appElement: TNullable<HTMLElement>;
	private state: IState;

	constructor() {
		this.appElement = document.getElementById('app');
		this.state = {
			currentPage: PAGES.AUTHORIZATION,
			user: JSON.parse(JSON.stringify(INIT_USER_DATA)),
			pages: {
				authorization: { authorizationForm: JSON.parse(JSON.stringify(INIT_LOGIN_STATE)) },
				registration: { registrationForm: JSON.parse(JSON.stringify(INIT_REGISTRATION_STATE)) },
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
			const loginPage = new Pages.LoginBlock({
				...this.state.pages.authorization,
				appElement: this.appElement,
				children: {},
				changePage: (page: TPages) => this.changePage(page),
			});

			if (this.appElement) {
				const content = loginPage.getContent();

				if (content) {
					this.appElement.appendChild(content);
					loginPage.dispatchComponentDidMount();
				}
			}
		} else if (this.state.currentPage === PAGES.REGISTRATION) {
			const registrationPage = new Pages.RegistrationBlock({
				...this.state.pages.registration,
				children: {},
				changePage: (page: TPages) => this.changePage(page),
			});

			if (this.appElement) {
				const content = registrationPage.getContent();

				if (content) {
					this.appElement.appendChild(content);
					registrationPage.dispatchComponentDidMount();
				}
			}
		} else if (this.state.currentPage === PAGES.ERROR) {
			const errorPage = new Pages.ErrorBlock({
				data: {
					...this.state.pages.error,
					changePage: (page: TPages) => this.changePage(page),
				},
			});

			if (this.appElement) {
				const content = errorPage.getContent();

				if (content) {
					this.appElement.appendChild(content);
					errorPage.dispatchComponentDidMount();
				}
			}
		} else if (this.state.currentPage === PAGES.PROFILE) {
			const profilePage = new Pages.ProfileBlock({
				...this.state.pages.profile,
				userData: { ...this.state.user },
				children: {},
				changePage: (page: TPages) => this.changePage(page),
			});

			if (this.appElement) {
				const content = profilePage.getContent();

				if (content) {
					this.appElement.appendChild(content);
					profilePage.dispatchComponentDidMount();
				}
			}
		} else if (this.state.currentPage === PAGES.MAIN) {
			const mainPage = new Pages.MainBlock({
				...this.state.pages.main,
				userData: { ...this.state.user },
				changePage: (page: TPages) => this.changePage(page),
			});

			if (this.appElement) {
				const content = mainPage.getContent();

				if (content) {
					this.appElement.appendChild(content);
					mainPage.dispatchComponentDidMount();
				}
			}
		}

		return '';
	}

	changePage(targetPage: TPages) {
		this.state.currentPage = targetPage;
		this.render();
	}
}
