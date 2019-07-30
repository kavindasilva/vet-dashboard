
import Peg from "../parsers/conditionsParser"
import { throws } from "assert";

const definedFunctions = [
    "moment",
    "isBefore",
    "isAfter"
];


export const validateExpression = function ( expr ){
    let parseTree = null;

    try { 
        parseTree = Peg.parse(expr);
        //console.log("Parse Tree", parseTree);
    }
    catch (ex) {
        //console.log("ex1",  ex);
        throw ex;
        //return true;
    }

    try {
        validateSubTree(parseTree);
    } catch (ex) {
        //console.log("ex2",  ex);
        throw ex;
    }

    return parseTree;
}

function validateSubTree(subTree) {
    if (Array.isArray(subTree)) { //if s
        subTree.forEach(element => {
            validateSubTree(element);
        });
    }

    if( 
        !validateFunctionSubTree(subTree) 
        && !validateString(subTree)
        && !validateNumber(subTree)
    ){
        throw new Error(`unknown type ${subTree.toString()}`);
    }
    //validate integer 
    
    
}

function validateString(subTree){
    if( subTree !== null
        && (typeof subTree)==="object"
        && (subTree.type === "string")
    ){
        return true;
    }
    return false;
}

function validateNumber(subTree){
    if( subTree !== null
        && (typeof subTree)==="object"
        && (subTree.type === "number")
    ){
        return true;
    }
    return false;
}

function validateFunctionSubTree(subTree) {
    if ((subTree !== null) 
        && (typeof subTree === 'object')
        && (subTree.type == 'function')
    ){
        if (-1 === definedFunctions.indexOf(subTree.name)) {
            //throw new Error("Undefined Function");
            throw new Error(`Undefined Function: ${subTree.name}`);
        }
        return true;
    }
    return false;
}

