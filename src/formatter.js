'use strict';

const _ = require('lodash');
const DefaultPosition = {
    position: 0,
    lineAndCharacter: {
        character: 0,
        line: 0
    }
};

class Formatter {
    constructor(options) {
        this.options = _.defaults(options);
    }

    formatStream(errors) {
        const xml = _(errors)
            .groupBy('path')
            .map((fileErrors, path) => {
                return this.formatFile(path, fileErrors);
            })
            .value()
            .join('');

        return `<?xml version="1.0" encoding="utf-8"?>\n<pmd version="4.2.5">${xml}</pmd>`;
    }

    formatFile(fileName, errors) {
        if (_.isEmpty(errors)) {
            return '';
        }

        let result = _.reduce(errors, (rslt, error) => {
            return rslt += error.xml;
        }, `<file name="${fileName}">`);

        result += '</file>';

        return result;
    }

    formatMessage(message, indent) {
        const indentStr = _.repeat(' ', indent)
        if (typeof message === 'string') {
            return indentStr + message;
        }

        if (!message.next || message.next.length === 0) {
            return indentStr + message.messageText;
        }

        let chainedMessages;
        if (Array.isArray(message.next)) {
            chainedMessages = message.next.map(chain => this.formatMessage(chain, indent + 2)).join('');
        } else {
            chainedMessages = this.formatMessage(message.next, indent + 2);
        }

        return indentStr + message.messageText + '\n' + chainedMessages;
    }

    formatError(error) {
        const start = error.startPosition || DefaultPosition;
        const end = error.endPosition || DefaultPosition;
        const message = _.escape(this.formatMessage(error.diagnostic.messageText, 0));

        return '<violation' +
            addErrorField('beginline', start.line) +
            addErrorField('begincolumn', start.character) +
            addErrorField('endline', end.line) +
            addErrorField('endcolumn', end.character) +
            addErrorField('priority', error.diagnostic.category) +
            addErrorField('rule', 'TS' + error.diagnostic.code) +
            '>' +
            message +
            '</violation>';
    }
}

function addErrorField(name, value) {
    if (!_.isNil(value)) {
        return ` ${name}="${value}"`;
    }

    return '';
}

module.exports = Formatter;
