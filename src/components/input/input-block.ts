import { Block } from '@/block';
import { compile } from '@/utils';
import type {
	BlockProps,
} from '@/types';
import template from './input-template';

export class InputBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			events: {
				input: (e: Event) => {
					e.preventDefault();
					e.stopPropagation();

					if (e.target && e.target instanceof HTMLInputElement) {
						props?.onInputChange?.({
							data: {
								value: e.target.value,
							},
							info: {
								event: 'input',
								selectionStart: e.target.selectionStart,
								element: this,
							},
						});
					}
				},
				blur: (e: Event) => {
					if (e.target && e.target instanceof HTMLInputElement) {
						props.onInputChange?.({
							data: {
								value: e.target.value,
							},
							info: {
								event: 'blur',
								element: null,
								selectionStart: null,
							},
						});
					}
				},
			},
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
