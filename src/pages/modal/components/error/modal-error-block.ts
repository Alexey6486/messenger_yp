import { Block } from '@/block';
import { IDS } from '@/constants';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import template from './modal-error-template';
import styles from './styles.module.pcss';

export class ModalErrorBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			id: IDS.MODAL.CONTENT,
			markup: {
				[IDS.MODAL.ADD_USER_FIELD]: `<div id="${ IDS.MODAL.ADD_USER_FIELD }"></div>`,
			},
		});
	}

	override render(): string {
		console.log('Render ModalErrorBlock', this);
		return compile(template, { ...this.props, class: styles['modal-error'] });
	}
}
