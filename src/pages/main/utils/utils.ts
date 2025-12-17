import {
	MSG_PREVIEW_LENGTH_MAX,
	MSG_PREVIEW_LENGTH_CUT,
} from '@/pages/main/constants/constants';

export const formatContentLength = (message: string): string => {
	return message.length > MSG_PREVIEW_LENGTH_MAX
		? message.substring(0, MSG_PREVIEW_LENGTH_CUT) + '...'
		: message;
};
