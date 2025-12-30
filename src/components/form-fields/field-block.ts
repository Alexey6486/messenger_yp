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
import template from './field-template';

export class FieldBlock extends Block {
	constructor(props: BlockProps) {
		let state = props?.mapStateToProps?.(Store.getState());

		super({
			...props,
			...(props?.mapStateToProps && props.mapStateToProps(Store.getState())),
		});

		Store.on(StoreEvents.Updated, () => {
			const newState = props?.mapStateToProps?.(Store.getState());

			if (props.mapStateToProps && state && newState) {
				const isEqualCheck = isEqual(state, newState);
				console.log('State FieldBlock: ', { isEqualCheck, state, newState, t: this });

				if (!isEqualCheck) {
					this.setProps(newState);
				}
			}

			state = newState;
		});
	}

	override render(): string {
		console.log('Render FieldBlock', this);
		return compile(template, this.props);
	}
}
