import { TypeScriptError } from 'gulp-typescript/release/reporter';
import { FormattedError } from './types';
export declare function formatStream(errors: Array<FormattedError>): string;
export declare function formatFile(fileName: string, errors: Array<FormattedError>): string;
export declare function formatError(error: TypeScriptError): string;
