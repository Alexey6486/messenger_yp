import { Block } from '../../block';
import {
	Store,
	StoreEvents,
} from '../../store';
import { IDS } from '../../constants';
import {
	compile,
	isEqual,
} from '../../utils';
import type { BlockProps } from '../../types';
import template from './ul-template';

interface IUlBlockProps extends BlockProps {
	childrenList?: unknown[];
}

export class UlBlock extends Block {
	constructor(props: IUlBlockProps) {
		const storeEvent = props?.storeEvent ? props.storeEvent as StoreEvents : StoreEvents.Updated;
		let state = props?.mapStateToProps?.(Store.getState());

		super({
			...props,
			...(props?.mapStateToProps && props.mapStateToProps(Store.getState())),
			markup: {
				[IDS.COMMON.COMPONENTS_LIST]: `<div id="${ IDS.COMMON.COMPONENTS_LIST }"></div>`,
			},
		});

		Store.on(storeEvent, () => {
			const newState = props?.mapStateToProps?.(Store.getState());
			if (props.mapStateToProps && state && newState) {
				const isEqualCheck = isEqual(state, newState);
				if (!isEqualCheck) {
					if (props?.onSetChildrenList) {
						const blocks = props?.onSetChildrenList(newState);
						if (blocks) {
							if (props?.clearChildrenListOnStateChange) {
								this.clearChildrenList();
							}
							this.setChildrenList({ childrenList: blocks });
						}
					} else {
						this.setProps(newState);
					}
				}
			}
			state = newState;
		});
	}

	override componentWillUnmount() {
		this.clearChildrenList();
	}


	override render(): string {
		return compile(template, this.props);
	}
}
