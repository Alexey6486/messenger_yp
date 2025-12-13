import { Block } from '@/block';
import { IDS } from '@/constants';
import { compile } from '@/utils';
import type {
	BlockProps,
	IChat,
	TNullable,
} from '@/types';
import { MessagingHeaderBlock } from '@/pages/main/components/messaging-header/messaging-header-block';
import { MessagingFooterBlock } from '@/pages/main/components/messaging-footer/messaging-footer-block';
import { MessagingMainBlock } from '@/pages/main/components/messaging-main/messaging-main-block';
import template from './messaging-template';
import styles from '@/pages/main/styles.module.pcss';

interface IMessagingBlock extends BlockProps {
	id: string;
	messages: TNullable<IChat[]>;
	userData: Record<string, string>;
	onChangePage: (e: Event) => void;
}

export class MessagingBlock extends Block {
	constructor(props: IMessagingBlock) {
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
					styles,
					userData: props.userData,
					onChangePage: props.onChangePage,
				}),
				[IDS.MAIN.MESSAGING_FOOTER]: new MessagingFooterBlock({
					id: IDS.MAIN.MESSAGING_FOOTER,
					styles,
					[IDS.FORMS.MAIN_NEW_MESSAGE_FORM]: props[IDS.FORMS.MAIN_NEW_MESSAGE_FORM],
				}),
			},
			childrenList: props?.messages?.map?.(({ id, last_message }: IChat) => {
				return new MessagingMainBlock({
					id,
					styles,
					author: last_message.user.display_name,
					text: last_message.content,
					date: last_message.time,
					isMe: last_message.user.id === props.userData.id,
				});
			}),
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
