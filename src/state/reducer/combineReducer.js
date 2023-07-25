import { combineReducers } from 'redux';
import authReducer from './authReducer';
import signupAdmin from './signupAdmin';
import agentcrud from './agentReducer';
import usersdataReducer from './usersdataReducer';
import leadReducer from './leadReducer';
import emailReducer from './emailReducer';
import dashbordReducer from './dashbordReducer';
import vendorReducer from './vendorReducer';
import agentReducer from './agentReducer';
import notiReducer from './notiReducer';
import messageReducer from './messageReducer';
import agreementReducer from './agreementReducer';
import agentActivityReducer from './agentActivityReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  signupadmin: signupAdmin,
  agent: agentcrud,
  agentdata:usersdataReducer,
  vendordata:usersdataReducer,
  leads:leadReducer,
  agents:agentReducer,
  vendors:vendorReducer,
  lead:leadReducer,
  leadsData:leadReducer,
  emailsent:emailReducer,
  notification:notiReducer,
  dashborddata:dashbordReducer,
  notification:leadReducer,
  activitydata:agentActivityReducer,
  customerdata:agreementReducer


});

export default rootReducer;
