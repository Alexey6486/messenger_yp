import Handlebars from 'handlebars';

export const compile = (template, props) => {
	const content = Handlebars.compile(template);
	return content(props);
};
