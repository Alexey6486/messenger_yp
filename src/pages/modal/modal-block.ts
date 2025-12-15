import { Block } from '@/block';
import { IDS } from '@/constants';
import { compile } from '@/utils';
import { getModalContentBlock } from '@/pages/modal/utils';
import type {
	BlockProps,
	IFormState,
} from '@/types';
import { ButtonBlock } from '@/components/button/button-block';
import { ButtonRoundBlock } from '@/components/button-round/button-round-block';
import { SvgCross } from '@/components/icons';
import template from './modal-template.hbs?raw';

interface IModalBlock<T> extends BlockProps {
	contentForms: Record<string, IFormState<T>>;
}

export class ModalBlock<T> extends Block {
	constructor(props: IModalBlock<T>) {
		super({
			...props,
			markup: {
				[IDS.MODAL.CONTENT]: `<div id="${IDS.MODAL.CONTENT}"></div>`,
				[IDS.MODAL.SUBMIT]: `<div id="${IDS.MODAL.SUBMIT}"></div>`,
				[IDS.MODAL.CLOSE]: `<div id="${IDS.MODAL.CLOSE}"></div>`,
			},
			children: {
				[IDS.MODAL.CONTENT]: getModalContentBlock<T>(props?.contentId, props.contentForms),
				[IDS.MODAL.CLOSE]: new ButtonRoundBlock({
					id: IDS.MODAL.CLOSE,
					type: 'button',
					icon: SvgCross,
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						this.eventBus().emit(Block.EVENTS.FLOW_CWU);
					},
				}),
				[IDS.MODAL.SUBMIT]: new ButtonBlock({
					id: IDS.MODAL.SUBMIT,
					type: 'button',
					text: props?.buttonText ?? 'Сохранить',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						console.log('Modal form submit: ', {});
					},
				}),
			},
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
