import { Block } from '@/block';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import template from './field-template';
import {
	Store,
	StoreEvents,
} from '@/store';

export class FieldBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
		});

		Store.on(StoreEvents.Updated, () => {
			console.log('State FieldBlock: ', Store.getState());
			if (props.mapStateToProps) {
				this.setProps(props.mapStateToProps(Store.getState()));
			}
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
