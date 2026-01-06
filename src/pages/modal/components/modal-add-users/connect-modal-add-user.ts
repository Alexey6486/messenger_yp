import { ModalAddUsersBlock } from './add-users-block';
import { connect } from '@/hoc';
import type {
	BlockProps,
	IAddUsersModalForm,
	IChatUserResponse,
	IFormState,
	TNullable,
} from '@/types';

export function mapUserToPropsAddUsers(state: Partial<BlockProps>): {
	modalAddUsersForm: TNullable<IFormState<IAddUsersModalForm>> | undefined,
	searchUsersList: TNullable<IChatUserResponse[]> | undefined,
	addUsersList: TNullable<number[]> | undefined,
} {
	return {
		modalAddUsersForm: state?.modalAddUsersForm,
		searchUsersList: state?.searchUsersList,
		addUsersList: state?.addUsersList,
	};
}

const connectAddUsers = connect(mapUserToPropsAddUsers);
export const ModalAddUsers = connectAddUsers(ModalAddUsersBlock);
