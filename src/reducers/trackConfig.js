
import { isUndefined } from "util";

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
    let temp=null;

    switch (action.type) {
        case 'GET_CONFIG_FROM_DB':
            newState = {
                configData: action.payload.data,
                
            }
            console.log("TrackConfigReducer GET_CONFIG_FROM_DB: ", newState);

            return newState;

        
        case "UPDATE_CONFIG_RULE_UP": //could be combined with rule-down
            //return newState;
            trackerIndex  = getTrackerIndex(newState, action.payload.trackerId); //trackerIndex=-1;
            temp=(trackerIndex<0)?( console.log("trackerConfig trackerIndex err") ):"";

            columnIndex  =  getColumnIndex( newState.configData[trackerIndex], action.payload.columnName); //columnIndex=-1;
            temp=(columnIndex<0)?( console.log("trackerConfig columnIndex err") ):"";

            //  [arr[0], arr[1]] = [arr[1], arr[0]];
            ruleArr = newState.configData[trackerIndex].columns[columnIndex].rules;
            ruleIndex = action.payload.ruleIndex;

            [ruleArr[ruleIndex-1], ruleArr[ruleIndex]] = [ruleArr[ruleIndex], ruleArr[ruleIndex-1]];

            newState.configData[trackerIndex].columns[columnIndex].rules = ruleArr;
            return newState;


        case "UPDATE_CONFIG_RULE_DOWN":
            //return newState;
            trackerIndex  = getTrackerIndex(newState, action.payload.trackerId); //trackerIndex=-1;
            temp=(trackerIndex<0)?( console.log("trackerConfig trackerIndex err") ):"";

            columnIndex  =  getColumnIndex( newState.configData[trackerIndex], action.payload.columnName); //columnIndex=-1;
            temp=(columnIndex<0)?( console.log("trackerConfig columnIndex err") ):"";

            //  [arr[0], arr[1]] = [arr[1], arr[0]];
            ruleArr = newState.configData[trackerIndex].columns[columnIndex].rules;
            ruleIndex = action.payload.ruleIndex;

            [ruleArr[ruleIndex+1], ruleArr[ruleIndex]] = [ruleArr[ruleIndex], ruleArr[ruleIndex+1]];

            newState.configData[trackerIndex].columns[columnIndex].rules = ruleArr;
            return newState;


        case "UPDATE_CONFIG_ATTR":
            //return;
            trackerIndex  = getTrackerIndex(newState, action.payload.trackerId); //trackerIndex=-1;
            temp=(trackerIndex<0)?( console.log("trackerConfig trackerIndex err") ):"";

            columnIndex  =  getColumnIndex( newState.configData[trackerIndex], action.payload.columnName); //columnIndex=-1;
            temp=(columnIndex<0)?( console.log("trackerConfig columnIndex err") ):"";

            newState.configData[trackerIndex].columns[columnIndex][action.payload.attribute] = action.payload.value;
            
            console.log("TrackConfigReducer UPDATE_CONFIG_ATTR: ", newState);
            return newState;
        

        case "UPDATE_CONFIG_USER_PERMISSIONS":
            //return state; // to check whether not working update

            trackerIndex  = getTrackerIndex(newState, action.payload.trackerId); //trackerIndex=-1;
            temp=(trackerIndex<0)?( console.log("trackerConfig trackerIndex err") ):"";

            columnIndex  =  getColumnIndex( newState.configData[trackerIndex], action.payload.columnName); //columnIndex=-1;
            temp=(columnIndex<0)?( console.log("trackerConfig columnIndex err") ):"";

            let userPermitIndex  = getUserPermissionIndex( newState.configData[trackerIndex].columns[columnIndex], action.payload.userId); //userPermitIndex=-1;
            temp=(userPermitIndex<0)?( console.log("trackerConfig userPermitIndex err") ):"";

            newState.configData[trackerIndex].columns[columnIndex].permissions[userPermitIndex]["read"]=action.payload.readValue;
            newState.configData[trackerIndex].columns[columnIndex].permissions[userPermitIndex]["write"]=action.payload.writeValue;


            console.log("TrackConfigReducer UPDATE_CONFIG_USER_PERMISSIONS: ", newState);
            return newState;

        default:
            console.log("TrackConfigReducer default: ", newState);
            return state;
    }

}

/**
 * return tracker's index in new state
 * 
 *  stt: newState
 * 
 *  trackerId: trackerId
 */
function getTrackerIndex(stt, trackerId){
    return stt.configData.findIndex( config => (
        config.tracker_id === trackerId
    ) );
}

/**
 * returns column's index of in particular tracker
 * 
 * stt: tracker object
 * 
 * columnName: column name to find index
 */
function getColumnIndex(stt, columnName){
    return stt.columns.findIndex( column => (
        column.name === columnName
    ) );
}

/**
 * returns particular tracker's column's, user index of the permissions
 * 
 * stt: tracker column object
 * 
 * userId: user id to find index
 */
function getUserPermissionIndex(stt, userId){
    return stt.permissions.findIndex( user => (
        user.userId === userId
    ) );
}

/**
 * //returns particular tracker's rule's, user index of the permissions
 * 
 * stt: tracker column object
 * 
 * userId: user id to find index
 */
function getRulesIndex(stt, userId){
    return stt.permissions.findIndex( user => (
        user.userId === userId
    ) );
}

export default TrackConfigReducer