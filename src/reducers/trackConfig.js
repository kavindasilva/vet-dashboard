//import {APP_MODE} from "../common/constants"
import { isUndefined } from "util";
import trackerAPI from "../apicalls/trackersAPI"
const trackerAPIObj = new trackerAPI();

const TrackConfigReducer = (state, action) => {
    console.log("TrackConfigReducer: state: ", state, "\naction: ", action)
    let newState = {
        TrackerConfigReducer:{
            configData: false,
        }
    };

    if(state===undefined || isUndefined(state))
        state=null;
    newState = { ...state }
    
    let trackerIndex=null
    let columnIndex=null
    let ruleArr=null
    let ruleIndex=null;
    let precedenceIndex=null;
    let temp=null;

    switch (action.type) {
        case 'GET_CONFIG_FROM_DB':
            newState = { configData: action.payload.data }
            console.log("TrackConfigReducer GET_CONFIG_FROM_DB: ", newState);
            return newState;

        case 'SAVE_CONFIG_TO_DB':
            trackerIndex  = getTrackerIndex(newState, action.payload.trackerId);
            trackerAPIObj.saveTrackerConfig(
                { columns: newState.configData[trackerIndex].columns},
                action.payload.trackerId
            );
            return newState;

        case "ADD_CONFIG_COLUMN_NEW":
            trackerIndex  = getTrackerIndex(newState, action.payload.trackerId); //trackerIndex=-1;

            newState.configData[trackerIndex].columns.push(
                {
                    "name": action.payload.columnName,
                    "label": action.payload.columnLabel,
                    "type": action.payload.columnDataType,

                    "permissions":[],
                    "rules":[]
                }
            );
            return newState;

        case "ADD_CONFIG_RULE_NEW":
            trackerIndex  = getTrackerIndex(newState, action.payload.trackerId); //trackerIndex=-1;
            columnIndex  =  getColumnIndex( newState.configData[trackerIndex], action.payload.columnName); //columnIndex=-1;

            newState.configData[trackerIndex].columns[columnIndex].rules.push(
                {
                    "precedence": action.payload.precedenceId,
                    "bgcolor": action.payload.bgcolor,
                    "conditions": action.payload.conditions
                }
            );
            return newState;
        
        case "UPDATE_CONFIG_RULE_CONDITION": // can be generalized with RULE_COLOR
            trackerIndex  = getTrackerIndex(newState, action.payload.trackerId); //trackerIndex=-1;
            columnIndex  =  getColumnIndex( newState.configData[trackerIndex], action.payload.columnName); //columnIndex=-1;
            precedenceIndex  =  getRulesIndex( newState.configData[trackerIndex].columns[columnIndex], action.payload.precedenceId); //precedenceIndex=-1;

            newState.configData[trackerIndex].columns[columnIndex].rules[precedenceIndex]["conditions"] = action.payload.precedenceConditions;
            return newState;


        case "UPDATE_CONFIG_RULE_COLOR":
            trackerIndex  = getTrackerIndex(newState, action.payload.trackerId); //trackerIndex=-1;
            columnIndex  =  getColumnIndex( newState.configData[trackerIndex], action.payload.columnName); //columnIndex=-1;
            precedenceIndex  =  getRulesIndex( newState.configData[trackerIndex].columns[columnIndex], action.payload.precedenceId); //precedenceIndex=-1;

            newState.configData[trackerIndex].columns[columnIndex].rules[precedenceIndex][action.payload.attribute] = action.payload.precedenceColor;
            return newState;

        
        case "UPDATE_CONFIG_RULE_UP": //could be combined with rule-down
            //return newState;
            trackerIndex  = getTrackerIndex(newState, action.payload.trackerId); //trackerIndex=-1;
            columnIndex  =  getColumnIndex( newState.configData[trackerIndex], action.payload.columnName); //columnIndex=-1;

            //  [arr[0], arr[1]] = [arr[1], arr[0]];
            ruleArr = newState.configData[trackerIndex].columns[columnIndex].rules;
            ruleIndex = action.payload.ruleIndex;

            [ruleArr[ruleIndex-1], ruleArr[ruleIndex]] = [ruleArr[ruleIndex], ruleArr[ruleIndex-1]];

            newState.configData[trackerIndex].columns[columnIndex].rules = ruleArr;
            return newState;


        case "UPDATE_CONFIG_RULE_DOWN":
            //return newState;
            trackerIndex  = getTrackerIndex(newState, action.payload.trackerId); //trackerIndex=-1;
            columnIndex  =  getColumnIndex( newState.configData[trackerIndex], action.payload.columnName); //columnIndex=-1;

            //  [arr[0], arr[1]] = [arr[1], arr[0]];
            ruleArr = newState.configData[trackerIndex].columns[columnIndex].rules;
            ruleIndex = action.payload.ruleIndex;

            [ruleArr[ruleIndex+1], ruleArr[ruleIndex]] = [ruleArr[ruleIndex], ruleArr[ruleIndex+1]];

            newState.configData[trackerIndex].columns[columnIndex].rules = ruleArr;
            return newState;


        case "UPDATE_CONFIG_ATTR":
            //return;
            trackerIndex  = getTrackerIndex(newState, action.payload.trackerId); //trackerIndex=-1;
            columnIndex  =  getColumnIndex( newState.configData[trackerIndex], action.payload.columnName); //columnIndex=-1;
            newState.configData[trackerIndex].columns[columnIndex][action.payload.attribute] = action.payload.value;
            
            console.log("TrackConfigReducer UPDATE_CONFIG_ATTR: ", newState);
            return newState;
        

        case "UPDATE_CONFIG_USER_PERMISSIONS":
            //return state; // to check whether not working update
            trackerIndex  = getTrackerIndex(newState, action.payload.trackerId); //trackerIndex=-1;
            columnIndex  =  getColumnIndex( newState.configData[trackerIndex], action.payload.columnName); //columnIndex=-1;
            let userPermitIndex  = getUserPermissionIndex( newState.configData[trackerIndex].columns[columnIndex], action.payload.userId); //userPermitIndex=-1;

            if(action.payload.rwType==="read")
                newState.configData[trackerIndex].columns[columnIndex].permissions[userPermitIndex]["read"]=action.payload.rwValue;
            else if(action.payload.rwType==="write")
                newState.configData[trackerIndex].columns[columnIndex].permissions[userPermitIndex]["write"]=action.payload.rwValue;


            console.log("TrackConfigReducer UPDATE_CONFIG_USER_PERMISSIONS: ", newState);
            return newState;

        default:
            console.log("TrackConfigReducer default: ", newState);
            return state;
    }

}

