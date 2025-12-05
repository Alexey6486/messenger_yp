import { Block } from '@/block';
import { compile } from '@/utils';
import template from './field-template';

export class Field extends Block {
	constructor(props) {
		super(undefined, {
			...props,
			events: {
				input: (e: Event) => {
					console.log('Field input event:', { t: this });
					props.onInput(e, this);
				},
			},
		});
	}

	override render(): string {
		console.log('Field props: ', this);
		return compile(template, this.props);
	}
}
