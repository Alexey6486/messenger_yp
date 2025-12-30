import type {
	ICurrentFocus,
} from '@/types';

class FocusManager {
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
	}
}

export default new FocusManager();
