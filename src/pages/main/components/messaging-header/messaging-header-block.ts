import { Block } from '@/block';
import {
	CLASSES,
	IDS,
} from '@/constants';
import { compile } from '@/utils';
import type { BlockProps } from '@/types';
import { DropDownBlock } from '@/components/drop-down/drop-down';
import { DropDownOptionBlock } from '@/components/drop-down/drop-down-option';
import {
	SvgCross,
	SvgPlus,
} from '@/components/icons';
import template from './messaging-header-template';
import { LinkBlock } from '@/components/link/link-block';

export class MessagingHeaderBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			markup: {
				[IDS.MAIN.MESSAGING_DD_HEADER]: `<div id="${ IDS.MAIN.MESSAGING_DD_HEADER }"></div>`,
				[IDS.MAIN.HEADER_PROFILE_LINK]: `<div id="${ IDS.MAIN.HEADER_PROFILE_LINK }"></div>`,
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
								console.log('click option add user: ', this);

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
								console.log('click option remove user: ', this);

								event.preventDefault();
								event.stopPropagation();

								this.toggleClassList(CLASSES.ACT, IDS.MAIN.MESSAGING_DD_HEADER);
							},
						}),
					],
				}),
				[IDS.MAIN.HEADER_PROFILE_LINK]: new LinkBlock({
					id: IDS.MAIN.HEADER_PROFILE_LINK,
					class: props.class['user-name'],
					href: '#',
					ariaLabel: 'profile link',
					tooltip: 'profile link',
					target: '_self',
					text: props.first_name,
					onClick: () => {
						console.log('onClick link to profile: ', this);

						props.onChangePage();
					},
				}),
			},
		});
	}

	override render(): string {
		console.log('Render block MessagingHeaderBlock: ', this);

		return compile(template, this.props);
	}
}
