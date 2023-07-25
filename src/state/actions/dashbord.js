import {
   DASHBORD_DATA
  } from './types';
  import axios from "axios";


  export const Dashboard = () => async (dispatch) => {


    try {
      const response = await axios.get('http://localhost:5000/api/dashbord/dashborddata');
      const data = response.data.data;
      const onlineAgentNames = response.data.onlineagent;
      const payment= response.data.payment
      const onlineadmin=response.data.onlineadmin
      const totalprice=response.data.totalprice

      dispatch({
        type: DASHBORD_DATA,
        payload: {
            onlineAgentNames,
            data,
            payment,
            onlineadmin,
            totalprice
        }
      });
    } catch (error) {
      console.log(error);
      // Handle the error
    }

  };




