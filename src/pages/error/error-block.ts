import { Block } from '@/block';
import {
	IDS,
	PAGES,
} from '@/constants';
import { compile } from '@/utils';
import type {
	IErrorPageState,
	TPages,
} from '@/types';
import { ButtonBlock } from '@/components/button/button-block';
import template from './error-template.hbs?raw';
import styles from './styles.module.pcss';

interface IErrorBlock extends IErrorPageState {
	changePage: (page: TPages) => void,
}

export class ErrorBlock extends Block<IErrorBlock> {
	constructor(props) {
		super({
			...props,
			styles,
			parent: null,
			markup: {
				[IDS.ERROR.BUTTON]: `<div id="${ IDS.ERROR.BUTTON }"></div>`,
			},
			children: {
				[IDS.ERROR.BUTTON]: new ButtonBlock({
					id: IDS.ERROR.BUTTON,
					type: 'button',
					text: 'Назад',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						this.eventBus().emit(Block.EVENTS.FLOW_CWU, PAGES.AUTHORIZATIO);
					},
				}),
			},
		});
	}

	override render(): string {
		return compile<IErrorPageState>(template, this.data);
	}
}
