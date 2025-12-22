import { Block } from '@/block';

function isEqual(lhs, rhs) {
	return lhs === rhs;
}

function render(query, block) {
	const root = document.querySelector(query);
	root.textContent = block.getContent();
	return root;
}

class Route {
	constructor(pathname, view, props) {
		this._pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._props = props;
	}

	navigate(pathname) {
		if (this.match(pathname)) {
			this._pathname = pathname;
			this.render();
		}
	}

	leave() {
		if (this._block) {
			this._block.hide();
		}
	}

	match(pathname) {
		return isEqual(pathname, this._pathname);
	}

	render() {
		if (!this._block) {
			this._block = new this._blockClass();
			render(this._props.rootQuery, this._block);
			return;
		}

		this._block.show();
	}
}

export class Router {
	constructor(rootQuery) {
		if (Router.__instance) {
			return Router.__instance;
		}

		this.routes = [];
		this.history = window.history;
		this._currentRoute = null;
		this._rootQuery = rootQuery;

		Router.__instance = this;
		// this.init()
	}

	// init() {
	//     window.addEventListener('popstate', () => {
	//         this._onRoute(window.location.pathname);
	//     });
	// }

	use(pathname, block) {
		const route = new Route(pathname, block, {rootQuery: this._rootQuery});
		this.routes.push(route);
		return this;
	}

	start() {
		window.onpopstate = (event => {
			this._onRoute(event.currentTarget.location.pathname);
		}).bind(this);

		this._onRoute(window.location.pathname);
	}

	_onRoute(pathname) {
		const route = this.getRoute(pathname);
		// console.log({route, pathname, cr: this._currentRoute})
		if (!route) {
			return;
		}

		if (this._currentRoute && this._currentRoute !== rout) {
			// console.log('hide: ', this._currentRoute)
			this._currentRoute.leave();
		}

		this._currentRoute = route;
		route.render(route, pathname);
	}

	go(pathname) {
		this.history.pushState({}, '', pathname);
		this._onRoute(pathname);
	}

	back() {
		// console.log('back: ', this._currentRoute)
		this.history.back();
	}

	forward() {
		// console.log('forward: ', this._currentRoute)
		this.history.forward();
	}

	getRoute(pathname) {
		return this.routes.find(route => route.match(pathname));
	}
}

// const router = new Router(".app");
