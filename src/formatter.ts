import { TypeScriptError } from 'gulp-typescript/release/reporter';
import { escape, groupBy } from 'lodash';
import { DiagnosticCategory, flattenDiagnosticMessageText } from 'typescript';
import { FormattedError, TypescriptErrorPosition } from './types';

const DefaultPosition: TypescriptErrorPosition = {
    position: 0,
    line: 0,
    character: 0,
};

export function formatStream(errors: Array<FormattedError>): string {
    const xml = Object.entries(groupBy(errors, 'path'))
        .map(([path, fileErrors]) => {
            return formatFile(path, fileErrors);
        })
        .join('');

    return `<?xml version="1.0" encoding="utf-8"?>\n<pmd version="4.2.5">${xml}</pmd>`;
}

export function formatFile(fileName: string, errors: Array<FormattedError>) {
    if (!errors.length) {
        return '';
    }

    return `<file name="${fileName}">${errors.map(error => error.xml).join('')}</file>`;
}

export function formatError(error: TypeScriptError): string {
    const start = error.startPosition || DefaultPosition;
    const end = error.endPosition || DefaultPosition;
    const message = escape(flattenDiagnosticMessageText(error.diagnostic.messageText, '\n'));

    return formatTagWithAttributes(
        'violation',
        {
            beginline: start.line,
            begincolumn: start.character,
            endline: end.line,
            endcolumn: end.character,
            priority: error.diagnostic.category,
            rule: 'TS' + error.diagnostic.code,
        },
        message
    );
}

function formatTagWithAttributes(
    tagName: string,
    attributes: { [key: string]: string | number | DiagnosticCategory },
    children?: string
): string {
    const formattedAttributeList = Object.entries(attributes)
        .filter(([_, value]) => value !== null && value !== undefined)
        .map(([name, value]) => `${name}="${value}"`)
        .join(' ');

    const formattedAttributes = formattedAttributeList ? ' ' + formattedAttributeList : '';

    return `<${tagName}${formattedAttributes}>${children}</${tagName}>`;
}
