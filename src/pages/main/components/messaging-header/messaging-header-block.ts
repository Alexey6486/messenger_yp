import { Block } from '@/block';
import {
	CLASSES,
	IDS,
} from '@/constants';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import { DropDownBlock } from '@/components/drop-down/drop-down-block';
import { DropDownOptionBlock } from '@/components/drop-down/drop-down-option-block';
import { LinkBlock } from '@/components/link/link-block';
import {
	SvgCross,
	SvgPlus,
} from '@/components/icons';
import template from './messaging-header-template';

export class MessagingHeaderBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			markup: {
				[IDS.MAIN.MESSAGING_DD_HEADER]: `<div id="${IDS.MAIN.MESSAGING_DD_HEADER}"></div>`,
				[IDS.MAIN.HEADER_PROFILE_LINK]: `<div id="${IDS.MAIN.HEADER_PROFILE_LINK}"></div>`,
			},
			children: {
				[IDS.MAIN.MESSAGING_DD_HEADER]: new DropDownBlock({
					id: IDS.MAIN.MESSAGING_DD_HEADER,
					direction: 'bottom left',
					childrenList: [
						new DropDownOptionBlock({
							id: IDS.MAIN.MAIN_ADD_USER_OPTION,
							icon: SvgPlus,
							text: 'Добавить пользователя',
							onClick: (event: Event) => {
								event.preventDefault();
								event.stopPropagation();

								this.toggleClassList(CLASSES.ACT, IDS.MAIN.MESSAGING_DD_HEADER);
							},
						}),
						new DropDownOptionBlock({
							id: IDS.MAIN.MAIN_REMOVE_USER_OPTION,
							icon: SvgCross,
							text: 'Удалить пользователя',
							onClick: (event: Event) => {
								event.preventDefault();
								event.stopPropagation();

								this.toggleClassList(CLASSES.ACT, IDS.MAIN.MESSAGING_DD_HEADER);
							},
						}),
					],
				}),
				[IDS.MAIN.HEADER_PROFILE_LINK]: new LinkBlock({
					id: IDS.MAIN.HEADER_PROFILE_LINK,
					class: props?.styles?.['user-name'] ?? '',
					href: '#',
					ariaLabel: 'profile link',
					tooltip: 'profile link',
					target: '_self',
					text: props?.userData?.first_name ?? '',
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						props.onChangePage?.();
					},
				}),
			},
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
