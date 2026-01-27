import { UserAPI } from '@/api';
import {
	Store,
	StoreEvents,
} from '@/store';
import { STORAGE_KEY } from '@/constants';
import type { RequestOptions } from 'http';
import type { IRequestOptions } from '@/http';
import type { Block } from '@/block';
import type { BlockProps } from '@/types';
import { handleRequestError } from '@/utils/error';

const api = new UserAPI();

class UserController {
	public async changeUserData(options: Partial<RequestOptions & IRequestOptions>, instance?: Block) {
		try {
			const result = await api.profile(options);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
			Store.set('userData', result, 'userData' as BlockProps);
			Store.set('userForm.fields', result, 'userForm' as BlockProps);
			Store.set('isDataEdit', false, 'isDataEdit' as BlockProps);
		} catch (e: unknown) {
			handleRequestError(e, instance);
		}
	}

	public async changePassword(options: Partial<RequestOptions & IRequestOptions>, instance?: Block) {
		try {
			await api.password(options);
			Store.set('isPasswordEdit', false, 'isPasswordEdit' as BlockProps);
		} catch (e: unknown) {
			handleRequestError(e, instance);
		}
	}

	public async changeAvatar(options: Partial<RequestOptions & IRequestOptions>, instance?: Block) {
		try {
			const result = await api.avatar(options);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
			Store.set('userData', result, 'userData' as BlockProps);
			Store.set('userForm.fields', result, 'userForm' as BlockProps);
		} catch (e: unknown) {
			handleRequestError(e, instance);
		}
	}

	public async searchUser(options: Partial<RequestOptions & IRequestOptions>, instance?: Block) {
		try {
			const result = await api.search(options);
			Store.set(
				'searchUsersList',
				result,
				'searchUsersList' as BlockProps,
				false,
				StoreEvents.Updated_modal,
			);
		} catch (e: unknown) {
			handleRequestError(e, instance);
		}
	}
}

export default new UserController();
