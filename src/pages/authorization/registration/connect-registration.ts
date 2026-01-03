import { RegistrationBlock } from './registration-block';
import { connect } from '@/hoc';
import type { BlockProps } from '@/types';
import type {
	IFormState,
	IRegistrationFormUi,
	TNullable,
} from '@/types';

export function mapUserToPropsRegistration(state: Partial<BlockProps>): { registrationForm: TNullable<IFormState<IRegistrationFormUi>> | undefined } {
	return {
		registrationForm: state?.registrationForm,
	};
}

const connectRegistration = connect(mapUserToPropsRegistration);
export const RegistrationPage = connectRegistration(RegistrationBlock);
