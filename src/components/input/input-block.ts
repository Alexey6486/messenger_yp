import { Block } from '@/block';
import {
	Store,
	StoreEvents,
} from '@/store';
import {
	compile,
	isEqual,
} from '@/utils';
import type { BlockProps } from '@/types';
import template from '@/components/input/input-template';

export class InputBlock extends Block {
	constructor(props: BlockProps) {
		const storeEvent = props?.storeEvent ? props.storeEvent as StoreEvents : StoreEvents.Updated;
		let state = props?.mapStateToProps?.(Store.getState());

		super({
			...props,
			...(props?.mapStateToProps && props.mapStateToProps(Store.getState())),
			events: {
				change: (e: Event) => {
					if (props?.onFileChange && e.target && e.target instanceof HTMLInputElement && e.target.files) {
						props.onFileChange(e.target.files);
					}
				},
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

		Store.on(storeEvent, () => {
			const newState = props?.mapStateToProps?.(Store.getState());

			if (props.mapStateToProps && state && newState) {
				const isEqualCheck = isEqual(state, newState);
				if (!isEqualCheck) {
					this.setProps(newState);
				}
			}

			state = newState;
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
