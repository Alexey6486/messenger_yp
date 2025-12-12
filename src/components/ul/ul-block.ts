import { Block } from '@/block';
import { IDS } from '@/constants';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import template from './ul-template';

export class UlBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			markup: {
				[IDS.COMMON.COMPONENTS_LIST]: `<div id="${IDS.COMMON.COMPONENTS_LIST}"></div>`,
			},
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
