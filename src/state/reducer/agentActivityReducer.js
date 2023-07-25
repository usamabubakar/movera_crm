import {
   AGENT_ACTIVITY_SUCCESS,
   AGENT_ACTIVITY_FAILURE
} from '../actions/types'

const initialState = {
   activitydata:[],
   totalleads:[]
}

const agentActivityReducer = (state = initialState, action) => {
    switch (action.type) {
      case AGENT_ACTIVITY_SUCCESS:
      console.log(action.payload.leadtotal)
      console.log("lead data")
        return {
          ...state,
          activitydata: action.payload.dataa,
          totalleads:action.payload.leadtotal
        };

      default:
        return state;
    }
  };

export default agentActivityReducer;