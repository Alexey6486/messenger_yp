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
import { IDS } from '@/constants';
import { ButtonRoundBlock } from '@/components/button-round/button-round-block';
import {
	SvgCross,
	SvgPlus,
} from '@/components/icons';
import template from './chat-user-template';

export class ChatUserBlock extends Block {
	constructor(props: BlockProps) {
		const storeEvent = props?.storeEvent ? props.storeEvent as StoreEvents : StoreEvents.Updated;
		let state = props?.mapStateToProps?.(Store.getState());

		super({
			...props,
			...(props?.mapStateToProps && props.mapStateToProps(Store.getState())),
			markup: {
				[IDS.CHAT_USER.ADD]: `<div id="${ IDS.CHAT_USER.ADD }"></div>`,
				[IDS.CHAT_USER.REMOVE]: `<div id="${ IDS.CHAT_USER.REMOVE }"></div>`,
			},
			children: {
				[IDS.CHAT_USER.ADD]: new ButtonRoundBlock({
					id: IDS.CHAT_USER.ADD,
					type: 'button',
					icon: SvgPlus,
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopImmediatePropagation();

						props?.onClick?.(event, IDS.CHAT_USER.ADD);
					},
				}),
				[IDS.CHAT_USER.REMOVE]: new ButtonRoundBlock({
					id: IDS.CHAT_USER.REMOVE,
					type: 'button',
					icon: SvgCross,
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopImmediatePropagation();

						props?.onClick?.(event, IDS.CHAT_USER.REMOVE);
					},
				}),
			},
		});

		Store.on(storeEvent, () => {
			const newState = props?.mapStateToProps?.(Store.getState());

			if (props.mapStateToProps && state && newState) {
				const isEqualCheck = isEqual(state, newState);
				console.log('State ChatUserBlock: ', { isEqualCheck, state, newState, t: this });

				if (!isEqualCheck) {
					this.setProps(newState);
				}
			}

			state = newState;
		});
	}

	override render(): string {
		console.log('Render ChatUserBlock', this);
		return compile(template, this.props);
	}
}
