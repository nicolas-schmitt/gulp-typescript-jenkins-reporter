import { TypeScriptError } from 'gulp-typescript/release/reporter';

export interface FormattedError {
    xml: string;
    path: string;
}

export type TypescriptErrorPosition = NonNullable<TypeScriptError['startPosition']>;

export interface ReportOptions {
    sort: boolean;
    filename: string;
    pathBase: string;
    pathPrefix: string;
}
