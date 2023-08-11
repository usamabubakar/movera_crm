import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  SECRET_KEY_SUCCESS,
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  SECRET_KEY_FAIL

} from "./types";
import getTokenConfig from './tokenConfig';
import axios from "axios";
import { websiteLink, localhost } from "../config/websitepath";






// Loading user
export const loadUser = () => (dispatch, getState) => {

  const config = getTokenConfig();

  axios.get(`${localhost}/api/auth/getuser`, config )
      .then(res => dispatch({
          type: USER_LOADED,
          payload: res.data
      })
      )
      .catch(err => {
          console.log(err)
      });
}




export const login_user = (details) => async (dispatch) => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // Request body to check the user details against the database
  const body_data_from_user = JSON.stringify(details);
  try {
  const response = await axios.post(`${localhost}/api/auth/login`, body_data_from_user, config);
  const token = response.data.token;
  const user = response.data.userdata;


    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, user }
    })
  } catch (err) {
    const error = {
      message: err.response.data,
      status: err.response.status
    };
    dispatch({
      type: LOGIN_FAIL,
      payload: error
    });
  }



};

export const secretkey = (key) => async (dispatch) => {

  try {

    const secret_key_response = await axios.post(`${localhost}/api/auth/secretadminkey`, { key })
    const results = secret_key_response;
    if (results.status === 200) {
      dispatch({
          type: SECRET_KEY_SUCCESS,
          payload: true
      });
      return true;
  } else {
      return false;
  }

  } catch (error) {
    console.log(error)
  return false
  }
}

export const logout_user =  () => (dispatch, getState) => {
  const config = getTokenConfig();


    axios.post(`${localhost}/api/auth/logout`, {}, config).then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      })
    })
    .catch((error) => {
    console.error(error);
   })

}

export const singleuserData=()=>async (dispatch)=>{

  const config=getTokenConfig();
  const response = await axios.get(`${localhost}/api/auth/singleuser`, config);
  dispatch({
    type: 'FETCH_SINGLE_USER_SUCCESS',
    payload: response.data.data, // Assuming the API returns the user data in the response data
  });

}
