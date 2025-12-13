import { Block } from '@/block';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import template from './chat-template';

interface IChatBlock extends BlockProps {
	id: string;
	avatar: string;
	title: string;
	date: string;
	text: string;
	counter: string;
	isActive: boolean;
	onClick: (e: Event) => void;
}

export class ChatBlock extends Block {
	constructor(props: IChatBlock) {
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
