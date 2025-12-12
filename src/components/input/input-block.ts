import { Block } from '@/block';
import { compile } from '@/utils';
import type {
	BlockProps,
	IInputChangeParams,
	IInputState,
	Nullable,
} from '@/types';
import template from './input-template';

interface IInputBlock extends BlockProps {
	id: string;
	input_data: Nullable<IInputState>;
	dataset: string;
	name: string;
	placeholder: string;
	type: string;
	onChange: (params: IInputChangeParams<Block>) => void;
}

export class InputBlock extends Block {
	constructor(props: IInputBlock) {
		super({
			...props,
			events: {
				input: (e: Event) => {
					e.preventDefault();
					e.stopPropagation();

					if (e.target && e.target instanceof HTMLInputElement) {
						props.onChange({
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
						props.onChange({
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
