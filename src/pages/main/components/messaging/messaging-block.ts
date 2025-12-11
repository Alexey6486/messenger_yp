import { Block } from '@/block';
import { IDS } from '@/constants';
import { compile } from '@/utils';
import type {
	BlockProps,
	IChat,
} from '@/types';
import { MessagingHeaderBlock } from '@/pages/main/components/messaging-header/messaging-header-block';
import { MessagingFooterBlock } from '@/pages/main/components/messaging-footer/messaging-footer-block';
import { MessagingMainBlock } from '@/pages/main/components/messaging-main/messaging-main-block';
import template from './messaging-template';

export class MessagingBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			markup: {
				[IDS.COMMON.COMPONENTS_LIST]: `<div id="${ IDS.COMMON.COMPONENTS_LIST }"></div>`,
				[IDS.MAIN.MESSAGING_HEADER]: `<div id="${ IDS.MAIN.MESSAGING_HEADER }"></div>`,
				[IDS.MAIN.MESSAGING_FOOTER]: `<div id="${ IDS.MAIN.MESSAGING_FOOTER }"></div>`,
			},
			children: {
				[IDS.MAIN.MESSAGING_HEADER]: new MessagingHeaderBlock({
					id: IDS.MAIN.MESSAGING_HEADER,
					first_name: props.userData.first_name,
					class: props.class,
					onChangePage: props.onChangePage,
				}),
				[IDS.MAIN.MESSAGING_FOOTER]: new MessagingFooterBlock({
					id: IDS.MAIN.MESSAGING_FOOTER,
					class: props.class,
					newMessageForm: props.newMessageForm,
				}),
			},
			childrenList: props.messages.map(({ id, last_message }: IChat) => {
				return new MessagingMainBlock({
					class: props.class,
					id,
					author: last_message.user.display_name,
					text: last_message.content,
					date: last_message.time,
					isMe: last_message.user.id === props.userData.id,
				});
			}),
		});
	}

	override render(): string {
		console.log('Render block MessagingBlock: ', this);

		return compile(template, this.props);
	}
}
