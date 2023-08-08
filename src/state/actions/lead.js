import {
   ADD_LEAD,
   DELETE_LEAD,
   UPDATE_LEAD,
   GET_LEADS,
   STATUS_UPDATE_SUCCESS,
   NOTIFICATION,
   DELETE_NOTIFICATION,
   UPDATE_LEAD_STATUS,
   GET_ERRORS

} from "./types";
import { websiteLink, localhost } from "../config/websitepath";

import axios from "axios";
import getTokenConfig from './tokenConfig';
import io from 'socket.io-client';

const socket = io("http://www.crmsmtransports.site", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

export const fetchLead =(dataa)=>async(dispatch) => {
    try {
    // const id=data.id
    // console.log(id)
    const response = await axios.get(`${localhost}/api/lead/fetchlead?page=${dataa.pagename}&id=${dataa.id}`);

    const data = response.data
    dispatch({
        type:GET_LEADS,
        payload: data
    });
  } catch (error) {
console.log("error in fetching ")
  }
};

export const fetchPendingLead =()=>async(dispatch) => {
  const config = getTokenConfig();
  try {
  const response = await axios.get(`${localhost}/api/lead/pendinglead`, config);

  const data = response.data
console.log(data.data);
  dispatch({
      type:GET_LEADS,
      payload: data
  });
} catch (error) {
  console.log("error")
}

};

export const approveLeadFunction = (data) => async (dispatch) => {
  console.log("Action working: approve lead");

  const config = getTokenConfig();

  try {
    const response = await axios.put(
      `${localhost}/api/lead/approvalstatus/${data.leadId}/status`,
      { isApproved: data.status },
      config
    );

    console.log(response);

    // Dispatch an action to update the leads list in your Redux store
    dispatch({
      type: UPDATE_LEAD,
      payload:response.data.data
    });
return true
  } catch (error) {
    console.log(error);
    return false
  }
};

// agent fetch lead





export const addLead = (data) =>async (dispatch) => {

  const config = getTokenConfig();
console.log("venrder adde leads")
    try {
        const response = await axios.post(`${localhost}/api/lead/addlead`, data, config);
      const newlead=response.data.data

      if (response.status === 200) {
        sendNotificationToSSEServer(response.data);
        socket.emit('newlead',(newlead));
      }
    dispatch({
        type:ADD_LEAD,
        payload:newlead
      })
      return Promise.resolve();
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.message,
      });
      return Promise.reject();
    };

    }
    const sendNotificationToSSEServer = (leadData) => {
  const config = getTokenConfig();

      // Prepare the notification data
      const notificationData = {
        message: 'A new lead has been added',
      };
      // Send the notification data to the SSE server endpoint
      axios.post(`${localhost}:5001/api/sse/notify`, notificationData, config)
        .then((response) => {
          console.log('Notification sent to SSE server:', response.data);
          // Handle the success case
        })
        .catch((error) => {
          console.error('Error sending notification to SSE server:', error);
          // Handle the error case
        });
    };
    export const updateLead = ( data) => async (dispatch) => {
      const config = getTokenConfig();
      const leadId=data.leadid
      try {
        const response = await axios.put(
          `${localhost}/api/lead/updatelead/${leadId}`,
          data,
          config
        );
        const updatedLead = response.data.data;
        dispatch({
          type: UPDATE_LEAD,
          payload: updatedLead,
        });
      return true;

      } catch (err) {
          dispatch({
            type: GET_ERRORS,
            payload: err.message,
          });
      return false;

      }
    };


    export const deleteLead = (data) => async (dispatch) => {
console.log("del lead "+ data)
const config = getTokenConfig();
      try {
       const response= await axios.delete(`${localhost}/api/lead/deleteLead`
       , {
        ...config, // Include the token in the request headers
        data: data, // Pass the data as the request payload
      });
        const leadid=response.data.leadid
        console.log(leadid)
        dispatch({
          type: DELETE_LEAD,
          payload:leadid,
        });
        // Handle success or show a notification/message
      } catch (error) {
        // Handle error or show a notification/message
      }
    };

    export const deletependingLead = (data) => async (dispatch) => {

      const config = getTokenConfig();
      try {
        const response = await axios.delete(`${localhost}/api/lead/deletependingLead/${data}`);

        const leadid = response.data.leadid;


        dispatch({
          type: DELETE_LEAD,
          payload: leadid,
        });
        return true

        // Handle success or show a notification/message
      } catch (error) {
        console.error(error); // Log the actual error for debugging purposes
        return false

        // Handle error or show a notification/message
      }
    };


    export const assignLead=(data)=> async(dispatch)=>{
      try {
       const response= await axios.post(`${localhost}/api/lead/assignlead/`,data);
       if (response.status === 200) {
        console.log("assign lead")
        socket.emit('leadassign',(response));
      }
      const updatedLead = response.data.data;
      dispatch({
        type: UPDATE_LEAD,
        payload: updatedLead,
      });
       return true

      } catch (error) {
        return false
      }

    }

    export const updateStatus=(data)=> async(dispatch)=>{
console.log(data)
      try {
       const response= await axios.post(`${localhost}/api/lead/updatestatus`,data);
       console.log(response.data)
       const dataa=response.data.data
       if(response.status==200)

       dispatch({
        type:STATUS_UPDATE_SUCCESS,
        payload:dataa
       })

      } catch (error) {

      }


    }

    export const updatepayment=(data)=> async(dispatch)=>{
const config = getTokenConfig();
console.log(data)
      try {
       const response= await axios.post(`${localhost}/api/lead/payment`, data , config);
       if(response.status==200)
       dispatch({
        type:STATUS_UPDATE_SUCCESS
       })

      } catch (error) {

      }


    }

    export const fetchnotification=(data)=> async(dispatch)=>{
      console.log("notifactio fect")
      try {
       const response= await axios.get(`${localhost}/api/lead/notification`);
       if(response.status==200)
       {
         dispatch({
        type:NOTIFICATION,
        payload:response.data
       })
       }


      } catch (error) {

      }

    }

    export const deletenoti = (leadId) => async (dispatch) => {
      console.log("del lead "+ leadId)
      const config = getTokenConfig();
            try {
             const response= await axios.delete(`${localhost}/api/lead/deletenoti/${leadId}`,config);
              console.log(response.data.data)
              console.log("usama noti delte")
              dispatch({
                type: DELETE_NOTIFICATION,
                payload:response.data,
              });
              // Handle success or show a notification/message
            } catch (error) {
              // Handle error or show a notification/message
            }
          };