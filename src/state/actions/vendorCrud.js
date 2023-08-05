import {
    VENDOR_ADD_SUCCESS,
    VENDOR_DELETE_SUCCESS,
    VENDOR_UPDATE_SUCCESS,
    VENDOR_FETCHING_SUCCESS,
  GET_ERRORS
} from '../actions/types'
import axios from "axios";
import { websiteLink, localhost } from "../config/websitepath";



export const fetchVendorData =()=>async(dispatch) => {

  try {
    const response = await axios.get(`${localhost}/api/fetchuserdata/fetchvendordata`);
    const data = response.data
    dispatch({
        type:VENDOR_FETCHING_SUCCESS,
        payload: data
    });
    return true
  } catch (error) {
    dispatch({
      type:GET_ERRORS,
      payload:null
    });
    return false
  }

};


export const addVendor = (data) => async (dispatch) => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.post(`${localhost}/api/vendorcrud/addvendor`, data, config);
    const vendor=response.data.user
    dispatch({
      type: VENDOR_ADD_SUCCESS,
      payload: vendor
    });
    return true

  } catch (err) {
    const error = {
      message: err.response.data,
      status: err.response.status
    };
    return false

    // Handle the error here, such as dispatching an error action or setting an error state
  }
};


// delete agent



export const deleteVendor = (agentId) => async (dispatch) => {

  try {
   const response= await axios.delete(`${localhost}/api/vendorcrud/deletevendor/${agentId}`);
const vendorid=response.data.vendorid
    dispatch({
      type: VENDOR_DELETE_SUCCESS,
      payload: vendorid,
    });
    return true
  } catch (error) {
    return false
  }
};


// update agent

export const updateVendor = (data) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.post(`${localhost}/api/vendorcrud/updatevendor`, data, config);
    const vendor=response.data.data
    dispatch({
      type: VENDOR_UPDATE_SUCCESS,
      payload: vendor
    });
    return true

  } catch (err) {
    const error = {
      message: err.response.data,
      status: err.response.status
    };
    return false
}
}