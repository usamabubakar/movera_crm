import {
    VENDOR_ADD_SUCCESS,
    VENDOR_UPDATE_SUCCESS,
    VENDOR_DELETE_SUCCESS,
    VENDOR_FETCHING_SUCCESS
} from '../actions/types'

const initialState={
    success:false,
    userDelete:false,
    vendor:[]
}

const vendorReducer =(state=initialState,action)=>{

    switch(action.type){
        case VENDOR_FETCHING_SUCCESS:
            const vendor_user=action.payload.data
            return{
                ...state,
                vendor:vendor_user,
                error:null
            };

        case VENDOR_ADD_SUCCESS:
            console.log("vendor reducer workring");
            console.log(action.payload);
            return{
                ...state,
                vendor:[...state.vendor, action.payload],
               success:action.payload

            };
        case VENDOR_DELETE_SUCCESS:
            const vendorid=action.payload
            console.log(vendorid + "chck the vrndor del")
            return{
                ...state,
                vendor:state.vendor.filter(vendors=>(vendors.id|| vendors._id) !== vendorid),
                userDelete:true
            }
            case VENDOR_UPDATE_SUCCESS:

            return{
                ...state,
               success:action.payload
            };

            default:
                return state;
    }
};
export default vendorReducer;