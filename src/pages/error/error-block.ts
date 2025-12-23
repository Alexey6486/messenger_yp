import { Block } from '@/block';
import { IDS } from '@/constants';
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
			markup: {
				[IDS.ERROR.BUTTON]: `<div id="${ IDS.ERROR.BUTTON }"></div>`,
			},
			children: {
				[IDS.ERROR.BUTTON]: new ButtonBlock({
					id: IDS.ERROR.BUTTON,
					type: 'button',
					text: 'Назад',
					onClick: (event: Event) => {
						console.log('ErrorBlock onClick back', this);
						event.preventDefault();
						event.stopPropagation();

						// this.eventBus().emit(Block.EVENTS.FLOW_CWU, { page: PAGES.AUTHORIZATION });
						this?.props?.router?.go?.('/');
					},
				}),
			},
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
