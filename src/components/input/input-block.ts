import { Block } from '@/block';
import {
	compile,
	validate,
} from '@/utils';
import type { IInputData } from '@/types';
import template from './input-template';

export class InputBlock extends Block {
	constructor(props) {
		super(undefined, {
			...props,
			events: {
				input: (e: Event) => {
					console.log('InputBlock input event:', { t: this });

					e.preventDefault();
					e.stopPropagation();

					if (e.target && e.target instanceof HTMLInputElement) {
						const { isValid, message } = validate(e?.target?.value, this.props.validation);
						console.log('input validationResult: ', { isValid, message });

						const result: IInputData = {
							value: e.target.value,
							error: message,
						};

						props.onInput(result);
					}
				},
				blur: (e: Event) => {
					console.log('InputBlock blur event: ', { e });

					const { isValid, message } = validate(this.props.value, this.props.validation);
					console.log('blur validationResult: ', { isValid, message });

					const result: IInputData = {
						value: this.props.value,
						error: message,
					};

					props.onBlur(result);
				},
			},
		});
	}

	override render(): string {
		console.log('InputBlock props: ', this);

		return compile(template, this.props);
	}
}
