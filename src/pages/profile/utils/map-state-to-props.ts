import type { BlockProps } from '../../../types';
import type {
	IUserResponse,
	TNullable,
} from '../../../types';

export function mapUserToPropsUserData(state: Partial<BlockProps>): TNullable<IUserResponse> {
	return state?.userData ? { ...state.userData } : null;
}
