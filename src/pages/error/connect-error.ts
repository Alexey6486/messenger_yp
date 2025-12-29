import { ErrorBlock } from './error-block';
import { connect } from '@/hoc';
import type { BlockProps } from '@/types';

export function mapUserToPropsError(state: Partial<BlockProps>) {
	return {
		error: state?.error,
	};
}

const connectError = connect(mapUserToPropsError);
export const ErrorPage = connectError(ErrorBlock);
