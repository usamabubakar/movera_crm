import axios from 'axios';
import { EMAIL_SEND_SUCCESS, EMAIL_SEND_FAILURE } from './types';
import getTokenConfig from './tokenConfig';
import { websiteLink, localhost } from "../config/websitepath";


export const sendEmail = (data) => async (dispatch) => {
  const config = getTokenConfig();

  try {
    console.log("email action" + data)
    const response = await axios.post(`${websiteLink}/api/sendemail/sendEmail`, data, config);
    // Dispatch the success action
    dispatch({ type: EMAIL_SEND_SUCCESS,
       payload: true });
  } catch (error) {
    // Dispatch the failure action
    dispatch({ type: EMAIL_SEND_FAILURE, payload: error.message });
  }
};
