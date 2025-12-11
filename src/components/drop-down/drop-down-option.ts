import { Block } from '@/block';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import template from './drop-down-option-template';

export class DropDownOptionBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			events: {
				click: (e: Event) => {
					console.log('DropDownOptionBlock click', { e, t: this });

					e.preventDefault();
					e.stopPropagation();

					props?.onClick?.(e);
				},
			},
		});
	}

	override render(): string {
		console.log('Render block DropDownOptionBlock: ', this);

		return compile(template, this.props);
	}
}
