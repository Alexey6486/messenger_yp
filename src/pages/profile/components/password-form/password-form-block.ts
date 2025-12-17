import { Block } from '@/block';
import {
	compile,
	fieldsValidator,
} from '@/utils';
import type {
	BlockProps,
	IInputChangeParams,
} from '@/types';
import { IDS } from '@/constants';
import { InputBlock } from '@/components/input/input-block';
import {
	E_FORM_FIELDS_NAME,
} from '@/types';
import { ProfileFieldBlock } from '@/pages/profile/components/field/profile-field-block';
import template from './password-form-template';
import styles from '@/pages/profile/styles.module.pcss';

export class PasswordFormBlock extends Block {
	constructor(props: BlockProps) {
		super({
			...props,
			markup: {
				[IDS.PROFILE.O_PSW_FIELD]: `<div id="${ IDS.PROFILE.O_PSW_FIELD }"></div>`,
				[IDS.PROFILE.N_PSW_FIELD]: `<div id="${ IDS.PROFILE.N_PSW_FIELD }"></div>`,
				[IDS.PROFILE.C_PSW_FIELD]: `<div id="${ IDS.PROFILE.C_PSW_FIELD }"></div>`,
			},
			children: {
				[IDS.PROFILE.O_PSW_FIELD]: new ProfileFieldBlock({
					styles,
					id: IDS.PROFILE.O_PSW_FIELD,
					fieldName: 'Старый пароль',
					input_data: {
						value: props.passwordForm?.fields?.oldPassword ?? '',
						error: props.passwordForm?.errors?.oldPassword ?? '',
						currentFocus: props.currentFocus,
					},
					parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
					children: {
						[IDS.PROFILE.O_PSW_INPUT]: new InputBlock({
							id: IDS.PROFILE.O_PSW_INPUT,
							input_data: {
								value: props.passwordForm?.fields?.oldPassword ?? '',
								error: props.passwordForm?.errors?.oldPassword ?? '',
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.oldPassword,
							name: E_FORM_FIELDS_NAME.oldPassword,
							placeholder: '',
							type: 'password',
							parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
							onInputChange: (params: IInputChangeParams) => {
								this.onFormInputChange(
									{
										...params,
										...(params.info.event === 'blur' && {
											data: {
												...params.data,
												error: fieldsValidator({
													valueToValidate: params.data.value,
													fieldName: E_FORM_FIELDS_NAME.oldPassword,
													requiredOnly: true,
												}),
											},
										}),
									},
									[IDS.PROFILE.O_PSW_INPUT, IDS.PROFILE.O_PSW_FIELD],
									E_FORM_FIELDS_NAME.oldPassword,
									IDS.FORMS.PROFILE_USER_PSW_FORM,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.PROFILE.O_PSW_INPUT }"></div>`,
					},
				}),
				[IDS.PROFILE.N_PSW_FIELD]: new ProfileFieldBlock({
					styles,
					id: IDS.PROFILE.N_PSW_FIELD,
					fieldName: 'Новый пароль',
					input_data: {
						value: props.passwordForm?.fields?.newPassword ?? '',
						error: props.passwordForm?.errors?.newPassword ?? '',
						currentFocus: props.currentFocus,
					},
					parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
					children: {
						[IDS.PROFILE.N_PSW_INPUT]: new InputBlock({
							id: IDS.PROFILE.N_PSW_INPUT,
							input_data: {
								value: props.passwordForm?.fields?.newPassword ?? '',
								error: props.passwordForm?.errors?.newPassword ?? '',
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.newPassword,
							name: E_FORM_FIELDS_NAME.newPassword,
							placeholder: '',
							type: 'password',
							parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
							onInputChange: (params: IInputChangeParams) => {
								this.onFormInputChange(
									{
										...params,
										...(params.info.event === 'blur' && {
											data: {
												...params.data,
												error: fieldsValidator({
													valueToValidate: params.data.value,
													fieldName: E_FORM_FIELDS_NAME.newPassword,
												}),
											},
										}),
									},
									[IDS.PROFILE.N_PSW_INPUT, IDS.PROFILE.N_PSW_FIELD],
									E_FORM_FIELDS_NAME.newPassword,
									IDS.FORMS.PROFILE_USER_PSW_FORM,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.PROFILE.N_PSW_INPUT }"></div>`,
					},
				}),
				[IDS.PROFILE.C_PSW_FIELD]: new ProfileFieldBlock({
					styles,
					id: IDS.PROFILE.C_PSW_FIELD,
					fieldName: 'Повторите новый пароль',
					input_data: {
						value: props.passwordForm?.fields?.confirmPassword ?? '',
						error: props.passwordForm?.errors?.confirmPassword ?? '',
						currentFocus: props.currentFocus,
					},
					parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
					children: {
						[IDS.PROFILE.C_PSW_INPUT]: new InputBlock({
							id: IDS.PROFILE.C_PSW_INPUT,
							input_data: {
								value: props.passwordForm?.fields?.confirmPassword ?? '',
								error: props.passwordForm?.errors?.confirmPassword ?? '',
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.confirmPassword,
							name: E_FORM_FIELDS_NAME.confirmPassword,
							placeholder: '',
							type: 'password',
							parentFormId: IDS.FORMS.PROFILE_USER_PSW_FORM,
							onInputChange: (params: IInputChangeParams) => {
								this.onFormInputChange(
									{
										...params,
										...(params.info.event === 'blur' && {
											data: {
												...params.data,
												error: fieldsValidator({
													valueToValidate: params.data.value,
													fieldName: E_FORM_FIELDS_NAME.confirmPassword,
													valueToCompare: this.props?.passwordForm?.fields?.newPassword ?? '',
												}),
											},
										}),
									},
									[IDS.PROFILE.C_PSW_INPUT, IDS.PROFILE.C_PSW_FIELD],
									E_FORM_FIELDS_NAME.confirmPassword,
									IDS.FORMS.PROFILE_USER_PSW_FORM,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${ IDS.PROFILE.C_PSW_INPUT }"></div>`,
					},
				}),
			}
		});
	}

	override render(): string {
		console.log('Render PasswordFormBlock', this);
		return compile(template, this.props);
	}
}
