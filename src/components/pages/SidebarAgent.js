
import '../Sidebar.css';
import Adminimage from './3.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faUser, faUsers, faChartLine, faPowerOff, faCalendarDays, faCircleArrowLeft
, faQuoteRight, faTruck, faFileArchive, faCloud, faHandshake, faDiamondTurnRight,
 faTrashAlt, faArchive, faListAlt, faBoxOpen,faMessage
} from "@fortawesome/free-solid-svg-icons";
import io from 'socket.io-client';

import React, { useState, useEffect } from 'react';

import { NavLink } from 'react-router-dom';
import { logout_user } from '../../state/actions/authUser';
import { useDispatch } from 'react-redux';
import { fetchLead } from '../../state/actions/lead';
import { useSelector } from 'react-redux';

const SidebarAgent = (props) => {
    const userData = useSelector(state => state.auth.user);

    const dispatch = useDispatch();
    const logout =(e)=>{
        e.preventDefault();
        console.log("click logout")
        dispatch(logout_user())
        // socket.emit('logout', userData.id);

    }

    const [socket, setsocket] = useState(null);

    // useEffect(() => {
    //     // Connect to the WebSocket server
    //     const newSocket = io("http://localhost:4000");

    //     newSocket.on("connect", () => {
    //       console.log("Socket connected.");
    //     });

    //     newSocket.on("disconnect", () => {
    //       console.log("Socket disconnected.");
    //     });

    //     setsocket(newSocket);

    //     // Clean up: Disconnect from the server when the component unmounts
    //     return () => {
    //       newSocket.disconnect();
    //     };
    //   }, []);


    const [onlineuser, setonlineuser] = useState([])
    console.log("onlineuser agent ", onlineuser)

    // useEffect(() => {
    //     if (!socket || !userData.id) return; // Check if userData.id is available

    //     console.log("emitting addnewuser for agent");
    //     socket.emit("addnewuser", userData.id);

    //     socket.on("getonlineuser", (res) => {
    //       setonlineuser(res);
    //     });

    //     return () => {
    //       socket.off("getonlineuser");
    //     };
    // },[]); // Include socket and userData.id in the dependency array


    const newSockett = io("http://www.crmsmtransports.site");

  useEffect(() => {
      const handleNewLeadNoti = (res) => {

          const pagename = 'lead'
        const userid = userData?.id
        const data = {
            pagename: pagename,
            id: userid
        }
        console.log("assigne lead eurnng ")
          dispatch(fetchLead(data));
      };

      // Add the event listener only once when the component mounts
      newSockett.on("leadassigned", handleNewLeadNoti);

      return () => {
          // Clean up the event listener when the component unmounts
          newSockett.off("leadassigned", handleNewLeadNoti);
      };
  }, []);

    return (
        <div className='sidebar' style={{ width: `${props.widthh}rem` }}>
            <div style={{ color: 'white' }}></div>
            <div className="image-area">
                <img src={Adminimage} alt="" />
                <h5 className="pt-2 adminname">{userData?.name}</h5>
                <p className="mt-n2 des">Agent  Dashbord</p>
            </div>

            <div className="menu">
                <div className="menuitems ">
                    <NavLink to="/leads" className='anchortag ' activeClassName='active' style={{ textDecoration: 'none' }}>

                        <div className="menuicon">
                            <FontAwesomeIcon icon={faChartLine} />
                        </div>
                        <span>
                            Leads
                        </span>
                    </NavLink>
                </div>
                <div className="menuitems">
                    <NavLink to="/followup" className='anchortag' activeClassName='active' style={{ textDecoration: 'none' }}>
                        <div className="menuicon">
                            <FontAwesomeIcon icon={faDiamondTurnRight} />
                        </div>
                        <span>
                            Follow Up
                        </span>
                    </NavLink>
                </div>
                <div className="menuitems">
                    <NavLink to="/quotes" className='anchortag' style={{ textDecoration: 'none' }}>
                        <div className="menuicon">
                            <FontAwesomeIcon icon={faQuoteRight} />
                        </div>
                        <span>
                            Quotes
                        </span>
                    </NavLink>
                </div>
                <div className="menuitems">
                    <NavLink to="/orders" className='anchortag' style={{ textDecoration: 'none' }}>
                        <div className="menuicon">
                            <FontAwesomeIcon icon={faBoxOpen} />
                        </div>
                        <span>
                            Orders
                        </span>
                    </NavLink>
                </div>
                <div className="menuitems">
                    <NavLink to="/agreements" className='anchortag' style={{ textDecoration: 'none' }}>
                        <div className="menuicon">
                            <FontAwesomeIcon icon={faHandshake} />
                        </div>
                        <span>
                             Agreement
                        </span>
                    </NavLink>
                </div>
                <div className="menuitems">
                    <NavLink to="/dispatched" className='anchortag' style={{ textDecoration: 'none' }}>
                        <div className="menuicon">
                            <FontAwesomeIcon icon={faTruck} />
                        </div>
                        <span>
                            Dispatched
                        </span>
                    </NavLink>
                </div>

                <div className="menuitems">
                    <NavLink to="/potential" className='anchortag' style={{ textDecoration: 'none' }}>
                        <div className="menuicon">
                            <FontAwesomeIcon icon={faListAlt} />
                        </div>
                        <span>
                        Completed
                        </span>
                    </NavLink>
                </div>
                 <div className="menuitems">
                    <NavLink to="/cancelleads" className='anchortag' style={{ textDecoration: 'none' }}>
                        <div className="menuicon">
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </div>
                        <span>
                            Cancel Orders
                        </span>
                    </NavLink>
                </div>
                {/* <div className="menuitems">
                    <NavLink to="/chat" className='anchortag' style={{ textDecoration: 'none' }}>
                        <div className="menuicon">
                            <FontAwesomeIcon icon={faMessage} />
                        </div>
                        <span>
                            Chat
                        </span>
                    </NavLink>
                </div> */}
                {/* <div className="menuitems">
                    <NavLink to="/vendor" className='anchortag' style={{ textDecoration: 'none' }}>
                        <div className="menuicon">
                            <FontAwesomeIcon icon={faFileArchive} />
                        </div>
                        <span>
                            Archived
                        </span>
                    </NavLink>
                </div> */}
                {/* <div className="menuitems">
                    <NavLink to="/vendor" className='anchortag' style={{ textDecoration: 'none' }}>
                        <div className="menuicon">
                            <FontAwesomeIcon icon={faCloud} />
                        </div>
                        <span>
                            Potential
                        </span>
                    </NavLink>
                </div>
                <div className="menuitems">
                    <NavLink to="/vendor" className='anchortag' style={{ textDecoration: 'none' }}>
                        <div className="menuicon">
                            <FontAwesomeIcon icon={faHandshake} />
                        </div>
                        <span>
                            Customer Agreements
                        </span>
                    </NavLink>
                </div> */}
                <div className="menuitems">
                    <div className="sidebar-footer">
                        <div className="m-1">
                            <button type="button" className="btn logout" onClick={logout}>
                                <FontAwesomeIcon icon={faPowerOff} />
                                <span className="tooltiptext1" >Logout</span>
                            </button>
                        </div>
                        <div className="m-1">
                            <button type="button" className="btn eventt">
                                <FontAwesomeIcon icon={faCalendarDays} />
                                <span className="tooltiptext">Events Calendar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarAgent;
