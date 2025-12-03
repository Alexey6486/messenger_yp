import { Block } from '@/block';
import { compile } from '@/utils';
import template from './button-template';

export class Button extends Block {
	constructor(props) {
		super('button', props);
	}

	override render(): string {
		return compile(template, this.props);
	}
}
