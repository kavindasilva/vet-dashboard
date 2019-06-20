
import { isUndefined } from "util";
import trackerInstances from "../config-data/trackerInstance";


const TrackInstaReducer = (state, action) => {
    console.log("TrackInstaReducer: state: ", state, "\naction: ", action)
    let newState = {
        TrackerInstanceReducer:{
            instanceData: false,
        }
    };

    if(state===undefined || isUndefined(state))
        state=null;

    switch (action.type) {
        case 'UPDATE_CELL_VALUE':
            newState = {
                ...state,
                instanceData: state.instanceData.map(trackerRecord => {
                    let newRecord = {};
                    
                    if( trackerRecord.id === action.payload.trackerId ) { //get tracker
                        trackerRecord.data.map( column => {
                            if( column.columnId === action.payload.columnId ){
                                //column.value=action.payload.value;
                                //newRecord['data']['value'] = action.payload.value;
                                newRecord[column.value] = action.payload.value;
                            }
                            else
                                return {
                                    ...trackerRecord,
                                    ...newRecord,

                                }
                        });
                    }
                    else
                        return trackerRecord;
                })
            }
            console.log("TrackInstaReducer UPDATE_CELL_VALUE: ", newState);
            return newState;

        default:
            console.log("TrackInstaReducer default: ", newState);
            return state;
    }

}


export default TrackInstaReducer