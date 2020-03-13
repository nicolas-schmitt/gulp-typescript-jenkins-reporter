import { flatten, forEach } from 'lodash';
import { formatError, formatFile, formatStream } from '../src/formatter';
import inputMock from './mocks/input';
import outputMock from './mocks/output';
import { parseAndValidate } from './util';
import xpath from 'xpath';

describe('formatter', () => {
    describe('formatError', () => {
        it('should return valid xml', () => {
            forEach(inputMock, input => {
                input.errors.forEach(error => {
                    parseAndValidate(formatError(error as any));
                });
            });
        });

        it('should return the xml corresponding to the error', () => {
            forEach(inputMock, (input, name) => {
                input.errors.forEach((error, i) => {
                    const actualXml = formatError(error as any);
                    expect(actualXml).toEqual(outputMock[name as keyof typeof inputMock].errors[i]);
                });
            });
        });
    });

    describe('formatFile', () => {
        it('should return valid xml', () => {
            forEach(outputMock, mock => {
                const errors = mock.errors.map(error => ({
                    path: mock.fullFilename,
                    xml: error,
                }));

                const actualXml = formatFile(mock.fullFilename, errors);

                if (errors.length) {
                    parseAndValidate(actualXml);
                } else {
                    expect(actualXml).toBe('');
                }
            });
        });

        it('should return an empty string when there is no error', () => {
            expect(formatFile('filename', [])).toBe('');
        });

        it('should return a file element with as many children as failure', () => {
            forEach(outputMock, (mock, name) => {
                const errors = mock.errors.map(error => ({
                    path: mock.fullFilename,
                    xml: error,
                }));

                const xml = formatFile(mock.fullFilename, errors);
                if (name === 'clean') {
                    expect(xml).toBe('');
                } else {
                    const doc = parseAndValidate(xml);
                    expect(xpath.select('//violation', doc).length).toBe(errors.length);
                }
            });
        });
    });

    describe('formatStream', () => {
        const errors = flatten(
            Object.entries(outputMock).map(([_, mock]) =>
                mock.errors.map(error => ({
                    path: mock.relativeFilename,
                    xml: error,
                }))
            )
        );

        it('should return a pmd element with as many children as there are files with errors', () => {
            const doc = parseAndValidate(formatStream(errors));
            expect(xpath.select('//pmd', doc).length).toBe(1);
            expect(xpath.select('//file', doc).length).toBe(2);
        });
    });
});
