import axios from 'axios';
import { EMAIL_SEND_SUCCESS, EMAIL_SEND_FAILURE , UPDATE_LEAD,AGENT_UPDATE_SUCCESS} from './types';
import getTokenConfig from './tokenConfig';
import { websiteLink, localhost } from "../config/websitepath";


export const sendEmail = (data) => async (dispatch) => {

  const config = getTokenConfig();
  try {
    const response = await axios.post(`${localhost}/api/sendemail/sendEmail`, data, config);
    // Dispatch the success action

    dispatch({
      type: UPDATE_LEAD,
      payload: response.data.data,
    });
    return true;
  } catch (error) {
    console.log("error in email:", error);
    dispatch({ type: EMAIL_SEND_FAILURE, payload: error.message });
    return false;
  }
};


export const sendEmailtoagentorvendor = (data) => async (dispatch) => {

  const config = getTokenConfig();
  try {
    const response = await axios.post(`${localhost}/api/sendemail/sendEmail`, data, config);
    // Dispatch the success action
    // dispatch({ type: EMAIL_SEND_SUCCESS });
    dispatch({
      type: AGENT_UPDATE_SUCCESS,
      payload: response.data.data,
    });
    return true;
  } catch (error) {
    console.log("error in email:", error);
    dispatch({ type: EMAIL_SEND_FAILURE, payload: error.message });
    return false;
  }
};
