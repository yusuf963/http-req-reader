import assert from 'assert';
import sinon from 'sinon';
import { Request } from 'express';
import { paresCustomRequestId, requestInfo } from '../../src/index';

const sandbox = sinon.createSandbox();

describe('paresRequestId function', () => {
	sandbox.stub(console, 'error');
	it('return an object with the header name passed to customRequestIdHeader property', () => {
		const req = {} as Request;

		req.headers = { 'x-req-id': '123-some-chars-req-id' };

		const headerNameAndValue = paresCustomRequestId({
			req,
			customRequestIdHeader: 'x-req-id',
		});
		assert.deepEqual(headerNameAndValue, {
			'x-req-id': '123-some-chars-req-id',
		});
	});

	it('return empty string vlaue if no customRequestIdHeader passed in', () => {
		const req = {
			headers: {},
		} as Request;
		const headerNameAndValue = paresCustomRequestId({ req });
		assert.deepEqual(headerNameAndValue, '');
	});
});

describe('requestInfo function', () => {
	describe('returned object Propertites', () => {
		it('should return the expected object with correct properties', () => {
			let req = {} as Partial<Request>;
			req = {
				ip: '127.0.0.1',
				connection: {
					remoteAddress: '127.0.0.1',
				},
				get: (header: string) => {
					if (header === 'user-agent')
						return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
					if (header === 'referrer' || header === 'referer')
						return 'http://example.com';
					return undefined;
				},
				url: '/path?param=value',
				query: { param: 'value' },
				method: 'GET',
				hostname: 'example.com',
				protocol: 'http',
				cookies: {},
				headers: { 'custom-header': 'custom-value' },
				acceptsLanguages: () => ['en-US'],
			};

			const result = requestInfo({
				req,
				customRequestIdHeader: 'custom-header',
			});
			result.timestamp = '08/01/2024, 01:01:28';

			assert.equal(typeof result, 'object');
			assert.strictEqual(Object.keys(result).length, 15);
			assert.deepStrictEqual(result, {
				timestamp: '08/01/2024, 01:01:28', // !!better to be asserted as sinon.match.string of instamce of Date
				customRequestId: { 'custom-header': 'custom-value' },
				languages: ['en-US'],
				protocol: 'http',
				method: 'GET',
				hostname: 'example.com',
				url: '/path?param=value',
				queryParams: { param: 'value' },
				headers: { 'custom-header': 'custom-value' },
				cookies: {},
				ip: '127.0.0.1',
				referrer: 'http://example.com',
				browser: 'Mozilla/5.0',
				userAgent:
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
				os: 'undefined (Windows',
			});

			// sinon.assert.calledOnce(paresCustomRequestIdStub);
			// sinon.assert.calledWithExactly(paresCustomRequestIdStub, { req, customRequestIdHeader: 'custom-header' });

			// const req: Request<ParamsDictionary, any, any, ParsedQs> = {
			//     headers: {
			//         'x-custom-header': 'some-custom-value',
			//     },
			// };
			// const returnedObject = requestInfo({ req, customRequestIdHeader: 'x-custom-header' });

			// // assert.ok(returnedObject['x-custom-header']);
		});
		it('always returns object with 15 properties', () => {});
	});
});
