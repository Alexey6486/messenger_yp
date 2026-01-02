import { Block } from '@/block';
import { IDS } from '@/constants';
import { compile } from '@/utils';
import { getModalContentBlock } from '@/pages/modal/utils';
import type {
	BlockProps,
	IFormState,
} from '@/types';
import { ButtonRoundBlock } from '@/components/button-round/button-round-block';
import { SvgCross } from '@/components/icons';
import template from './modal-template.hbs?raw';

interface IModalBlock<T = unknown> extends Omit<BlockProps, 'contentForms'> {
	contentForms?: Record<string, IFormState<T>>;
}

export class ModalBlock<T> extends Block {
	constructor(props: IModalBlock<T>) {
		super({
			...props,
			markup: {
				[IDS.MODAL.CONTENT]: `<div id="${ IDS.MODAL.CONTENT }"></div>`,
				[IDS.MODAL.SUBMIT]: `<div id="${ IDS.MODAL.SUBMIT }"></div>`,
				[IDS.MODAL.CLOSE]: `<div id="${ IDS.MODAL.CLOSE }"></div>`,
			},
			children: {
				[IDS.MODAL.CONTENT]: getModalContentBlock<T>(
					props?.contentId,
					props.contentForms,
					() => this.eventBus().emit(Block.EVENTS.FLOW_CWU),
				),
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
			},
		});
	}

	override render(): string {
		console.log('Render ModalBlock', this);
		return compile(template, this.props);
	}
}

// [IDS.AUTHORIZATION.TEMP_MODAL]: new ButtonBlock({
// 	id: IDS.AUTHORIZATION.TEMP_MODAL,
// 	type: 'button',
// 	text: 'Модальное окно',
// 	onClick: (event: Event) => {
// 		event.preventDefault();
// 		event.stopPropagation();
//
// 		this.createModal<IAddUserModalForm>(
// 			'modalAddUserForm',
// 			{
// 				modalAddUserForm: {
// 					fields: { login: '' },
// 					errors: { login: '' },
// 				},
// 			},
// 			'Добавить пользователя',
// 		);
// 	},
// }),
