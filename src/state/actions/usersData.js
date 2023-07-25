import {
  AGENT_FETCHING_SUCCESS,
  VENDOR_FETCHING_SUCCESS,
  GET_ERRORS
} from './types';
import axios from "axios";

export const fetchAgentData =()=>async(dispatch) => {

      try {
        const response = await axios.get('http://localhost:5000/api/fetchuserdata/fetchagentdata');
        const data = response.data

        dispatch({
            type: AGENT_FETCHING_SUCCESS,
            payload: data
        });
      } catch (error) {
        dispatch({
          type:GET_ERRORS,
          payload:null
        });
      }

  };


export const fetchVendorData =()=>async(dispatch) => {

  try {
    const response = await axios.get('http://localhost:5000/api/fetchuserdata/fetchvendordata');
    const data = response.data
// console.log(data)
    dispatch({
        type:VENDOR_FETCHING_SUCCESS,
        payload: data
    });
  } catch (error) {
    dispatch({
      type:GET_ERRORS,
      payload:null
    });
  }

};

