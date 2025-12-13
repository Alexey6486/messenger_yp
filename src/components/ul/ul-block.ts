import { Block } from '@/block';
import { IDS } from '@/constants';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import type { ChatBlock } from '@/pages/main/components/chat/chat-block';
import template from './ul-template';

interface IUlBlock extends BlockProps {
	id: string;
	class: string;
	childrenList: ChatBlock[];
}

export class UlBlock extends Block {
	constructor(props: IUlBlock) {
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
