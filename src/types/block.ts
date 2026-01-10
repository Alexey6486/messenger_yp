import type { WebSocketService } from '@/web-socket';
import type {
	IAddChatModalForm,
	IAddUsersModalForm,
	IChat,
	IChatUserResponse,
	IChildren,
	ICurrentChatData,
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
	container?: TNullable<HTMLElement>;
	router?: Router;

	isRequired?: boolean;
	isActive?: boolean;
	isVisible?: boolean;
	isMe?: boolean;
	isDisabled?: boolean;
	isDataEdit?: boolean;
	isPasswordEdit?: boolean;
	isRemove?: boolean;
	isAdd?: boolean;
	clearChildrenListOnStateChange?: boolean;

	id?: string;
	type?: string;
	accept?: string;
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
	contentId?: string;
	buttonText?: string;
	storeEvent?: string;
	page?: TPages;
	error?: TNullable<IErrorPageState>;
	modalError?: TNullable<IErrorPageState>;
	currentChatData?: TNullable<ICurrentChatData>;
	searchUsersList?: TNullable<IChatUserResponse[]>;
	addUsersList?: TNullable<IChatUserResponse[]>;
	chatsSockets?: TNullable<Map<string, WebSocketService>>;

	input_data?: TNullable<IInputState>;
	messages?: TNullable<IChat[]>;
	chats?: TNullable<IChat[]>;
	userData?: TNullable<IUserResponse>;

	onClick?: (event: Event, data?: unknown) => void;
	onSubmit?: (event?: Event, data?: unknown) => void;
	onChangePage?: () => void;
	onInputChange?: (params: IInputChangeParams) => void;
	onFileChange?: (fileList: FileList) => void;
	changePage?: (page: TPages) => void;
	onCloseModal?: () => void;
	mapStateToProps?: (data: Partial<BlockProps>) => Partial<BlockProps>
	mapStateListToProps?: (data: Partial<BlockProps>) => unknown[]
	onSetChildrenList?: (data: Partial<unknown>) => IChildren<Block>

	class?: string;
	styles?: { [key: string]: string };

	attr?: Record<string, string>;
	markup?: Record<string, string>;
	events?: Record<string, (e: Event) => void>;

	authorizationForm?: TNullable<IFormState<ILoginForm>>;
	registrationForm?: TNullable<IFormState<IRegistrationFormUi>>;
	passwordForm?: TNullable<IFormState<IUserPasswordForm>>,
	userForm?: TNullable<IFormState<IUserDataForm>>,
	chatsSearchForm?: TNullable<IFormState<ISearchForm>>;
	newMessageForm?: TNullable<IFormState<IMessageForm>>;
	modalAddUsersForm?: TNullable<IFormState<IAddUsersModalForm>>;
	modalAddChatForm?: TNullable<IFormState<IAddChatModalForm>>;
	modalErrorForm?: TNullable<IFormState<IErrorPageState>>;
}
