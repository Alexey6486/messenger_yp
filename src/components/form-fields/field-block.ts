import { Block } from '@/block';
import { compile } from '@/utils';
import type {
	BlockProps,
	IInputState,
} from '@/types';
import type { InputBlock } from '@/components/input/input-block';
import template from './field-template';

interface IFieldBlock extends BlockProps {
	id: string;
	id_label: string;
	input_data: IInputState;
	label: string;
	isRequired: boolean;
	children: Record<string, InputBlock>;
}

export class FieldBlock extends Block {
	constructor(props: IFieldBlock) {
		super({
			...props,
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
