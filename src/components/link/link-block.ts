import { Block } from '@/block';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import template from './link-template';

export class LinkBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			events: {
				click: (e: Event) => {
					console.log('click link', { e, t: this });

					e.preventDefault();
					e.stopPropagation();

					props?.onClick?.(e);
				},
			},
		});
	}

	override render(): string {
		console.log('Render block LinkBlock: ', this);

		return compile(template, this.props);
	}
}
