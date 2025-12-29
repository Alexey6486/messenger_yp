import { Block } from '@/block';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import template from './input-template';
import {
	Store,
	StoreEvents,
} from '@/store';

export class InputBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			events: {
				input: (e: Event) => {
					e.preventDefault();
					e.stopPropagation();

					if (e.target && e.target instanceof HTMLInputElement) {
						props?.onInputChange?.({
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
						props.onInputChange?.({
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

		Store.on(StoreEvents.Updated, () => {
			console.log('State InputBlock: ', Store.getState());
			if (props.mapStateToProps) {
				this.setProps(props.mapStateToProps(Store.getState()));
			}
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
