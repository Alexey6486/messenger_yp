import { ModalErrorBlock } from './modal-error-block';
import { connect } from '@/hoc';
import type { BlockProps } from '@/types';

export function mapUserToPropsModalError(state: Partial<BlockProps>) {
	return {
		modalError: state?.modalError,
	};
}

const connectModalError = connect(mapUserToPropsModalError);
export const ModalError = connectModalError(ModalErrorBlock);
