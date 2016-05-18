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
    
    formatError(error) {
        const start = error.startPosition || DefaultPosition;
        const end = error.endPosition || DefaultPosition;
        
        return '<violation' +
            addErrorField('beginline', start.line) +
            addErrorField('begincolumn', start.character) +
            addErrorField('endline', end.line) +
            addErrorField('endcolumn', end.character) +
            addErrorField('priority', error.diagnostic.category) +
            addErrorField('rule', 'TS' + error.diagnostic.code) +
            '>' +
            _.escape(error.diagnostic.messageText) +
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
