import {
    VENDOR_ADD_SUCCESS,
    VENDOR_UPDATE_SUCCESS,
    VENDOR_DELETE_SUCCESS,
    VENDOR_FETCHING_SUCCESS
} from '../actions/types'

const initialState = {
    success: false,
    userDelete: false,
    vendor: []
}

const vendorReducer = (state = initialState, action) => {

    switch (action.type) {
        case VENDOR_FETCHING_SUCCESS:
            const vendor_user = action.payload.data
            return {
                ...state,
                vendor: vendor_user,
                error: null
            };

        case VENDOR_ADD_SUCCESS:

            return {
                ...state,
                vendor: [...state.vendor, action.payload],
                success: action.payload

            };
        case VENDOR_DELETE_SUCCESS:
            const vendorid = action.payload
            return {
                ...state,
                vendor: state.vendor.filter(vendors => (vendors.id || vendors._id) !== vendorid),
                userDelete: true
            }
        case 'VENDOR_UPDATE_SUCCESS':
            // Assuming action.payload contains both _id and success data

            const updatevendorid=action.payload._id
            console.log("vendor update", updatevendorid)
            const updatedata = state.vendor.map((vendor) => {
                if (vendor.id === updatevendorid) {
                  return {
                    ...vendor,
                    // Update the desired properties of the agent
                    name: action.payload.name,
                    email: action.payload.email,
                  };
                }
                return vendor;
              });
              return {
                ...state,
                vendor: updatedata
            };

        default:
            return state;
    }
};
export default vendorReducer;