import { Block } from '@/block';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import template from './drop-down-option-template';

interface IDropDownOptionBlock extends BlockProps {
	id: string;
	icon: string;
	text: string;
	onClick: (event: Event) => void;
}

export class DropDownOptionBlock extends Block {
	constructor(props: IDropDownOptionBlock) {
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
