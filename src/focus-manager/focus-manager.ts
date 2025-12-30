import { EventBus } from '@/event-bus';
import type {
	ICurrentFocus,
} from '@/types';

class FocusManager extends EventBus {
	private state: ICurrentFocus = {
		element: null,
		selectionStart: null,
	};

	public getState() {
		return this.state;
	}

	public set(value: ICurrentFocus) {
		console.log('FocusManager set: ', { value });
		this.state = value;

		// this.emit(FocusEvents.Updated);
	}
}

export default new FocusManager();
