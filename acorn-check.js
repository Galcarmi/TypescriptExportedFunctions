const {listExportedFunctions} = require('@wix/cloud-static-code-analysis');
const path = require("path");
const fs = require("fs");

const code = fs.readFileSync(path.join(__dirname, 'large-file.js'), 'utf-8');
console.time('getSourceAst');
const exportedFunctions = listExportedFunctions(code, true);
console.log(exportedFunctions);
console.timeEnd('getSourceAst');
console.log("Memory Usage:", process.memoryUsage());