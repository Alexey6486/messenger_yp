import { Block } from '@/block';
import { compile } from '@/utils';
import template from './field-template';

export class Field extends Block {
	constructor(props) {
		super('div', props);
	}

	override render(): string {
		return compile(template, this.props);
	}
}
