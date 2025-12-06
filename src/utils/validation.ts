interface IValidation {
	isRequired?: boolean;
	message?: string;
	regex?: RegExp;
}

export const validate = (
	value: string,
	validation?: IValidation,
): { isValid: boolean, message: string } => {
	if (!validation) return { isValid: true, message: '' };

	const { isRequired, message, regex } = validation;

	if (isRequired && !value.trim()) {
		return { isValid: false, message: message || 'Обязательное поле' };
	}

	if (regex && !regex.test(value)) {
		return { isValid: false, message: message || 'Неверный формат' };
	}

	return { isValid: true, message: '' };
};
