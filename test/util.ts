import { DOMParser } from 'xmldom';

export function parseAndValidate(xml: string): Document | undefined {
    if (!xml) {
        return undefined;
    }

    const errors: Array<[string, any]> = [];

    const doc = new DOMParser({
        locator: {},
        errorHandler: (lvl, msg) => errors.push([lvl, msg]),
    }).parseFromString(xml);

    expect(errors).toEqual([]);
    return doc;
}
