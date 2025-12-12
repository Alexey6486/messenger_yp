import { Block } from '@/block';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import template from './messaging-main-template';

interface IMessagingMainBlock extends BlockProps {
	id: string;
	author: string;
	text: string;
	date: string;
	isMe: boolean;
}

export class MessagingMainBlock extends Block {
	constructor(props: IMessagingMainBlock) {
		super({
			...props,
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
