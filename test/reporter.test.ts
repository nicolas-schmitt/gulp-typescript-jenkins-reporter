import fs from 'fs';
import gulp from 'gulp';
import ts from 'gulp-typescript';
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
                .pipe(project(report({ filename: path, pathBase: '/test/mocks', pathPrefix: '/test/mocks'  })))
                .on('finish', resolve)
                // tslint:disable-next-line:no-empty
                .on('error', () => {});
        });
    }

    it('report should create a valid xml report', async () => {
        const reportPath = './pmd.xml';
        await createReport(reportPath);
        const contents = await fs.promises.readFile(reportPath);

        expect(parseAndValidate(contents.toString())?.documentElement).toMatchSnapshot();

        await fs.promises.unlink(reportPath);
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
