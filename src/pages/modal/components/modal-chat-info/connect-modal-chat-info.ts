import { ModalChatInfoBlock } from './chat-info-block';
import { connect } from '@/hoc';
import type {
	BlockProps,
	TNullable,
	ICurrentChatData,
} from '@/types';
import { StoreEvents } from '@/store';
import { cloneDeep } from '@/utils';

export function mapUserToPropsChatInfo(state: Partial<BlockProps>): {
	currentChatData: TNullable<ICurrentChatData> | undefined,
} {
	return {
		currentChatData: cloneDeep(state?.currentChatData),
	};
}

const connectChatInfo = connect(mapUserToPropsChatInfo, StoreEvents.Updated_modal);
export const ModalChatInfo = connectChatInfo(ModalChatInfoBlock);
