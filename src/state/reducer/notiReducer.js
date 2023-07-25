import {
    DISPLAY_NOTIFICATION,
    CLEAR_NOTIFICATION
    } from "../actions/types";

const initialState={
    success:null
}

const notiReducer =(state=initialState,action)=>{
switch(action.type){

    case DISPLAY_NOTIFICATION:
        return{
            ...state,
        success: action.payload
        }
        case CLEAR_NOTIFICATION:
            return{
                ...state,
                success:null
            }

        default:
            return state
}
}


export default notiReducer;