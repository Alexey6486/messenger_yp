import { Block } from '@/block';
import {
	Store,
	StoreEvents,
} from '@/store';
import { mapUserToPropsError } from '@/pages/error/connect-error';
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

						this?.props?.router?.back();
					},
				}),
			},
		});

		Store.on(StoreEvents.Updated, () => {
			console.log('State ErrorBlock: ', mapUserToPropsError(Store.getState()));
			this.setProps(mapUserToPropsError(Store.getState()));
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
