declare module 'vite-plugin-handlebars' {
	import { Plugin } from 'vite';

	function handlebarsPlugin(options?: any): Plugin;

	export default handlebarsPlugin;
}

declare module '*.module.pcss' {
	const classes: { [key: string]: string };
	export default classes;
}
