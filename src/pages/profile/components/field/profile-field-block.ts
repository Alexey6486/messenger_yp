import { Block } from '@/block';
import { compile } from '@/utils';
import type {
	BlockProps,
	IInputState,
} from '@/types';
import type { InputBlock } from '@/components/input/input-block';
import template from './profile-field-template';

interface IProfileFieldBlock extends BlockProps {
	fieldName: string;
	parentFormId: string;
	input_data: IInputState;
	children: Record<string, InputBlock>;
}

export class ProfileFieldBlock extends Block {
	constructor(props: IProfileFieldBlock) {
		super(props);
	}

	override render(): string {
		return compile(template, this.props);
	}
}
