// import DataTable from 'react-data-table-component';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React from 'react';
// import { faBars, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
// import { useState } from 'react';
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import '../style.css'
// import { connect } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { ToastContainer, toast } from 'react-toastify';
// // import loding from "../images/Dual Ring-1s-200px.gif";
// import 'react-toastify/dist/ReactToastify.css';
// import { useEffect } from 'react';
// import Adminimage from './3.jpg';
// // import PubNub from 'pubnub';
// import { sendmsg, fetchmsg } from '../../state/actions/message';
// import { Dashboard } from '../../state/actions/dashbord';

// import '../chat.css'
// // import { connectToChatServer, sendMessage } from '../state/actions/message';


// import io, { Socket } from 'socket.io-client'

// // import { deleteAgent } from '../state/actions/agentCrud';




// function Adminchat(props) {




//     const dispatch = useDispatch();
//     const signUP_success = useSelector(state => state.agent.success);
//     const Email_exist = useSelector(state => state.signupadmin.email_exist);
//     const agentdata = useSelector(state => state.agentdata);
//     const agentdelet = useSelector(state => state.agent.userDelete);
//     const agents = useSelector(state => state.agents.agents);
//     const notification = useSelector(state => state.agents.notification);
//     const userData = useSelector(state => state.auth.user);
//     const [adminmessages, setAdminmessages] = useState([]);
//     const onlineadmin = useSelector(state => state.leadsData.onlineadmin);
//     const adminmsg = useSelector(state => state.msg.adminText);
//     const agentmsg = useSelector(state => state.msg.agentText);
//     const admins = useSelector(state => state.dashborddata.alladmin);




//     const [activeAdminId, setActiveAdminId] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [onlineuser, setonlineuser] = useState([])
//     const socketcon = io('http://localhost:4000')
//     const [newmsg, setnewmsg] = useState(null)
//     useEffect(() => {
//         console.log("socket con", socketcon)
//         socketcon.on('connect', () => {
//             console.log("Socket connected.");
//         })
//         socketcon.on('disconnect', () => {
//             console.log("Socket disconnected.");


//         })
//         if (socketcon) {
//             socketcon.emit("addnewuser", userData.id);
//         }
//         if (socketcon) {
//             socketcon.on('getonlineuser', (res) => {
//                 setonlineuser(res)
//             })
//         }

//     }, [])

//     // console.log("onlineuser", onlineuser)
//     // useEffect(() => {
//     //     if (socket === null) return
//     //     socket.on("getonlineuser", (res) => {
//     //         setonlineuser(res)
//     //     })

//     // }, []);

//     useEffect(() => {

//         console.log('sendingmesg')
//         socketcon.emit("newmsg", [newmsg], () => {
//             console.log("Send")
//         });
//         return () => {
//             socketcon.disconnect();
//           }
//     }, [newmsg]);

//     useEffect(() => {
//         socketcon.on("getmsg", (res) => {
//             console.log("recienf")
//             console.log("mesga from admin", res)
//         });
//         return () => {
//             socketcon.disconnect();
//           }
//     }, [socketcon]);

//     const handleSendMessage = () => {
//         console.log(activeAdminId)
//         console.log("clcick")
//         if (messageInput.trim() !== '') {
//             const data = {
//                 senderId: userData.id,
//                 recipientId: activeAdminId,
//                 message: messageInput
//             };
//             setnewmsg(data)
//             dispatch(sendmsg(data))
//             setMessages(prevMessages => [...prevMessages, messageInput]);
//             setMessageInput('');

//         }
//     };

//     useEffect(() => {
//         const data = {
//             senderId: userData.id,
//             recipientId: activeAdminId
//         }
//         dispatch(Dashboard());
//         dispatch(fetchmsg(data));


//     }, [activeAdminId])

//     function formatTime(timestamp) {
//         const date = new Date(timestamp);
//         const hours = date.getHours();
//         const minutes = date.getMinutes();
//         const amOrPm = hours >= 12 ? 'PM' : 'AM';
//         const twelveHourFormat = hours % 12 || 12;
//         return `${twelveHourFormat}:${minutes} ${amOrPm}`;
//     }


//     const [messageInput, setMessageInput] = useState('');

//     const [isOnline, setIsOnline] = useState(false);

//     const admin = admins.map(admin => admin._id);

