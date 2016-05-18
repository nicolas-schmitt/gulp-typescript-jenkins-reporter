'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const upath = require('upath');

const Formatter = require('./formatter');

module.exports = {
    getReportedFilePath: getReportedFilePath,
    getSettings: getSettings,
    report: report
};

function report(options) {
    let errorBuffer = [];
    options = options || {};
    
    _.defaults(options, {
        sort: false,
        filename: 'pmd.xml',
        pathBase: '',
        pathPrefix: ''
    });
    
    const settings = getSettings(options);
    const formatter = new Formatter(settings);
    
    return {
        error: function(error) {
            const reportPath = getReportedFilePath(options, error.tsFile);
            
            errorBuffer.push({
                xml: formatter.formatError(error),
                path: reportPath
            });
        },
        finish: function() {
            if (options.sort) {
                errorBuffer = _.sortBy(errorBuffer, 'path');
            }
            
            const content = formatter.formatStream(errorBuffer, options);
            fs.writeFile(options.filename, content, function(err) {
                if (err) {
                    console.error(err);
                }
            });
        }
    }
}

function getSettings(options) {
    const settings = options || {};
    
    _.defaults(settings, {
        sort: false,
        filename: 'pmd.xml',
        pathBase: '',
        pathPrefix: ''
    });
    
    if (settings.pathBase) {
        settings.pathBase = upath.normalize(settings.pathBase);
    }
    
    if (settings.pathPrefix) {
        settings.pathPrefix = upath.normalize(settings.pathPrefix);
    }
    
    return settings;
}

function getReportedFilePath(settings, vinyl) {
    let result = upath.normalize(vinyl.path);
    
    if (settings) {
        if (settings.pathBase) {
            const index = result.indexOf(settings.pathBase);
            if (index > 0) {
                result = result.substr(index + settings.pathBase.length);
            }
        }
        
        if (settings.pathPrefix) {
            result = path.join(settings.pathPrefix, result);
        }
    }
    
    if (path.sep === path.win32.sep) {
        result = result.replace(/\//, path.win32.sep);
    }
    
    return result;
}
