
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
            
            let trackerIndex  = newState.configData.findIndex( config => (
                config.tracker_id === action.payload.trackerId
            ) ); //trackerIndex=-1;
            let temp=(trackerIndex<0)?( console.log("trackerConfig trackerIndex err") ):"";

            let columnIndex  = newState.configData[trackerIndex].columns.findIndex( column => (
                column.name === action.payload.columnName
            ) ); //columnIndex=-1;
            temp=(columnIndex<0)?( console.log("trackerConfig columnIndex err") ):"";

            let userPermitIndex  = newState.configData[trackerIndex].columns[columnIndex].permissions.findIndex( user => (
                user.userId === action.payload.userId
            ) ); //userPermitIndex=-1;
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

export default TrackConfigReducer