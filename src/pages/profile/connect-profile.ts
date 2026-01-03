import { ProfileBlock } from './profile-block';
import { connect } from '@/hoc';
import type { BlockProps } from '@/types';
import { cloneDeep } from '@/utils';

export function mapUserToPropsProfile(state: Partial<BlockProps>) {
	return cloneDeep({
		passwordForm: state?.passwordForm,
		userForm: state?.userForm,
		userData: state?.userData,
		isDataEdit: state?.isDataEdit,
		isPasswordEdit: state?.isPasswordEdit,
	});
}

const connectProfile = connect(mapUserToPropsProfile);
export const ProfilePage = connectProfile(ProfileBlock);
