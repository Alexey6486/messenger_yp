import type { TPages } from '@/types/pages';
import type { IErrorPageState } from '@/types/state';

export interface BlockProps {
	markup?: Record<string, string>;
	events?: Record<string, (e: Event) => void>;

	// styles?: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

export interface IErrorBlock extends IErrorPageState, BlockProps {
	changePage: (page: TPages) => void,
}
