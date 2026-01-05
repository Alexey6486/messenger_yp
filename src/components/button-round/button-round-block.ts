import { Block } from '@/block';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import template from './button-round-template';

export class ButtonRoundBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			events: {
				click: (e: Event) => {
					e.preventDefault();
					e.stopPropagation();

					props?.onClick?.(e);
				},
			},
		});
	}

	override render(): string {
		console.log('Render ButtonRoundBlock', this);
		return compile(template, this.props);
	}
}
