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
import template from '@/components/form-fields/field-template';

export class FieldBlock extends Block {
	constructor(props: BlockProps) {
		const storeEvent = props?.storeEvent ? props.storeEvent as StoreEvents : StoreEvents.Updated;
		let state = props?.mapStateToProps?.(Store.getState());

		super({
			...props,
			...(props?.mapStateToProps && props.mapStateToProps(Store.getState())),
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
