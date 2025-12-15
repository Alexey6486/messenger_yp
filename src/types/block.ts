import {
	IAddUserModalForm,
	IChat,
	IChildren,
	ICurrentFocus,
	IFormState,
	IInputChangeParams,
	IInputState,
	ILoginForm,
	IMessageForm,
	IRegistrationFormUi,
	ISearchForm,
	IUserDataForm,
	IUserPasswordForm,
	IUserResponse,
} from '@/types/state';
import { Block } from '@/block';
import { Nullable } from '@/types/general';
import { TPages } from '@/types/pages';

export interface BlockProps {
	children?: IChildren<Block>;
	allInstances?: IChildren<Block>;
	appElement?: Nullable<HTMLElement>;

	isRequired?: boolean;
	isActive?: boolean;
	isVisible?: boolean;
	isMe?: boolean;
	isDisabled?: boolean;
	isDataEdit?: boolean;
	isPasswordEdit?: boolean;

	id?: string;
	type?: string;
	dataset?: string;
	placeholder?: string;
	name?: string;
	label?: string;
	id_label?: string;
	avatar?: string;
	title?: string;
	date?: string;
	counter?: string;
	direction?: string;
	icon?: string;
	href?: string;
	ariaLabel?: string;
	tooltip?: string;
	target?: string;
	text?: string;
	code?: string;
	author?: string;
	fieldName?: string;
	parentFormId?: string;
	currentChatId?: Nullable<string>;
	contentId?: string;
	error?: string;
	buttonText?: string;
	page?: TPages,

	input_data?: Nullable<IInputState>;
	messages?: Nullable<IChat[]>;
	chats?: Nullable<IChat[]>;
	userData?: IUserResponse;
	currentFocus?: Nullable<ICurrentFocus>;

	onClick?: (event?: Event) => void;
	onSubmit?: (event?: Event) => void;
	onChangePage?: () => void;
	onInputChange?: (params: IInputChangeParams) => void;
	changePage?: (page: TPages) => void;

	class?: string;
	styles?: { [key: string]: string };

	markup?: Record<string, string>;
	events?: Record<string, (e: Event) => void>;

	authorizationForm?: IFormState<ILoginForm>;
	registrationForm?: IFormState<IRegistrationFormUi>;
	passwordForm?: IFormState<IUserPasswordForm>,
	userForm?: IFormState<IUserDataForm>,
	chatsSearchForm?: IFormState<ISearchForm>;
	newMessageForm?: IFormState<IMessageForm>;
	modalAddUserForm?: IFormState<IAddUserModalForm>;
}
