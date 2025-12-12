import { Block } from '@/block';
import { IDS } from '@/constants';
import {
	compile,
	fieldsValidator,
} from '@/utils';
import type {
	BlockProps,
	IInputChangeParams,
	IAddUserModalForm,
	IFormState,
} from '@/types';
import {
	E_FORM_FIELDS_NAME,
} from '@/types';
import { FieldBlock } from '@/components/form-fields/field-block';
import { InputBlock } from '@/components/input/input-block';
import template from './add-user-template';

export interface IAddUserBlock extends BlockProps {
	id: string;
	children: Record<string, FieldBlock>;
	forms: Record<string, IFormState<IAddUserModalForm>>;
}

export class AddUserBlock extends Block {
	constructor(props: IAddUserBlock) {
		super({
			...props,
			id: IDS.MODAL.CONTENT,
			markup: {
				[IDS.MODAL.ADD_USER_FIELD]: `<div id="${IDS.MODAL.ADD_USER_FIELD}"></div>`,
			},
			children: {
				[IDS.MODAL.ADD_USER_FIELD]: new FieldBlock({
					id: IDS.MODAL.ADD_USER_FIELD,
					id_label: IDS.MODAL.ADD_USER_INPUT,
					input_data: {
						value: props.forms[IDS.FORMS.MODAL_ADD_USER_FORM].fields.login,
						error: props.forms[IDS.FORMS.MODAL_ADD_USER_FORM].errors.login,
						currentFocus: props.currentFocus,
					},
					label: 'Логин',
					isRequired: true,
					children: {
						[IDS.MODAL.ADD_USER_INPUT]: new InputBlock({
							id: IDS.MODAL.ADD_USER_INPUT,
							input_data: {
								value: props.forms[IDS.FORMS.MODAL_ADD_USER_FORM].fields.login,
								error: props.forms[IDS.FORMS.MODAL_ADD_USER_FORM].errors.login,
								currentFocus: props.currentFocus,
							},
							dataset: E_FORM_FIELDS_NAME.login,
							name: E_FORM_FIELDS_NAME.login,
							placeholder: '',
							type: 'login',
							onChange: (params: IInputChangeParams<Block>) => {
								this.onFormInputChange(
									{
										...params,
										...(params.info.event === 'blur' && {
											data: {
												...params.data,
												error: fieldsValidator({
													valueToValidate: params.data.value,
													fieldName: E_FORM_FIELDS_NAME.login,
													requiredOnly: true,
												}),
											},
										}),
									},
									[IDS.MODAL.ADD_USER_INPUT, IDS.MODAL.ADD_USER_FIELD],
									E_FORM_FIELDS_NAME.login,
									IDS.FORMS.MODAL_ADD_USER_FORM,
								);
							},
						}),
					},
					markup: {
						[IDS.COMMON.INPUT]: `<div id="${IDS.MODAL.ADD_USER_INPUT}"></div>`,
					},
				}),
			},
		});
	}

	override render(): string {
		return compile(template, this.props);
	}
}
