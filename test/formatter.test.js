'use strict';

const _ = require('lodash');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-spies'));
chai.use(require('chai-string'));
chai.use(require('chai-xml'));

const Formatter = require('../out/formatter').default;
const inputMock = require('./mocks/input');
const outputMock = require('./mocks/output');

describe('formatter', function() {
    describe('#formatError', function() {
        it('should return a valid xml', function() {
            _.forEach(inputMock, function(input) {
                _.forEach(input.errors, function(error) {
                    const formatter = new Formatter();
                    const actualXml = formatter.formatError(error);
                    expect(actualXml).xml.to.be.valid();
                });
            });
        });

        it('should return the xml corresponding to the error', function() {
            _.forEach(inputMock, function(input, name) {
                _.forEach(input.errors, function(error, i) {
                    const formatter = new Formatter();
                    const actualXml = formatter.formatError(error);
                    expect(actualXml).to.be.equal(outputMock[name].errors[i]);
                });
            });
        });
    });

    describe('#formatFile', function() {
        it('should return a valid xml', function() {
            _.forEach(outputMock, function(mock) {
                const formatter = new Formatter();
                const errors = _.map(mock.errors, function(error) {
                    return {
                        path: mock.fullFilename,
                        xml: error
                    };
                });
                const actualXml = formatter.formatFile(mock.fullFilename, errors);
                expect(actualXml).xml.to.be.valid();
            });
        });

        it('should return an empty string when there is no error', function() {
            const formatter = new Formatter();
            expect(formatter.formatFile(outputMock.clean.fullFilename, outputMock.clean.errors))
                .to.equal('');
        });

        it('should return a file element with as many children as failure', function() {
            _.forEach(outputMock, function(mock) {
                const formatter = new Formatter();
                const errors = _.map(mock.errors, function(error) {
                    return {
                        path: mock.fullFilename,
                        xml: error
                    };
                });
                const actualXml = formatter.formatFile(mock.fullFilename, errors);
                expect(actualXml).to.have.entriesCount('<violation', errors.length);
            });
        });
    });

    describe('#formatStream', function() {
        const errors = _.flatten(_.map(outputMock, function(mock) {
            return _.map(mock.errors, function(error) {
                return {
                    path: mock.relativeFilename,
                    xml: error
                };
            });
        }));

        it('should return a valid xml', function() {
            const formatter = new Formatter();
            const actualXml = formatter.formatStream(errors);
            expect(actualXml).xml.to.be.valid();
        });

        it('should call #formatFile for each file with error', function() {
            const formatter = new Formatter();
            const spy = chai.spy.on(formatter, 'formatFile');
            formatter.formatStream(errors);
            expect(spy).to.have.been.called.exactly(2);
        });

        it('should return a pmd element with as many children as file with error', function() {
            const formatter = new Formatter();
            const actualXml = formatter.formatStream(errors);
            expect(actualXml).to.have.entriesCount('<pmd', 1);
            expect(actualXml).to.have.entriesCount('<file', 2);
        });
    });
});
