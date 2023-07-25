import {
   ADD_LEAD,
   DELETE_LEAD,
   UPDATE_LEAD,
   GET_LEADS,
   STATUS_UPDATE_SUCCESS,
   NOTIFICATION,
   DELETE_NOTIFICATION,
   GET_ERRORS

} from "./types";

import axios from "axios";
import getTokenConfig from './tokenConfig';


export const fetchLead =(dataa)=>async(dispatch) => {
    try {
    console.log(dataa)
    // const id=data.id
    // console.log(id)
    const response = await axios.get(`http://localhost:5000/api/lead/fetchlead?page=${dataa.pagename}&id=${dataa.id}`);

    const data = response.data
console.log(data.onlineadmin);
    dispatch({
        type:GET_LEADS,
        payload: data
    });
  } catch (error) {
console.log("error")
  }

};

export const fetchPendingLead =()=>async(dispatch) => {
  const config = getTokenConfig();
  try {
  const response = await axios.get('http://localhost:5000/api/lead/pendinglead', config);

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
      `http://localhost:5000/api/lead/approvalstatus/${data.leadId}/status`,
      { isApproved: data.status },
      config
    );

    console.log(response.data.message);

    // Dispatch an action to update the leads list in your Redux store
    // dispatch({
    //   type: UPDATE_LEAD_STATUS,
    //   payload: { leadId: data.id, status: data.status },
    // });
  } catch (error) {
    console.log(error);
  }
};

// agent fetch lead





export const addLead = (data) =>async (dispatch) => {

  const config = getTokenConfig();

    try {
        const response = await axios.post('http://localhost:5000/api/lead/addlead', data, config);
      const newlead=response.data.data
      if (response.status === 200) {
        sendNotificationToSSEServer(response.data);
      }
    dispatch({
        type:ADD_LEAD,
        payload:newlead
      })
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.message,
      });
      };

    }
    const sendNotificationToSSEServer = (leadData) => {
  const config = getTokenConfig();

      // Prepare the notification data
      const notificationData = {
        message: 'A new lead has been added',
      };
      // Send the notification data to the SSE server endpoint
      axios.post('http://localhost:5001/api/sse/notify', notificationData, config)
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
      console.log("update lead usama config");
      const config = getTokenConfig();

      console.log(config);
      console.log(data);
      const leadId=data.leadid

      try {
        const response = await axios.put(
          `http://localhost:5000/api/lead/updatelead/${leadId}`,
          data,
          config
        );
        const updatedLead = response.data.data;
        dispatch({
          type: UPDATE_LEAD,
          payload: updatedLead,
        });
      } catch (err) {
        // Handle error here
      }
    };


    export const deleteLead = (data) => async (dispatch) => {
console.log("del lead "+ data)
const config = getTokenConfig();
      try {
       const response= await axios.delete(`http://localhost:5000/api/lead/deleteLead`
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
      // console.log(typeof data);
      const config = getTokenConfig();
      try {
        const response = await axios.delete(`http://localhost:5000/api/lead/deletependingLead`,data );

        const leadid = response.data.leadid;
        console.log(leadid);

        dispatch({
          type: DELETE_LEAD,
          payload: leadid,
        });

        // Handle success or show a notification/message
      } catch (error) {
        console.error(error); // Log the actual error for debugging purposes

        // Handle error or show a notification/message
      }
    };


    export const assignLead=(data)=> async(dispatch)=>{
      try {
       const response= await axios.post(`http://localhost:5000/api/lead/assignlead/`,data);
       dispatch({

       })

      } catch (error) {

      }

    }

    export const updateStatus=(data)=> async(dispatch)=>{
console.log(data)
      try {
       const response= await axios.post('http://localhost:5000/api/lead/updatestatus',data);
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
       const response= await axios.post('http://localhost:5000/api/lead/payment', data , config);
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
       const response= await axios.get('http://localhost:5000/api/lead/notification');
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
             const response= await axios.delete(`http://localhost:5000/api/lead/deletenoti/${leadId}`,config);
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