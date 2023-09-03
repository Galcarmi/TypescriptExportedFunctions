const ts = require("typescript");

const preWarmTypescriptCompiler = () => {
    const tsPrograms = ts.createProgram(['./emptyFile.js'], {
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
    });
}

const getExportedFunctions = (sourceFilesPath) => {
    debugger
    console.time('initializeTsProgram');
    const tsProgram = ts.createProgram(sourceFilesPath, {
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
    });
    console.timeEnd('initializeTsProgram');

    const isFunctionOrAnyType = (type) => {
        const symbolEscapedName = type?.getSymbol()?.getEscapedName();
        // if symbolEscapedName is undefined, it means that the type is any - still need to be verified
        if(symbolEscapedName === '__function' || !symbolEscapedName){
            return true;
        }

        return false;
    }

    const extractNamedExports = (statement) => {
        const declaration = statement?.declarationList?.declarations[0];
        if(declaration){
            return typeChecker.getTypeAtLocation(declaration);
        }
    }
    
    const ast = tsProgram.getSourceFile(sourceFilesPath[0]);
    const typeChecker = tsProgram.getTypeChecker();
    const exportedElements = [];
    ast.statements.forEach((statement) => {
        debugger;
        const modifier = statement?.modifiers?.[0];
        if(modifier && ts.isExportOrDefaultModifier(modifier)){
            const extractedNamedExports = extractNamedExports(statement);
            if(extractedNamedExports)
            {
                exportedFunctions.push(extractedNamedExports);
            }
        }
        
        if(ts.isExportDeclaration(statement)){
            statement.exportClause.elements.forEach((element)=>{
                debugger
                const type = typeChecker.getTypeAtLocation(element);
                exportedFunctions.push(type);
            })
        };
    });

    return exportedElements.filter(isFunctionOrAnyType).map(type=>typeChecker.typeToString(type))
  };

console.time('preWarmTypescriptCompiler');
preWarmTypescriptCompiler();
console.timeEnd('preWarmTypescriptCompiler');

console.time('getExportedFunctions');
console.log('functions', getExportedFunctions(['./file.js']))
console.timeEnd('getExportedFunctions');
console.log("Memory Usage:", process.memoryUsage());