import { Block } from '@/block';
import { compile } from '@/utils';
import template from './button-template';

export class Button extends Block {
	constructor(props) {
		super(undefined, {
			...props,
			events: {
				click: (e: Event) => {
					props.onClick(e);
				},
			},
		});
	}

	override render(): string {
		console.log('Button props: ', this.props);

		return compile(template, this.props);
	}
}
