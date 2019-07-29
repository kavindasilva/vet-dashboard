
import Peg from "../parsers/conditionsParser"

export function validateExpression( expr ){
    let res = null;
    let error = false;

    try { 
        res = Peg.parse(expr);
        error = false;
    } catch (ex) {
        res = ex.message;
        error = true;
    }

    console.log("validateRule expr",  res);
    return {
        "result": res,
        "error": error,
    }
}

export function sum(a, b) {
    return a + b;
}