import {
    AGENT_ADD_SUCCESS,
    AGENT_DELETE_SUCCESS,
    AGENT_UPDATE_SUCCESS,
    AGENT_FETCHING_SUCCESS,
    CLEAR_NOTIFICATION
} from '../actions/types'

const initialState = {
    success: false,
    userDelete: false,
    agents: [],
    notification: null
}

const agentReducer = (state = initialState, action) => {

    switch (action.type) {
        case AGENT_FETCHING_SUCCESS:
            const agent_user = action.payload.data
            return {
                ...state,
                agents: agent_user,
                error: null
            };
        case AGENT_ADD_SUCCESS:
            return {
                ...state,
                success: action.payload,
                agents: [...state.agents, action.payload]
            };
        case AGENT_DELETE_SUCCESS:
            return {
                ...state,
                agents: state.agents.filter(agent => (agent.id || agent._id) !== action.payload),
                userDelete: true
            }
        case AGENT_UPDATE_SUCCESS:
            const updateagentid=action.payload._id
            const updatedata = state.agents.map((agent) => {
                if (agent.id === updateagentid) {
                  return {
                    ...agent,
                    // Update the desired properties of the agent
                    name: action.payload.name,
                    email: action.payload.email,
                    password: action.payload.password,
                    starttime: action.payload.starttime,
                    endtime: action.payload.endtime,
                    phoneno:action.payload.phoneno,
                    emailpassword:action.payload.emailpassword
                  };
                }
                return agent;
              });



            return {
                ...state,
                agents: updatedata,
                success: action.payload
            };
        case 'DISPLAY_NOTIFICATION':
            console.log("display noti")
            return {
                ...state,
                notification: action.payload,
            };
        case CLEAR_NOTIFICATION:
            return {
                ...state,
                notification: null
            }
        default:
            return state;
    }
};
export default agentReducer;