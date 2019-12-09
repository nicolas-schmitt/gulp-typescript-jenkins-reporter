'use strict';

const chai = require('chai');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const fs = require('fs');
const expect = chai.expect;
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
chai.use(require('chai-xml'));

const reporter = require('../src/reporter');

describe('reporter', function() {
    const tsFileShim = {
        path: '/home/ubuntu/workspace/src/file.js'
    };

    function createReport(path) {
        const project = ts.createProject({});
        return new Promise((resolve) => {
            gulp.src('./test/mocks/dirty.ts')
                .pipe(project(reporter.report({
                    filename: path
                })))
                .on('finish', resolve);
        });
    }

    function readFile(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, content) => {
                if (err) {
                    reject(err);
                }

                resolve(content.toString());
            });
        });
    }

    describe('#report', function() {
        const reportPath = './pmd.xml';
        let reportContent = '';
        let xmlReport = null;

        before(function(done) {
            this.timeout(5000);
            createReport()
                .then(() => {
                    return readFile(reportPath);
                })
                .then((results) => {
                   reportContent = results;
                   xmlReport = new dom().parseFromString(reportContent);
                   done();
                })
                .catch((err) => {
                    if (err) {
                        console.error(err);
                    }

                    done();
                });
        });

        it('should create a valid xml report', function() {
            expect(reportContent).xml.to.be.valid();
        });

        it('should create an xml report with one file node', function() {
            const nodes = xpath.select('//file', xmlReport);
            expect(nodes.length).to.equal(1);
        });

        it('should create an xml report with 4 violation nodes', function() {
            const nodes = xpath.select('//violation', xmlReport);
            expect(nodes.length).to.equal(4);
        });

        after(function(done) {
            fs.unlink(reportPath, (err) => {
                if (err) {
                    console.error(err);
                }

                done();
            });
        });

    });

    describe('#getReportedFilePath', function() {
        it('shouldn\'t rebase the path when options.pathBase is undefined', function() {
            const actual = reporter.getReportedFilePath({}, tsFileShim);
            expect(actual).to.be.equal(tsFileShim.path);
        });

        it('shouldn\'t rebase the path when options.pathBase is empty', function() {
            const actual = reporter.getReportedFilePath({pathBase: ''}, tsFileShim);
            expect(actual).to.be.equal(tsFileShim.path);
        });

        it('should rebase the path when options.pathBase is set', function() {
            const actual = reporter.getReportedFilePath({pathBase: '/workspace'}, tsFileShim);
            expect(actual).to.be.equal('/src/file.js');
        });

        it('should prepend the path when options.pathPrefix is set', function() {
            const actual = reporter.getReportedFilePath({pathPrefix: '/project'}, tsFileShim);
            expect(actual).to.be.equal('/project' + tsFileShim.path);
        });

        it('should prepend and rebase the path when both options are set', function() {
            const actual = reporter.getReportedFilePath({
                pathBase: '/workspace',
                pathPrefix: '/project'
            }, tsFileShim);
            expect(actual).to.be.equal('/project/src/file.js');
        });
    });
});
