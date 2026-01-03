import type { BlockProps } from '@/types';

export function mapUserToPropsModalError(state: Partial<BlockProps>) {
	return {
		modalError: state?.modalError,
	};
}
