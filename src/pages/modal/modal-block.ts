import { Block } from '@/block';
import { IDS } from '@/constants';
import { compile } from '@/utils';
import { getModalContentBlock } from '@/pages/modal/utils';
import type {
	BlockProps,
	IFormState,
} from '@/types';
import type { PlaceholderBlock } from '@/components/placeholder/placeholder-block';
import type { AddUserBlock } from '@/pages/modal/components';
import { ButtonBlock } from '@/components/button/button-block';
import { ButtonRoundBlock } from '@/components/button-round/button-round-block';
import { SvgCross } from '@/components/icons';
import template from './modal-template.hbs?raw';

interface IModalBlock<T> extends BlockProps {
	contentId: string;
	contentForms: Record<string, IFormState<T>>;
	title: string;
	error: string;
	children: Record<string, ButtonBlock | ButtonRoundBlock | AddUserBlock | PlaceholderBlock>;
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
				[IDS.MODAL.CONTENT]: getModalContentBlock<T>(props.contentId, props.contentForms),
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
					text: props.buttonText ?? 'Сохранить',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						console.log('Modal form submit: ', this.children[IDS.MODAL.CONTENT].props[props.contentId].fields);
					},
				}),
			},
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
