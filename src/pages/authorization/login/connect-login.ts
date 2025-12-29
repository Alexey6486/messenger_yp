import { LoginBlock } from './login-block';
import { connect } from '@/hoc';
import type { BlockProps } from '@/types';

export function mapUserToPropsLogin(state: Partial<BlockProps>) {
	return {
		authorizationForm: state?.authorizationForm,
	};
}

const connectLogin = connect(mapUserToPropsLogin);
export const LoginPage = connectLogin(LoginBlock);
