import type { IChat } from '@/types';
import { MSG_PREVIEW_LENGTH_MAX, MSG_PREVIEW_LENGTH_CUT } from '@/pages/main/constants/constants';

export const formatContentLength = (item: IChat): IChat => {
    return {
        ...item,
        last_message: {
            ...item.last_message,
            content:
                item.last_message.content.length > MSG_PREVIEW_LENGTH_MAX
                    ? item.last_message.content.substring(0, MSG_PREVIEW_LENGTH_CUT) + '...'
                    : item.last_message.content,
        }
    };
}
