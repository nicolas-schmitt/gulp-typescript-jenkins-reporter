"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const typescript_1 = require("typescript");
const DefaultPosition = {
    position: 0,
    line: 0,
    character: 0,
};
function formatStream(errors) {
    const xml = Object.entries(lodash_1.groupBy(errors, 'path'))
        .map(([path, fileErrors]) => {
        return formatFile(path, fileErrors);
    })
        .join('');
    return `<?xml version="1.0" encoding="utf-8"?>\n<pmd version="4.2.5">${xml}</pmd>`;
}
exports.formatStream = formatStream;
function formatFile(fileName, errors) {
    if (!errors.length) {
        return '';
    }
    return `<file name="${fileName}">${errors.map(error => error.xml).join('')}</file>`;
}
exports.formatFile = formatFile;
function formatError(error) {
    const start = error.startPosition || DefaultPosition;
    const end = error.endPosition || DefaultPosition;
    const message = lodash_1.escape(typescript_1.flattenDiagnosticMessageText(error.diagnostic.messageText, '\n'));
    return formatTagWithAttributes('violation', {
        beginline: start.line,
        begincolumn: start.character,
        endline: end.line,
        endcolumn: end.character,
        priority: error.diagnostic.category,
        rule: 'TS' + error.diagnostic.code,
    }, message);
}
exports.formatError = formatError;
function formatTagWithAttributes(tagName, attributes, children) {
    const formattedAttributeList = Object.entries(attributes)
        .filter(([_, value]) => value !== null && value !== undefined)
        .map(([name, value]) => `${name}="${value}"`)
        .join(' ');
    const formattedAttributes = formattedAttributeList ? ' ' + formattedAttributeList : '';
    return `<${tagName}${formattedAttributes}>${children}</${tagName}>`;
}
