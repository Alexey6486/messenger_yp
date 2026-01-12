import type { TNullable } from '@/types';
import { E_FORM_FIELDS_NAME } from '@/types';
import {
	REGEX,
	VALIDATION_MSG,
} from '@/constants';

export class Validator {
	private value: string | undefined;
	private message: string;
	private isValid: boolean;

	constructor(value: string | undefined) {
		this.value = value;
		this.isValid = true;
		this.message = '';
	}

	isRequired(errorMessage?: string) {
		const isValid = typeof this.value === 'string' && this.value.trim() !== '';
		if (!isValid) {
			this.message = errorMessage || 'Обязательное поле';
			this.isValid = false;
		}
		return this;
	}

	regexTest(regex: RegExp, errorMessage?: string) {
		if (this.isValid && typeof this.value === 'string') {
			const isValid = regex.test(this.value);
			if (!isValid) {
				this.message = errorMessage || 'Неверный формат';
				this.isValid = false;
			}
		}
		return this;
	}

	isValueEqualTo(valueToCompare: string | undefined, errorMessage?: string) {
		if (this.isValid && this.value !== valueToCompare) {
			this.message = errorMessage || 'Значения не совпадают';
			this.isValid = false;
		}
		return this;
	}

	maxLength(value: number, errorMessage?: string) {
		if (typeof this.value === 'string' && this.value.length > value) {
			this.message = errorMessage || `Максимум ${ value } символов`;
			this.isValid = false;
		}
		return this;
	}

	get result() {
		return this.message;
	}
}

export const fieldsValidator = ({ valueToValidate, fieldName, requiredOnly, valueToCompare }: {
	valueToValidate: string | undefined,
	fieldName: string,
	requiredOnly?: boolean,
	valueToCompare?: string,
}): string => {
	let validator: TNullable<Validator> = new Validator(valueToValidate);
	let validationResult: string;

	if (requiredOnly) {
		validationResult = validator.isRequired().result;
	} else {
		switch (fieldName) {
			case E_FORM_FIELDS_NAME.email: {
				validationResult = validator.isRequired().regexTest(REGEX.email, VALIDATION_MSG.email).result;
				break;
			}
			case E_FORM_FIELDS_NAME.login: {
				validationResult = validator.isRequired().regexTest(REGEX.login, VALIDATION_MSG.login).result;
				break;
			}
			case E_FORM_FIELDS_NAME.first_name:
			case E_FORM_FIELDS_NAME.display_name:
			case E_FORM_FIELDS_NAME.second_name: {
				validationResult = validator.isRequired().regexTest(REGEX.name, VALIDATION_MSG.name).result;
				break;
			}
			case E_FORM_FIELDS_NAME.phone: {
				validationResult = validator.isRequired().regexTest(REGEX.phone, VALIDATION_MSG.phone).result;
				break;
			}
			case E_FORM_FIELDS_NAME.newPassword:
			case E_FORM_FIELDS_NAME.password: {
				validationResult = validator.isRequired().regexTest(REGEX.psw, VALIDATION_MSG.psw).result;
				break;
			}
			case E_FORM_FIELDS_NAME.oldPassword: {
				validationResult = validator.isRequired().result;
				break;
			}
			case E_FORM_FIELDS_NAME.confirmPassword: {
				validationResult = validator.isRequired().isValueEqualTo(valueToCompare, VALIDATION_MSG.c_psw).result;
				break;
			}
			case E_FORM_FIELDS_NAME.search: {
				validationResult = validator.maxLength(10).result;
				break;
			}
			default: {
				validationResult = '';
				break;
			}
		}
	}

	validator = null;
	return validationResult;
};
