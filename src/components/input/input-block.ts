import { Block } from '@/block';
import { compile } from '@/utils';
import template from './input-template';

export class InputBlock extends Block {
	constructor(props) {
		super({
			...props,
			events: {
				input: (e: Event) => {
					e.preventDefault();
					e.stopPropagation();

					if (e.target && e.target instanceof HTMLInputElement) {
						console.log('InputBlock input: ', { e, t: this });

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
						console.log('InputBlock blur: ', { e, t: this });

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
		console.log('Render block InputBlock: ', this);

		return compile(template, this.props);
	}
}
