import assert from 'assert';
import { paresRequestId } from '../src/index';

describe('paresRequestId function', () => {
    it('return an object with the header name passed to customRequestIdHeader property', () => {
        const req = {
            headers: {
                'x-req-id': '123-some-chars-req-id',
            },
        };
        const result = paresRequestId({ req, customRequestIdHeader: 'x-req-id' });
        assert.deepEqual(result, { 'x-req-id': '123-some-chars-req-id' });
    });

    it('return empty string if no customRequestIdHeader passed in', () => {
        const req = {
            headers: {},
        };
        const result = paresRequestId({ req });
        assert.deepEqual(result, { undefined: '' });
    });

    it('', () => { });
});
