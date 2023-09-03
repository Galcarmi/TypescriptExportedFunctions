require("lodash")
const {externalFunc} = require('./file2.js')
const {foo} = require('./file3.js')
const largeFile = require('./file-for-site.js')

export const a =func;
export const b =lodash.func("hi");
export const c = externalFunc;
export const d =foo;

const func = (a,b)=>a+b;
const globalExportedFunction = (a,b,c,d,e)=>a+b;

const obj = {}

export {
    globalExportedFunction,
    obj,
    largeFile
}