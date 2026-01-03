import { LoginBlock } from './login-block';
import { connect } from '@/hoc';
import type { BlockProps } from '@/types';
import type {
	IFormState,
	ILoginForm,
	TNullable,
} from '@/types';

export function mapUserToPropsLogin(state: Partial<BlockProps>): { authorizationForm: TNullable<IFormState<ILoginForm>> | undefined } {
	return {
		authorizationForm: state?.authorizationForm,
	};
}

const connectLogin = connect(mapUserToPropsLogin);
export const LoginPage = connectLogin(LoginBlock);
