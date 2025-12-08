import { Block } from '@/block';
import { compile } from '@/utils';
import template from './field-template';

export class FieldBlock extends Block {
	constructor(props) {
		super(props);
	}

	override render(): string {
		console.log('Render block FieldBlock: ', this);

		return compile(template, this.props);
	}
}
