import {
    AGREEMENT_DATA_FETCH

  } from "../actions/types";

  import { combineReducers } from "redux";

  const initialState = {
    agreementData: [],

  };

  const agreementReducer = (state = initialState, action) => {
    switch (action.type) {
      case AGREEMENT_DATA_FETCH:
        const leadData = action.payload

        return {
            ...state,
            agreementData:leadData,
        }
      default:
        return state;
    }
  };

  export default agreementReducer;
