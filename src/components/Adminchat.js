import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faBars, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import './style.css'
import { connect } from 'react-redux';
import { addAgent, fetchAgentData } from '../state/actions/agentCrud';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import loding from "../images/Dual Ring-1s-200px.gif";
import 'react-toastify/dist/ReactToastify.css';
import { emailchecker } from '../state/actions/signupAdmin';
import { useEffect } from 'react';
import { updateAgent } from '../state/actions/agentCrud';
import Adminimage from '../images/3.jpg';
import { useLocation } from 'react-router-dom';

import './chat.css'
// import { connectToChatServer, sendMessage } from '../state/actions/message';


import io, { Socket } from 'socket.io-client'

import { deleteAgent } from '../state/actions/agentCrud';




function Adminchat(props) {




    const dispatch = useDispatch();
    const signUP_success = useSelector(state => state.agent.success);
    const Email_exist = useSelector(state => state.signupadmin.email_exist);
    const agentdata = useSelector(state => state.agentdata);
    const agentdelet = useSelector(state => state.agent.userDelete);
    const agents = useSelector(state => state.agents.agents);
    const notification = useSelector(state => state.agents.notification);
    const userData = useSelector(state => state.auth.user);
    const totalagent = useSelector(state => state.dashborddata.totalagent);
    const onlineagent = useSelector(state => state.dashborddata.onlineagent);

    const [agentmessages, setAgentmessages] = useState([]);


    // const socket = io("http://localhost:5000", {
    //     query: { userId: userData.id }
    // })

    // const [socket, setSocket] = useState(null);
    const [isSocketReady, setIsSocketReady] = useState(false);
    //   const [onlineuser, setOnlineuser] = useState([]);

    const [messageInput, setMessageInput] = useState('');
    const [activeAgentId, setActiveAgentId] = useState(null);
    const [messages, setMessages] = useState([]);



    const [socket, setsocket] = useState(null);
    useEffect(() => {
        const newSocket = io("http://localhost:4000"); // Connect to the server
        console.log(newSocket);

        // Set up a listener for the connection status change
        newSocket.on("connect", () => {
          console.log("Socket connected.");
        });

        newSocket.on("disconnect", () => {
          console.log("Socket disconnected.");
        });

        setsocket(newSocket);

        // Clean up: Disconnect from the server when the component unmounts
        return () => {
          newSocket.disconnect();
        };
      }, []);


    const [onlineuser, setonlineuser] = useState([])
    console.log("onlineuser", onlineuser)
    useEffect(() => {
        if (socket === null) return
        socket.emit("addnewuser", userData.id)
        socket.on("getonlineuser", (res) => {
            setonlineuser(res)
        })

    }, [socket]);

    useEffect(() => {
        console.log("online user same", onlineuser);
    }, [onlineuser]);


const [newmsg, setnewmsg]=useState(null)
    useEffect(() => {
        console.log("newmasg",newmsg)
        if (socket === null) return
        socket.emit("newmsg",[newmsg]);
    }, [newmsg]);



    const handleSendMessage = () => {
        console.log(activeAgentId)
        console.log("clcick")
        if (messageInput.trim() !== '') {
            const data = {
                senderId: userData.id,
                recipientId: activeAgentId,
                message: messageInput
            };
            setnewmsg(data)
            setMessages(prevMessages => [...prevMessages, messageInput]);
            setMessageInput('');
        }
    };



    useEffect(() => {
        console.log("online user same", onlineuser);
    }, [onlineuser]);


    // useEffect(() => {
    //     // Connect to the chat server when the component mounts
    //     socket.emit('join_chat', { userId: userData.id, name: userData.name });
    //     // Send a message to a specific recipient (agent)
    //     socket.emit('send_message', { senderId: userData.id, message: "Hello Usama" });
    // }, []);



    // socket.on('private_message', (data) => {
    //     const msgfromagent=data.message
    //     console.log(msgfromagent)
    //     setAgentmessages(prevMessages => [...prevMessages, msgfromagent]);

    //   // Handle the received message here
    //   // You can update the UI or perform any other logic
    // });
    const [isOnline, setIsOnline] = useState(false);

    const agentIds = agentdata.agentData.map(agent => agent.id);
    const onlineUserIds = onlineuser.map(user => user.userid);
    const isAgentOnline = agentIds.map(agentId => onlineUserIds.some(userId => userId === agentId));
    const handleAgentClick = (agentId) => {
        setActiveAgentId(agentId);
        setIsOnline(onlineUserIds.includes(agentId));
        // console.log(agentIndex)
        console.log(isOnline)
      };

    return (
        <>
            <div className="container-fluid bg-dar mt-4">
                <div className="row">
                    <div className="col-md-3">
                        <div className="onlineagent">
                            {agents.map((agent, index) => {
                                const isOnlinee = isAgentOnline[index];
                                return (
                                    <div
                                        key={agent.id}
                                        className={`singleagent d-flex align-items-center justify-content-between ${activeAgentId === agent.id ? 'agentactive' : ''}`}
                                        onClick={() => handleAgentClick(agent.id)
                                        }
                                    >
                                        <div className="singleagentbox1 d-flex align-items-center">
                                            <img src={Adminimage} alt="" />
                                            {isOnlinee ? <div className="onlinebox"></div> : <div className="offline"></div>}
                                            <div className="agentname">
                                                <span>{agent.name}</span>
                                                <br />
                                                second time shift
                                            </div>
                                        </div>
                                        <div className="singleagentbox2 d-flex justify-content-center align-items-center flex-column">
                                            2h ago
                                            <div className="masgcount">
                                                3
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="col-md-9">

                        {activeAgentId ?

                            (

                                <div className="chatboxx">
                                    <div className="chatboxheader d-flex justify-content-between">
                                        <div className="chatwithsingleagent d-flex align-items-center">
                                            <div className="singleagentbox1 d-flex align-items-center">
                                                <img src={Adminimage} alt="" />
                                                <div className={isOnline?'onlinebox':'offlinebox'}></div>
                                            </div>
                                            <div className="singleagentbox2">
                                                <div className="agentname">
                                                    <span>{agentdata.agentData.find(agent => agent.id === activeAgentId)?.name}</span>
                                                   <div>{isOnline ? 'Online' : 'Offline'}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="headericon d-flex align-items-center">
                                            <FontAwesomeIcon icon={faBars} className="mr-1" />
                                        </div>
                                    </div>

                                    <div className="messagearea">
                                        <div className="chatmsgarea">
                                            <div className="messages-container">
                                                {messages.map((message, index) => (
                                                    <div className="message" key={index}>
                                                        <div className="sendermessage">{message}</div>
                                                        {index < agentmessages.length && (
                                                            <div className="recievermessage">{agentmessages[index]}</div>
                                                        )}
                                                    </div>
                                                ))}
                                                {agentmessages.slice(messages.length).map((agentmessage, index) => (
                                                    <div className="message" key={index}>
                                                        <div className="recievermessage">{agentmessage}</div>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                        <div className="inputchatbox d-flex">
                                            <input type="text" name="" id="" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder="Write message here" />
                                            <div className="papericon">
                                                <button onClick={handleSendMessage}>
                                                    <FontAwesomeIcon icon={faPaperPlane} className="mr-1" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="chatboxx d-flex justify-content-center align-items-center">
                                    <b>Select any person to start the chat</b>
                                </div>
                            )}



                    </div>
                </div>
            </div>
        </>
    )
}


export default Adminchat;
