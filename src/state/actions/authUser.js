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



export const login_user = (details) => async (dispatch) => {
  console.log("login action working")
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // Request body to check the user details against the database
  const body_data_from_user = JSON.stringify(details);
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', body_data_from_user, config);
    console.log("syau")
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
    console.log(error)
    dispatch({
      type: LOGIN_FAIL,
      payload: error
    });
  }



};

export const secretkey = (key) => async (dispatch) => {

  try {
    console.log(key)

    const secret_key_response = await axios.post("http://localhost:5000/api/auth/secretadminkey", { key })
    const results = secret_key_response;
    console.log(results.status);
    if (results.status==200) {
      console.log("secret key suces")
      dispatch({
        type: SECRET_KEY_SUCCESS,
        payload: true
      })
    }

  } catch (error) {
    console.log(error)
    dispatch({
      type: SECRET_KEY_FAIL,
      payload: false
    })
  }
}

export const logout_user = () => (dispatch, getState) => {
  const config = getTokenConfig();

  try {
    axios.post('http://localhost:5000/api/auth/logout', {}, config).then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      })
    })

  } catch (error) {
    console.error(error);
    console.log("not logout ")
  }

}

