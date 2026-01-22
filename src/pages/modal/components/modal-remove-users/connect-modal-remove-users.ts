import { ModalRemoveUsersBlock } from './remove-users-block';
import { connect } from '../../../../hoc';
import type {
	BlockProps,
	ICurrentChatData,
	TNullable,
} from '../../../../types';
import { StoreEvents } from '../../../../store';
import { cloneDeep } from '../../../../utils';

export function mapUserToPropsRemoveUsers(state: Partial<BlockProps>): {
	currentChatData: TNullable<ICurrentChatData> | undefined,
	isDisabled: boolean,
} {
	return {
		currentChatData: cloneDeep(state?.currentChatData),
		isDisabled: Boolean(state?.currentChatData?.users && state?.currentChatData?.users.length < 2),
	};
}

const connectRemoveUsers = connect(mapUserToPropsRemoveUsers, StoreEvents.Updated_modal);
export const ModalRemoveUsers = connectRemoveUsers(ModalRemoveUsersBlock);
