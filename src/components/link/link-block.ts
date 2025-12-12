import { Block } from '@/block';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import template from './link-template';

interface ILinkBlock extends BlockProps {
	id: string;
	class: string;
	href: string;
	ariaLabel: string;
	tooltip: string;
	target: string;
	text: string;
	onClick: (e: Event) => void;
}

export class LinkBlock extends Block {
	constructor(props: ILinkBlock) {
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
