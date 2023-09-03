const ts = require("typescript");

const typescriptCompilerOptions = {
    skipLibCheck: true,
    allowJs: true,
    noEmit: true,
    noEmitOnError: true,
    noStrictGenericChecks: true,
    skipDefaultLibCheck: true,
    declaration: false,
    declarationMap: false,
    noUnusedLocals: false,
    noUnusedParameters: false,
}

const preWarmTypescriptCompiler = () => {
    ts.createProgram(['./emptyFile.js'], typescriptCompilerOptions);
}

const getExportedFunctions = (sourceFilesPath) => {
    console.time('initializeTsProgram');
    const tsProgram = ts.createProgram(sourceFilesPath, typescriptCompilerOptions);
    console.timeEnd('initializeTsProgram');

    const isFunctionOrAnyType = (type) => {
        const symbolEscapedName = type?.getSymbol()?.getEscapedName();
        // if symbolEscapedName is undefined, it means that the type is any - still need to be verified
        if(symbolEscapedName === '__function' || !symbolEscapedName){
            return true;
        }

        return false;
    }

    const ast = tsProgram.getSourceFile(sourceFilesPath[0]);
    const typeChecker = tsProgram.getTypeChecker();
    const exportedElements = [];

    for(let i=0; i<ast.statements.length; i++){
        const statement = ast.statements[i];
        const modifier = statement?.modifiers?.[0];
        if(modifier && ts.isExportOrDefaultModifier(modifier)){
            const declaration = statement?.declarationList?.declarations[0];
            if(!declaration){
                continue;
            }

            exportedElements.push(
                {
                    type: typeChecker.getTypeAtLocation(declaration),
                    name: declaration.name.escapedText
                }
            );
        }else if(ts.isExportDeclaration(statement)){
            statement.exportClause.elements.forEach((element)=>{
                exportedElements.push(
                    {
                        name: element.name.escapedText,
                        type: typeChecker.getTypeAtLocation(element),
                    }
                );
            })
        };
    };

    return exportedElements
            .filter(({type})=>isFunctionOrAnyType(type))
            .map(({type, name})=>({
                name,
                type: typeChecker.typeToString(type),
            }))
  };

console.time('preWarmTypescriptCompiler');
preWarmTypescriptCompiler();
console.timeEnd('preWarmTypescriptCompiler');

console.time('getExportedFunctions');
console.log('functions', getExportedFunctions(['./file.js']))
console.timeEnd('getExportedFunctions');
console.log("Memory Usage:", process.memoryUsage());