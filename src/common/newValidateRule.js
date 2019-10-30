
import Peg from "../parsers/conditionsParser"
//import moment from "../node_modules/moment/moment.js"
import moment from "moment";
import { throws } from "assert";


const executableFunctions = {
    'moment'            : moment,
    'isBefore'          : functionIsBefore,
    'isAfter'           : functionIsAfter,
    'addDays'           : functionAddPeriod,
    'substractPeriod'   : functionSubstractPeriod,
    'not'               : functionNot,
    //'isAfter': 

};

const acceptableTimeUnits = [ 'd','days', 'w','weeks', 'M','months'];

function functionNot(){
    try{
        if( arguments.length !== 1 
            // && isDateValid(arguments[0])
        ){
            throw new Error("not requires only one arg as params");
        }
        return !Boolean(arguments[0]);
    }
    catch(e){
        throw new Error(e);
    }
}

/** 
 * adds a date period to a given date. returns a new date 
 * 
 * example: addPeriod(moment('2010-03-01'),5,'days') => return '2010-03-06'
 * */
function functionAddPeriod(){
    try{
        if( arguments.length === 3 
            && isDateValid(arguments[0])
            && isNumParameterValid(arguments[1])
            && isTimeUnitValid(arguments[2])
        )
        {
            return moment( arguments[0] ).add( arguments[1], arguments[2] );
            //return moment(moment( arguments[0] ).add( arguments[1], arguments[2] ));
        }
    }
    catch(e){ // any kind of handled error
        throw new Error(e);
    }
}

function functionSubstractPeriod(){
    try{
        if( arguments.length === 3 
            && isDateValid(arguments[0])
            && isNumParameterValid(arguments[1])
            && isTimeUnitValid(arguments[2])
        ){
            return moment( arguments[0] ).subtract( arguments[1], arguments[2] );
        }
    }
    catch(e){
        throw new Error(e);
    }
}

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
    if ((arguments.length !== 2) 
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

    if(typeof evaluationResult !== "boolean") //should return only bool
        throw new Error ("Expression should return only boolean value");
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

/** evaluates a valid type PegJS result . entry point */
export function evaluateSubTree(subTree) {
    if (subTree && subTree.type == 'operator') {
        return evaluateOperator(subTree);
    }
    
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

    if (subTree.type == 'field') {
        return 1;
        // return field.value
    }

    // field, number, string
    return subTree.value;
    
}

/** evaluate operator. returns bool */
function evaluateOperator(commandStructure){ //console.log("eval operator", commandStructure.operands.length);
    if ( (commandStructure !== null) && (typeof commandStructure == 'object') && commandStructure.operands && commandStructure.operands.length == 2) { 
        //if(commandStructure.name)
        switch(commandStructure.name){
            case "&&":
                return Boolean(evaluateSubTree(commandStructure.operands[0])) && Boolean(evaluateSubTree(commandStructure.operands[1]));
            case "||":
                return Boolean(evaluateSubTree(commandStructure.operands[0])) || Boolean(evaluateSubTree(commandStructure.operands[1]));
            default:
                throw new Error("Unexpected operator: "+commandStructure.name);
        }    
    }


    // switch(commandStructure.name){
    //     case "&&":
    //         return param1 && param2;
    //     case "||":
    //         return param1 || param2;
    //     default:
    //         throw new Error("Unexpected operator: "+operator);
    // }
}

/** evaluates a function with/without paramters and returns result */
function evaluateFunctionSubTree(commandStructure) {
    if (!executableFunctions.hasOwnProperty(commandStructure.name)) {
        throw new Error(`Undefined Function: ${commandStructure.name}`);
    }
    
    //console.log('evaluate', commandStructure, executableFunctions[commandStructure.name]);
    let evaluatedParameters = evaluateSubTree(commandStructure.operands);
    //console.log('evaluatedParameters', evaluatedParameters);
    let result = executableFunctions[commandStructure.name].apply(null, evaluatedParameters);
    //console.log('result', result);
    return result;

}

/**
 * checks date format
 * 
 * if invalid throws "Invalid date format" error
 * 
 * else returns true
 */
function isDateValid(date){
    if( moment(date).isValid() )
        return true;
    throw new Error("Invalid date format")
}

function isNumParameterValid(param){
    if(!isNaN(param))
        return true;
    throw new Error("Invalid parameter value to add/substract")
}

function isTimeUnitValid(unit){
    if( acceptableTimeUnits.indexOf(unit) > -1 )
        return true;
    throw new Error(`Undefined time unit ${unit}`);
}


