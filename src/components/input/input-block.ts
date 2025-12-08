import { Block } from '@/block';
import {
	compile,
	validate,
} from '@/utils';
import template from './input-template';

export class InputBlock extends Block {
	constructor(props) {
		super(undefined, {
			...props,
			events: {
				input: (e: Event) => {
					console.log('!InputBlock input event:', { e, t: this });

					e.preventDefault();
					e.stopPropagation();

					if (e.target && e.target instanceof HTMLInputElement) {
						const { isValid, message } = validate(e?.target?.value, this.props.validation);
						console.log('input validationResult: ', { isValid, message });

						props.onChange({
							data: {
								value: e.target.value,
								error: message,
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
						const { message } = validate(e?.target?.value, this.props.validation);

						console.log('InputBlock blur: ', { validation: message, e, t: this });

						props.onChange({
							data: {
								value: e.target.value,
								error: message,
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
		console.log('InputBlock props: ', this);

		return compile(template, this.props);
	}
}
