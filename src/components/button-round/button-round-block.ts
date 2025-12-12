import { Block } from '@/block';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import template from './button-round-template';

interface IButtonRoundBlock extends BlockProps {
	id: string;
	type: string;
	icon: string;
	class?: string;
	dataset?: string;
	onClick: (event: Event) => void;
}

export class ButtonRoundBlock extends Block {
	constructor(props: IButtonRoundBlock) {
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
