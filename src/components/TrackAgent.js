import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDirections, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
    faDashboard, faUser, faUsers, faChartLine, faPowerOff, faCalendarDays, faCircleArrowLeft
    , faQuoteRight, faTruck, faFileArchive, faCloud, faTrashAlt, faArchive, faListAlt, faBoxOpen
} from "@fortawesome/free-solid-svg-icons";
import './style.css'
import { connect } from 'react-redux';
import { addVendor } from '../state/actions/vendorCrud';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import loding from "../images/Dual Ring-1s-200px.gif";
import 'react-toastify/dist/ReactToastify.css';
import { emailchecker } from '../state/actions/signupAdmin';
import { fetchVendorData } from '../state/actions/usersData';
import { useEffect } from 'react';
import { updateVendor } from '../state/actions/vendorCrud';
import { deleteVendor } from '../state/actions/vendorCrud';
import { sendEmail } from '../state/actions/email';
import { agentactivity } from '../state/actions/agentActivity';




function TrackAgent(props) {

    const dispatch = useDispatch();
    const signUP_success = useSelector(state => state.agent.success);
    const Email_exist = useSelector(state => state.signupadmin.email_exist);
    const vendordata = useSelector(state => state.vendordata);
    const vendordelete = useSelector(state => state.agent.userDelete);
    const agentdata = useSelector(state => state.agentdata.agentData);
    const agentactivitydata = useSelector(state => state.activitydata.activitydata);
    const totalleadss = useSelector(state => state.activitydata?.totalleads);
    const vendors = useSelector(state => state.vendors.vendor);




    const [activeTab, setActiveTab] = useState();
    const [leads, setLeads] = useState([]);
    const [page, setPage] = useState()
    const [agentId, setAgentId] = useState()

const [pagerow, setpagerow]=useState('')




const columns = [
    {
        name: 'Id',
        selector: 'id',
        maxWidth: '30px',
    },

    {
        name: 'Full Name',
        selector: row => row.name,
        minWidth: '150px'
    },
    {
        name: 'Email',
        selector: row => row.email,
        minWidth: '250px',

    },
    {
        name: 'Phone No',
        selector: row => row.phoneno,
        minWidth: '200px'
    },
    {
        name: 'Origin City',
        selector: row => row.origincity,
        minWidth: "150px"
    },
    {
        name: 'Origin address',
        selector: row => row.originaddress,
        minWidth: '250px'
    },

    {
        name: 'Origin State',
        selector: row => row.originstate,
        minWidth: '150px'
    },
    {
        name: 'Origin ZipCode',
        selector: row => row.originzipcode,
        minWidth: "150px"
    },
    {
        name: 'Destination City',
        selector: row => row.destinationcity,
        minWidth: "150px"
    },
    {
        name: 'Destination Address',
        selector: row => row.destinationaddress,
        minWidth: "250px"
    },
    {
        name: 'Destination State',
        selector: row => row.destinationstate,
        minWidth: "150px"
    },
    {
        name: 'Destination ZipCode',
        selector: row => row.destinationzipcode,
        minWidth: "150px"
    },
    {
        name: 'Ship Date',
        selector: row => row.shipdate,
        minWidth: '150px'
    },
    {
        name: 'Price',
        selector: row => row.price,
        minWidth: '70px'
    },
    {
        name: 'Initial deposite',
        selector: row => row.intialdeposit,
        minWidth: '70px'
    },
    {
        name: 'Pickup person name',
        selector: row => row.opickup,
        minWidth: '200px'
    },
    {
        name: 'Pickup person no',
        selector: row => row.ophonono,
        minWidth: '200px'
    },
    {
        name: 'Dropoff person name',
        selector: row => row.dpickup,
        minWidth: '200px'
    },
    {
        name: 'Dropoff person no',
        selector: row => row.dphonono,
        minWidth: '200px'
    },
    {
        name: 'Total Vehicles',
        cell: (row) => (
            <div className=' d-flex cell-button' style={{ whiteSpace: 'nowrap' }}>
                <button className='agent-edit-delete-btn ml-1' onClick={() => viewcar(row.vehicle)} type='button' data-toggle="modal" data-target="#viewcars">View Vehicles</button>
            </div>
        ),
        center: true,
        minWidth: '200px'
    },

    {
        name: 'Action',

        cell: (row) => (
            <div className=' d-flex cell-button' style={{ whiteSpace: 'nowrap' }}>
                <button className='agent-edit-delete-btn d-flex align-items-center '
                    disabled={row.approvalStatus === 'Not Approved' || row.approvalStatus === 'Pending'}
                    data-toggle="modal"
                    data-target={
                        row.price == 0
                            ? "#priceerror" : "#vendoremail"
                    }
                >
                    <div className='mailcount'>{row.mailcount}</div>
                    Send Email</button>
                <button className='agent-edit-delete-btn ml-1' type='button' data-toggle="modal" data-target="#updatelead">Update</button>
                <button className='agent-edit-delete-btn ml-1'  type='button' data-toggle="modal"
                    data-target={
                        row.price == 0
                            ? "#priceerror"
                            : row.mailcount == 0
                                ? "#oneemail"
                                : "#updatestatus"
                    }
                >Update Status</button>
            </div>
        ),
        minWidth: '400px',
        center: true

    },
];


    const [record, setRecord] = useState([]);

    const formatLeadData = (leadData) => {
        if (leadData && Array.isArray(leadData)) {
            return leadData.map((lead, index) => {
                const receivedDate = new Date(lead.recieveddate);
                const formattedDate = receivedDate.toLocaleDateString();
                const formattedTime = receivedDate.toLocaleTimeString();
                const vehicles = Array.isArray(lead.vehicle)
                    ? lead.vehicle
                        .map(
                            (vehicle) =>
                                `${vehicle.make} ${vehicle.model} ${vehicle.modelyear} ${vehicle.vehicletype} ${vehicle.isoperable}`
                        )
                        .join(', ')
                    : '';

                return {
                    id: index + 1,
                    leadId: lead.id || lead._id,
                    name: lead.fullname,
                    email: lead.email,
                    phoneno: lead.phoneno,
                    origincity: lead.origincity,
                    originaddress: lead.originaddress,
                    originstate: lead.originstate,
                    originzipcode: lead.originzipcode,
                    destinationcity: lead.destinationcity,
                    destinationaddress: lead.destinationaddress,
                    destinationstate: lead.destinationstate,
                    destinationzipcode: lead.destinationzipcode,
                    shipdate: lead.shipdate,
                    vehicle: vehicles,
                    mailcount: lead.mailcount,
                    price: lead.price,
                    approvalStatus: lead.approvelStatus,
                    intialdeposit: lead.intialdeposite,
                    opickup: lead.Opickup,
                    ophonono: lead.Ophonono,
                    dpickup: lead.Dpickup,
                    dphonono: lead.Dphonono,
                    rowClass: lead.isAssigned ? 'assigned-row' : ''
                };
            });
        }
        return [];
    };

    useEffect(() => {
        return () => {
          setActiveTab('leads');
          setAgentId(null);
          setPage('lead');
          setRecord([]);
        };
      }, []);

    useEffect(() => {
        if (agentactivitydata) {
            const formattedLeads = formatLeadData(agentactivitydata);
            setRecord(formattedLeads);
        }
    }, [agentactivitydata]);





    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'leads') {
            const data = {
                id: agentId,
                page: 'lead'
            };
            dispatch(agentactivity(data));
        }
        if (tab === 'follow-up') {
            const data = {
                id: agentId,
                page: 'Followup'
            };
            dispatch(agentactivity(data));
        }
        if (tab === 'quotes') {
            const data = {
                id: agentId,
                page: 'Quotes'
            };
            dispatch(agentactivity(data));
        }
        if (tab === 'orders') {
            const data = {
                id: agentId,
                page: 'Orders'
            };
            dispatch(agentactivity(data));
        }
        if (tab === 'dispatched') {
            const data = {
                id: agentId,
                page: 'Dispatched'
            };
            dispatch(agentactivity(data));
        }
        if (tab === 'archived') {
            const data = {
                id: agentId,
                page: 'Archived'
            };
            dispatch(agentactivity(data));
        }
        if (tab === 'potential') {
            setpagerow('potential')
            const data = {
                id: agentId,
                page: 'Potentail'
            };
            dispatch(agentactivity(data));
        }
        if (tab === 'cancle') {
            const data = {
                id: agentId,
                page: 'Cancel'
            };
            dispatch(agentactivity(data));
        }
    };
    const searchAgent = (e) => {
        e.preventDefault();
        const id = e.target.agentId.value;
        setPage(activeTab);
        setAgentId(id);
        const data = {
            id: id,
            page: page
        }
        dispatch(agentactivity(data))

    }
    const [Viewvehicle, setViewvehicle] = useState([])

    const viewcar = (data) => {
        console.log(data);
        const vehicles = data.split(', ');
        setViewvehicle(vehicles);
    }


    return (

        <>

<div className="modal fade" id="viewcars" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Lead total Vehicles {Viewvehicle?.length}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <table className="text-center data-table">
                                <thead>
                                    <tr>
                                        <th>Make</th>
                                        <th>Model</th>
                                        <th>Model Year</th>
                                        <th>Vehicle Type</th>
                                        <th>Isoperable?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Viewvehicle.map((vehicle, index) => {
                                        const [make, model, modelyear, vehicletype,operable] = vehicle.split(' ');
                                        return (
                                            <tr key={index}>
                                                <td>{make}</td>
                                                <td>{model}</td>
                                                <td>{modelyear}</td>
                                                <td>{vehicletype}</td>
                                                <td>{operable}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="modal fade" id="selctagent" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Name Of Agent</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form action="" onSubmit={searchAgent} >
                            <div class="modal-body">
                                <div className="form-group">
                                    <select name="agentId" id="agentId" className='assignlead'>
                                        <option value="" >Select</option>

                                        {
                                            agentdata.map((agent, index) => (

                                                <option value={agent.id}  >{agent.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="agent-edit-delete-btn ml-1" style={{ padding: '9px 10px' }}  >Get Data</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className='agenttable'>
                <div className="agent-header ">
                    <div className="agenttab">
                        Track Agent Activity
                    </div>
                    <div className="agentbtn">

                        <button type='button' data-toggle="modal" data-target="#selctagent" className='button-86'><b>Select Agent</b></button>
                    </div>
                </div>
                <div className='d-flex justify-content-between pl-2 pr-2'>
                    <div>
                        <b>Agent name: </b> {totalleadss?.name}
                    </div>
                    <div>
                    <b>Total Leads : {totalleadss?.leadtotal}</b>
                    </div>
                </div>
                <hr />
                <div className=" container agentsearch  ">
                    <div className="menu-tabs d-flex justify-content-center">
                        <div className='trackbutton d-flex  justify-content-center align-items-center flex-column'>
                            <button
                                className={` m-2 ${activeTab === 'leads' ? 'activee' : ''}`}
                                onClick={() => handleTabClick('leads')}
                            >
                                <FontAwesomeIcon icon={faChartLine} />

                            </button>
                            {activeTab === 'leads' && <span >Leads</span>}
                        </div>
                        <div className='trackbutton d-flex justify-content-center align-items-center flex-column'>
                            <button
                                className={` m-2 ${activeTab === 'follow-up' ? 'activee' : ''}`}
                                onClick={() => handleTabClick('follow-up')}
                            >
                              <FontAwesomeIcon icon={faDirections} />

                            </button>
                            {activeTab === 'follow-up' && <span>Follow Up</span>}
                        </div>
                        <div className='trackbutton d-flex justify-content-center align-items-center flex-column'>
                            <button
                                className={` m-2 ${activeTab === 'quotes' ? 'activee' : ''}`}
                                onClick={() => handleTabClick('quotes')}
                            >
                                <FontAwesomeIcon icon={faQuoteRight} />

                            </button>
                            {activeTab === 'quotes' && <span>Quotes</span>}
                        </div>

                        <div className='trackbutton d-flex justify-content-center align-items-center flex-column'>
                            <button
                                className={` m-2 ${activeTab === 'orders' ? 'activee' : ''}`}
                                onClick={() => handleTabClick('orders')}
                            >
                                <FontAwesomeIcon icon={faBoxOpen} />

                            </button>
                            {activeTab === 'orders' && <span>Orders</span>}
                        </div>



                        <div className='trackbutton d-flex justify-content-center align-items-center flex-column'>
                            <button
                                className={`m-2 ${activeTab === 'dispatched' ? 'activee' : ''}`}
                                onClick={() => handleTabClick('dispatched')}
                            >
                                <FontAwesomeIcon icon={faTruck} />

                            </button>
                            {activeTab === 'dispatched' && <span>Dispatched</span>}
                        </div>
                        <div className='trackbutton d-flex trackbutton justify-content-center align-items-center flex-column'>
                            <button
                                className={` m-2 ${activeTab === 'potential' ? 'activee' : ''}`}
                                onClick={() => handleTabClick('potential')}
                            >
                                <FontAwesomeIcon icon={faListAlt} />

                            </button>
                            {activeTab === 'potential' && <span>Completed</span>}
                        </div>

                        <div className='trackbutton d-flex justify-content-center align-items-center flex-column'>
                            <button
                                className={`m-2 ${activeTab === 'archived' ? 'activee' : ''}`}
                                onClick={() => handleTabClick('archived')}
                            >
                                <FontAwesomeIcon icon={faArchive} />

                            </button>
                            {activeTab === 'archived' && <span>Archived</span>}
                        </div>
                        <div className='trackbutton d-flex trackbutton justify-content-center align-items-center flex-column'>
                            <button
                                className={` m-2 ${activeTab === 'cancle' ? 'activee' : ''}`}
                                onClick={() => handleTabClick('cancle')}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />

                            </button>
                            {activeTab === 'cancle' && <span>Cancel Leads</span>}
                        </div>

                    </div>
                </div>
                <div className='agentdata'>
                    {/* <button onClick={get}></button> */}

                    <DataTable
                        columns={columns}
                        data={record}
                        pagination
                        fixedHeader
                        responsive
                        highlightOnHover
                    />





                </div>
            </div>
        </>





    )
}

export default TrackAgent;
