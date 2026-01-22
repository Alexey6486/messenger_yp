import type { BlockProps } from '../../../../../types';
import type {
	IErrorPageState,
	TNullable,
} from '../../../../../types';

export function mapUserToPropsModalError(state: Partial<BlockProps>): { modalError: TNullable<IErrorPageState> | undefined } {
	return {
		modalError: state?.modalError,
	};
}
