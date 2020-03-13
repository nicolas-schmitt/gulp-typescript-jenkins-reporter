interface OutputData {
    fullFilename: string,
    relativeFilename: string,
    errors: Array<string>,
    file?: string;
}

const clean: OutputData = {
    fullFilename: '/home/ubuntu/workspace/sandbox/data/clean.ts',
    relativeFilename: 'data/clean.ts',
    errors: [],
};

const dirty: OutputData = {
    fullFilename: '/home/ubuntu/workspace/sandbox/data/dirty.ts',
    relativeFilename: 'data/dirty.ts',
    errors: [
        '<violation beginline="6" begincolumn="17" endline="6" endcolumn="22" priority="1" rule="TS2339">Property &#39;loggg&#39; does not exist on type &#39;Console&#39;.</violation>',
        '<violation beginline="11" begincolumn="16" endline="11" endcolumn="22" priority="1" rule="TS2322">Type &#39;string&#39; is not assignable to type &#39;number&#39;.</violation>',
    ],
};

const awful: OutputData = {
    fullFilename: '/home/ubuntu/workspace/sandbox/data/awful.ts',
    relativeFilename: 'data/awful.ts',
    errors: [
        '<violation beginline="1" begincolumn="22" endline="1" endcolumn="35" priority="1" rule="TS2307">Cannot find module &#39;./dirtyy.ts&#39;.</violation>',
        '<violation beginline="7" begincolumn="14" endline="7" endcolumn="23" priority="1" rule="TS2339">Property &#39;something&#39; does not exist on type &#39;Awful&#39;.</violation>',
        '<violation beginline="11" begincolumn="13" endline="11" endcolumn="16" priority="1" rule="TS7005">Variable &#39;tab&#39; implicitly has an &#39;any[]&#39; type.</violation>',
        '<violation beginline="16" begincolumn="25" endline="16" endcolumn="30" priority="1" rule="TS2304">Cannot find name &#39;Dirty&#39;.</violation>',
        '<violation beginline="27" begincolumn="10" endline="27" endcolumn="11" priority="1" rule="TS2430">Interface &#39;B&#39; incorrectly extends interface &#39;A&#39;.\n  Types of property &#39;prop&#39; are incompatible.\n    Type &#39;string&#39; is not assignable to type &#39;number&#39;.</violation>',
    ],
};

function setFileProperty(data: OutputData) {
    data.file = `<file name="${data.fullFilename}">${data.errors.join('')}</file>`;
}

setFileProperty(clean);
setFileProperty(dirty);
setFileProperty(awful);

export default {
    clean,
    dirty,
    awful,
};
