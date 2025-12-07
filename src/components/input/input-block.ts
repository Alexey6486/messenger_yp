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
					console.log('InputBlock input event:', { e, t: this });

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
								element: e.target,
							},
						});
					}
				},
				blur: (e: Event) => {
					console.log('InputBlock blur event: ', { e, t: this });

					const { isValid, message } = validate(this.props.value, this.props.validation);
					console.log('blur validationResult: ', { isValid, message });

					props.onChange({
						data: {
							value: this.props.value,
							error: message,
						},
						info: {
							event: 'blur',
							selectionStart: null,
							element: null,
						},
					});
				},
			},
		});
	}

	override render(): string {
		console.log('InputBlock props: ', this);

		return compile(template, this.props);
	}
}
