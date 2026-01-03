import { Block } from '@/block';
import {
	Store,
	StoreEvents,
} from '@/store';
import { mapUserToPropsError } from '@/pages/error/connect-error';
import { IDS } from '@/constants';
import {
	compile,
	isEqual,
} from '@/utils';
import type { BlockProps } from '@/types';
import { ButtonBlock } from '@/components/button/button-block';
import template from './error-template.hbs?raw';
import styles from './styles.module.pcss';

export class ErrorBlock extends Block {
	constructor(props: BlockProps) {
		let state = mapUserToPropsError(Store.getState());

		super({
			...props,
			...mapUserToPropsError(Store.getState()),
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

						// Store.set('error', { code: '', text: '' });
						this?.props?.router?.back();
					},
				}),
			},
		});

		Store.on(StoreEvents.Updated, () => {
			const newState = mapUserToPropsError(Store.getState());
			console.log('State ErrorBlock: ', newState);

			if (!isEqual(state, newState)) {
				this.setProps({ ...newState });
			}

			state = newState;
		});
	}

	override componentDidMount() {
		const state = mapUserToPropsError(Store.getState());

		if (!state.error || (state?.error?.code !== '404')) {
			Store.set('error', { code: '404', text: 'Страница не найдена' });
		}
	}

	override render(): string {
		console.log('Render ErrorBlock', this);
		return compile(template, this.props);
	}
}
