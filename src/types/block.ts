import { IChildren } from '@/types/state';
import { EventBus } from '@/event-bus';
import { Block } from '@/block';

export interface IBaseBlockProps {
	markup?: Record<string, string>;
	events?: Record<string, (e: Event) => void>;
	styles?: { [key: string]: string };
	eventBus?: () => EventBus;
}

export interface IBlocksInstancesProps<I> {
	children?: IChildren<I>;
	childrenList?: IChildren<I>;
	allInstances?: IChildren<I>;
}

export interface BlockProps<I = unknown, P = {}, F = {}> extends IBaseBlockProps, IBlocksInstancesProps<I> {
	data: P;
	callbacks: F;
}
