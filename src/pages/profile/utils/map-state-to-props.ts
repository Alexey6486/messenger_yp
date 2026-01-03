import type { BlockProps } from '@/types';
import type {
	IUserResponse,
	TNullable,
} from '@/types';
import { cloneDeep } from '@/utils';

export function mapUserToPropsUserData(state: Partial<BlockProps>): TNullable<IUserResponse> {
	return state?.userData ? cloneDeep({ ...state.userData }) : null;
}
