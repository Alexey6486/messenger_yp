import { ModalAddUsersBlock } from './add-users-block';
import { connect } from '../../../../hoc';
import type {
	BlockProps,
	IAddUsersModalForm,
	IChatUserResponse,
	ICurrentChatData,
	IFormState,
	TNullable,
} from '../../../../types';
import { StoreEvents } from '../../../../store';

export function mapUserToPropsAddUsers(state: Partial<BlockProps>): {
	modalAddUsersForm: TNullable<IFormState<IAddUsersModalForm>> | undefined,
	searchUsersList: TNullable<IChatUserResponse[]> | undefined,
	addUsersList: TNullable<IChatUserResponse[]> | undefined,
	currentChatData: TNullable<ICurrentChatData> | undefined,
} {
	return {
		modalAddUsersForm: state?.modalAddUsersForm,
		searchUsersList: state?.searchUsersList,
		addUsersList: state?.addUsersList,
		currentChatData: state?.currentChatData,
	};
}

const connectAddUsers = connect(mapUserToPropsAddUsers, StoreEvents.Updated_modal);
export const ModalAddUsers = connectAddUsers(ModalAddUsersBlock);
