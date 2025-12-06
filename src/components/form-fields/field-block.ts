import { Block } from '@/block';
import { compile } from '@/utils';
import template from './field-template';

export class FieldBlock extends Block {
	constructor(props) {
		super(undefined, {
			...props,
		});
	}

	override render(): string {
		console.log('FieldBlock props: ', this);

		return compile(template, this.props);
	}
}
