//import {APP_MODE} from "../common/constants"
import { isUndefined } from "util";
import trackerAPI from "../apicalls/trackersAPI"

import { userTypeArray } from "../common/constants"

const trackerAPIObj = new trackerAPI();

const defaultPermissions = () => { 
    let retArr = [];
    for( var i=0; i<userTypeArray.length; i++) {
        retArr.push({ 
            user_account_id: i,  
            is_read_restricted: true,
            is_write_restricted: true,
            is_comment_restricted: true
        });
    }
    return retArr;
}

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

                    //"permissions": defaultPermissions() ,
                    "permissions": [],
                    "color_rules":[]
                }
            );
            return newState;

        case "ADD_CONFIG_RULE_NEW":
            trackerIndex  = getTrackerIndex(newState, action.payload.trackerId); //trackerIndex=-1;
            columnIndex  =  getColumnIndex( newState.configData[trackerIndex], action.payload.columnName); //columnIndex=-1;

            newState.configData[trackerIndex].columns[columnIndex].color_rules.push(
                {
                    "precedence": action.payload.precedenceId,
                    "bgcolor": action.payload.bgcolor,
                    "conditions": action.payload.conditions
                }
            );
            return newState;

        case "DELETE_CONFIG_RULE":
            //return newState;
            trackerIndex  = getTrackerIndex(newState, action.payload.trackerId); //trackerIndex=-1;
            columnIndex  =  getColumnIndex( newState.configData[trackerIndex], action.payload.columnName); //columnIndex=-1;
            precedenceIndex  =  getRulesIndex( newState.configData[trackerIndex].columns[columnIndex], action.payload.precedenceId); //precedenceIndex=-1;

            newState.configData[trackerIndex].columns[columnIndex].color_rules.splice(precedenceIndex, 1);

            return newState;
        
        case "UPDATE_CONFIG_RULE_CONDITION": // can be generalized with RULE_COLOR
            trackerIndex  = getTrackerIndex(newState, action.payload.trackerId); //trackerIndex=-1;
            columnIndex  =  getColumnIndex( newState.configData[trackerIndex], action.payload.columnName); //columnIndex=-1;
            precedenceIndex  =  getRulesIndex( newState.configData[trackerIndex].columns[columnIndex], action.payload.precedenceId); //precedenceIndex=-1;

            newState.configData[trackerIndex].columns[columnIndex].color_rules[precedenceIndex]["conditions"] = action.payload.precedenceConditions;
            return newState;


        case "UPDATE_CONFIG_RULE_COLOR":
            trackerIndex  = getTrackerIndex(newState, action.payload.trackerId); //trackerIndex=-1;
            columnIndex  =  getColumnIndex( newState.configData[trackerIndex], action.payload.columnName); //columnIndex=-1;
            precedenceIndex  =  getRulesIndex( newState.configData[trackerIndex].columns[columnIndex], action.payload.precedenceId); //precedenceIndex=-1;

            newState.configData[trackerIndex].columns[columnIndex].color_rules[precedenceIndex][action.payload.attribute] = action.payload.precedenceColor;
            return newState;

        
        case "UPDATE_CONFIG_RULE_UP": //could be combined with rule-down
            //return newState;
            trackerIndex  = getTrackerIndex(newState, action.payload.trackerId); //trackerIndex=-1;
            columnIndex  =  getColumnIndex( newState.configData[trackerIndex], action.payload.columnName); //columnIndex=-1;

            //  [arr[0], arr[1]] = [arr[1], arr[0]];
            ruleArr = newState.configData[trackerIndex].columns[columnIndex].color_rules;
            ruleIndex = action.payload.ruleIndex;

            [ruleArr[ruleIndex-1], ruleArr[ruleIndex]] = [ruleArr[ruleIndex], ruleArr[ruleIndex-1]];

            newState.configData[trackerIndex].columns[columnIndex].color_rules = ruleArr;
            return newState;


        case "UPDATE_CONFIG_RULE_DOWN":
            //return newState;
            trackerIndex  = getTrackerIndex(newState, action.payload.trackerId); //trackerIndex=-1;
            columnIndex  =  getColumnIndex( newState.configData[trackerIndex], action.payload.columnName); //columnIndex=-1;

            //  [arr[0], arr[1]] = [arr[1], arr[0]];
            ruleArr = newState.configData[trackerIndex].columns[columnIndex].color_rules;
            ruleIndex = action.payload.ruleIndex;

            [ruleArr[ruleIndex+1], ruleArr[ruleIndex]] = [ruleArr[ruleIndex], ruleArr[ruleIndex+1]];

            newState.configData[trackerIndex].columns[columnIndex].color_rules = ruleArr;
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
            let userPermitIndex  = getUserPermissionIndex( newState.configData[trackerIndex].columns[columnIndex], action.payload.user_account_id); //userPermitIndex=-1;
            console.log("trackConfig userPermitInedx", userPermitIndex)

            if( userPermitIndex===null || userPermitIndex===undefined || userPermitIndex===-1){ // add column 
                userPermitIndex = newState.configData[trackerIndex].columns[columnIndex].permissions.length; 

                newState.configData[trackerIndex].columns[columnIndex].permissions.push({
                    user_account_id: parseInt(action.payload.user_account_id),
                    is_read_restricted: false,
                    is_write_restricted: false,
                    is_comment_restricted: false,
                });
            }

            if(action.payload.rwType==="read")
                newState.configData[trackerIndex].columns[columnIndex].permissions[userPermitIndex]["is_read_restricted"]=action.payload.rwcValue;
            else if(action.payload.rwType==="write")
                newState.configData[trackerIndex].columns[columnIndex].permissions[userPermitIndex]["is_write_restricted"]=action.payload.rwcValue;
            else if(action.payload.rwType==="comment")
                newState.configData[trackerIndex].columns[columnIndex].permissions[userPermitIndex]["is_comment_restricted"]=action.payload.rwcValue;


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
 * user_account_id: user account id to find index
 */
function getUserPermissionIndex(stt, user_account_id){
    let indexStatus = stt.permissions.findIndex( user => (
        user.user_account_id === user_account_id
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
    let indexStatus = stt.color_rules.findIndex( prec => (
        prec.precedence === precedenceId
    ) );
    if(indexStatus > -1)
        return indexStatus;
    console.log("getRulesIndex index err");
}

export default TrackConfigReducer