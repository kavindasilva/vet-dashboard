/**
 * isBefore( moment(), addInterval( moment({{1}}), 7, 'days' ) )
 */
import {APP_MODE} from "../common/constants"
import Moment from 'react-moment';
import momentJS from "moment";

/**
 * all kind of testing and researching done here
 */
export function tes(){
    let str="colouringFunctions tes";

    str = isBefore( moment(), addInterval( moment("2019-05-05"), 7, 'days' ) )
    
    //str = "Date";
    //str = eval("momentJS()").toString(); // error  momentJS is not defined
    //str = momentJS().toString(); // ok
    //if(APP_MODE==="DEBUG")console.log(str);
    return str;
}

/**
 * stmt: JSON
 */
export function main(pegStmt){
    //let stmt = JSON.parse(pegStmt)
    let stmt = pegStmt;

    //return "x"; //ok
    //return checkType(stmt);
    return callFunction(stmt.name, stmt.parameters)

    return stmt;
}

/**
 * check type: function, number, string
 */
function checkType(stmt){
    if(stmt.type === "function"){
        //if(APP_MODE==="DEBUG")console.log("checkType function");
        return callFunction(stmt.name, stmt.parameters);
    }

    else if(stmt.type === "number"){
        if(APP_MODE==="DEBUG")console.log("checkType number");
        return stmt.value;
    }

    else if(stmt.type === "string"){
        if(APP_MODE==="DEBUG")console.log("checkType string");
        return stmt.value;
        //return callFunction(stmt.name, stmt.parameters);
    }

    else
        if(APP_MODE==="DEBUG")console.log("checkType default");
}

function callFunction( funName, parameters=null ){
    if( parameters === null || parameters.length === 0 ){
        if(APP_MODE==="DEBUG")console.log("checkType callFunction if", funName, parameters);
        if(funName === "isBefore")
            return isBefore();
        
        else if(funName === "addInterval")
            return addInterval();

        else if(funName === "moment")
            return moment(parameters);
    }
    else{
        if(APP_MODE==="DEBUG")console.log("checkType callFunction else", funName, parameters);
        parameters.forEach( para => {
            if(para.type === "function")
                return callFunction( para.name, para.parameters );
            else // if(para.type === "number")
                return para.value.toString();
            
        } )
    }
}

export function isBefore(params=null){
    //if(params===null)
    return momentJS().isBefore(params);
    return 1;
}

export function moment(params=null){
    return momentJS(params);
}

export function addInterval(params=null){
    return momentJS().add(params)
    return 3;
}



/**
 * trying to call a function by name dynamically
 */
export function callDynamicFunction(funName){
    if(APP_MODE==="DEBUG")console.log("callDynamicFunction", funName)
    //var codeToExecute = funName;
    //var tmpFunc = new Function(codeToExecute);
    
    var tmpFunc = this[funName];
    return tmpFunc();
}

