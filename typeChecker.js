const ts = require("typescript");

const getSourceAst = (sourceFilesPath) => {
    debugger
    const tsProgram = ts.createProgram(sourceFilesPath, {
        skipLibCheck: true,
        allowJs: true,
    });

    const extractNamedExports = (statement) => {
        
        
        const declaration = statement?.declarationList?.declarations[0];
        if(declaration){
            const type= typeChecker.getTypeAtLocation(declaration);
            const variableType = typeChecker.typeToString(type);
            return variableType;
        }
    }
    
    
    const ast = tsProgram.getSourceFile(sourceFilesPath[0]);
    const typeChecker = tsProgram.getTypeChecker();
    const exportedFunctions = [];
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
                const type = typeChecker.getTypeAtLocation(element);
                const variableType = typeChecker.typeToString(type);
                exportedFunctions.push(variableType);
            })
        };
    });

    console.log(exportedFunctions);
  };

  getSourceAst(['./file.js'])