import { Block } from '@/block';
import type { BlockProps } from '@/types';
import { compile } from '@/utils';
import template from './date-plate-template';

export class DatePlateBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
