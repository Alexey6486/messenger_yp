import type { BlockProps } from '@/types';
import type {
	IErrorPageState,
	TNullable,
} from '@/types';
import { cloneDeep } from '@/utils';

export function mapUserToPropsModalError(state: Partial<BlockProps>): { modalError: TNullable<IErrorPageState> | undefined } {
	return {
		modalError: cloneDeep(state?.modalError),
	};
}
