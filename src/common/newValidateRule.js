
import Peg from "../parsers/conditionsParser"
//import moment from "../node_modules/moment/moment.js"
import moment from "moment";
import { throws } from "assert";

var fieldValuesList = null;
const executableFunctions = {
    'moment'            : moment,
    'isBefore'          : functionIsBefore, //
    'isAfter'           : functionIsAfter,
    'addDays'           : functionAddPeriod, //
    'substractPeriod'   : functionSubstractPeriod,
    'not'               : functionNot,

    'isInvalid'         : functionIsInvalid,
    'isEmpty'           : functionIsEmpty,
    'eod'               : functionEod,
    //'isAfter': 

};

const acceptableTimeUnits = [ 'd','days', 'w','weeks', 'M','months'];

function getFieldValue(fieldName){
    if(!fieldValuesList)
        throw new Error("field values list empty: ")
    else if(fieldValuesList && (fieldName in fieldValuesList) ){
        return fieldValuesList[fieldName]
    }
    else{
        throw new Error("field value not found. field name: "+fieldName+". field values list: ", fieldValuesList)
    }
}

function functionIsInvalid(){
    if( arguments.length === 1 
        && isDateValid(arguments[0])
    ){
        return false;
    }
    return true;
    // throw new Error("Invalid date format");
}

function functionIsEmpty(){
    if( arguments.length === 1 
        && arguments[0]
    ){
        return false
    }
    return true;
}

// getting eod not working
function functionEod(){
    if( arguments.length === 1 
        && isDateValid(arguments[0])
    ){
        return arguments[0]; // EoD not working for days other than today
    }
    throw new Error("EoD error. args: ", arguments);
}

function functionNot(){
    try{
        if( arguments.length !== 1 
            // && isDateValid(arguments[0])
        ){
            throw new Error("not requires only one arg as params");
        }
        // return !Boolean(arguments[0]);
        return !(Boolean( evaluateSubTree( arguments[0] ) ));
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
        if( arguments.length === 2 
            && isDateValid(arguments[0])
            && isNumParameterValid(arguments[1])
            //&& isTimeUnitValid(arguments[2])
        )
        {
            return moment( arguments[0] ).add( arguments[1], 'd' );
            //return moment(moment( arguments[0] ).add( arguments[1], arguments[2] ));
        }
    }
    catch(e){ // any kind of handled error
        throw new Error(e);
    }
}

function functionSubstractPeriod(){
    try{
        if( arguments.length === 2 
            && isDateValid(arguments[0])
            && isNumParameterValid(arguments[1])
            //&& isTimeUnitValid(arguments[2])
        ){
            return moment( arguments[0] ).subtract( arguments[1], 'd' );
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
    // let args = Array.prototype.slice.call(arguments);
    return moment(arguments[0]).isBefore(moment(arguments[1]));
}

/** evaluates the expression and returns the JS result */
export const evaluateExpression = function (expression, fieldValues=null) {
    // let parseTree = Peg.parse(expression);
    // let evaluationResult = evaluateSubTree(parseTree, fieldValues);
    let evaluationResult = evaluateSubTree(expression, fieldValues); // hardcoded

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
export function evaluateSubTree(subTree, fieldValues=null) {
    if(fieldValues)
        fieldValuesList = fieldValues;

    if (subTree && subTree.type == 'operator') {
        return evaluateOperator(subTree);
    }
    
    else if (subTree.type == 'function') {
        return evaluateFunctionSubTree(subTree);
    }

    else if (Array.isArray(subTree)) { 
        return subTree.map(element => {
            return evaluateSubTree(element);
        });
    }

    else if( subTree === null ){
        throw new Error('Command object expected-received null');
    }
    
    else if (subTree.type === 'field') {
        // console.log("sub tree ", subTree.name)
        return getFieldValue(subTree.name);
        // return field.name
    }

    else if( subTree.type=='boolean' || subTree.type=='number' || subTree.type=='string' || subTree.type=='date' ) // date, number, string
        return subTree.value;

    else if(typeof subTree == 'boolean' || typeof subTree == 'number' || typeof subTree == 'string' ){ // date, number, string for boolean
        return subTree;
    }
    
    // else if (typeof subTree != 'object' ) {
    //     throw new Error('Command object expected', subTree);
    // }

    else {
        throw new Error('Unexpected subtree', subTree);
    }
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
    throw new Error("evaluate operator error: "+commandStructure);

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
    // console.log('result', result);
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
    //throw new Error("Invalid date format")
    return false;
}

function isNumParameterValid(param){
    if(!isNaN(param))
        return true;
    // throw new Error("Invalid parameter value to add/substract")
    return false;
}

function isTimeUnitValid(unit){
    if( acceptableTimeUnits.indexOf(unit) > -1 )
        return true;
    throw new Error(`Undefined time unit ${unit}`);
}


