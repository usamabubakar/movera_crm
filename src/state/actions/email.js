import axios from 'axios';
import { EMAIL_SEND_SUCCESS, EMAIL_SEND_FAILURE } from './types';
import getTokenConfig from './tokenConfig';
import { websiteLink, localhost } from "../config/websitepath";


export const sendEmail = (data) => async (dispatch) => {
  const config = getTokenConfig();

  try {
    const response = await axios.post(`${localhost}/api/sendemail/sendEmail`, data, config);
    // Dispatch the success action
    dispatch({ type: EMAIL_SEND_SUCCESS });
    return true;
  } catch (error) {
    console.log("error in email:", error.message);
    dispatch({ type: EMAIL_SEND_FAILURE, payload: error.message });
    return false;
  }
};
