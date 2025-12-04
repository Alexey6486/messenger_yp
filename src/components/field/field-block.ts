import { Block } from '@/block';
import { compile } from '@/utils';
import template from './field-template';

export class Field extends Block {
	constructor(props) {
		super(undefined, props);
	}

	override render(): string {
		console.log('Field props: ', this.props);
		return compile(template, this.props);
	}
}
