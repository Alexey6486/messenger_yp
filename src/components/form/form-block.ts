import { Block } from '@/block';
import { IDS } from '@/constants';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import template from './form-template';

interface IFormBlockProps<T> {
	[key: string]: unknown;

	onSubmit: (e: Event, id: string) => void;
	childrenList?: T[];
}

type TProps<T> = BlockProps<IFormBlockProps<T>>;

export class FormBlock<T> extends Block {
	constructor(props: TProps<T>) {
		super({
			...props,
			events: {
				submit: (e: Event) => {
					e.preventDefault();
					e.stopPropagation();

					props?.onSubmit?.(e, 'id');
				},
			},
			markup: {
				[IDS.COMMON.COMPONENTS_LIST]: `<div id="${ IDS.COMMON.COMPONENTS_LIST }"></div>`,
			},
		});
	}

	override render(): string {
		console.log('Render FormBlock', this);
		return compile(template, this.props);
	}
}
