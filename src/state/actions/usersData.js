import {
  AGENT_FETCHING_SUCCESS,
  VENDOR_FETCHING_SUCCESS,
  GET_ERRORS
} from './types';
import axios from "axios";
import { websiteLink, localhost } from "../config/websitepath";

export const fetchAgentData =()=>async(dispatch) => {

      try {
        const response = await axios.get(`${websiteLink}/api/fetchuserdata/fetchagentdata`);
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
    const response = await axios.get(`${websiteLink}/api/fetchuserdata/fetchvendordata`);
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

