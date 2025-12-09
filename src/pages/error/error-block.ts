import { Block } from '@/block';
import {
	IDS,
	PAGES,
} from '@/constants';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import { ButtonBlock } from '@/components/button/button-block';
import template from './error-template.hbs?raw';
import styles from './styles.module.pcss';

export class ErrorBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			styles,
			ids: {
				buttons: { back: IDS.ERROR.RETURN },
				dataset: { back: IDS.ERROR.RETURN },
			},
			markup: {
				[IDS.ERROR.BUTTON]: `<div id="${ IDS.ERROR.BUTTON }"></div>`,
			},
			children: {
				[IDS.ERROR.BUTTON]: new ButtonBlock({
					id: IDS.ERROR.BUTTON,
					type: 'button',
					dataset: PAGES.AUTHORIZATION,
					text: 'Назад',
					onClick: (event: Event) => {
						console.log('click back: ', this);

						event.preventDefault();
						event.stopPropagation();

						this.eventBus().emit(Block.EVENTS.FLOW_CWU, PAGES.AUTHORIZATION);
					},
				}),
			},
		});
	}

	override render(): string {
		console.log('Render block ErrorBlock: ', this);

		return compile(template, this.props);
	}
}
