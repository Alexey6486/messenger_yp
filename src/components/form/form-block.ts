import { Block } from '@/block';
import { IDS } from '@/constants';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import template from './form-template';

export class FormBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			events: {
				submit: (e: Event) => {
					console.log('FormBlock submit: ', this);

					e.preventDefault();
					e.stopPropagation();

					props?.onSubmit?.(e);
				},
			},
			markup: {
				[IDS.COMMON.COMPONENTS_LIST]: `<div id="${ IDS.COMMON.COMPONENTS_LIST }"></div>`,
			},
		});
	}

	override render(): string {
		console.log('Render block FormBlock: ', this);

		return compile(template, this.props);
	}
}
