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
	IUserResponse,
	TNullable,
} from '@/types';
import { cloneDeep } from '@/utils';

export function mapUserToPropsMain(state: Partial<BlockProps>): {
	currentChatData: TNullable<ICurrentChatData> | undefined,
	chatsSearchForm: TNullable<IFormState<ISearchForm>> | undefined,
	newMessageForm: TNullable<IFormState<IMessageForm>> | undefined,
	chats: TNullable<IChat[]> | undefined,
	messages: TNullable<Map<string, IChat[]>> | undefined,
	messagesList: TNullable<IChat[]> | undefined,
	chatsSockets: TNullable<Map<string, WebSocketService>> | undefined,
	userData: TNullable<IUserResponse> | undefined,
} {
	return {
		currentChatData: state?.currentChatData,
		chatsSearchForm: cloneDeep(state?.chatsSearchForm),
		newMessageForm: state?.newMessageForm,
		chats: cloneDeep(state?.chats),
		messages: state?.messages,
		messagesList: state?.messagesList,
		chatsSockets: state?.chatsSockets,
		userData: state?.userData,
	};
}

const connectMain = connect(mapUserToPropsMain);
export const MainPage = connectMain(MainBlock);
