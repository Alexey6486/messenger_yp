import { Block } from '@/block';
import { compile } from '@/utils';
import template from './button-template';
import { BlockProps } from '@/types';

interface IProps {
	id: string;
	type: string;
	text: string;
	class?: string;
	dataset?: string;
}

interface IFunctions {
	onClick: (event: Event) => void;
}

type Props = BlockProps<undefined, IProps, IFunctions>;

export class ButtonBlock extends Block<Props> {
	constructor(props: Props) {
		super({
			...props,
			events: {
				click: (e: Event) => {
					e.preventDefault();
					e.stopPropagation();

					props?.callbacks?.onClick?.(e);
				},
			},
		});
	}

	override render(): string {
		return compile(template, this.data);
	}
}
