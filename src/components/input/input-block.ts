import { Block } from '@/block';
import { compile } from '@/utils';
import type {
	BlockProps,
	IInputState,
} from '@/types';
import { IInputChangeParams } from '@/types';
import template from './input-template';

interface IInputBlock {
	input_data: IInputState;
	dataset: string;
	name: string;
	placeholder: string;
	type: string;
	isDisabled: boolean;
	parentFormId: string;

	[key: string]: unknown;

	onInputChange: (params: IInputChangeParams) => void;
}

type TProps = BlockProps<IInputBlock>;

export class InputBlock extends Block {
	constructor(props: TProps) {
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
