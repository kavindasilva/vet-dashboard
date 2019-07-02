
import { isUndefined } from "util";
import trackerInstances from "../config-data/trackerInstance";


const TrackInstaReducer = (state, action) => {
    console.log("TrackInstaReducer: state: ", state, "\naction: ", action)
    let newState0 = {
        TrackerInstaReducer:{
            instanceData: false,
        }
    };

    if(state===undefined || isUndefined(state))
        state=null;

    switch (action.type) {
        case 'UPDATE_CELL_VALUE':
            let newState = { ...state };
            
            // get tracker's index
            let trackerIndex = state.instanceData.findIndex( tracker=> (
                tracker.id === action.payload.trackerInstanceId
            ) );

            if(trackerIndex >-1 ){
                // get tracker data column's index
                let columnIndex = newState.instanceData[trackerIndex].data.findIndex( column=> (
                    column.columnId === action.payload.columnId
                ) );

                if(columnIndex >-1 ){
                    newState.instanceData[trackerIndex].data[columnIndex].value = action.payload.value;
                }
                else
                    console.log("trackerInstance: err1")                
            }
            else
                console.log("trackerInstance: err1")

            console.log("TrackInstaReducer UPDATE_CELL_VALUE: ", newState);
            return newState;

        default:
            console.log("TrackInstaReducer default: ", newState0);
            return state;
    }

}


export default TrackInstaReducer