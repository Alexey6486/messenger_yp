import type {
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
import type { Block } from '@/block';
import type { Nullable } from '@/types/general';
import type { TPages } from '@/types/pages';

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
	contentId?: keyof BlockProps;
	error?: string;
	buttonText?: string;
	page?: TPages,

	input_data?: Nullable<IInputState>;
	messages?: Nullable<IChat[]>;
	chats?: Nullable<IChat[]>;
	userData?: IUserResponse;
	currentFocus?: Nullable<ICurrentFocus>;

	onClick?: (event: Event) => void;
	onSubmit?: (event?: Event) => void;
	onChangePage?: () => void;
	onInputChange?: (params: IInputChangeParams) => void;
	changePage?: (page: TPages) => void;
	onCloseModal?: () => void;

	class?: string;
	styles?: { [key: string]: string };

	attr?: Record<string, string>;
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
