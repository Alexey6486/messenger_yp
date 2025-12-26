import { LoginBlock } from './login-block';
import { connect } from '@/hoc';
import type { BlockProps } from '@/types';

function mapUserToProps(state: Partial<BlockProps>) {
	return {
		authorizationForm: state.authorizationForm,
	};
}

const connectLogin = connect(mapUserToProps);
export const LoginPage = connectLogin(LoginBlock)
