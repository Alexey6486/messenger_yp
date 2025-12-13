import { Block } from '@/block';
import {
	IDS,
	PAGES,
} from '@/constants';
import { compile } from '@/utils';
import type {
	IErrorPageState,
	TPages,
	BlockProps,
} from '@/types';
import { ButtonBlock } from '@/components/button/button-block';
import template from './error-template.hbs?raw';
import styles from './styles.module.pcss';

interface IErrorFunctions {
	changePage: (page: TPages) => void,
}

type Props = BlockProps<ButtonBlock, IErrorPageState, IErrorFunctions>

export class ErrorBlock extends Block<Props> {
	constructor(props: Props) {
		super({
			...props,
			styles,
			markup: {
				[IDS.ERROR.BUTTON]: `<div id="${IDS.ERROR.BUTTON}"></div>`,
			},
			children: {
				[IDS.ERROR.BUTTON]: new ButtonBlock({
					data: {
						id: IDS.ERROR.BUTTON,
						type: 'button',
						text: 'Назад',
					},
					callbacks: {
						onClick: (event: Event) => {
							event.preventDefault();
							event.stopPropagation();

							this.eventBus().emit(Block.EVENTS.FLOW_CWU, { page: PAGES.AUTHORIZATION });
						},
					},
				}),
			},
		});
	}

	override render(): string {
		return compile(template, { ...this.data, ...this.base });
	}
}
