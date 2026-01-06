import { UserAPI } from '@/api';
import { Store } from '@/store';
import { STORAGE_KEY } from '@/constants';
import type { RequestOptions } from 'http';
import type { IRequestOptions } from '@/http';
import type { Block } from '@/block';
import type { BlockProps } from '@/types';
import { handleRequestError } from '@/utils';

const api = new UserAPI();

class UserController {
	public async changeUserData(options: Partial<RequestOptions & IRequestOptions>, instance?: Block) {
		try {
			const result = await api.profile(options);
			console.log('UserController.changeUserData: ', { result });
			sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
			Store.set('userData', result, 'userData' as BlockProps);
			Store.set('userForm.fields', result, 'userForm' as BlockProps);
			Store.set('isDataEdit', false, 'isDataEdit' as BlockProps);
		} catch (e: unknown) {
			console.log('UserController.changeUserData Error: ', { e });
			handleRequestError(e, instance);
		}
	}

	public async changePassword(options: Partial<RequestOptions & IRequestOptions>, instance?: Block) {
		try {
			const result = await api.password(options);
			console.log('UserController.changePassword: ', { result });
			Store.set('isPasswordEdit', false, 'isPasswordEdit' as BlockProps);
		} catch (e: unknown) {
			console.log('UserController.changePassword Error: ', { e });
			handleRequestError(e, instance);
		}
	}

	public async changeAvatar(options: Partial<RequestOptions & IRequestOptions>, instance?: Block) {
		try {
			const result = await api.avatar(options);
			console.log('UserController.changeAvatar: ', { result });
			sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
			Store.set('userData', result, 'userData' as BlockProps);
			Store.set('userForm.fields', result, 'userForm' as BlockProps);
		} catch (e: unknown) {
			console.log('UserController.changeAvatar Error: ', { e });
			handleRequestError(e, instance);
		}
	}
}

export default new UserController();
