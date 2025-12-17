import { Block } from '@/block';
import { IDS } from '@/constants';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import type { InputBlock } from '@/components/input/input-block';
import template from './form-template';

interface IFormBlockProps extends BlockProps {
	childrenList?: InputBlock[];
}

export class FormBlock extends Block {
	constructor(props: IFormBlockProps) {
		super({
			...props,
			events: {
				submit: (e: Event) => {
					e.preventDefault();
					e.stopPropagation();

					props?.onSubmit?.(e);
				},
			},
			markup: {
				[IDS.COMMON.COMPONENTS_LIST]: `<div id="${IDS.COMMON.COMPONENTS_LIST}"></div>`,
			},
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
