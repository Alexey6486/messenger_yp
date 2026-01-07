import { Block } from '@/block';
import { IDS } from '@/constants';
import { compile } from '@/utils';
import { getModalContentBlock } from '@/pages/modal/utils';
import type { BlockProps } from '@/types';
import { ButtonRoundBlock } from '@/components/button-round/button-round-block';
import { SvgCross } from '@/components/icons';
import template from './modal-template.hbs?raw';
import {
	Store,
	StoreEvents,
} from '@/store';

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
				[IDS.MODAL.CONTENT]: getModalContentBlock(
					props?.contentId,
					() => {
						console.log(Store);
						// TODO clear events that belong to modal
						Store.clearTargetSubs(StoreEvents.Updated_modal);
						this.eventBus().emit(Block.EVENTS.FLOW_CWU);
					},
					props?.onSubmit,
				),
				[IDS.MODAL.CLOSE]: new ButtonRoundBlock({
					id: IDS.MODAL.CLOSE,
					type: 'button',
					icon: SvgCross,
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();
						console.log(Store);
						// TODO clear events that belong to modal
						Store.clearTargetSubs(StoreEvents.Updated_modal);
						this.eventBus().emit(Block.EVENTS.FLOW_CWU);
					},
				}),
			},
		});
	}

	override render(): string {
		console.log('Render ModalBlock', this);
		return compile(template, this.props);
	}
}
