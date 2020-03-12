import { TypeScriptError } from 'gulp-typescript/release/reporter';
import { escape, groupBy } from 'lodash';
import { DiagnosticCategory, DiagnosticMessageChain, flattenDiagnosticMessageText } from 'typescript';
import { FormattedError, TypescriptErrorPosition } from './types';

const DefaultPosition: TypescriptErrorPosition = {
    position: 0,
    line: 0,
    character: 0,
};

export default class Formatter {
    formatStream(errors: Array<FormattedError>): string {
        const xml = Object.entries(groupBy(errors, 'path'))
            .map(([path, fileErrors]) => {
                return this.formatFile(path, fileErrors);
            })
            .join('');

        return `<?xml version="1.0" encoding="utf-8"?>\n<pmd version="4.2.5">${xml}</pmd>`;
    }

    formatFile(fileName: string, errors: Array<FormattedError>) {
        if (!errors.length) {
            return '';
        }

        return `<file name="${fileName}">${errors.map(error => error.xml).join('')}</file>`;
    }

    formatMessage(message: DiagnosticMessageChain | string, indent: number): string {
        const indentStr = ' '.repeat(indent);
        if (typeof message === 'string') {
            return indentStr + message;
        }

        if (!message.next || message.next.length === 0) {
            return indentStr + message.messageText;
        }

        let chainedMessages;
        // TODO: Use flattenDiagnosticMessageText?
        if (Array.isArray(message.next)) {
            chainedMessages = message.next.map(chain => this.formatMessage(chain, indent + 2)).join('');
        } else {
            chainedMessages = this.formatMessage(message.next, indent + 2);
        }

        return indentStr + message.messageText + '\n' + chainedMessages;
    }

    formatError(error: TypeScriptError): string {
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
