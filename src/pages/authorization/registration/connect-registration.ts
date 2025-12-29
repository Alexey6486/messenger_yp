import { RegistrationBlock } from './registration-block';
import { connect } from '@/hoc';
import type { BlockProps } from '@/types';

export function mapUserToPropsRegistration(state: Partial<BlockProps>) {
	return {
		registrationForm: state?.registrationForm,
	};
}

const connectRegistration = connect(mapUserToPropsRegistration);
export const RegistrationPage = connectRegistration(RegistrationBlock);
