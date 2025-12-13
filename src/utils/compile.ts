import Handlebars from 'handlebars';

export const compile = (template: string, props: unknown) => {
	const content = Handlebars.compile(template);
	return content(props);
};
