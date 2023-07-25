import {
    ADMIN_SIGUP_SUCCESS,
     ADMIN_SIGUP_ERROR,
     EMAIL_EXIST,
     SUCCESS
    } from "../actions/types";

const initialState={
    email_exist:null,
    success:null
}

const signupAdmin =(state=initialState,action)=>{
switch(action.type){

    case EMAIL_EXIST:
        const email_exist_status=action.payload?.status
        console.log(email_exist_status + "pervect")
        return{
            ...state,
            email_exist:action.payload
        }
    case ADMIN_SIGUP_SUCCESS:
        const data=action.payload
        console.log(data +"satus")
        console.log("admin chcinkg")
        return{
            ...state,
            success:action.payload
        }
        case ADMIN_SIGUP_ERROR:
            console.log("not creatd")
            return{
                ...state,
                success:action.payload
            }
        default:
            return state
}
}


export default signupAdmin;