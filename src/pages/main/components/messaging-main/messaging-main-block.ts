import { Block } from '../../../../block';
import { compile } from '../../../../utils';
import type { BlockProps } from '../../../../types';
import template from './messaging-main-template';

export class MessagingMainBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
