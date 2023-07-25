import {
    AGENT_FETCHING_SUCCESS,
    GET_ERRORS,
    VENDOR_FETCHING_SUCCESS
 } from "../actions/types";
import { combineReducers } from "redux";


const initialState={
    agentData: [],
  error: null
}


const usersdataReducer =(state=initialState,action)=>{

    switch(action.type){
        case AGENT_FETCHING_SUCCESS:
            const agent_user=action.payload.data
            return{
                ...state,
                agentData:agent_user,
                error:null
            };
        case VENDOR_FETCHING_SUCCESS:
            const vendor_user=action.payload.data
            return{
                ...state,
                vendorData:vendor_user,
                error:null
            };

            default:
                return state;
    }
};
export default usersdataReducer