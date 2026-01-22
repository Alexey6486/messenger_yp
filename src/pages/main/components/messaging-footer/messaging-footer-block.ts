import { Block } from '../../../../block';
import {
	Store,
	StoreEvents,
} from '../../../../store';
import {
	FocusManager,
	getFocusData,
} from '../../../../focus-manager';
import {
	IDS,
} from '../../../../constants';
import {
	compile,
	escapeHTML,
	fieldsValidator,
	getInputStateSlice,
	isArray,
	isEqual,
} from '../../../../utils';
import type {
	BlockProps,
	IInputChangeParams,
} from '../../../../types';
import { E_FORM_FIELDS_NAME } from '../../../../types';
import { ButtonRoundBlock } from '../../../../components/button-round/button-round-block';
import { InputBlock } from '../../../../components/input/input-block';
import {
	SvgArrowRight,
} from '../../../../components/icons';
import template from './messaging-footer-template';

export class MessagingFooterBlock extends Block {
	constructor(props: BlockProps) {
		let state = props?.mapStateToProps?.(Store.getState());

		super({
			...props,
			...(props?.mapStateToProps && props.mapStateToProps(Store.getState())),
			markup: {
				[IDS.MAIN.SEND_MESSAGE_BTN]: `<div id="${ IDS.MAIN.SEND_MESSAGE_BTN }"></div>`,
				[IDS.MAIN.NEW_MESSAGE_INPUT]: `<div id="${ IDS.MAIN.NEW_MESSAGE_INPUT }"></div>`,
			},
			children: {
				[IDS.MAIN.SEND_MESSAGE_BTN]: new ButtonRoundBlock({
					id: IDS.MAIN.SEND_MESSAGE_BTN,
					type: 'submit',
					icon: SvgArrowRight,
					onClick: (event: Event) => {
						event.preventDefault();
						event.stopPropagation();

						if (
							typeof this.props?.newMessageForm?.fields?.message === 'string'
							&& this.props?.newMessageForm?.fields?.message.trim().length
						) {
							const socket = this.props?.chatsSockets?.get?.(this.props?.currentChatData?.info?.id ?? '');
							if (socket) {
								socket.sendMessage(escapeHTML(this.props?.newMessageForm?.fields.message));
								FocusManager.set(getFocusData());
								Store.set(
									'newMessageForm',
									{
										fields: {
											...props?.newMessageForm?.fields,
											message: '',
										},
										errors: {
											...props?.newMessageForm?.errors,
											message: '',
										},
									},
									'newMessageForm' as BlockProps,
								);
							}
						}
					},
				}),
				[IDS.MAIN.NEW_MESSAGE_INPUT]: new InputBlock({
					id: IDS.MAIN.NEW_MESSAGE_INPUT,
					input_data: {
						value: props?.newMessageForm?.fields?.message ?? '',
						error: props?.newMessageForm?.errors?.message ?? '',
					},
					mapStateToProps: (data: Partial<BlockProps>): Partial<BlockProps> => {
						return getInputStateSlice(data?.newMessageForm, 'message');
					},
					dataset: E_FORM_FIELDS_NAME.message,
					name: E_FORM_FIELDS_NAME.message,
					placeholder: 'Сообщение',
					type: 'text',
					class: props?.styles?.['message-input'] ?? '',
					onInputChange: (params: IInputChangeParams) => {
						const data = {
							...params,
							...(params.info.event === 'blur' && {
								data: {
									...params.data,
									error: fieldsValidator({
										valueToValidate: params.data.value,
										fieldName: E_FORM_FIELDS_NAME.message,
									}),
								},
							}),
						};
						FocusManager.set(getFocusData(params.info));
						Store.set(
							'newMessageForm',
							{
								fields: {
									...props?.newMessageForm?.fields,
									message: data?.data?.value ?? '',
								},
								errors: {
									...props?.newMessageForm?.errors,
									message: data?.data?.error ?? '',
								},
							},
							'newMessageForm' as BlockProps,
						);
					},
				}),
			},
		});

		Store.on(StoreEvents.Updated, (...args) => {
			const newState = props?.mapStateToProps?.(Store.getState());
			if (props.mapStateToProps && state && newState) {
				const isEqualCheck = isEqual(state, newState);
				if (!isEqualCheck) {
					if (isArray(args, true)) {
						const stateKey: keyof BlockProps = (args as BlockProps[])[0] as unknown as keyof BlockProps;
						if (stateKey && stateKey in newState) {
							const targetField = newState[stateKey];
							this.setProps({ [stateKey]: targetField });
						} else {
							this.setProps({ ...newState });
						}
					} else {
						this.setProps({ ...newState });
					}
				}
			}
			state = newState;
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
