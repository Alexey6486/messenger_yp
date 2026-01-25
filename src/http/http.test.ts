import { HTTPTransport } from '@/http/http';

interface IXhr {
	responseText: string;
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

const BASE_URL = 'https://api.example.com';

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

	describe('GET Requests', () => {
		test('should make successful GET request', async () => {
			const mockResponseData = { id: 1, name: 'John Doe' };
			const promise = transport.get(
				'/users/1',
				{
					headers: {
						'Content-type': 'application/json',
					},
				},
			);

			// Simulate successful response
			setTimeout(() => {
				const xhr = xhrInstances[0];
				xhr.status = 200;
				xhr.statusText = 'OK';
				xhr.responseText = JSON.stringify(mockResponseData);
				xhr.getResponseHeader = jest.fn().mockImplementation((header) => {
					if (header === 'Content-type') return 'application/json';
					return null;
				});
				xhr.getAllResponseHeaders = jest.fn().mockReturnValue(
					'Content-type: application/json\r\nx-custom: value',
				);
				if (xhr.onload) {
					xhr.onload();
				}
			}, 0);

			const response = await promise;

			expect(mockXHR.open).toHaveBeenCalledWith('GET', `${ BASE_URL }/users/1`);
			expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('Content-type', 'application/json');
			expect(mockXHR.send).toHaveBeenCalled();
			expect(response.status).toBe(200);
		});
	});
});

