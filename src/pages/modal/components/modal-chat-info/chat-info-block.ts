import { Block } from '@/block';
import { ChatsController } from '@/controllers';
import {
	Store,
	StoreEvents,
} from '@/store';
import { IDS } from '@/constants';
import {
	cloneDeep,
	compile,
} from '@/utils';
import type {
	BlockProps,
	IChatUserResponse,
} from '@/types';
import { E_FORM_FIELDS_NAME } from '@/types';
import { UlBlock } from '@/components/ul/ul-block';
import { ChatUserBlock } from '@/components/chat-user/chat-user-block';
import { InputBlock } from '@/components/input/input-block';
import template from './chat-info-template';
import styles from '../styles.module.pcss';

export class ModalChatInfoBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			id: IDS.MODAL.CONTENT,
			events: {
				submit: (e: Event) => {
					e.preventDefault();
					e.stopPropagation();
				},
			},
			markup: {
				[IDS.MODAL.CHAT_INFO_USERS]: `<div id="${ IDS.MODAL.CHAT_INFO_USERS }"></div>`,
				[IDS.MODAL.CHAT_AVATAR]: `<div id="${ IDS.MODAL.CHAT_AVATAR }"></div>`,
			},
			children: {
				[IDS.MODAL.CHAT_AVATAR]: new InputBlock({
					id: IDS.MODAL.CHAT_AVATAR,
					dataset: E_FORM_FIELDS_NAME.avatar,
					name: E_FORM_FIELDS_NAME.avatar,
					placeholder: '',
					type: 'file',
					accept: 'image/*',
					input_data: null,
					onFileChange: (fileList: FileList) => {
						console.log('Avatar onInputChange: ', { fileList });
						const formData = new FormData();
						formData.append('avatar', fileList[0]);
						formData.append('chatId', props.currentChatData?.info.id ?? '');
						ChatsController.changeAvatar({ data: formData as FormData }, this);
					},
				}),
				[IDS.MODAL.CHAT_INFO_USERS]: new UlBlock({
					id: IDS.MODAL.CHAT_INFO_USERS,
					clearChildrenListOnStateChange: true,
					storeEvent: StoreEvents.Updated_modal,
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return {
							currentChatData: cloneDeep(data?.currentChatData),
						};
					},
					childrenList: props.currentChatData?.users.map((user: IChatUserResponse) => {
						const { login, id, avatar } = user;
						return new ChatUserBlock({
							id,
							avatar,
							name: login,
							text: login.substring(0, 1).toUpperCase(),
							isAdd: false,
							isRemove: false,
						});
					}).filter((el) => el),
				}),
			},
		});
	}

	override componentWillUnmount() {
		Store.clearTargetSubs(StoreEvents.Updated_modal);
	}

	override render(): string {
		console.log('Render ModalChatInfoBlock', this, Store);
		return compile(template, { ...this.props, styles });
	}
}
