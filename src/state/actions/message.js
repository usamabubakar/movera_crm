import axios from 'axios';
import {MSG_SEND,FETCH_MSG} from './types';
import getTokenConfig from './tokenConfig';
import { websiteLink, localhost } from "../config/websitepath";


export const sendmsg = (data) => async (dispatch) => {
console.log("msg from admin", data)
  const config = getTokenConfig();
  try {
    const response = await axios.post(`${localhost}/api/chat/msg`, data, config);
    // Dispatch the success action
    // dispatch({ type: EMAIL_SEND_SUCCESS });
    console.log("sendmsg", response.data)
    dispatch({
      type: MSG_SEND,
      payload: response.data.messages,
    });
    return true;
  } catch (error) {
    console.log("error in email:", error);
    // dispatch({ type: EMAIL_SEND_FAILURE, payload: error.message });
    return false;
  }
};

export const fetchmsg = (data) => async (dispatch) => {
    console.log("fecthin", data)
    const firstid=data.senderId
    const secondid=data.recipientId
    console.log(firstid, secondid, data)
      const config = getTokenConfig();
      try {
        const response = await axios.get(`${localhost}/api/chat/findchat/${firstid}/${secondid}`, config);
    console.log("fetching msgs", response.data);
        // Dispatch the success action
        if (response.data && response.data.messages !== null && response.data.messages !== undefined) {
          // Dispatch the fetched messages
          dispatch({
            type: FETCH_MSG,
            payload: response.data.messages,
          });
        } else {
          // If 'messages' property is not present or is null/undefined, dispatch an empty array
          dispatch({
            type: FETCH_MSG,
            payload: [],
          });
        }

        return true; // Indicate success
      } catch (error) {
        console.log("error in email:", error);
        dispatch({
          type: FETCH_MSG,
          payload: [],
        });
        return false;
      }
    };

