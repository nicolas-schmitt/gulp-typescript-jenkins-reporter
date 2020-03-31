import { flatten, forEach } from 'lodash';
import { formatError, formatFile, formatStream } from '../src/formatter';
import inputMock from './mocks/input';
import outputMock from './mocks/output';
import { parseAndValidate } from './util';

describe('formatter', () => {
    describe('formatError', () => {
        forEach(inputMock, (input, name) => {
            input.errors.forEach((error, i) => {
                it(`returns the xml corresponding to the error ${name}[${i}]`, () => {
                    const doc = parseAndValidate(formatError(error as any));
                    expect(doc?.documentElement).toMatchSnapshot();
                });
            });
        });
    });

    describe('formatFile', () => {
        it('returns an empty string when there is no error', () => {
            expect(formatFile('filename', [])).toBe('');
        });

        forEach(outputMock, (mock, name) => {
            it(`returns ${
                mock.errors.length === 0 ? 'no' : 'a'
            } file element with violations for ${name}`, () => {
                const errors = mock.errors.map(error => ({
                    path: mock.fullFilename,
                    xml: error,
                }));

                const doc = parseAndValidate(formatFile(mock.fullFilename, errors));
                expect(doc?.documentElement).toMatchSnapshot();
            });
        });
    });

    it('formatStream returns a pmd element with file elements as children', () => {
        const errors = flatten(
            Object.entries(outputMock).map(([_, mock]) =>
                mock.errors.map(error => ({
                    path: mock.relativeFilename,
                    xml: error,
                }))
            )
        );

        const doc = parseAndValidate(formatStream(errors));
        expect(doc?.documentElement).toMatchSnapshot();
    });
});
