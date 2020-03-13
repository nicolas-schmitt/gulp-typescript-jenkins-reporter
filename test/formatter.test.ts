import { flatten, forEach } from 'lodash';
import Formatter from '../src/formatter';
import inputMock from './mocks/input';
import outputMock from './mocks/output';
import { parseAndValidate } from './util';
import xpath from 'xpath';

describe('formatter', () => {
    describe('formatError', () => {
        it('should return valid xml', () => {
            forEach(inputMock, input => {
                input.errors.forEach(error => {
                    const formatter = new Formatter();
                    parseAndValidate(formatter.formatError(error as any));
                });
            });
        });

        it('should return the xml corresponding to the error', () => {
            forEach(inputMock, (input, name) => {
                input.errors.forEach((error, i) => {
                    const formatter = new Formatter();
                    const actualXml = formatter.formatError(error as any);
                    expect(actualXml).toEqual(outputMock[name as keyof typeof inputMock].errors[i]);
                });
            });
        });
    });

    describe('formatFile', () => {
        it('should return valid xml', () => {
            forEach(outputMock, mock => {
                const formatter = new Formatter();
                const errors = mock.errors.map(error => ({
                    path: mock.fullFilename,
                    xml: error,
                }));

                const actualXml = formatter.formatFile(mock.fullFilename, errors);

                if (errors.length) {
                    parseAndValidate(actualXml);
                } else {
                    expect(actualXml).toBe('');
                }
            });
        });

        it('should return an empty string when there is no error', () => {
            const formatter = new Formatter();
            expect(formatter.formatFile(outputMock.clean.fullFilename, [])).toBe('');
        });

        it('should return a file element with as many children as failure', () => {
            forEach(outputMock, (mock, name) => {
                const formatter = new Formatter();
                const errors = mock.errors.map(error => ({
                    path: mock.fullFilename,
                    xml: error,
                }));

                const xml = formatter.formatFile(mock.fullFilename, errors);
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

        it('should return a valid xml', () => {
            const formatter = new Formatter();

            parseAndValidate(formatter.formatStream(errors));
        });

        it('should call #formatFile for each file with error', () => {
            const spy = jest.spyOn(Formatter.prototype, 'formatFile');
            const formatter = new Formatter();
            formatter.formatStream(errors);

            expect(spy).toHaveBeenCalledTimes(2);
        });

        it('should return a pmd element with as many children as there are files with errors', () => {
            const formatter = new Formatter();
            const doc = parseAndValidate(formatter.formatStream(errors));
            expect(xpath.select('//pmd', doc).length).toBe(1);
            expect(xpath.select('//file', doc).length).toBe(2);
        });
    });
});
