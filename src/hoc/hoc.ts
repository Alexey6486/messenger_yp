import type {
	BlockProps,
} from '@/types';
import type { Block } from '@/block';
import {
	Store,
	StoreEvents,
} from '@/store';
import { isEqual } from '@/utils';

export function connect(mapStateToProps: (state: Partial<BlockProps>) => Partial<BlockProps>) {
	return function(Component: typeof Block) {
		return class extends Component {
			constructor(props: BlockProps) {
				let state = mapStateToProps(Store.getState());

				super({
					...props,
					...mapStateToProps(Store.getState()),
				});

				Store.on(StoreEvents.Updated, () => {
					const newState = mapStateToProps(Store.getState());

					if (!isEqual(state, newState)) {
						this.setProps({...newState});
					}

					state = newState;
				});
			}
		}
	}
}
