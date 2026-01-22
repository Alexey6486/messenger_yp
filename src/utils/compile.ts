import Handlebars from 'handlebars';
import type { BlockProps } from '../types';

export const compile = (template: string, props: BlockProps) => {
	const content = Handlebars.compile(template);
	return content(props);
};
