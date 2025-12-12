import { Block } from '@/block';
import type { BlockProps } from '@/types';
import { compile } from '@/utils';
import template from './date-plate-template';

interface IDatePlate extends BlockProps {
	date: string;
}

export class DatePlateBlock extends Block {
	constructor(props: IDatePlate) {
		super({
			...props,
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
