import { promises } from 'fs';
import { Reporter, TypeScriptError } from 'gulp-typescript/release/reporter';
import { VinylFile } from 'gulp-typescript/release/types';
import { defaults, sortBy } from 'lodash';
import path from 'path';
import { normalize as normalizePath } from 'upath';
import Formatter from './formatter';
import { FormattedError, ReportOptions } from './types';
const { writeFile } = promises;


function getDefaultOptions(partialOptions: Partial<ReportOptions> | undefined): ReportOptions {
    return defaults({}, partialOptions, {
        sort: false,
        filename: 'pmd.xml',
        pathBase: '',
        pathPrefix: '',
    });
}

export function report(partialOptions: Partial<ReportOptions> = {}): Reporter {
    let errorBuffer: Array<FormattedError> = [];

    const options = getDefaultOptions(partialOptions);

    const formatter = new Formatter();

    return {
        error: (error: TypeScriptError) => {
            const file = error?.file;
            if (file) {
                errorBuffer.push({
                    xml: formatter.formatError(error),
                    path: getReportedFilePath(options, file),
                });
            }
        },
        finish: () => {
            if (options.sort) {
                errorBuffer = sortBy(errorBuffer, 'path');
            }

            const content = formatter.formatStream(errorBuffer);
            writeFile(options.filename, content).catch(error => {
                console.error(error);
            });
        },
    };
}

export function getReportedFilePath(partialOptions: Partial<ReportOptions>, vinyl: VinylFile): string {
    const options = getDefaultOptions(partialOptions);
    let result = normalizePath(vinyl.path);

    if (options) {
        if (options.pathBase) {
            const index = result.indexOf(options.pathBase);
            if (index > 0) {
                result = result.substr(index + options.pathBase.length);
            }
        }

        if (options.pathPrefix) {
            result = path.join(options.pathPrefix, result);
        }
    }

    if (path.sep === path.win32.sep) {
        result = result.replace(/\//, path.win32.sep);
    }

    return result;
}
