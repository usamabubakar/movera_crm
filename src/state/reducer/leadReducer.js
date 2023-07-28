import {
  ADD_LEAD,
  DELETE_LEAD,
  UPDATE_LEAD,
  GET_LEADS,
  STATUS_UPDATE_SUCCESS,
  NOTIFICATION,
  DELETE_NOTIFICATION,
  GET_ERRORS

} from "../actions/types";

import { combineReducers } from "redux";

const initialState = {
  leadsData: [],
  leads: false,
  showToast: false,
  leadDelete: false,
  onlineadmin:[],
  error: null,
  notification: []
};

const leadReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LEADS:
      const leadData = action.payload.data
      const onlineadmin=action.payload.onlineadmin
      return {
        leadsData: leadData,
        onlineadmin:onlineadmin,
        error: null
      }
    case ADD_LEAD:
      const newLead = action.payload;
      return {
        ...state,
        leadsData: [...state.leadsData, newLead],
        error: null
      };

    case DELETE_LEAD:
      console.log(action.payload)
      console.log("delrt mul rry")
      const updatedLeadsData = state.leadsData.filter(leadData => !action.payload.includes(leadData.id || leadData._id));
      console.log(updatedLeadsData)
      return {
        ...state,
        leadsData: updatedLeadsData
      }

      case UPDATE_LEAD:
        const updateleadtid = action.payload._id;
        console.log(updateleadtid + "reducer");

        const updatedata = state.leadsData.map((lead) => {
          if (lead.id === updateleadtid) {
            return {
              ...lead,
              // Update the desired properties of the lead
              fullname: action.payload.fullname,
              email: action.payload.email,
              phoneno: action.payload.phoneno,
              originaddress: action.payload.originaddress,
              origincity: action.payload.origincity,
              originstate: action.payload.originstate,
              originzipcode: action.payload.originzipcode,
              destinationaddress: action.payload.destinationaddress,
              destinationcity: action.payload.destinationcity,
              destinationstate: action.payload.destinationstate,
              destinationzipcode: action.payload.destinationzipcode,
              shipdate: action.payload.shipdate,
              howmany: action.payload.howmany,
              isAssigned: action.payload.isAssigned,
              isAssignedName: action.payload.isAssignedName,
              mailcount: action.payload.mailcount,
              status: action.payload.status,
              approvelStatus: action.payload.approvelStatus,
              addBy: action.payload.addBy,
              recieveddate: action.payload.recieveddate,
              agreement: action.payload.agreement,
              vehicle: action.payload.vehicle,
              price:action.payload.price,
              intialdeposite:action.payload.intialdeposite,
              opickup:action.payload.Opickup,
              ophonono:action.payload.Ophonono,
              dpickup:action.payload.Dpickup,
              dphonono:action.payload.Dphonono

            };
          }
          return lead;
        });

        console.log(updatedata);
        return {
          ...state,
          leadsData: updatedata,
        };


        case STATUS_UPDATE_SUCCESS:
          const updatedLeads = state.leadsData.filter(leadData => leadData.id !== action.payload._id);
          console.log(updatedLeads);
          console.log("Check status update");

          return {
            ...state,
            leadsData: updatedLeads
          };

    case NOTIFICATION:
      return {
        notification: action.payload.data
      }
    case DELETE_NOTIFICATION:
      const updatedNotification = state.notification?.filter(
        (notification) => notification.leadId !== action.payload.data.leadId
      );
      return {
        ...state,
        notification: updatedNotification,
      };

      case GET_ERRORS:
        return {
          ...state,
          leads:false
        };

    default:
      return state;
  }
};

export default leadReducer;
