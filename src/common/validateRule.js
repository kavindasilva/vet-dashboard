
import Peg from "../parsers/conditionsParser"
//import moment from "../node_modules/moment/moment.js"
import moment from "moment";
import { throws } from "assert";


const executableFunctions = {
    'moment'            : moment,
    'isBefore'          : functionIsBefore,
    'isAfter'           : functionIsAfter,
    'addPeriod'         : functionAddPeriod,
    'substractPeriod'   : functionSubstractPeriod,
    //'isAfter': 

};

const acceptableTimeUnits = [ 'd','days', 'w','weeks', 'M','months'];

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

        // else if( arguments.length === 2 
        //     //&& isDateValid(arguments[0])
        //     && isNumParameterValid(arguments[0])
        //     && isTimeUnitValid(arguments[1])
        // )
        //     return moment().add( arguments[1], arguments[2] );
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
        //if(APP_MODE==="DEBUG")console.log("Parse Tree", parseTree);
    }
    catch (ex) {
        //if(APP_MODE==="DEBUG")console.log("ex1",  ex);
        throw ex;
        //return true;
    }

    try {
        evaluateSubTree(parseTree);
    } catch (ex) {
        //if(APP_MODE==="DEBUG")console.log("ex2",  ex);
        throw ex;
    }

    return parseTree;
}

/** evaluates a valid type PegJS result  */
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

/** evaluates a function with/without paramters and returns result */
function evaluateFunctionSubTree(commandStructure) {
    if (!executableFunctions.hasOwnProperty(commandStructure.name)) {
        throw new Error(`Undefined Function: ${commandStructure.name}`);
    }
    
    //if(APP_MODE==="DEBUG")console.log('evaluate', commandStructure, executableFunctions[commandStructure.name]);
    let evaluatedParameters = evaluateSubTree(commandStructure.parameters);
    //if(APP_MODE==="DEBUG")console.log('evaluatedParameters', evaluatedParameters);
    let result = executableFunctions[commandStructure.name].apply(null, evaluatedParameters);
    //if(APP_MODE==="DEBUG")console.log('result', result);
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