// describe('HttpTransport', () => {
// 	let transport;
// 	let mockXHR;
// 	let xhrInstances;
// 	const baseURL = 'https://api.example.com';
//
// 	beforeEach(() => {
// 		xhrInstances = [];
//
// 		// Mock XMLHttpRequest
// 		global.XMLHttpRequest = jest.fn().mockImplementation(() => {
// 			mockXHR = {
// 				open: jest.fn(),
// 				send: jest.fn(),
// 				setRequestHeader: jest.fn(),
// 				getAllResponseHeaders: jest.fn().mockReturnValue(''),
// 				getResponseHeader: jest.fn(),
// 				readyState: 4,
// 				status: 0,
// 				statusText: '',
// 				responseText: '',
// 				responseType: '',
// 				timeout: 0,
// 				onload: null,
// 				onerror: null,
// 				ontimeout: null,
// 				onabort: null,
// 			};
//
// 			xhrInstances.push(mockXHR);
// 			return mockXHR;
// 		});
//
// 		transport = new HttpTransport(baseURL);
// 	});
//
// 	afterEach(() => {
// 		jest.clearAllMocks();
// 	});
//
// 	describe('Constructor and Configuration', () => {
// 		test('should create instance with default headers', () => {
// 			expect(transport.defaultHeaders['Content-Type']).toBe('application/json');
// 			expect(transport.timeout).toBe(10000);
// 		});
//
// 		test('should create instance with custom options', () => {
// 			const customTransport = new HttpTransport(baseURL, {
// 				headers: { 'X-API-Key': 'secret' },
// 				timeout: 5000,
// 			});
//
// 			expect(customTransport.defaultHeaders['Content-Type']).toBe('application/json');
// 			expect(customTransport.defaultHeaders['X-API-Key']).toBe('secret');
// 			expect(customTransport.timeout).toBe(5000);
// 		});
//
// 		test('should set and remove headers', () => {
// 			transport.setHeader('Authorization', 'Bearer token');
// 			expect(transport.defaultHeaders.Authorization).toBe('Bearer token');
//
// 			transport.removeHeader('Authorization');
// 			expect(transport.defaultHeaders.Authorization).toBeUndefined();
// 		});
// 	});
//
// 	describe('GET Requests', () => {
// 		test('should make successful GET request', async () => {
// 			const mockResponseData = { id: 1, name: 'John Doe' };
// 			const promise = transport.get('/users/1');
//
// 			// Simulate successful response
// 			setTimeout(() => {
// 				const xhr = xhrInstances[0];
// 				xhr.status = 200;
// 				xhr.statusText = 'OK';
// 				xhr.responseText = JSON.stringify(mockResponseData);
// 				xhr.getResponseHeader = jest.fn().mockImplementation((header) => {
// 					if (header === 'content-type') return 'application/json';
// 					return null;
// 				});
// 				xhr.getAllResponseHeaders = jest.fn().mockReturnValue(
// 					'content-type: application/json\r\nx-custom: value'
// 				);
// 				xhr.onload();
// 			}, 0);
//
// 			const response = await promise;
//
// 			expect(mockXHR.open).toHaveBeenCalledWith('GET', `${baseURL}/users/1`);
// 			expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
// 			expect(mockXHR.send).toHaveBeenCalled();
// 			expect(response.status).toBe(200);
// 			expect(response.data).toEqual(mockResponseData);
// 			expect(response.headers['content-type']).toBe('application/json');
// 			expect(response.headers['x-custom']).toBe('value');
// 		});
//
// 		test('should handle GET request with custom headers', async () => {
// 			const promise = transport.get('/users', {
// 				headers: { 'X-Request-ID': '12345' }
// 			});
//
// 			setTimeout(() => {
// 				const xhr = xhrInstances[0];
// 				xhr.status = 200;
// 				xhr.responseText = '{}';
// 				xhr.getResponseHeader = jest.fn().mockReturnValue('application/json');
// 				xhr.onload();
// 			}, 0);
//
// 			await promise;
//
// 			expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
// 			expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('X-Request-ID', '12345');
// 		});
//
// 		test('should handle GET request error (4xx)', async () => {
// 			const promise = transport.get('/not-found');
//
// 			setTimeout(() => {
// 				const xhr = xhrInstances[0];
// 				xhr.status = 404;
// 				xhr.statusText = 'Not Found';
// 				xhr.responseText = JSON.stringify({ error: 'Resource not found' });
// 				xhr.getResponseHeader = jest.fn().mockReturnValue('application/json');
// 				xhr.onload();
// 			}, 0);
//
// 			try {
// 				await promise;
// 				fail('Should have thrown an error');
// 			} catch (error) {
// 				expect(error.status).toBe(404);
// 				expect(error.statusText).toBe('Not Found');
// 				expect(error.data.error).toBe('Resource not found');
// 				expect(error.message).toContain('Request failed: 404 Not Found');
// 			}
// 		});
//
// 		test('should handle GET network error', async () => {
// 			const promise = transport.get('/users');
//
// 			setTimeout(() => {
// 				const xhr = xhrInstances[0];
// 				xhr.onerror();
// 			}, 0);
//
// 			await expect(promise).rejects.toThrow('Network error');
// 		});
// 	});
//
// 	describe('POST Requests', () => {
// 		test('should make successful POST request with JSON payload', async () => {
// 			const payload = { name: 'John', email: 'john@example.com' };
// 			const mockResponse = { id: 1, ...payload };
//
// 			const promise = transport.post('/users', payload);
//
// 			setTimeout(() => {
// 				const xhr = xhrInstances[0];
// 				xhr.status = 201;
// 				xhr.statusText = 'Created';
// 				xhr.responseText = JSON.stringify(mockResponse);
// 				xhr.getResponseHeader = jest.fn().mockReturnValue('application/json');
// 				xhr.onload();
// 			}, 0);
//
// 			const response = await promise;
//
// 			expect(mockXHR.open).toHaveBeenCalledWith('POST', `${baseURL}/users`);
// 			expect(mockXHR.send).toHaveBeenCalledWith(JSON.stringify(payload));
// 			expect(response.status).toBe(201);
// 			expect(response.data).toEqual(mockResponse);
// 		});
//
// 		test('should handle POST with FormData payload', async () => {
// 			const formData = new FormData();
// 			formData.append('file', 'file content');
//
// 			const promise = transport.post('/upload', formData, {
// 				headers: { 'Content-Type': 'multipart/form-data' }
// 			});
//
// 			setTimeout(() => {
// 				const xhr = xhrInstances[0];
// 				xhr.status = 200;
// 				xhr.responseText = '{"success":true}';
// 				xhr.getResponseHeader = jest.fn().mockReturnValue('application/json');
// 				xhr.onload();
// 			}, 0);
//
// 			await promise;
//
// 			expect(mockXHR.setRequestHeader).toHaveBeenCalledWith(
// 				'Content-Type',
// 				'multipart/form-data'
// 			);
// 			expect(mockXHR.send).toHaveBeenCalledWith(formData);
// 		});
//
// 		test('should handle POST with URL-encoded data', async () => {
// 			const payload = { username: 'john', password: 'secret' };
//
// 			const promise = transport.post('/login', payload, {
// 				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
// 			});
//
// 			setTimeout(() => {
// 				const xhr = xhrInstances[0];
// 				xhr.status = 200;
// 				xhr.responseText = '{}';
// 				xhr.getResponseHeader = jest.fn().mockReturnValue('application/json');
// 				xhr.onload();
// 			}, 0);
//
// 			await promise;
//
// 			expect(mockXHR.send).toHaveBeenCalledWith(
// 				'username=john&password=secret'
// 			);
// 		});
//
// 		test('should handle POST validation error (400)', async () => {
// 			const payload = { email: 'invalid' };
//
// 			const promise = transport.post('/users', payload);
//
// 			setTimeout(() => {
// 				const xhr = xhrInstances[0];
// 				xhr.status = 400;
// 				xhr.statusText = 'Bad Request';
// 				xhr.responseText = JSON.stringify({
// 					errors: ['Email is invalid']
// 				});
// 				xhr.getResponseHeader = jest.fn().mockReturnValue('application/json');
// 				xhr.onload();
// 			}, 0);
//
// 			try {
// 				await promise;
// 				fail('Should have thrown an error');
// 			} catch (error) {
// 				expect(error.status).toBe(400);
// 				expect(error.data.errors).toContain('Email is invalid');
// 			}
// 		});
// 	});
//
// 	describe('PUT Requests', () => {
// 		test('should make successful PUT request', async () => {
// 			const payload = { name: 'Updated Name' };
// 			const mockResponse = { id: 1, ...payload };
//
// 			const promise = transport.put('/users/1', payload);
//
// 			setTimeout(() => {
// 				const xhr = xhrInstances[0];
// 				xhr.status = 200;
// 				xhr.responseText = JSON.stringify(mockResponse);
// 				xhr.getResponseHeader = jest.fn().mockReturnValue('application/json');
// 				xhr.onload();
// 			}, 0);
//
// 			const response = await promise;
//
// 			expect(mockXHR.open).toHaveBeenCalledWith('PUT', `${baseURL}/users/1`);
// 			expect(mockXHR.send).toHaveBeenCalledWith(JSON.stringify(payload));
// 			expect(response.status).toBe(200);
// 			expect(response.data.name).toBe('Updated Name');
// 		});
//
// 		test('should handle PUT with no data', async () => {
// 			const promise = transport.put('/users/1/activate', null);
//
// 			setTimeout(() => {
// 				const xhr = xhrInstances[0];
// 				xhr.status = 200;
// 				xhr.responseText = '{}';
// 				xhr.getResponseHeader = jest.fn().mockReturnValue('application/json');
// 				xhr.onload();
// 			}, 0);
//
// 			await promise;
//
// 			expect(mockXHR.send).toHaveBeenCalledWith(undefined);
// 		});
// 	});
//
// 	describe('DELETE Requests', () => {
// 		test('should make successful DELETE request', async () => {
// 			const promise = transport.delete('/users/1');
//
// 			setTimeout(() => {
// 				const xhr = xhrInstances[0];
// 				xhr.status = 204;
// 				xhr.statusText = 'No Content';
// 				xhr.responseText = '';
// 				xhr.getResponseHeader = jest.fn().mockImplementation((header) => {
// 					if (header === 'content-type') return null;
// 					return null;
// 				});
// 				xhr.onload();
// 			}, 0);
//
// 			const response = await promise;
//
// 			expect(mockXHR.open).toHaveBeenCalledWith('DELETE', `${baseURL}/users/1`);
// 			expect(mockXHR.send).toHaveBeenCalled();
// 			expect(response.status).toBe(204);
// 			expect(response.data).toBe('');
// 		});
//
// 		test('should handle DELETE with custom headers', async () => {
// 			const promise = transport.delete('/resource/1', {
// 				headers: {
// 					'X-Confirmation': 'delete',
// 					'Authorization': 'Bearer token123'
// 				}
// 			});
//
// 			setTimeout(() => {
// 				const xhr = xhrInstances[0];
// 				xhr.status = 200;
// 				xhr.responseText = '{}';
// 				xhr.getResponseHeader = jest.fn().mockReturnValue('application/json');
// 				xhr.onload();
// 			}, 0);
//
// 			await promise;
//
// 			expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('X-Confirmation', 'delete');
// 			expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('Authorization', 'Bearer token123');
// 		});
// 	});
//
// 	describe('Error Handling and Edge Cases', () => {
// 		test('should handle timeout', async () => {
// 			transport = new HttpTransport(baseURL, { timeout: 100 });
//
// 			const promise = transport.get('/slow-endpoint');
//
// 			setTimeout(() => {
// 				const xhr = xhrInstances[0];
// 				xhr.ontimeout();
// 			}, 0);
//
// 			await expect(promise).rejects.toThrow('Request timeout after 100ms');
// 		});
//
// 		test('should handle request abort', async () => {
// 			const promise = transport.get('/users');
//
// 			setTimeout(() => {
// 				const xhr = xhrInstances[0];
// 				xhr.onabort();
// 			}, 0);
//
// 			await expect(promise).rejects.toThrow('Request aborted');
// 		});
//
// 		test('should handle non-JSON response', async () => {
// 			const promise = transport.get('/text');
//
// 			setTimeout(() => {
// 				const xhr = xhrInstances[0];
// 				xhr.status = 200;
// 				xhr.responseText = 'Plain text response';
// 				xhr.getResponseHeader = jest.fn().mockReturnValue('text/plain');
// 				xhr.onload();
// 			}, 0);
//
// 			const response = await promise;
//
// 			expect(response.data).toBe('Plain text response');
// 		});
//
// 		test('should handle invalid JSON response', async () => {
// 			const promise = transport.get('/invalid-json');
//
// 			setTimeout(() => {
// 				const xhr = xhrInstances[0];
// 				xhr.status = 200;
// 				xhr.responseText = '{invalid json}';
// 				xhr.getResponseHeader = jest.fn().mockReturnValue('application/json');
// 				xhr.onload();
// 			}, 0);
//
// 			const response = await promise;
//
// 			expect(response.data).toBe('{invalid json}');
// 		});
//
// 		test('should handle no content-type header', async () => {
// 			const promise = transport.get('/no-content-type');
//
// 			setTimeout(() => {
// 				const xhr = xhrInstances[0];
// 				xhr.status = 200;
// 				xhr.responseText = 'Some text';
// 				xhr.getResponseHeader = jest.fn().mockReturnValue(null);
// 				xhr.onload();
// 			}, 0);
//
// 			const response = await promise;
//
// 			expect(response.data).toBe('Some text');
// 		});
// 	});
//
// 	describe('Response Parsing', () => {
// 		test('should parse response headers correctly', async () => {
// 			const promise = transport.get('/test');
//
// 			setTimeout(() => {
// 				const xhr = xhrInstances[0];
// 				xhr.status = 200;
// 				xhr.responseText = '{}';
// 				xhr.getResponseHeader = jest.fn().mockReturnValue('application/json');
// 				xhr.getAllResponseHeaders = jest.fn().mockReturnValue(
// 					'Content-Type: application/json\r\nX-RateLimit-Limit: 60\r\nX-RateLimit-Remaining: 59'
// 				);
// 				xhr.onload();
// 			}, 0);
//
// 			const response = await promise;
//
// 			expect(response.headers['content-type']).toBe('application/json');
// 			expect(response.headers['x-ratelimit-limit']).toBe('60');
// 			expect(response.headers['x-ratelimit-remaining']).toBe('59');
// 		});
//
// 		test('should handle empty response headers', async () => {
// 			const promise = transport.get('/test');
//
// 			setTimeout(() => {
// 				const xhr = xhrInstances[0];
// 				xhr.status = 200;
// 				xhr.responseText = '{}';
// 				xhr.getResponseHeader = jest.fn().mockReturnValue('application/json');
// 				xhr.getAllResponseHeaders = jest.fn().mockReturnValue('');
// 				xhr.onload();
// 			}, 0);
//
// 			const response = await promise;
//
// 			expect(response.headers).toEqual({});
// 		});
// 	});
//
// 	describe('Request Serialization', () => {
// 		test('should serialize different data types correctly', () => {
// 			const transport = new HttpTransport();
//
// 			// Test JSON serialization
// 			const jsonData = { foo: 'bar' };
// 			const jsonResult = transport._serializeData(jsonData, 'application/json');
// 			expect(jsonResult).toBe('{"foo":"bar"}');
//
// 			// Test FormData (should pass through)
// 			const formData = new FormData();
// 			formData.append('key', 'value');
// 			const formResult = transport._serializeData(formData, 'multipart/form-data');
// 			expect(formResult).toBe(formData);
//
// 			// Test URL encoded
// 			const urlData = { param1: 'value1', param2: 'value2' };
// 			const urlResult = transport._serializeData(urlData, 'application/x-www-form-urlencoded');
// 			expect(urlResult).toBe('param1=value1&param2=value2');
//
// 			// Test string data
// 			const stringResult = transport._serializeData('plain text', 'text/plain');
// 			expect(stringResult).toBe('plain text');
// 		});
// 	});
// });
