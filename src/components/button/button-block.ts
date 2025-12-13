import { Block } from '@/block';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import template from './button-template';

interface IButtonBlock extends BlockProps {
	id: string;
	type: string;
	text: string;
	class?: string;
	dataset?: string;
	onClick: (event: Event) => void;
}

export class ButtonBlock extends Block<IButtonBlock> {
	constructor(props: IButtonBlock) {
		super({
			...props,
			parent: null,
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
		return compile(template, this.data);
	}
}
