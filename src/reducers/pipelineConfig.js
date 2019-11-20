
import { isUndefined } from "util";

const PipeReducer = (state, action) => {
    console.log("PipeReducer: state: ", state, "\naction: ", action)
    let newState = {
        PipeReducer:{
            pipelineData: false,
        }
    };

    if(state===undefined || isUndefined(state))
        state=null;
    newState = { ...state }

    switch (action.type) {
        case 'LOAD_PIPELINE_DATA_FROM_DB':
            newState = {...action.payload.pipesData};

            console.log("PipeReducer LOAD_PIPELINE_DATA_FROM_DB: ", newState);
            return newState;

        default:
            console.log("PipeReducer_default: ", state);
            return state;
    }

}

export default PipeReducer