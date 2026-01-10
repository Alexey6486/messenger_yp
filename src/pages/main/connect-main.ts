import { MainBlock } from './main-block';
import { connect } from '@/hoc';
import type { WebSocketService } from '@/web-socket';
import type {
	BlockProps,
	IChat,
	ICurrentChatData,
	IFormState,
	IMessageForm,
	ISearchForm,
	TNullable,
} from '@/types';
import { cloneDeep } from '@/utils';

export function mapUserToPropsMain(state: Partial<BlockProps>): {
	currentChatData: TNullable<ICurrentChatData> | undefined,
	chatsSearchForm: TNullable<IFormState<ISearchForm>> | undefined,
	newMessageForm: TNullable<IFormState<IMessageForm>> | undefined,
	chats: TNullable<IChat[]> | undefined,
	messages: TNullable<IChat[]> | undefined,
	chatsSockets: TNullable<Map<string, WebSocketService>> | undefined,
} {
	return {
		currentChatData: state?.currentChatData,
		chatsSearchForm: cloneDeep(state?.chatsSearchForm),
		newMessageForm: state?.newMessageForm,
		chats: cloneDeep(state?.chats),
		messages: state?.messages,
		chatsSockets: state?.chatsSockets,
	};
}

const connectMain = connect(mapUserToPropsMain);
export const MainPage = connectMain(MainBlock);
