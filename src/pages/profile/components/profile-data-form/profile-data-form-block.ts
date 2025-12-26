import { Block } from '@/block';
import {
	compile,
	fieldsValidator,
} from '@/utils';
import type {
	BlockProps,
	IFormState,
	IInputChangeParams,
	IUserDataForm,
} from '@/types';
import { E_FORM_FIELDS_NAME } from '@/types';
import { IDS } from '@/constants';
import { InputBlock } from '@/components/input/input-block';
import { ProfileFieldBlock } from '@/pages/profile/components/field/profile-field-block';
import template from './profile-data-form-template';
import styles from '@/pages/profile/styles.module.pcss';

interface IProfileDataFormBlock {
	userForm: IFormState<IUserDataForm>;

	[key: string]: unknown;

	children?: Record<string, ProfileFieldBlock>;
}

type TProps = BlockProps<IProfileDataFormBlock>;

export class ProfileDataFormBlock extends Block {
	constructor(props: TProps) {
		super({
			...props,
			markup: {
				[IDS.PROFILE.EMAIL_FIELD]: `<div id="${ IDS.PROFILE.EMAIL_FIELD }"></div>`,
				[IDS.PROFILE.LOGIN_FIELD]: `<div id="${ IDS.PROFILE.LOGIN_FIELD }"></div>`,
				[IDS.PROFILE.F_NAME_FIELD]: `<div id="${ IDS.PROFILE.F_NAME_FIELD }"></div>`,
				[IDS.PROFILE.S_NAME_FIELD]: `<div id="${ IDS.PROFILE.S_NAME_FIELD }"></div>`,
				[IDS.PROFILE.D_NAME_FIELD]: `<div id="${ IDS.PROFILE.D_NAME_FIELD }"></div>`,
				[IDS.PROFILE.PHONE_FIELD]: `<div id="${ IDS.PROFILE.PHONE_FIELD }"></div>`,
			},
			children: {
				[IDS.PROFILE.EMAIL_FIELD]: new ProfileFieldBlock({
					styles,
					id: IDS.PROFILE.EMAIL_FIELD,
					fieldName: 'Почта',
					input_data: {
						value: props?.userForm?.fields?.email ?? '',
						error: props?.userForm?.errors?.email ?? '',
						// currentFocus: props.currentFocus,
					},
					parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
					children: {
						[IDS.PROFILE.EMAIL_INPUT]: new InputBlock({
							id: IDS.PROFILE.EMAIL_INPUT,
							input_data: {
								value: props?.userForm?.fields?.email ?? '',
								error: props?.userForm?.errors?.email ?? '',
								// currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.email,
							name: E_FORM_FIELDS_NAME.email,
							placeholder: '',
							type: 'text',
							isDisabled: !props.isDataEdit,
							parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
							onInputChange: (params: IInputChangeParams) => {
								this.onFormInputChange(
									{
										...params,
										...(params.info.event === 'blur' && {
											data: {
												...params.data,
												error: fieldsValidator({
													valueToValidate: params.data.value,
													fieldName: E_FORM_FIELDS_NAME.email,
												}),
											},
										}),
									},
									[IDS.PROFILE.EMAIL_INPUT, IDS.PROFILE.EMAIL_FIELD],
									E_FORM_FIELDS_NAME.email,
									IDS.FORMS.PROFILE_USER_DATA_FORM,
								);

							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.PROFILE.EMAIL_INPUT }"></div>`,
					},
				}),
				// [IDS.PROFILE.LOGIN_FIELD]: new ProfileFieldBlock({
				// 	styles,
				// 	id: IDS.PROFILE.LOGIN_FIELD,
				// 	fieldName: 'Логин',
				// 	input_data: {
				// 		value: props?.userForm?.fields?.login ?? '',
				// 		error: props?.userForm?.errors?.login ?? '',
				// 		currentFocus: props.currentFocus,
				// 	},
				// 	parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
				// 	children: {
				// 		[IDS.PROFILE.LOGIN_INPUT]: new InputBlock({
				// 			id: IDS.PROFILE.LOGIN_INPUT,
				// 			input_data: {
				// 				value: props?.userForm?.fields?.login ?? '',
				// 				error: props?.userForm?.errors?.login ?? '',
				// 				currentFocus: props.currentFocus,
				// 			},
				// 			dataset: E_FORM_FIELDS_NAME.login,
				// 			name: E_FORM_FIELDS_NAME.login,
				// 			placeholder: '',
				// 			type: 'text',
				// 			isDisabled: !props.isDataEdit,
				// 			parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
				// 			onInputChange: (params: IInputChangeParams) => {
				// 				this.onFormInputChange(
				// 					{
				// 						...params,
				// 						...(params.info.event === 'blur' && {
				// 							data: {
				// 								...params.data,
				// 								error: fieldsValidator({
				// 									valueToValidate: params.data.value,
				// 									fieldName: E_FORM_FIELDS_NAME.login,
				// 								}),
				// 							},
				// 						}),
				// 					},
				// 					[IDS.PROFILE.LOGIN_INPUT, IDS.PROFILE.LOGIN_FIELD],
				// 					E_FORM_FIELDS_NAME.login,
				// 					IDS.FORMS.PROFILE_USER_DATA_FORM,
				// 				);
				//
				// 			},
				// 		}),
				// 	},
				// 	markup: {
				// 		[IDS.COMMON.INPUT]: `<div id="${ IDS.PROFILE.LOGIN_INPUT }"></div>`,
				// 	},
				// }),
				// [IDS.PROFILE.F_NAME_FIELD]: new ProfileFieldBlock({
				// 	styles,
				// 	id: IDS.PROFILE.F_NAME_FIELD,
				// 	fieldName: 'Имя',
				// 	input_data: {
				// 		value: props?.userForm?.fields?.first_name ?? '',
				// 		error: props?.userForm?.errors?.first_name ?? '',
				// 		currentFocus: props.currentFocus,
				// 	},
				// 	parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
				// 	children: {
				// 		[IDS.PROFILE.F_NAME_INPUT]: new InputBlock({
				// 			id: IDS.PROFILE.F_NAME_INPUT,
				// 			input_data: {
				// 				value: props?.userForm?.fields?.first_name ?? '',
				// 				error: props?.userForm?.errors?.first_name ?? '',
				// 				currentFocus: props.currentFocus,
				// 			},
				// 			dataset: E_FORM_FIELDS_NAME.first_name,
				// 			name: E_FORM_FIELDS_NAME.first_name,
				// 			placeholder: '',
				// 			type: 'text',
				// 			isDisabled: !props.isDataEdit,
				// 			parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
				// 			onInputChange: (params: IInputChangeParams) => {
				// 				this.onFormInputChange(
				// 					{
				// 						...params,
				// 						...(params.info.event === 'blur' && {
				// 							data: {
				// 								...params.data,
				// 								error: fieldsValidator({
				// 									valueToValidate: params.data.value,
				// 									fieldName: E_FORM_FIELDS_NAME.first_name,
				// 								}),
				// 							},
				// 						}),
				// 					},
				// 					[IDS.PROFILE.F_NAME_INPUT, IDS.PROFILE.F_NAME_FIELD],
				// 					E_FORM_FIELDS_NAME.first_name,
				// 					IDS.FORMS.PROFILE_USER_DATA_FORM,
				// 				);
				//
				// 			},
				// 		}),
				// 	},
				// 	markup: {
				// 		[IDS.COMMON.INPUT]: `<div id="${ IDS.PROFILE.F_NAME_INPUT }"></div>`,
				// 	},
				// }),
				// [IDS.PROFILE.S_NAME_FIELD]: new ProfileFieldBlock({
				// 	styles,
				// 	id: IDS.PROFILE.S_NAME_FIELD,
				// 	fieldName: 'Фамилия',
				// 	input_data: {
				// 		value: props?.userForm?.fields?.second_name ?? '',
				// 		error: props?.userForm?.errors?.second_name ?? '',
				// 		currentFocus: props.currentFocus,
				// 	},
				// 	parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
				// 	children: {
				// 		[IDS.PROFILE.S_NAME_INPUT]: new InputBlock({
				// 			id: IDS.PROFILE.S_NAME_INPUT,
				// 			input_data: {
				// 				value: props?.userForm?.fields?.second_name ?? '',
				// 				error: props?.userForm?.errors?.second_name ?? '',
				// 				currentFocus: props.currentFocus,
				// 			},
				// 			dataset: E_FORM_FIELDS_NAME.second_name,
				// 			name: E_FORM_FIELDS_NAME.second_name,
				// 			placeholder: '',
				// 			type: 'text',
				// 			isDisabled: !props.isDataEdit,
				// 			parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
				// 			onInputChange: (params: IInputChangeParams) => {
				// 				this.onFormInputChange(
				// 					{
				// 						...params,
				// 						...(params.info.event === 'blur' && {
				// 							data: {
				// 								...params.data,
				// 								error: fieldsValidator({
				// 									valueToValidate: params.data.value,
				// 									fieldName: E_FORM_FIELDS_NAME.second_name,
				// 								}),
				// 							},
				// 						}),
				// 					},
				// 					[IDS.PROFILE.S_NAME_INPUT, IDS.PROFILE.S_NAME_FIELD],
				// 					E_FORM_FIELDS_NAME.second_name,
				// 					IDS.FORMS.PROFILE_USER_DATA_FORM,
				// 				);
				//
				// 			},
				// 		}),
				// 	},
				// 	markup: {
				// 		[IDS.COMMON.INPUT]: `<div id="${ IDS.PROFILE.S_NAME_INPUT }"></div>`,
				// 	},
				// }),
				// [IDS.PROFILE.D_NAME_FIELD]: new ProfileFieldBlock({
				// 	styles,
				// 	id: IDS.PROFILE.D_NAME_FIELD,
				// 	fieldName: 'Имя в чате',
				// 	input_data: {
				// 		value: props?.userForm?.fields?.display_name ?? '',
				// 		error: props?.userForm?.errors?.display_name ?? '',
				// 		currentFocus: props.currentFocus,
				// 	},
				// 	parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
				// 	children: {
				// 		[IDS.PROFILE.D_NAME_INPUT]: new InputBlock({
				// 			id: IDS.PROFILE.D_NAME_INPUT,
				// 			input_data: {
				// 				value: props?.userForm?.fields?.display_name ?? '',
				// 				error: props?.userForm?.errors?.display_name ?? '',
				// 				currentFocus: props.currentFocus,
				// 			},
				// 			dataset: E_FORM_FIELDS_NAME.display_name,
				// 			name: E_FORM_FIELDS_NAME.display_name,
				// 			placeholder: '',
				// 			type: 'text',
				// 			isDisabled: !props.isDataEdit,
				// 			parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
				// 			onInputChange: (params: IInputChangeParams) => {
				// 				this.onFormInputChange(
				// 					{
				// 						...params,
				// 						...(params.info.event === 'blur' && {
				// 							data: {
				// 								...params.data,
				// 								error: fieldsValidator({
				// 									valueToValidate: params.data.value,
				// 									fieldName: E_FORM_FIELDS_NAME.display_name,
				// 								}),
				// 							},
				// 						}),
				// 					},
				// 					[IDS.PROFILE.D_NAME_INPUT, IDS.PROFILE.D_NAME_FIELD],
				// 					E_FORM_FIELDS_NAME.display_name,
				// 					IDS.FORMS.PROFILE_USER_DATA_FORM,
				// 				);
				//
				// 			},
				// 		}),
				// 	},
				// 	markup: {
				// 		[IDS.COMMON.INPUT]: `<div id="${ IDS.PROFILE.D_NAME_INPUT }"></div>`,
				// 	},
				// }),
				// [IDS.PROFILE.PHONE_FIELD]: new ProfileFieldBlock({
				// 	styles,
				// 	id: IDS.PROFILE.PHONE_FIELD,
				// 	fieldName: 'Телефон',
				// 	input_data: {
				// 		value: props?.userForm?.fields?.phone ?? '',
				// 		error: props?.userForm?.errors?.phone ?? '',
				// 		currentFocus: props.currentFocus,
				// 	},
				// 	parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
				// 	children: {
				// 		[IDS.PROFILE.PHONE_INPUT]: new InputBlock({
				// 			id: IDS.PROFILE.PHONE_INPUT,
				// 			input_data: {
				// 				value: props?.userForm?.fields?.phone ?? '',
				// 				error: props?.userForm?.errors?.phone ?? '',
				// 				currentFocus: props.currentFocus,
				// 			},
				// 			dataset: E_FORM_FIELDS_NAME.phone,
				// 			name: E_FORM_FIELDS_NAME.phone,
				// 			placeholder: '',
				// 			type: 'text',
				// 			isDisabled: !props.isDataEdit,
				// 			parentFormId: IDS.FORMS.PROFILE_USER_DATA_FORM,
				// 			onInputChange: (params: IInputChangeParams) => {
				// 				this.onFormInputChange(
				// 					{
				// 						...params,
				// 						...(params.info.event === 'blur' && {
				// 							data: {
				// 								...params.data,
				// 								error: fieldsValidator({
				// 									valueToValidate: params.data.value,
				// 									fieldName: E_FORM_FIELDS_NAME.phone,
				// 								}),
				// 							},
				// 						}),
				// 					},
				// 					[IDS.PROFILE.PHONE_INPUT, IDS.PROFILE.PHONE_FIELD],
				// 					E_FORM_FIELDS_NAME.phone,
				// 					IDS.FORMS.PROFILE_USER_DATA_FORM,
				// 				);
				//
				// 			},
				// 		}),
				// 	},
				// 	markup: {
				// 		[IDS.COMMON.INPUT]: `<div id="${ IDS.PROFILE.PHONE_INPUT }"></div>`,
				// 	},
				// }),
			},
		});
	}

	override render(): string {
		console.log('Render ProfileDataFormBlock', this);
		return compile(template, this.props);
	}
}
