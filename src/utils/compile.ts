import Handlebars from 'handlebars';

export const compile = <T>(template: string, props: T) => {
	const content = Handlebars.compile(template);
	return content(props);
};
