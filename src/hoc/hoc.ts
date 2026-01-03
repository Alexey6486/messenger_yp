import type {
	BlockProps,
} from '@/types';
import type { Block } from '@/block';
import {
	Store,
	StoreEvents,
} from '@/store';
import {
	isArray,
	isEqual,
} from '@/utils';

export function connect(mapStateToProps: (state: Partial<BlockProps>) => Partial<BlockProps>) {
	return function(Component: typeof Block) {
		return class extends Component {
			constructor(props: BlockProps) {
				let state = mapStateToProps(Store.getState());

				super({
					...props,
					...mapStateToProps(Store.getState()),
				});

				Store.on(StoreEvents.Updated, (...args) => {
					console.log('ARGS', args);
					const newState = mapStateToProps(Store.getState());
					const isEqualCheck = isEqual(state, newState);
					console.log('State Connect: ', { isEqualCheck, state, newState, t: this });

					if (!isEqualCheck) {
						if (isArray(args) && args.length) {
							const stateKey = args[0];
							console.log('CHECK: ', {stateKey, c: stateKey in newState});
							if (stateKey in newState) {
								const targetField = newState[stateKey];
								this.setProps({ [stateKey]: targetField });
							} else {
								this.setProps({ ...newState });
							}
						} else {
							this.setProps({ ...newState });
						}
					}

					state = newState;
				});
			}
		}
	}
}
