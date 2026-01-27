import { HTTPTransport } from '@/http/http';
import { handleRequestError } from '../utils/error';
import { responseHandler } from '../utils';

interface IXhr {
	responseText: string;
	response: string;
	timeout: number;
	responseType: string;
	statusText: string;
	status: number;
	readyState: number;
	onabort: (() => void) | null;
	ontimeout: (() => void) | null;
	onerror: (() => void) | null;
	onload: (() => void) | null;
	getAllResponseHeaders: jest.Mock;
	setRequestHeader: jest.Mock;
	send: jest.Mock;
	open: jest.Mock;
	getResponseHeader: jest.Mock;
}

const BASE_URL = 'https://test-api.ru';
const API_URL = '/users/1';
const PAYLOAD = { id: 1 };
const RESPONSE_DATA = { id: 1, name: 'John Doe' };
const HEADERS = { 'Content-type': 'application/json' };
const QUERY_PARAMS = { title: 'someTitle' };
const ERROR_TEXT = 'Server error';

describe('Jest HTTPTransport test', () => {
	let transport: HTTPTransport;
	let mockXHR: IXhr;
	let xhrInstances: IXhr[];

	beforeEach(() => {
		xhrInstances = [];

		// @ts-expect-error - XMLHttpRequest is not defined in test environment
		global.XMLHttpRequest = jest.fn().mockImplementation(() => {
			mockXHR = {
				open: jest.fn(),
				send: jest.fn(),
				setRequestHeader: jest.fn(),
				getAllResponseHeaders: jest.fn().mockReturnValue(''),
				getResponseHeader: jest.fn(),
				readyState: 4,
				status: 0,
				statusText: '',
				responseText: '',
				response: '',
				responseType: '',
				timeout: 0,
				onload: null,
				onerror: null,
				ontimeout: null,
				onabort: null,
			};

			xhrInstances.push(mockXHR);

			return mockXHR;
		});

		transport = new HTTPTransport(BASE_URL);
	});

	afterEach(() => {
		jest.clearAllMocks();

	});

	describe('Success request tests', () => {
		let timeout: NodeJS.Timeout | null;
		let promise: Promise<XMLHttpRequest> | null;

		beforeEach(() => {
			timeout = setTimeout(() => {
				const xhr = xhrInstances[0];
				xhr.status = 200;
				xhr.statusText = 'OK';
				xhr.responseText = JSON.stringify(RESPONSE_DATA);
				xhr.getResponseHeader = jest.fn().mockImplementation((header) => {
					if (header === 'Content-type') return 'application/json';
					return null;
				});
				xhr.getAllResponseHeaders = jest.fn().mockReturnValue(
					'Content-type: application/json',
				);
				if (xhr.onload) {
					xhr.onload();
				}
			}, 0);
		});

		afterEach(() => {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
		});

		describe('GET Request', () => {
			beforeEach(() => {
				promise = transport.get(
					API_URL,
					{
						headers: HEADERS,
						data: JSON.stringify(QUERY_PARAMS),
					},
				);
			});

			afterEach(() => {
				promise = null;
			});

			test('url and params request check', async () => {
				expect(mockXHR.open).toHaveBeenCalledWith('GET', `${ BASE_URL }/users/1?title=someTitle`);
			});

			test('headers request and mock call check', async () => {
				expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('Content-type', 'application/json');
				expect(mockXHR.send).toHaveBeenCalled();
			});

			test('success response check', async () => {
				if (promise) {
					const response = await promise;
					expect(response.status).toBe(200);
				}
			});

			test('response data check', async () => {
				if (promise) {
					const response = await promise;
					expect(JSON.parse(response.responseText)).toEqual(RESPONSE_DATA);
				}
			});
		});

		describe('POST Request', () => {
			beforeEach(() => {
				promise = transport.post(
					API_URL,
					{
						headers: HEADERS,
						data: JSON.stringify(PAYLOAD),
					},
				);
			});

			afterEach(() => {
				promise = null;
			});

			test('payload check', () => {
				expect(mockXHR.send).toHaveBeenCalledWith(JSON.stringify(PAYLOAD));
			})
		});
	});

	describe('Error request test', () => {
		let timeout: NodeJS.Timeout | null;
		let promise: Promise<XMLHttpRequest> | null;

		beforeEach(() => {
			promise = transport.get(
				API_URL,
				{
					headers: HEADERS,
					data: JSON.stringify(PAYLOAD),
				},
			);

			timeout = setTimeout(() => {
				const xhr = xhrInstances[0];
				xhr.status = 500;
				xhr.statusText = ERROR_TEXT;
				xhr.response = JSON.stringify({ reason: ERROR_TEXT });
				xhr.getResponseHeader = jest.fn().mockImplementation((header) => {
					if (header === 'Content-type') return 'application/json';
					return null;
				});
				xhr.getAllResponseHeaders = jest.fn().mockReturnValue(
					'Content-type: application/json',
				);
				if (xhr.onload) {
					xhr.onload();
				}
			}, 0);
		});

		afterEach(() => {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
		});

		test('error check', async () => {
			try {
				if (promise) {
					const response = await promise;
					responseHandler(response);
				}
			} catch (e: unknown) {
				const error = handleRequestError(e);
				expect(error.text).toContain(ERROR_TEXT);
			}
		})
	});
});
