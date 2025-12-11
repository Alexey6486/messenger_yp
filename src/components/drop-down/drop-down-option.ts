import { Block } from '@/block';
import { compile } from '@/utils';
import template from './drop-down-option-template';

export class DropDownOptionBlock extends Block {
	constructor(props) {
		super({
			...props,
			events: {
				click: (e: Event) => {
					console.log('DropDownOptionBlock click', { e });

					props.onClick(e);
				},
			},
		});
	}

	override render(): string {
		console.log('Render block DropDownOptionBlock: ', this);

		return compile(template, this.props);
	}
}
