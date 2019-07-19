
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
    

    switch (action.type) {
        case 'GET_CONFIG_FROM_DB':
            newState = {
                configData: action.payload.data,
                
            }
            console.log("TrackConfigReducer GET_CONFIG_FROM_DB: ", newState);

            return newState;
        

        case "UPDATE_CONFIG_USER_PERMISSIONS":
            newState = { ...state };
            //return state; // to check whether not working update

            let trackerIndex  = getTrackerIndex(newState, action.payload.trackerId); //trackerIndex=-1;
            let temp=(trackerIndex<0)?( console.log("trackerConfig trackerIndex err") ):"";

            let columnIndex  =  getColumnIndex( newState.configData[trackerIndex], action.payload.columnName); //columnIndex=-1;
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

export default TrackConfigReducer