import { ErrorBlock } from './error-block';
import { connect } from '@/hoc';
import type {
	BlockProps,
	IErrorPageState,
	TNullable,
} from '@/types';
import { cloneDeep } from '@/utils';

export function mapUserToPropsError(state: Partial<BlockProps>): { error: TNullable<IErrorPageState> | undefined } {
	return {
		error: cloneDeep(state?.error),
	};
}

const connectError = connect(mapUserToPropsError);
export const ErrorPage = connectError(ErrorBlock);
