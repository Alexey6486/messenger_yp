import type {
	BlockProps,
	IFormState,
	IInputState,
	TNullable
} from '@/types';

export function getInputStateSlice<T>(
	form: TNullable<IFormState<T>> | undefined,
	fieldName: string,
): Partial<BlockProps> {
	const result: { input_data: IInputState } = {
		input_data: {
			value: '',
			error: '',
		},
	};

	if (form) {
		const field: string = form.fields[fieldName as keyof T] as string;
		const error: string = form.errors[fieldName as keyof T] as string;

		result.input_data.value = field ?? '';
		result.input_data.error = error ?? '';

		return result;
	}

	return result;
}