//     // const onlineUserIds = Object.values(onlineuser).map(user => user.userid);
//     const onlineUserIds = Object.keys(onlineuser);
//     const isAdminOnline = admin.map(adminId => onlineUserIds.some(userId => userId === adminId));

//     const handleAdminClick = (adminId) => {
//         setActiveAdminId(adminId);
//         setIsOnline(onlineUserIds.includes(adminId));
//         console.log("active admin id", activeAdminId)

//     };


//     return (
//         <>
//             <div className="container-fluid bg-dar mt-4">
//                 <div className="row">
//                     <div className="col-md-3">
//                         <div className="onlineagent">
//                             {admins.map((admin, index) => {
//                                 const isOnlinee = isAdminOnline[index];
//                                 // console.log("adminss chkin", admin)
//                                 return (
//                                     <div
//                                         key={admin.id}
//                                         className={`singleagent d-flex align-items-center justify-content-between ${activeAdminId === admin._id ? 'agentactive' : ''}`}
//                                         onClick={() => handleAdminClick(admin._id)
//                                         }
//                                     >
//                                         <div className="singleagentbox1 d-flex align-items-center">
//                                             <img src={Adminimage} alt="" />
//                                             {isOnlinee ? <div className="onlinebox"></div> : <div className="offline"></div>}
//                                             <div className="agentname">
//                                                 <span>{admin.name}</span>
//                                                 <br />
//                                                 second time shift
//                                             </div>
//                                         </div>
//                                         <div className="singleagentbox2 d-flex justify-content-center align-items-center flex-column">
//                                             2h ago
//                                             <div className="masgcount">
//                                                 3
//                                             </div>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                     <div className="col-md-9">

//                         {activeAdminId ?

//                             (

//                                 <div className="chatboxx">
//                                     <div className="chatboxheader d-flex justify-content-between">
//                                         <div className="chatwithsingleagent d-flex align-items-center">
//                                             <div className="singleagentbox1 d-flex align-items-center">
//                                                 <img src={Adminimage} alt="" />
//                                                 <div className={isOnline ? 'onlinebox' : 'offlinebox'}></div>
//                                             </div>
//                                             <div className="singleagentbox2">
//                                                 <div className="agentname">
//                                                     <span>{admins.find(admin => admin._id === activeAdminId)?.name}</span>
//                                                     <div>{isOnline ? 'Online' : 'Offline'}</div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="headericon d-flex align-items-center">
//                                             <FontAwesomeIcon icon={faBars} className="mr-1" />
//                                         </div>
//                                     </div>

//                                     <div className="messagearea">
//                                         <div className="chatmsgarea">
//                                             <div className="messages-container">
//                                                 {/* Check if both agentmsg and adminmsg are arrays before combining and processing */}
//                                                 {(Array.isArray(agentmsg) || Array.isArray(adminmsg)) ? (
//                                                     // At least one of the arrays is valid, so you can safely combine and process them
//                                                     ([...agentmsg, ...adminmsg])
//                                                         .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
//                                                         .map((message, index) => (
//                                                             <div
//                                                                 className={`message ${message.senderType === 'admin' ? 'receivermsg' : 'sendermsg'}`}
//                                                                 style={{
//                                                                     alignSelf: message.senderType === 'admin' ? 'flex-start' : 'flex-end'
//                                                                 }}
//                                                                 key={index}
//                                                             >
//                                                                 <div className="message-text">{message.text}</div>
//                                                                 <div className="message-time">{formatTime(new Date(message.createdAt))}</div>
//                                                             </div>
//                                                         ))
//                                                 ) : (
//                                                     // Neither agentmsg nor adminmsg are valid arrays, handle this case accordingly
//                                                     <div className="error-message">
//                                                         No Messages, Start conversation right now
//                                                     </div>
//                                                 )}

//                                             </div>






//                                         </div>
//                                         <div className="inputchatbox d-flex">
//                                             <input type="text" name="" id="" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder="Write message here" />
//                                             <div className="papericon">
//                                                 <button onClick={handleSendMessage}>
//                                                     <FontAwesomeIcon icon={faPaperPlane} className="mr-1" />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <div className="chatboxx d-flex justify-content-center align-items-center">
//                                     <b>Select any person to start the chat</b>
//                                 </div>
//                             )}



//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }


// export default Adminchat;
