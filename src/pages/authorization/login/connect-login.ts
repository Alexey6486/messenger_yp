import { LoginBlock } from './login-block';
import { connect } from '@/hoc';
import type { BlockProps } from '@/types';

function mapUserToProps(state: Partial<BlockProps>) {
	return {
		userData: state.userData,
	};
}

const connectLogin = connect(mapUserToProps);
export const LoginPage = connectLogin(LoginBlock)
