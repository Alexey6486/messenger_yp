import type {
	IAddUserModalForm,
	IChat,
	IChildren,
	IErrorPageState,
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
import type { TNullable } from '@/types/general';
import type { TPages } from '@/types/pages';
import type { Router } from '@/router';

// function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
// 	return obj[key];
// }

export interface BlockProps {
	children?: IChildren<Block>;
	allInstances?: IChildren<Block>;
	appElement?: TNullable<HTMLElement>;
	router?: Router;

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
	author?: string;
	fieldName?: string;
	parentFormId?: string;
	currentChatId?: TNullable<string>;
	contentId?: keyof BlockProps;
	buttonText?: string;
	page?: TPages;
	error?: TNullable<IErrorPageState>;

	input_data?: TNullable<IInputState>;
	messages?: TNullable<IChat[]>;
	chats?: TNullable<IChat[]>;
	userData?: IUserResponse;

	onClick?: (event: Event) => void;
	onSubmit?: (event?: Event) => void;
	onChangePage?: () => void;
	onInputChange?: (params: IInputChangeParams) => void;
	changePage?: (page: TPages) => void;
	onCloseModal?: () => void;
	mapStateToProps?: (data: Partial<BlockProps>) => Partial<BlockProps>

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
	contentForms?: Record<string, IFormState<unknown>>;
}
