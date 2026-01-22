import type { BlockProps } from '../types';
import type { Block } from '../block';
import {
	Store,
	StoreEvents,
} from '../store';
import {
	isArray,
	isEqual,
} from '../utils';

export function connect(
	mapStateToProps: (state: Partial<BlockProps>) => Partial<BlockProps>,
	storeEvent = StoreEvents.Updated,
) {
	return function (Component: typeof Block) {
		return class extends Component {
			constructor(props: BlockProps) {
				let state = mapStateToProps(Store.getState());

				super({
					...props,
					...mapStateToProps(Store.getState()),
				});

				Store.on(storeEvent, (...args) => {
					const newState = mapStateToProps(Store.getState());
					const isEqualCheck = isEqual(state, newState);
					if (!isEqualCheck) {
						if (isArray(args, true)) {
							const stateKey: keyof BlockProps = (args as BlockProps[])[0] as unknown as keyof BlockProps;
							if (stateKey && stateKey in newState) {
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
		};
	};
}
