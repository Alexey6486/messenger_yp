import { Block } from '@/block';
import { IDS } from '@/constants';
import type { BlockProps } from '@/types';
import { ButtonBlock } from '@/components/button/button-block';
import { compile } from '@/utils';
import template from './form-submit-template';

interface IProfileSubmitFormBlock extends BlockProps {
	isVisible: boolean;
}

export class ProfileSubmitFormBlock extends Block {
	constructor(props: IProfileSubmitFormBlock) {
		super({
			...props,
			markup: {
				[IDS.PROFILE.SAVE_PSW_BTN]: `<div id="${ IDS.PROFILE.SAVE_PSW_BTN }"></div>`,
			},
			children: {
				[IDS.PROFILE.SAVE_PSW_BTN]: new ButtonBlock({
					id: IDS.PROFILE.SAVE_PSW_BTN,
					type: 'button',
					text: 'Обновить пароль',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						this.props?.onClick?.(event);
					},
				}),
			},
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
