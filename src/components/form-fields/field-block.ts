import { Block } from '@/block';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import template from './field-template';

export class FieldBlock extends Block {
	constructor(props: BlockProps) {
		super(props);
	}

	override render(): string {
		console.log('Render block FieldBlock: ', this);

		return compile(template, this.props);
	}
}
