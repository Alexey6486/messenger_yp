export interface BlockProps {
	markup?: Record<string, string>;
	events?: Record<string, (e: Event) => void>;

	styles?: { [key: string]: string };

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: unknown;
}

export interface IComponent {
	_id: string;

	render(): string;
}

export type TComponentProps = Record<string, unknown>;
