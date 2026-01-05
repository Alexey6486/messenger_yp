import { Block } from '@/block';
import {
	Store,
	StoreEvents,
} from '@/store';
import { IDS } from '@/constants';
import {
	compile,
	isEqual,
} from '@/utils';
import type { BlockProps } from '@/types';
import type { ChatBlock } from '@/pages/main/components/chat/chat-block';
import template from './ul-template';

interface IUlBlockProps extends BlockProps {
	childrenList?: ChatBlock[];
}

export class UlBlock extends Block {
	constructor(props: IUlBlockProps) {
		let state = props?.mapStateToProps?.(Store.getState());

		super({
			...props,
			...(props?.mapStateToProps && props.mapStateToProps(Store.getState())),
			markup: {
				[IDS.COMMON.COMPONENTS_LIST]: `<div id="${ IDS.COMMON.COMPONENTS_LIST }"></div>`,
			},
		});

		Store.on(StoreEvents.Updated, () => {
			const newState = props?.mapStateToProps?.(Store.getState());

			if (props.mapStateToProps && state && newState) {
				const isEqualCheck = isEqual(state, newState);
				console.log('State UlBlock: ', { isEqualCheck, state, newState, t: this });

				if (!isEqualCheck) {
					this.setProps(newState);
				}
			}

			state = newState;
		});
	}

	override render(): string {
		console.log('Render UlBlock', this.props);
		return compile(template, this.props);
	}
}
