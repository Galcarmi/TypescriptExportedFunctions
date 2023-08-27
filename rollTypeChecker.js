const rollup = require('rollup');
const dts = require("rollup-plugin-dts");
const fs = require("fs");
const path = require("path");

const dtsRunner = async () =>{
    const bundle = await rollup.rollup({
        input: fs.readFileSync(path.join(__dirname, "file.js"), "utf-8"),
        plugins: [dts.default({
            compilerOptions: {
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
        })],
        onwarn: e => {
          console.warn(e);
        },
    });
    
    //   const { output } = await bundle
    //     .generate({
    //       file: path.join(__dirname, "index.d.ts"),
    //       format: "es",
    //     })
    //     .finally(bundle.close);

    //     debugger
    //     console.log('fix')
}


console.time('rollup')
dtsRunner().then(()=>console.timeEnd('rollup')).catch((e)=>console.timeEnd('rollup'));