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
	Nullable,
	TPages,
} from './types';

export default class App {
	private appElement: Nullable<HTMLElement>;
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

		if (this.state.currentPage === PAGES.PROFILE) {
			const profilePage = new Pages.ProfileBlock({
				userData: { ...this.state.user },
				passwordForm: { ...this.state.pages.profile.passwordForm },
				userForm: { ...this.state.pages.profile.userForm },
				isDataEdit: this.state.pages.profile.isDataEdit,
				isPasswordEdit: this.state.pages.profile.isPasswordEdit,
				changePage: (page: TPages) => this.changePage(page),
			});

			if (this.appElement) {
				const content = profilePage.getContent();

				if (content) {
					this.appElement.appendChild(content);
					profilePage.dispatchComponentDidMount();
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
