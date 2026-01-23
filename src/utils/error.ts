import { isErrorWithMessage } from '@/utils';
import { Store } from '@/store';
import type { Block } from '@/block';
import { ModalBlock } from '@/pages/modal';
import {
	IDS,
	USER_LOGGED_IN,
} from '@/constants';

export function handleRequestError(e: unknown, instance?: Block) {
	if (isErrorWithMessage(e)) {
		const error = JSON.parse(e.message);
		if (instance) {
			if (error.code === 400 && error.text === 'User already in system') {
				return USER_LOGGED_IN;
			} else {
				Store.set('modalError', { ...error });

				instance.createModal(new ModalBlock({
					contentId: IDS.MODAL.MODAL_ERROR,
					title: 'Ошибка',
				}));
				return '';
			}
		}
	} else {
		throw new Error('Unknown error');
	}
}
