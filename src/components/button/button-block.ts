import { Block } from '@/block';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import template from './button-template';

interface IButtonBlock {
	type: string;
	text: string;

	[key: string]: unknown;
}

type TProps = BlockProps<IButtonBlock>;

export class ButtonBlock extends Block {
	constructor(props: TProps) {
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
		return compile(template, this.props);
	}
}
