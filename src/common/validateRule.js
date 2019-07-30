
import Peg from "../parsers/conditionsParser"
import { throws } from "assert";

const definedFunctions = [
    "moment"
];


export const validateExpression = function ( expr ){
    let parseTree = null;

    try { 
        parseTree = Peg.parse(expr);
        //console.log("Parse Tree", parseTree);
    }
    catch (ex) {
        console.log("ex",  ex);
        throw ex;
        //return true;
    }

    try {
        validateSubTree(parseTree);
    } catch (ex) {
        throw ex;
    }

    return parseTree;
}

function validateFunctionSubTree(subTree) {
    if ((subTree !== null) 
        && (typeof subTree === 'object')
        && (subTree.type == 'function')) {
            if (-1 == definedFunctions.indexOf(subTree.name)) {
                throw new Error(`Undefined Function '{subTree.name}'`);
            }
    }
}

function validateSubTree(subTree) {
    if (Array.isArray(subTree)) {
        subTree.forEach(element => {
            validateSubTree(element);
        });
    }

    validateFunctionSubTree(subTree);
    //validate string
    //validate integer 
    
}