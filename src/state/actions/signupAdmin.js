import {
   ADMIN_SIGUP_SUCCESS,
   ADMIN_SIGUP_ERROR,
   EMAIL_EXIST,
   SUCCESS

} from './types';
import { websiteLink, localhost } from "../config/websitepath";

import axios from "axios";

export const signup_Admin = (signupdata) => async (dispatch) => {
  console.log("sign img dara");
  console.log(signupdata);

  try {
    const formData = new FormData();
    formData.append('name', signupdata.name);
    formData.append('password', signupdata.password);
    formData.append('email', signupdata.email);
    formData.append('img', signupdata.img);

    const response = await axios.post(`${localhost}/api/auth/adminsignup`, formData);

    const resData = response.data;
    console.log(resData);
    if (resData) {
      dispatch({
        type: ADMIN_SIGUP_SUCCESS,
        payload: true,
      });
    }
  } catch (error) {
    if (error.response) {
      console.log("email already exist");
      const errorStatus = error.response.status;
      console.log("Error status:", errorStatus);
      dispatch({
        type: ADMIN_SIGUP_ERROR,
        payload: false,
      });
    }
  }
};



// check email exist or not

export const emailchecker = (email) => async (dispatch) => {

  try {
    const response = await axios.post(`${localhost}/api/auth/emailexist` ,{ email });
    const responseData = response.data;
    console.log(responseData);
    dispatch({
      type:EMAIL_EXIST,
      payload:true
    })
 // Handle other status codes if needed

  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      console.log(status);

      if (status === 409) {
        console.log("Email already exists");
        dispatch({
          type: EMAIL_EXIST,
          payload: false
        });
      }

      // Handle other status codes if needed
    } else {
      console.log("Error:", error.message);
      // Handle network errors
    }
  }
};
