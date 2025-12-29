import { Block } from '@/block';
import {
	compile,
	isEqual,
} from '@/utils';
import type { BlockProps } from '@/types';
import template from './field-template';
import {
	Store,
	StoreEvents,
} from '@/store';

export class FieldBlock extends Block {
	constructor(props: BlockProps) {
		let state = props?.mapStateToProps?.(Store.getState());

		super({
			...props,
			...(props?.mapStateToProps && props.mapStateToProps(Store.getState())),
		});

		Store.on(StoreEvents.Updated, () => {
			const newState = props?.mapStateToProps?.(Store.getState());
			console.log('State FieldBlock: ', state, newState);

			if (props.mapStateToProps && state && newState && !isEqual(state, newState)) {
				this.setProps(newState);
			}

			state = newState;
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
