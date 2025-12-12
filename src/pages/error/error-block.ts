import { Block } from '@/block';
import {
	IDS,
	PAGES,
} from '@/constants';
import { compile } from '@/utils';
import type {
	IErrorBlock,
} from '@/types';
import { ButtonBlock } from '@/components/button/button-block';
import template from './error-template.hbs?raw';
import styles from './styles.module.pcss';

export class ErrorBlock extends Block {
	constructor(props: IErrorBlock) {
		super({
			...props,
			styles,
			markup: {
				[IDS.ERROR.BUTTON]: `<div id="${IDS.ERROR.BUTTON}"></div>`,
			},
			children: {
				[IDS.ERROR.BUTTON]: new ButtonBlock({
					id: IDS.ERROR.BUTTON,
					type: 'button',
					text: 'Назад',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						this.eventBus().emit(Block.EVENTS.FLOW_CWU, { page: PAGES.AUTHORIZATION });
					},
				}),
			},
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
