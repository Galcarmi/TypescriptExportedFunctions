const {listExportedFunctions} = require('@wix/cloud-static-code-analysis');
const path = require("path");
const fs = require("fs");

console.time('getSourceAst');
const code = fs.readFileSync(path.join(__dirname, 'file.js'), 'utf-8');
const exportedFunctions = listExportedFunctions(code, true);
console.log(exportedFunctions);
console.timeEnd('getSourceAst');
console.log("Memory Usage:", process.memoryUsage());