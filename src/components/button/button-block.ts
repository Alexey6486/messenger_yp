import { Block } from '@/block';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import template from './button-template';

export class ButtonBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			events: {
				click: (e: Event) => {
					props.onClick(e);
				},
			},
		});
	}

	override render(): string {
		console.log('Render block Button: ', this);

		return compile(template, this.props);
	}
}
