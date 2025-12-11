import { Block } from '@/block';
import { compile } from '@/utils';
import {
	CLASSES,
	IDS,
} from '@/constants';
import type { BlockProps } from '@/types';
import { ButtonRoundBlock } from '@/components/button-round/button-round-block';
import { SvgDots } from '@/components/icons';
import template from './drop-down-template';

export class DropDownBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			markup: {
				[IDS.COMMON.DROP_DOWN_BTN]: `<div id="${IDS.COMMON.DROP_DOWN_BTN}"></div>`,
				[IDS.COMMON.COMPONENTS_LIST]: `<div id="${IDS.COMMON.COMPONENTS_LIST}"></div>`,
			},
			children: {
				[IDS.COMMON.DROP_DOWN_BTN]: new ButtonRoundBlock({
					id: IDS.COMMON.DROP_DOWN_BTN,
					type: 'button',
					dataset: '',
					icon: SvgDots,
					onClick: (event: Event) => {
						console.log('click drop-down nav: ', this);

						event.preventDefault();
						event.stopPropagation();

						this.toggleClassList(CLASSES.ACT);
					},
				}),
			},
		});
	}

	override render(): string {
		console.log('Render block DropDownBlock: ', this);

		return compile(template, this.props);
	}
}
