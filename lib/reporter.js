"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const lodash_1 = require("lodash");
const path_1 = __importDefault(require("path"));
const upath_1 = require("upath");
const formatter_1 = require("./formatter");
function getDefaultOptions(partialOptions) {
    return lodash_1.defaults({}, partialOptions, {
        sort: false,
        filename: 'pmd.xml',
        pathBase: '',
        pathPrefix: '',
    });
}
function report(partialOptions = {}) {
    let errorBuffer = [];
    const options = getDefaultOptions(partialOptions);
    return {
        error: (error) => {
            const file = error === null || error === void 0 ? void 0 : error.file;
            if (file) {
                errorBuffer.push({
                    xml: formatter_1.formatError(error),
                    path: getReportedFilePath(options, file),
                });
            }
        },
        finish: () => {
            if (options.sort) {
                errorBuffer = lodash_1.sortBy(errorBuffer, 'path');
            }
            const content = formatter_1.formatStream(errorBuffer);
            fs_1.default.promises.writeFile(options.filename, content).catch(error => {
                // tslint:disable-next-line:no-console
                console.error(error);
            });
        },
    };
}
exports.report = report;
function getReportedFilePath(partialOptions, vinyl) {
    const options = getDefaultOptions(partialOptions);
    let result = upath_1.normalize(vinyl.path);
    if (options) {
        if (options.pathBase) {
            const index = result.indexOf(options.pathBase);
            if (index > 0) {
                result = result.substr(index + options.pathBase.length);
            }
        }
        if (options.pathPrefix) {
            result = path_1.default.join(options.pathPrefix, result);
        }
    }
    if (path_1.default.sep === path_1.default.win32.sep) {
        result = result.replace(/\//, path_1.default.win32.sep);
    }
    return result;
}
exports.getReportedFilePath = getReportedFilePath;
