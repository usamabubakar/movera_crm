import {
    EMAIL_SEND_SUCCESS
    } from "../actions/types";

const initialState={
    emailsend:false
}

const emailReducer =(state=initialState,action)=>{
switch(action.type){

    case EMAIL_SEND_SUCCESS:
        return{
            ...state,
            emailsend: action.payload
        }

        default:
            return state
}
}


export default emailReducer;