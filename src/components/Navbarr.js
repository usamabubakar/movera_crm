import React, { useState } from 'react'

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faDashboard } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Adminimage from '../images/3.jpg'

export default function Navbarr() {
    const [hideshow, setHideshow] = useState('280');
    console.log(hideshow)
    const handlewidth = () => {
        console.log("click")
        setHideshow(64);
        if (hideshow == 280) {
            setHideshow(64)
        }
        else {
            setHideshow(280)
        }
    }
    return (
        <div className="navigation " id="fixednav" style={{ width: `${hideshow}px` }}>
            <div>
            <FontAwesomeIcon icon={faCircleArrowLeft} onClick={handlewidth} />

                <ul>
                    <li>
                    <div>
                        
                        <div className="image-areaa">
                            <img src={Adminimage} alt="" />
                            <h5 className="pt-2">Usama Abubakar</h5>
                            <p className="mt-n2">Lead Developer</p>
                        </div>
                    </div>
                    </li>
                    <li>
                        <a href="">
                            <span className="icon">
                                <FontAwesomeIcon icon={faDashboard} />
                            </span>
                            <span className="title">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <span className="icon">
                                <FontAwesomeIcon icon={faChartLine} />
                            </span>
                            <span className="title">Leads</span>
                        </a>
                    </li>
                    <li>
                        <a href="services.html">
                            <span className="icon">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                            <span className="title">Agents</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <span className="icon">
                                <FontAwesomeIcon icon={faUsers} />
                            </span>
                            <span className="title">Vendors</span>
                        </a>
                    </li>
                </ul>
            </div>
            
        </div>
    )
}

