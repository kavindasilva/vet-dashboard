
import Peg from "../parsers/conditionsParser"
//import moment from "../node_modules/moment/moment.js"
import moment from "moment";
import { throws } from "assert";


const executableFunctions = {
    'moment' : moment,
    'isBefore' : functionIsBefore,
    'isAfter' : functionIsAfter
    //'isAfter': 

};

/** checks param1 is after param2 */
function functionIsAfter() {
    if ((arguments.length != 2) 
        || !moment(arguments[0]).isValid()
        || !moment(arguments[1]).isValid()
        ) {
        throw new Error("isAfter requires 2 moment() objects as arguments.")
    }
    return moment(arguments[0]).isAfter(moment(arguments[1]));
}

/** checks param1 is before param2 */
function functionIsBefore() {
    if ((arguments.length != 2) 
        || !moment(arguments[0]).isValid()
        || !moment(arguments[1]).isValid()
        ) {
        throw new Error("isBefore requires 2 moment() objects as arguments.")
    }
    let args = Array.prototype.slice.call(arguments);
    return moment(arguments[0]).isBefore(moment(arguments[1]));
}

/** evaluates the expression and returns the JS result */
export const evaluateExpression = function (expression) {
    let parseTree = Peg.parse(expression);
    let evaluationResult = evaluateSubTree(parseTree);
    return evaluationResult;

}

/** returns the JSON representation of the expression */
export const validateExpression = function (expression) {
    let parseTree = null;

    try { 
        parseTree = Peg.parse(expression);
        //console.log("Parse Tree", parseTree);
    }
    catch (ex) {
        //console.log("ex1",  ex);
        throw ex;
        //return true;
    }

    try {
        evaluateSubTree(parseTree);
    } catch (ex) {
        //console.log("ex2",  ex);
        throw ex;
    }

    return parseTree;
}

export function evaluateSubTree(subTree) {
    if (Array.isArray(subTree)) { 
        return subTree.map(element => {
            return evaluateSubTree(element);
        });
    }

    if ((subTree === null) || (typeof subTree != 'object')) {
        throw new Error('Command object expected');
    }

    if (subTree.type == 'function') {
        return evaluateFunctionSubTree(subTree);
    }

    return subTree.value;
    
}

function evaluateFunctionSubTree(commandStructure) {
    if (!executableFunctions.hasOwnProperty(commandStructure.name)) {
        throw new Error(`Undefined Function: ${commandStructure.name}`);
    }
    
    //console.log('evaluate', commandStructure, executableFunctions[commandStructure.name]);
    let evaluatedParameters = evaluateSubTree(commandStructure.parameters);
    //console.log('evaluatedParameters', evaluatedParameters);
    let result = executableFunctions[commandStructure.name].apply(null, evaluatedParameters);
    //console.log('result', result);
    return result;

}


