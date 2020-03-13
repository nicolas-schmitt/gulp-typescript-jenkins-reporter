import fs from 'fs';
import gulp from 'gulp';
import ts from 'gulp-typescript';
import xpath from 'xpath';
import { getReportedFilePath, report } from '../src/reporter';
import { parseAndValidate } from './util';

jest.setTimeout(15000);

describe('reporter', () => {
    const tsFileShim: any = {
        path: '/home/ubuntu/workspace/src/file.js',
    };

    function createReport(path?: string) {
        const project = ts.createProject({});
        return new Promise(resolve => {
            gulp.src('./test/mocks/dirty.ts')
                .pipe(project(report({ filename: path })))
                .on('finish', resolve)
                // tslint:disable-next-line:no-empty
                .on('error', () => {});
        });
    }

    describe('report', () => {
        const reportPath = './pmd.xml';
        let reportContent = '';
        let xmlReport: Document | undefined;

        beforeAll(async () => {
            await createReport();
            const results = await fs.promises.readFile(reportPath);
            reportContent = results.toString();
            xmlReport = parseAndValidate(reportContent);
        });

        afterAll(() => fs.promises.unlink(reportPath));

        it('should create a valid xml report', () => {
            parseAndValidate(reportContent);
        });

        it('should create an xml report with one file node', () => {
            const nodes = xpath.select('//file', xmlReport);
            expect(nodes.length).toBe(1);
        });

        it('should create an xml report with 4 violation nodes', () => {
            const nodes = xpath.select('//violation', xmlReport);
            expect(nodes.length).toBe(4);
        });
    });

    describe('getReportedFilePath', () => {
        it("shouldn't rebase the path when options.pathBase is undefined", () => {
            const actual = getReportedFilePath({}, tsFileShim);
            expect(actual).toBe(tsFileShim.path);
        });

        it("shouldn't rebase the path when options.pathBase is empty", () => {
            const actual = getReportedFilePath({ pathBase: '' }, tsFileShim);
            expect(actual).toBe(tsFileShim.path);
        });

        it('should rebase the path when options.pathBase is set', () => {
            const actual = getReportedFilePath({ pathBase: '/workspace' }, tsFileShim);
            expect(actual).toBe('/src/file.js');
        });

        it('should prepend the path when options.pathPrefix is set', () => {
            const actual = getReportedFilePath({ pathPrefix: '/project' }, tsFileShim);
            expect(actual).toBe('/project' + tsFileShim.path);
        });

        it('should prepend and rebase the path when both options are set', () => {
            const actual = getReportedFilePath(
                {
                    pathBase: '/workspace',
                    pathPrefix: '/project',
                },
                tsFileShim
            );
            expect(actual).toBe('/project/src/file.js');
        });
    });
});
