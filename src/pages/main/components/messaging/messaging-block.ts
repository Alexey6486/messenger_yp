import { Block } from '@/block';
import { IDS } from '@/constants';
import { compile } from '@/utils';
import type {
	BlockProps,
} from '@/types';
import type { MessagingMainBlock } from '@/pages/main/components/messaging-main/messaging-main-block';
import { MessagingHeaderBlock } from '@/pages/main/components/messaging-header/messaging-header-block';
import { MessagingFooterBlock } from '@/pages/main/components/messaging-footer/messaging-footer-block';
import template from './messaging-template';
import styles from '@/pages/main/styles.module.pcss';

interface IMessagingBlockProps extends BlockProps {
	childrenList: MessagingMainBlock[];
}

export class MessagingBlock extends Block {
	constructor(props: IMessagingBlockProps) {
		super({
			...props,
			markup: {
				[IDS.COMMON.COMPONENTS_LIST]: `<div id="${IDS.COMMON.COMPONENTS_LIST}"></div>`,
				[IDS.MAIN.MESSAGING_HEADER]: `<div id="${IDS.MAIN.MESSAGING_HEADER}"></div>`,
				[IDS.MAIN.MESSAGING_FOOTER]: `<div id="${IDS.MAIN.MESSAGING_FOOTER}"></div>`,
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
					newMessageForm: props.newMessageForm,
				}),
			},
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
