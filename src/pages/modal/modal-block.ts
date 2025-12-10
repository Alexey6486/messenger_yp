import { Block } from '@/block';
import { IDS } from '@/constants';
import { compile } from '@/utils';
import { getModalContentBlock } from '@/pages/modal/utils';
import type { BlockProps } from '@/types';
import { ButtonBlock } from '@/components/button/button-block';
import { ButtonRoundBlock } from '@/components/button-round/button-round-block';
import { SvgCross } from '@/components/icons';
import template from './modal-template.hbs?raw';

export class ModalBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			markup: {
				[IDS.MODAL.CONTENT]: `<div id="${ IDS.MODAL.CONTENT }"></div>`,
				[IDS.MODAL.SUBMIT]: `<div id="${ IDS.MODAL.SUBMIT }"></div>`,
				[IDS.MODAL.CLOSE]: `<div id="${ IDS.MODAL.CLOSE }"></div>`,
			},
			children: {
				[IDS.MODAL.CONTENT]: getModalContentBlock(props.contentId, props.contentForms),
				[IDS.MODAL.CLOSE]: new ButtonRoundBlock({
					id: IDS.MODAL.CLOSE,
					type: 'button',
					dataset: IDS.MODAL.CLOSE,
					icon: SvgCross,
					onClick: (event: Event) => {
						console.log('click modal close: ', this);

						event.preventDefault();
						event.stopPropagation();

						this.eventBus().emit(Block.EVENTS.FLOW_CWU);
					},
				}),
				[IDS.MODAL.SUBMIT]: new ButtonBlock({
					id: IDS.MODAL.SUBMIT,
					type: 'button',
					dataset: IDS.MODAL.SUBMIT,
					text: props.buttonText ?? 'Сохранить',
					onClick: (event: Event) => {
						console.log('click modal save: ', this);

						event.preventDefault();
						event.stopPropagation();

						console.log('Modal form: ', this.children[IDS.MODAL.CONTENT].props[props.contentId]);
					},
				}),
			},
		});
	}

	override render(): string {
		console.log('Render block ModalBlock: ', this);

		return compile(template, this.props);
	}
}
