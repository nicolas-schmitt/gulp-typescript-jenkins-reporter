'use strict';

const chai = require('chai');
const expect = chai.expect;

const reporter = require('../src/reporter');

describe('reporter', function() {
    const path = '/home/ubuntu/workspace/src/file.js';
    const tsFileShim = {
        path: path
    };
    
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
