import {
    MSG_SEND,
    FETCH_MSG
} from "../actions/types";

const initialState = {
    adminText: [],
    agentText: [],
};




const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MSG:
          console.log("msg fetching", action.payload)
            return{
                ...state,
                adminText: action.payload.adminText,
                agentText: action.payload.agentText,
            }
            case MSG_SEND:
                const newMessage = action.payload; // The new message you want to add
                const senderType = action.payload.senderType; // 'admin' or 'agent'

                if (senderType === 'admin') {
                  return {
                    ...state,
                    adminText: [...state.adminText, newMessage],
                  };
                } else if (senderType === 'agent') {
                  return {
                    ...state,
                    agentText: [...state.agentText, newMessage],
                  };
                }
                return state;
        default:
            return state;
    }
};

export default messageReducer;
