import { DASHBORD_DATA } from "../actions/types";

const initialState = {
  totaladmin: null,
  totalagent: null,
  totalvendor: null,
  onlineagent: [],
  onlineAdmin:[],
  totalleads: null,
  payment:null,
  price:null,
};

const dashbordReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBORD_DATA:

      const onlineadmin =action.payload.onlineadmin
      const { onlineAgentNames , data , payment, price} = action.payload;
      return {
        ...state,
        onlineagent: onlineAgentNames,
        totaladmin: data.admincount,
        totalagent: data.agentcount,
        totalvendor: data.vendorcount,
        totalleads: data.leadcount,
        payment:payment,
        onlineAdmin:onlineadmin,
        price:action.payload.totalprice,
      };

    default:
      return state;
  }
};

export default dashbordReducer;
