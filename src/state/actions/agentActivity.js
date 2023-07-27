import axios from 'axios';
import { AGENT_ACTIVITY_FAILURE, AGENT_ACTIVITY_SUCCESS} from './types';
import { websiteLink, localhost } from "../config/websitepath";

export const agentactivity = (data) => async (dispatch) => {
    console.log(data)
    try {

      const response = await axios.get(`${websiteLink}/api/lead/agentactivity`, { params: data });
      console.log(response.data.data)
      const dataa=response.data.data
      const totalleads=response.data.totalleads
      dispatch({
        type: AGENT_ACTIVITY_SUCCESS,
        payload: {
            dataa: dataa,
            leadtotal: totalleads
        }
    });
    } catch (error) {
      // Dispatch the failure action
      dispatch({ type: AGENT_ACTIVITY_FAILURE, payload: error.message });
    }
  };

