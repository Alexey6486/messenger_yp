import { RegistrationBlock } from './registration-block';
import { connect } from '@/hoc';
import type { BlockProps } from '@/types';
import type {
	IFormState,
	IRegistrationFormUi,
	TNullable,
} from '@/types';
import { cloneDeep } from '@/utils';

export function mapUserToPropsRegistration(state: Partial<BlockProps>): { registrationForm: TNullable<IFormState<IRegistrationFormUi>> | undefined } {
	return {
		registrationForm: cloneDeep(state?.registrationForm),
	};
}

const connectRegistration = connect(mapUserToPropsRegistration);
export const RegistrationPage = connectRegistration(RegistrationBlock);
