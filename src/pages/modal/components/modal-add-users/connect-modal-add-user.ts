import { ModalAddUsersBlock } from './add-users-block';
import { connect } from '@/hoc';
import type {
	BlockProps,
	IAddUsersModalForm,
	IFormState,
	TNullable,
} from '@/types';

export function mapUserToPropsAddUsers(state: Partial<BlockProps>): { modalAddUsersForm: TNullable<IFormState<IAddUsersModalForm>> | undefined } {
	return {
		modalAddUsersForm: state?.modalAddUsersForm,
	};
}

const connectAddUsers = connect(mapUserToPropsAddUsers);
export const ModalAddUsers = connectAddUsers(ModalAddUsersBlock);
