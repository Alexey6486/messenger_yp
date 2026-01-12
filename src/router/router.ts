import { Block } from '@/block';
import type {
	BlockProps,
	TNullable,
} from '@/types';
import {
	PAGES_URL,
	STORAGE_KEY,
} from '@/constants';
import { AuthController } from '@/controllers';

function isEqual(lhs: string, rhs: string) {
	return lhs === rhs;
}

function render(rootContainer: HTMLElement, block: Block) {
	rootContainer.appendChild(block.getContent());
	block.dispatchComponentDidMount();
	return rootContainer;
}

class Route {
	private _pathname: string;
	private _view: new (props: BlockProps) => Block;
	private _instance: TNullable<Block>;
	private _rootContainer: HTMLElement;
	private _router: Router;
	private _props: BlockProps;

	constructor(
		pathname: string, view: new (props: BlockProps) => Block, rootContainer: HTMLElement, router: Router, props: BlockProps = {},
	) {
		this._pathname = pathname;
		this._view = view;
		this._instance = null;
		this._rootContainer = rootContainer;
		this._router = router;
		this._props = props;
	}

	navigate(pathname: string) {
		if (this.match(pathname)) {
			this._pathname = pathname;
			this.render();
		}
	}

	leave() {
		if (this._instance && 'eventBus' in this._instance) {
			this._instance.eventBus().emit(Block.EVENTS.FLOW_CWU);
		}
	}

	match(pathname: string) {
		return isEqual(pathname, this._pathname);
	}

	render() {
		if (typeof this._view === 'function') {
			this._instance = new this._view({ ...this._props, router: this._router });

			if (this._instance) {
				render(this._rootContainer, this._instance);
			}
		}
	}
}

export class Router {
	private static __instance: Router;
	private routes: TNullable<Route[]> = null;
	private history: TNullable<History> = null;
	private _currentRoute: TNullable<Route> = null;
	private _rootContainer: TNullable<HTMLElement> = null;

	constructor(rootContainer: HTMLElement) {
		if (Router.__instance) {
			return Router.__instance;
		}

		this.routes = [];
		this.history = window.history;
		this._currentRoute = null;
		this._rootContainer = rootContainer;

		Router.__instance = this;
	}

	use(pathname: string, block: new (props: BlockProps) => Block, router: Router, props?: BlockProps) {
		if (this._rootContainer && this.routes) {
			const route = new Route(pathname, block, this._rootContainer, router, props);
			this.routes.push(route);
		}
		return this;
	}

	start() {
		window.onpopstate = ((event: PopStateEvent) => {
			if (event.currentTarget instanceof Window) {
				this._onRoute(event.currentTarget.location.hash);
			}
		}).bind(this);

		window.onpagehide = (() => {
			AuthController.logout();
		}).bind(this);

		this._onRoute(window.location.hash);
	}

	_onRoute(pathname: string) {
		const route: Route | undefined = this.getRoute(pathname);
		const isAuthed = Boolean(sessionStorage.getItem(STORAGE_KEY));

		if (
			!isAuthed
			&& route
			&& (!route.match(PAGES_URL.AUTHORIZATION) && !route.match(PAGES_URL.REGISTRATION))
		) {
			this.go(PAGES_URL.AUTHORIZATION);
			return;
		}

		if (!route) {
			this.go(PAGES_URL.NOT_FOUND);
			return;
		}

		if (
			isAuthed
			&& route
			&& (route.match(PAGES_URL.AUTHORIZATION) || route.match(PAGES_URL.REGISTRATION))
		) {
			this.go(PAGES_URL.MAIN);
			return;
		}

		if (this._currentRoute && this._currentRoute !== route) {
			this._currentRoute.leave();
		}

		this._currentRoute = route;
		route.render();
	}

	go(pathname: string) {
		if (this.history) {
			this.history.pushState({}, '', pathname);
			this._onRoute(pathname);
		}
	}

	back() {
		if (this.history) {
			this.history.back();
		} else {
			this.go(PAGES_URL.AUTHORIZATION);
		}
	}

	forward() {
		if (this.history) {
			this.history.forward();
		}
	}

	getRoute(pathname: string) {
		if (this.routes) {
			return this.routes.find((route) => route.match(pathname));
		}
	}
}
