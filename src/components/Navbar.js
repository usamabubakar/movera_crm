import React, { useState } from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faDashboard } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import './Navbar.css';
import Adminimage from '../images/3.jpg'
export default function Navbar(props) {

    const [hideshow, setHideshow] = useState('300');
    const [iconn, setIconn] = useState(<FontAwesomeIcon icon={faCircleXmark} style={{
        position: 'relative',
        left: "260px", cursor: 'pointer'
    }} />);
    const hideshowvalue = hideshow
    console.log(hideshowvalue)
    const bars = <FontAwesomeIcon icon={faBars} />
    const handlewidth = () => {
        setHideshow(64);
        if (hideshow == 300) {
            setHideshow(64)
            setIconn(<FontAwesomeIcon icon={faBars} style={{
                position: 'relative',
                left: "0px", cursor: 'pointer', transition: 'all 0.2s ease-in'
            }} />)

        }
        else {
            setHideshow(300)
            setIconn(<FontAwesomeIcon icon={faCircleXmark} style={{
                position: 'relative',
                left: "250px", transition: 'all 0.3s ease-in'
            }} />)

        }
    }
    return (
        <div className="container-fluid dashboard">
            <div className="row d-flex dashboard">
                <div className="left-hand-sidebar" style={{ width: `${hideshow}px` }}>
                    <div>
                        <div className="linebar" onClick={handlewidth} >
                            {iconn}
                        </div>
                        <div className="image-areaa">
                            <img src={Adminimage} alt="" />
                            <h5 className="pt-2">Usama Abubakar</h5>
                            <p className="mt-n2">Lead Developer</p>
                        </div>
                    </div>

                    <div className="navlinks">
                        <ul className="nav flex-column">



                            <li className="nav-item" style={{ width: hideshow == 64 ? '47px' : '275px' }} >
                                <a className="nav-link active" aria-current="page" href="#">

                                    <FontAwesomeIcon icon={faDashboard} className="mr-4 li-icons" /> Dashboard</a>
                            </li>
                            <li className="nav-item" style={{ width: hideshow == 64 ? '47px' : '275px' }}>
                                <a className="nav-link" href="#">
                                    <FontAwesomeIcon icon={faChartLine} className="mr-4 li-icons" /> Leads</a>
                            </li>
                            <li className="nav-item" style={{ width: hideshow == 64 ? '47px' : '275px' }}>
                                <a className="nav-link" href="#">
                                    <FontAwesomeIcon icon={faUser} className="mr-4 li-icons" />Agents</a>
                            </li>

                        </ul>
                    </div>


                    <div className="sidebar-footer">

                        <div className="m-1">
                            <button type="button" className="btn eventt  " >
                                <FontAwesomeIcon icon={faCalendarDays} />
                                <span className="tooltiptext">Events Calender</span>
                            </button>
                        </div>
                        <div className="m-1">
                            <button type="button" className="btn logout " >
                                <FontAwesomeIcon icon={faPowerOff} />
                                <span className="tooltiptext1">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="right-hand-side">
                    <div className="rightHeader">
                        <div class="wrap">
                            <div class="search">
                                <button type="submit" class="searchButton">
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                                <input type="text" class="searchTerm" placeholder="Search" />

                            </div>
                        </div>
                    </div>
                    <div className="container mt-4 ">
                        <div className="row">
                            <div className="col-12 boxes">
                                <div className="box1 box">

                                </div>
                                <div className="box2 box">

                                </div>
                                <div className="boxsmall">
                                    <div className="box1samll box">

                                    </div>
                                    <div className="box1samll box">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
