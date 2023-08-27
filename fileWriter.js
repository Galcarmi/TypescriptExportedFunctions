const path = require("path");
const fs = require("fs");


const writeLargeFile = (filePath, size) => {
    const file = fs.createWriteStream(filePath);
    for (let i = 0; i <= size; i++) {
        file.write(`export const func${i} = (a,b)=>a+b;\n`)
    }
    file.end();
}

writeLargeFile(path.join(__dirname, "large-file.js"), 100000);