import { Block } from '@/block';
import {
	Store,
	StoreEvents,
} from '@/store';
import type { BlockProps } from '@/types';
import {
	compile,
	isEqual,
} from '@/utils';
import { BASE_IMG_URL } from '@/constants';
import template from './chat-info-template';

export class ChatInfoBlock extends Block {
	constructor(props: BlockProps) {
		let state = props?.mapStateToProps?.(Store.getState());

		super({
			...props,
			...(props?.mapStateToProps && props.mapStateToProps(Store.getState())),
			baseUrl: BASE_IMG_URL,
			events: {
				click: (e: Event) => {
					e.preventDefault();
					e.stopPropagation();

					props?.onClick?.(e);
				},
			},
		});

		Store.on(StoreEvents.Updated, () => {
			const newState = props?.mapStateToProps?.(Store.getState());

			if (props.mapStateToProps && state && newState) {
				const isEqualCheck = isEqual(state, newState);
				console.log('State ChatInfoBlock: ', { isEqualCheck, state, newState, t: this });

				if (!isEqualCheck) {
					this.setProps(newState);
				}
			}

			state = newState;
		});
	}

	override render(): string {
		console.log('Render ChatInfoBlock', this);
		return compile(template, this.props);
	}
}
