import type { Block } from '@/block';
import type { IInputState } from '@/types/state';

export type EventHandlers = Record<string, (event: Event) => void>;
export type Attributes = Record<string, string | number | boolean>;
export type BlockListItem = Block | string | number | boolean;
export type BlockList = BlockListItem[];
// export type BlockLists = Record<string, BlockList>;
export type BlockLists = Record<string, BlockListItem>;
export type TBlock = Record<string, Block>;
export type TObjectUnknown = Record<string, unknown>;

export interface BlockPropsBase {
	attr?: Attributes;
	markup?: Record<string, string>;
	events?: EventHandlers;
	input_data?: IInputState;
	isDisabled?: boolean;
}

export type BlockProps<TData = TObjectUnknown> = BlockPropsBase & TData;
