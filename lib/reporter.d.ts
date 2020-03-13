import { Reporter } from 'gulp-typescript/release/reporter';
import { VinylFile } from 'gulp-typescript/release/types';
import { ReportOptions } from './types';
export declare function report(partialOptions?: Partial<ReportOptions>): Reporter;
export declare function getReportedFilePath(partialOptions: Partial<ReportOptions>, vinyl: VinylFile): string;
