import { Block } from '@/block';
import {
	Store,
	StoreEvents,
} from '@/store';
import { ChatsController } from '@/controllers';
import {
	CLASSES,
	IDS,
} from '@/constants';
import {
	compile,
	isEqual,
} from '@/utils';
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
		let state = props?.mapStateToProps?.(Store.getState());

		super({
			...props,
			...(props?.mapStateToProps && props.mapStateToProps(Store.getState())),
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
								event.preventDefault();
								event.stopPropagation();

								this.toggleClassList(CLASSES.ACT, IDS.MAIN.MESSAGING_DD_HEADER);

								this.createModal(
									'modalAddUsersForm',
									'Добавление пользователей',
									(event, data) => {
										console.log('Add users submit: ', { data, event, props, state });
										if (data && state?.currentChatData?.info) {
											ChatsController.addUsers(
												data as number[],
												state.currentChatData.info,
												this,
											);
										}
									},
								);
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

								this.createModal(
									'modal-remove-users',
									'Удаление пользователей',
									(event, data) => {
										console.log('Remove users submit: ', { data, event, props, state });
										if (data && state?.currentChatData?.info) {
											ChatsController.removeUsers(
												data as number[],
												state.currentChatData.info,
												this,
											);
										}
									},
								);
							},
						}),
					],
				}),
				[IDS.MAIN.HEADER_PROFILE_LINK]: new LinkBlock({
					id: IDS.MAIN.HEADER_PROFILE_LINK,
					class: props?.styles?.['user-name'] ?? '',
					href: '#',
					ariaLabel: 'profile link',
					tooltip: 'Информация о группе',
					target: '_self',
					text: props?.currentChatData?.owner.display_name ?? '',
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return {
							text: data?.currentChatData?.info.title ?? '',
						};
					},
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

					},
				}),
			},
		});

		Store.on(StoreEvents.Updated, () => {
			const newState = props?.mapStateToProps?.(Store.getState());

			if (props.mapStateToProps && state && newState) {
				const isEqualCheck = isEqual(state, newState);
				console.log('State MessagingHeaderBlock: ', { isEqualCheck, state, newState, t: this });

				if (!isEqualCheck) {
					this.setProps(newState);
				}
			}

			state = newState;
		});
	}

	override render(): string {
		console.log('Render MessagingHeaderBlock', this);
		return compile(template, this.props);
	}
}
