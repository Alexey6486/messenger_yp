import { Block } from '@/block';
import { compile } from '@/utils';
import {
	CLASSES,
	IDS,
} from '@/constants';
import type { BlockProps } from '@/types';
import type { DropDownOptionBlock } from '@/components/drop-down/drop-down-option-block';
import { ButtonRoundBlock } from '@/components/button-round/button-round-block';
import { SvgDots } from '@/components/icons';
import template from './drop-down-template';

interface IDropDownBlockProps extends BlockProps {
	childrenList?: DropDownOptionBlock[];
}

export class DropDownBlock extends Block {
	constructor(props: IDropDownBlockProps) {
		super({
			...props,
			markup: {
				[IDS.COMMON.DROP_DOWN_BTN]: `<div id="${ IDS.COMMON.DROP_DOWN_BTN }"></div>`,
				[IDS.COMMON.COMPONENTS_LIST]: `<div id="${ IDS.COMMON.COMPONENTS_LIST }"></div>`,
			},
			children: {
				[IDS.COMMON.DROP_DOWN_BTN]: new ButtonRoundBlock({
					id: IDS.COMMON.DROP_DOWN_BTN,
					type: 'button',
					icon: SvgDots,
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						this.toggleClassList(CLASSES.ACT);
					},
				}),
			},
		});
	}

	override render(): string {
		console.log('Render DropDownBlock', this);
		return compile(template, this.props);
	}
}
