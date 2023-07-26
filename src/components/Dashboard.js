import React, { useState, useEffect } from 'react'
import Adminimage from '../images/3.jpg'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faDashboard } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Doughnut } from 'react-chartjs-2';
import Chart from "react-apexcharts";
import './style.css'
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { Dashboard } from '../state/actions/dashbord';
import { fetchnotification } from '../state/actions/lead';
import { deletenoti } from '../state/actions/lead';
import { getNotifications } from './sse';
// import io from 'socket.io-client';
// import { WebSocket } from 'websocket';


import io, { Socket } from 'socket.io-client'



export default function Dashborad() {



    const dispatch = useDispatch();
    const totallead = useSelector(state => state.dashborddata.totalleads);
    const totaladmin = useSelector(state => state.dashborddata.totaladmin);
    const totalagent = useSelector(state => state.dashborddata.totalagent);
    const payments = useSelector(state => state.dashborddata.payment);

    const onlineagent = useSelector(state => state.dashborddata.onlineagent);
    // const messages = useSelector((state) => state.messages.messages);
    const notificationn = useSelector((state) => state.notification.notification);
    const leads = useSelector(state => state.leads.leadsData);


    const onlineadmin = useSelector(state => state.dashborddata.onlineAdmin);
    const price = useSelector(state => state.dashborddata.price);


    const userData = useSelector(state => state.auth.user);

    const [notificationnn, setNotificationnn] = useState([]);

    useEffect(() => {
        console.log("get notif")
        const recievenotification = getNotifications();
        setNotificationnn(recievenotification);
        console.log(recievenotification)
    }, []);
    const notiidel = (index) => {
        setNotificationnn((prevNotifications) =>
            prevNotifications.filter((_, i) => i !== index)
        );
    };


    // useEffect(() => {
    //     const socket = new WebSocket('http://localhost:5000', [], {
    //         withCredentials: true
    //     });

    //     // Connection opened
    //     socket.addEventListener('open', (event) => {
    //         console.log('Connected to WebSocket server');
    //     });

    //     // Listen for messages
    //     socket.addEventListener('message', (event) => {
    //         const notification = JSON.parse(event.data);
    //         console.log('Received notification:', notification);

    //         // Process the received notification
    //         // You can update the UI, display a notification, or perform other actions
    //     });

    //     // Connection closed
    //     socket.addEventListener('close', (event) => {
    //         console.log('Disconnected from WebSocket server');
    //     });

    //     // Error occurred
    //     socket.addEventListener('error', (error) => {
    //         console.error('WebSocket error:', error);
    //     });

    //     // Clean up the WebSocket connection
    //     return () => {
    //         socket.close();
    //     };
    // }, []);
    // const [socket, setsocket] = useState(null);
    // useEffect(() => {
    //     const newsocket = io("http://localhost:5000"); // Connect to the server
    //     console.log(newsocket)
    //     setsocket(newsocket)

    //     return () => {
    //         newsocket.disconnect(); // Disconnect from the server when the component unmounts
    //     };

    // }, []);
    // const [onlineuser ,setonlineuser]=useState([])
    // console.log("onlineuser", onlineuser)
    // useEffect(() => {
    //     if (socket === null) return
    //     socket.emit("addnewuser", userData.id)
    //     socket.on("getonlineuser",(res)=>{
    //         setonlineuser(res)
    //     })

    // }, [socket]);

    useEffect(() => {
        const socket = io(); // Connect to the server

        socket.on('newLeadNotification', (notification) => {
            // Handle the received notification
            console.log(notification);
            // Update your UI or show a notification to the admin
        });

        return () => {
            socket.disconnect(); // Disconnect from the server when the component unmounts
        };

    }, []);



    useEffect(() => {
        dispatch(Dashboard());

    }, [dispatch]);


    const [state, setState] = useState({
        options: {
            chart: {
                id: "basic-bar",
                height: 350,
                width: '100%'
            },
            xaxis: {
                categories: ['Mon', 'Tus', 'Thus', 'Wed', 'Fri', 'Sat', 'Sun']
            }
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 91]
            }
        ],
        fill: {
            colors: ['#f00']
        },
    })





    const [hideshow, setHideshow] = useState('280');

    const handlewidth = () => {
        console.log("click")
        setHideshow(64);
        window.user = 64;
        if (hideshow == 280) {
            setHideshow(64)

        }
        else {
            setHideshow(280)
        }
    }
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [agentid, setagentid] = useState();

    const handleChatToggle = (id) => {
        console.log(id + "agent id");
        setagentid(id)
        console.log(userData.id + "admin id")
        setIsChatOpen(!isChatOpen);
    };
    const handleCloseChat = () => {
        setIsChatOpen(false)
    };

    const [message, setMessage] = useState('');

    const handleChangeMessage = (e) => {
        setMessage(e.target.value);
    }

    const handleSendMessage = () => {

        // dispatch(sendMessageToAgent(agentid, message))
        // // socket.emit('send_message', { agentid, message });
        // setMessage(''); // Clear the message input field after sending the message
    };

    const [notifications, setNotifications] = useState(0);
    const [showNotification, setShowNotification] = useState(false);
    const [notification, setNotification] = useState(null);

    const handleClicknoti = () => {
        setShowNotification(!showNotification);
        dispatch(fetchnotification());
    };
    const notidel = (id) => {
        console.log(id + "noti")
        dispatch(deletenoti(id))
    };


    return (

        <div className="main-area" >
            <div className="tool-nav">
                <div className="toggle-btn" >
                    {/* <FontAwesomeIcon icon={faCircleArrowLeft} onClick={handlewidth} /> */}
                </div>
                <div className="imgbox">
                    <img src={Adminimage} alt="" className="img-fluid" />
                    <span onClick={handleClicknoti} id="shownoti">
                        <div className="notification-button" >
                            <div className="noti-no">{notificationnn.length}</div>
                            <div className="noti-icon">
                                <FontAwesomeIcon icon={faBell} />
                            </div>
                        </div>
                    </span>
                    {showNotification && (
                        <div className="noti-box" id="popup-1">
                            <div className="main-noti-box">
                                {notificationnn?.length > 0 ? (
                                    notificationnn.map((notification, index) => (
                                        <div className="noti-box1 d-flex justify-content-center align-items-center">

                                            <div key={index} className="notification-box d-flex justify-content-between">

                                                <div className="check-content">
                                                    {notification}
                                                    <br />
                                                    <span>View Lead in Pending lead page</span>
                                                </div>
                                                <div className="chckmark">
                                                    <FontAwesomeIcon icon={faTimes} onClick={() => notiidel(index)} />
                                                </div>

                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no_notification">
                                        <p>No notifications received yet.</p>
                                    </div>
                                )}



                            </div>

                        </div>
                    )}


                </div>
            </div>
            <div className="cardbox">
                <div className="cardd card1 d-flex  flex-column">

                    <div className="cardheader">
                        <div className="cardicon">
                            <FontAwesomeIcon icon={faChartLine} />
                        </div>
                        <div className="cardicon2">
                            <FontAwesomeIcon icon={faBars} />
                        </div>
                    </div>
                    <div className="cardtext d-flex align-items-center justify-content-betwee">
                        <div>
                            <div className='d-flex align-items-center'>
                                <h1>{totallead}</h1>
                                <FontAwesomeIcon icon={faCircleArrowLeft} className='cardlink' />
                            </div>
                            <span>Total Leads</span>
                        </div>
                        <div>

                        </div>
                    </div>

                </div>
                <div className="cardd card2 d-flex  flex-column">

                    <div className="cardheader">
                        <div className="cardicon">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <div className="cardicon2">
                            <FontAwesomeIcon icon={faBars} />
                        </div>
                    </div>
                    <div className="cardtext">
                        <div className='d-flex align-items-center'>
                            <h1>{totaladmin}</h1>
                            <FontAwesomeIcon icon={faCircleArrowLeft} className='cardlink' />
                        </div>
                        <span>Total Admin</span>
                    </div>

                </div>
                <div className="cardd twocardd d-flex justify-content-between align-items-center">

                    <div className="smallcard1 d-flex align-items-center">
                        <div className="smallcarddata d-flex justify-content-center align-items-center ">
                            <div className="smallcardicon">
                                <div className="smallcardicon">
                                    <FontAwesomeIcon icon={faDollarSign} />
                                </div>
                            </div>
                            <div className="smallcardtext">
                                <h3>{price}$</h3>
                                <span>Total Income</span>
                            </div>

                        </div>
                    </div>
                    <div className="smallcard2 d-flex align-items-center">
                        <div className="smallcarddata2 d-flex justify-content-center align-items-center ">
                            <div className="smallcardicon">
                                <div className="smallcard2icon ">
                                    <FontAwesomeIcon icon={faUsers} />
                                </div>
                            </div>
                            <div className="smallcardtext" style={{ color: 'black' }}>
                                <h3>{totalagent}</h3>
                                <span>Total agents</span>
                            </div>

                        </div>
                    </div>

                </div>

            </div>


            <div className="details-box">
                <div className="box1 ">
                    <div className="box-header d-flex justify-content-between align-items-center ">
                        <div className="Recent-order">
                            <b>Payment Status</b>
                        </div>
                        <div className="veiw-all">
                            <button className="btn btn-secondary">veiw all</button>
                        </div>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Price</td>
                                    <td>Payment</td>
                                    <td>Status</td>
                                </tr>
                            </thead>
                            <tbody>
                                {payments?.slice(-5).map((lead) => {
                                    const deliver = lead.deliverstatus;

                                    return (
                                        <tr key={lead.id}>
                                            <td>{lead.fullname}</td>
                                            <td>{lead.price} $</td>
                                            <td>{lead.paymentstatus}</td>
                                            <td>
                                                <div className={deliver === 'Deliver' ? 'deliver' : deliver === 'Progress' ? 'progress' : ''}>
                                                    {lead.deliverstatus}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}


                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="box2">
                    <div className="recent-customer">
                        <div className="recent-head">
                            <h4><b>Active Agents</b></h4>
                        </div>
                        {
                            onlineagent.map(agent => (
                                <div className="onlineagents mt-2 d-flex justify-content-between align-items-center" key={agent.id}>
                                    <div className="agentonlinebox d-flex align-items-center">
                                        <div className="imageareaagent d-flex">
                                            <img src={Adminimage} alt="" />
                                            <div className='onlineicon'></div>
                                        </div>
                                        <div className="nameareaagent ml-2">
                                            <b>{agent.name}</b> {/* Assuming the agent object has a 'name' property */}
                                        </div>
                                    </div>
                                    <div className="agentonlinebox">

                                    </div>
                                </div>
                            ))
                        }






                    </div>
                </div>
            </div>


        </div>
    )

}
