import type { Nullable } from '@/types/general';
import type { TPages } from '@/types/pages';
import type { IChildren } from '@/types/state';

export interface BlockProps<T = unknown> {
	children?: IChildren<T>;
	childrenList?: IChildren<T>;
	appElement?: Nullable<HTMLElement>;
	id?: string;
	page?: TPages,
	onClick?: (event: Event) => void;
	onSubmit?: (event?: Event) => void;
	changePage?: (page: TPages) => void;
	class?: string;
	styles?: { [key: string]: string };
	attr?: Record<string, string>;
	markup?: Record<string, string>;
	events?: Record<string, (e: Event) => void>;
}
