export default {
    clean: {
        fullFilename: '/home/ubuntu/workspace/sandbox/data/clean.ts',
        relativeFilename: 'data/clean.ts',
        errors: []
    },
    dirty: {
        fullFilename: '/home/ubuntu/workspace/sandbox/data/dirty.ts',
        relativeFilename: 'data/dirty.ts',
        errors: [{
            name: 'TypeScript error',
            fullFilename: '/home/ubuntu/workspace/sandbox/data/dirty.ts',
            relativeFilename: 'data/dirty.ts',
            startPosition: {
                position: 106,
                line: 6,
                character: 17
            },
            endPosition: {
                position: 110,
                line: 6,
                character: 22
            },
            message: '\u001b[31mdata/dirty.ts(6,17): \u001b[39merror TS2339: Property \'loggg\' does not exist on type \'Console\'.',
            diagnostic: {
                start: 106,
                length: 5,
                code: 2339,
                category: 1,
                messageText: 'Property \'loggg\' does not exist on type \'Console\'.'
            },
            tsFile: {
                kind: 251,
                pos: 0,
                end: 222,
                flags: 0,
                text: 'export class Dirty {\n    private str = \'\';\n\n    constructor() {\n        this.str = \'woo\';\n        console.loggg(\'hello\');\n    }\n\n    chop(): number {\n        const tab = this.str.split(\'/\');\n        return tab[0];\n    }\n}\n',
                languageVersion: undefined,
                fileName: '/home/ubuntu/workspace/sandbox/data/dirty.ts',
                languageVariant: 0,
                scriptKind: 3,
                referencedFiles: [],
                amdDependencies: [],
                moduleName: undefined,
                nodeCount: 48,
                identifierCount: 11,
                parseDiagnostics: [],
                path: '/home/ubuntu/workspace/sandbox/data/dirty.ts',
                symbolCount: 22076,
                id: 15022
            }
        }, {
            name: 'TypeScript error',
            fullFilename: '/home/ubuntu/workspace/sandbox/data/dirty.ts',
            relativeFilename: 'data/dirty.ts',
            startPosition: {
                position: 206,
                line: 11,
                character: 16
            },
            endPosition: {
                position: 211,
                line: 11,
                character: 22
            },
            message: '\u001b[31mdata/dirty.ts(11,16): \u001b[39merror TS2322: Type \'string\' is not assignable to type \'number\'.',
            diagnostic: {
                start: 206,
                length: 6,
                code: 2322,
                category: 1,
                messageText: 'Type \'string\' is not assignable to type \'number\'.'
            },
            tsFile: {
                kind: 251,
                pos: 0,
                end: 222,
                flags: 0,
                text: 'export class Dirty {\n    private str = \'\';\n\n    constructor() {\n        this.str = \'woo\';\n        console.loggg(\'hello\');\n    }\n\n    chop(): number {\n        const tab = this.str.split(\'/\');\n        return tab[0];\n    }\n}\n',
                languageVersion: undefined,
                fileName: '/home/ubuntu/workspace/sandbox/data/dirty.ts',
                languageVariant: 0,
                scriptKind: 3,
                referencedFiles: [],
                amdDependencies: [],
                moduleName: undefined,
                nodeCount: 48,
                identifierCount: 11,
                parseDiagnostics: [],
                path: '/home/ubuntu/workspace/sandbox/data/dirty.ts',
                symbolCount: 22076,
                id: 15022
            }
        }]
    },
    awful: {
        fullFilename: '/home/ubuntu/workspace/sandbox/data/awful.ts',
        relativeFilename: 'data/awful.ts',
        errors: [{
            name: 'TypeScript error',
            fullFilename: '/home/ubuntu/workspace/sandbox/data/awful.ts',
            relativeFilename: 'data/awful.ts',
            startPosition: {
                position: 21,
                line: 1,
                character: 22
            },
            endPosition: {
                position: 33,
                line: 1,
                character: 35
            },
            message: '\u001b[31mdata/awful.ts(1,22): \u001b[39merror TS2307: Cannot find module \'./dirtyy.ts\'.',
            diagnostic: {
                start: 21,
                length: 13,
                code: 2307,
                category: 1,
                messageText: 'Cannot find module \'./dirtyy.ts\'.'
            },
            tsFile: {
                kind: 251,
                pos: 0,
                end: 305,
                flags: 0,
                text: 'import {Dirtyy} from \'./dirtyy.ts\';\n\nclass Awful {\n    private str = \'\';\n\n    constructor() {\n        this.something = \'woo\';\n    }\n    \n    chop(): number {\n        var tab = []\n        return tab[\'hello\'];\n    }\n    \n    call() {\n        let dirty = new Dirty();\n        return dirty.nothing();\n    }\n}\n',
                languageVersion: undefined,
                fileName: '/home/ubuntu/workspace/sandbox/data/awful.ts',
                languageVariant: 0,
                scriptKind: 3,
                referencedFiles: [],
                amdDependencies: [],
                moduleName: undefined,
                nodeCount: 53,
                identifierCount: 13,
                parseDiagnostics: [],
                path: '/home/ubuntu/workspace/sandbox/data/awful.ts',
                symbolCount: 22062,
                id: 14999
            }
        }, {
            name: 'TypeScript error',
            fullFilename: '/home/ubuntu/workspace/sandbox/data/awful.ts',
            relativeFilename: 'data/awful.ts',
            startPosition: {
                position: 107,
                line: 7,
                character: 14
            },
            endPosition: {
                position: 115,
                line: 7,
                character: 23
            },
            message: '\u001b[31mdata/awful.ts(7,14): \u001b[39merror TS2339: Property \'something\' does not exist on type \'Awful\'.',
            diagnostic: {
                start: 107,
                length: 9,
                code: 2339,
                category: 1,
                messageText: 'Property \'something\' does not exist on type \'Awful\'.'
            },
            tsFile: {
                kind: 251,
                pos: 0,
                end: 305,
                flags: 0,
                text: 'import {Dirtyy} from \'./dirtyy.ts\';\n\nclass Awful {\n    private str = \'\';\n\n    constructor() {\n        this.something = \'woo\';\n    }\n    \n    chop(): number {\n        var tab = []\n        return tab[\'hello\'];\n    }\n    \n    call() {\n        let dirty = new Dirty();\n        return dirty.nothing();\n    }\n}\n',
                languageVersion: undefined,
                fileName: '/home/ubuntu/workspace/sandbox/data/awful.ts',
                languageVariant: 0,
                scriptKind: 3,
                referencedFiles: [],
                amdDependencies: [],
                moduleName: undefined,
                nodeCount: 53,
                identifierCount: 13,
                parseDiagnostics: [],
                path: '/home/ubuntu/workspace/sandbox/data/awful.ts',
                symbolCount: 22062,
                id: 14999
            }
        }, {
            name: 'TypeScript error',
            fullFilename: '/home/ubuntu/workspace/sandbox/data/awful.ts',
            relativeFilename: 'data/awful.ts',
            startPosition: {
                position: 170,
                line: 11,
                character: 13
            },
            endPosition: {
                position: 172,
                line: 11,
                character: 16
            },
            message: '\u001b[31mdata/awful.ts(11,13): \u001b[39merror TS7005: Variable \'tab\' implicitly has an \'any[]\' type.',
            diagnostic: {
                start: 170,
                length: 3,
                code: 7005,
                category: 1,
                messageText: 'Variable \'tab\' implicitly has an \'any[]\' type.'
            },
            tsFile: {
                kind: 251,
                pos: 0,
                end: 305,
                flags: 0,
                text: 'import {Dirtyy} from \'./dirtyy.ts\';\n\nclass Awful {\n    private str = \'\';\n\n    constructor() {\n        this.something = \'woo\';\n    }\n    \n    chop(): number {\n        var tab = []\n        return tab[\'hello\'];\n    }\n    \n    call() {\n        let dirty = new Dirty();\n        return dirty.nothing();\n    }\n}\n',
                languageVersion: undefined,
                fileName: '/home/ubuntu/workspace/sandbox/data/awful.ts',
                languageVariant: 0,
                scriptKind: 3,
                referencedFiles: [],
                amdDependencies: [],
                moduleName: undefined,
                nodeCount: 53,
                identifierCount: 13,
                parseDiagnostics: [],
                path: '/home/ubuntu/workspace/sandbox/data/awful.ts',
                symbolCount: 22062,
                id: 14999
            }
        }, {
            name: 'TypeScript error',
            fullFilename: '/home/ubuntu/workspace/sandbox/data/awful.ts',
            relativeFilename: 'data/awful.ts',
            startPosition: {
                position: 256,
                line: 16,
                character: 25
            },
            endPosition: {
                position: 260,
                line: 16,
                character: 30
            },
            message: '\u001b[31mdata/awful.ts(16,25): \u001b[39merror TS2304: Cannot find name \'Dirty\'.',
            diagnostic: {
                start: 256,
                length: 5,
                code: 2304,
                category: 1,
                messageText: 'Cannot find name \'Dirty\'.'
            },
            tsFile: {
                kind: 251,
                pos: 0,
                end: 305,
                flags: 0,
                text: 'import {Dirtyy} from \'./dirtyy.ts\';\n\nclass Awful {\n    private str = \'\';\n\n    constructor() {\n        this.something = \'woo\';\n    }\n    \n    chop(): number {\n        var tab = []\n        return tab[\'hello\'];\n    }\n    \n    call() {\n        let dirty = new Dirty();\n        return dirty.nothing();\n    }\n}\n',
                languageVersion: undefined,
                fileName: '/home/ubuntu/workspace/sandbox/data/awful.ts',
                languageVariant: 0,
                scriptKind: 3,
                referencedFiles: [],
                amdDependencies: [],
                moduleName: undefined,
                nodeCount: 53,
                identifierCount: 13,
                parseDiagnostics: [],
                path: '/home/ubuntu/workspace/sandbox/data/awful.ts',
                symbolCount: 22062,
                id: 14999
            }
        }, {
            name: 'TypeScript error',
            fullFilename: '/home/ubuntu/workspace/sandbox/data/awful.ts',
            relativeFilename: 'data/awful.ts',
            startPosition: {
                position: 300,
                line: 27,
                character: 10
            },
            endPosition: {
                position: 301,
                line: 27,
                character: 11
            },
            message: '\u001b[31mtest/mocks/dirty.ts(28,11): \u001b[39merror TS2430: Interface \'B\' incorrectly extends interface \'A\'.\n  Types of property \'prop\' are incompatible.\n  Type \'string\' is not assignable to type \'number\'.',
            diagnostic: {
                start: 300,
                length: 1,
                code: 2430,
                category: 1,
                messageText: {
                    messageText: "Interface 'B' incorrectly extends interface 'A'.",
                    category: 1,
                    code: 2430,
                    next: [{
                        messageText: "Types of property 'prop' are incompatible.",
                        category: 1,
                        code: 2326,
                        next: [{
                            messageText: "Type 'string' is not assignable to type 'number'.",
                            category: 1,
                            code: 2322,
                            next: undefined
                        }]
                    }]
                }
            },
            tsFile: {
                kind: 251,
                pos: 0,
                end: 305,
                flags: 0,
                text: 'import {Dirtyy} from \'./dirtyy.ts\';\n\nclass Awful {\n    private str = \'\';\n\n    constructor() {\n        this.something = \'woo\';\n    }\n    \n    chop(): number {\n        var tab = []\n        return tab[\'hello\'];\n    }\n    \n    call() {\n        let dirty = new Dirty();\n        return dirty.nothing();\n    }\n}\n',
                languageVersion: undefined,
                fileName: '/home/ubuntu/workspace/sandbox/data/awful.ts',
                languageVariant: 0,
                scriptKind: 3,
                referencedFiles: [],
                amdDependencies: [],
                moduleName: undefined,
                nodeCount: 53,
                identifierCount: 13,
                parseDiagnostics: [],
                path: '/home/ubuntu/workspace/sandbox/data/awful.ts',
                symbolCount: 22062,
                id: 14999
            }
        }]
    }
}
