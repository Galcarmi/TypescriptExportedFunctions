const funcReturningObject = () => {
    return {
        foo: (a,b,c,d)=>{
            return 5;
        }
    }
}

module.exports = funcReturningObject()