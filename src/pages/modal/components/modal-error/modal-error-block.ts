import { Block } from '@/block';
import { Store } from '@/store';
import { mapUserToPropsModalError } from './utils';
import { IDS } from '@/constants';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import { ButtonBlock } from '@/components/button/button-block';
import template from './modal-error-template';
import styles from './styles.module.pcss';

export class ModalErrorBlock extends Block {
	constructor(props: BlockProps) {
		const state = mapUserToPropsModalError(Store.getState());
		super({
			...props,
			...state,
			class: styles['modal-error'],
			id: IDS.MODAL.CONTENT,
			markup: {
				[IDS.MODAL.MODAL_ERROR_BTN]: `<div id="${ IDS.MODAL.MODAL_ERROR_BTN }"></div>`,
			},
			children: {
				[IDS.MODAL.MODAL_ERROR_BTN]: new ButtonBlock({
					id: IDS.MODAL.MODAL_ERROR_BTN,
					type: 'button',
					text: 'Закрыть',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						this.props?.onCloseModal?.();
					},
				}),
			},
		});
	}

	override render(): string {
		console.log('Render ModalErrorBlock', this);
		return compile(template, this.props);
	}
}