//function 

/**
 * return tracker's index in new state
 * 
 *  stt: newState
 * 
 *  trackerId: trackerId
 */
function getTrackerIndex(stt, trackerId){
    let indexStatus = stt.configData.findIndex( config => (
        config.tracker_id === trackerId
    ) );
    if(indexStatus > -1)
        return indexStatus;
    console.log("getTrackerIndex index err");
}

/**
 * returns column's index of in particular tracker
 * 
 * stt: tracker object
 * 
 * columnName: column name to find index
 */
function getColumnIndex(stt, columnName){
    let indexStatus = stt.columns.findIndex( column => (
        column.name === columnName
    ) );
    if(indexStatus > -1)
        return indexStatus;
    console.log("getColumnIndex index err");
}

/**
 * returns particular tracker's column's, user index of the permissions
 * 
 * stt: tracker column object
 * 
 * userId: user id to find index
 */
function getUserPermissionIndex(stt, userId){
    let indexStatus = stt.permissions.findIndex( user => (
        user.userId === userId
    ) );
    if(indexStatus > -1)
        return indexStatus;
    console.log("getUserPermissionIndex index err");
}

/**
 * returns particular tracker's rule's, precedence index of the rules
 * 
 * stt: tracker column object
 * 
 * precedenceId: precendece's id to find index
 */
function getRulesIndex(stt, precedenceId){
    let indexStatus = stt.rules.findIndex( prec => (
        prec.precedence === precedenceId
    ) );
    if(indexStatus > -1)
        return indexStatus;
    console.log("getRulesIndex index err");
}

export default TrackConfigReducer