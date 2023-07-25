// import {
//     SEND_MESSAGE,
//     RECEIVE_MESSAGE
//     } from "../actions/types";

//     const initialState = {
//         messages: []
//       };


//       const messageReducer = (state = initialState, action) => {
//         switch (action.type) {
//           case 'RECEIVE_MESSAGE':
//             return {
//               ...state,
//               messages: [...state.messages, action.payload],
//             };
//           case 'SEND_MESSAGE_SUCCESS':
//             return {
//               ...state,
//               messages: [...state.messages, action.payload],
//             };
//           default:
//             return state;
//         }
//       };




// export default messageReducer;