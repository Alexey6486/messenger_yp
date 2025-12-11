import { Block } from '@/block';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import template from './messaging-main-template';

export class MessagingMainBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
		});
	}

	override render(): string {
		console.log('Render block MessagingMainBlock: ', this);

		return compile(template, this.props);
	}
}
