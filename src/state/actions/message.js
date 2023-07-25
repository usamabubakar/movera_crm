// import { RECEIVE_MESSAGE } from './types';
// import io from 'socket.io-client';

// const socket = io("http://localhost:5000", {
//   withCredentials: true,
//   extraHeaders: {
//     "my-custom-header": "abcd"
//   }
// });

// export const connectToChatServer = (userId) => {
//   return (dispatch) => {
//     console.log("agent connsted " + userId)
//     socket.emit('userConnected', userId);
//     socket.on('receive_message', (data) => {
//         console.log("messag recive");
//       const { senderId, message } = data;
//       console.log("message from soket io " + data)
//       dispatch(receiveMessage({ senderId, message }));
//     });
//   };
// };

// export const sendMessage = (data) => {
//   return (dispatch) => {
//     const { senderId, recipientId, message } = data;
//     console.log(data)
//     socket.emit('send_message', { senderId, recipientId, message });
//     dispatch(sendMessageSuccess(message));
//   };
// };

// export const receiveMessage = (data) => {
//   const { senderId, message } = data;
//   console.log("sokect io send mess" + message);
//   console.log(senderId)
//   console.log("messag reciee")
//   return {
//     type: RECEIVE_MESSAGE,
//     payload: { senderId, message },
//   };
// };

// export const sendMessageSuccess = (message) => {
//     // console.log(message)
//   return {
//     type: 'SEND_MESSAGE_SUCCESS',
//     payload: message,
//   };
// };
