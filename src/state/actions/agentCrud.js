import {
  AGENT_ADD_SUCCESS,
  AGENT_DELETE_SUCCESS,
  AGENT_UPDATE_SUCCESS,
  AGENT_FETCHING_SUCCESS,
  GET_ERRORS,
  TOKEN_VERIFICATION_FAIL
} from '../actions/types'
import axios from "axios";

import { notification } from './notification';
import getTokenConfig from './tokenConfig';




export const fetchAgentData = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Include the token in the request headers
    }

    const response = await axios.get('http://localhost:5000/api/agentcurd/', config);

    const data = response.data
      dispatch({
        type: AGENT_FETCHING_SUCCESS,
        payload: data
      });
  } catch (error) {
    if (error.response && error.response.status === 401) {

      console.log("Token fails");
      dispatch({
        type: TOKEN_VERIFICATION_FAIL
      });
    } else {
      console.error(error);
      dispatch({
        type: GET_ERRORS,
        payload: null
      });
  }}

};


export const addAgent = (data) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await axios.post('http://localhost:5000/api/agentcurd/addagent', data, config);
    const agent = response.data.user
    console.log(agent.id)
    dispatch({
      type: AGENT_ADD_SUCCESS,
      payload: agent
    });
    dispatch(notification());
  } catch (err) {
    const error = {
      message: err.response.data,
      status: err.response.status
    };
    // Handle the error here, such as dispatching an error action or setting an error state
  }
};


// delete agent



export const deleteAgent = (agentId) => async (dispatch) => {
  console.log(agentId + "usama actuon dele")
  const config = getTokenConfig();

  try {
    const response = await axios.delete(`http://localhost:5000/api/agentcurd/deleteAgent/${agentId}`,config);
    const agentid = response.data.data
    dispatch({
      type: AGENT_DELETE_SUCCESS,
      payload: agentid,
    });
    // Handle success or show a notification/message
  } catch (error) {
    // Handle error or show a notification/message
  }
};


// update agent

export const updateAgent = (data) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.post('http://localhost:5000/api/agentcurd/updateagent', data, config);
    console.log("action update")
    const agentdata = response.data.data
    console.log(agentdata._id)
    dispatch({
      type: AGENT_UPDATE_SUCCESS,
      payload: agentdata
    });
  } catch (err) {
    const error = {
      message: err.response.data,
      status: err.response.status
    };
  }
}