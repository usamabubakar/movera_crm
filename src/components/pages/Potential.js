import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { faEye, faEyeSlash, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { fetchLead, addLead, deleteLead, assignLead } from '../../state/actions/lead';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import React, { useRef } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { sendEmail } from '../../state/actions/email';
import { updateStatus } from '../../state/actions/lead';
import template from '../SendmailTemplate';

import '../style.css';


function Potential(props) {
    const dispatch = useDispatch();
    const Lead_Add = useSelector(state => state.lead.leads);
    const Lead_Data = useSelector(state => state.leadsData.leadsData);
    const leaddelete = useSelector(state => state.lead.leadDelete);
    const [rowidValue, setrowIdValue] = useState()
    const agentdata = useSelector(state => state.agentdata.agentData);
    const leads = useSelector(state => state.leads.leadsData);
    const [editData, seteditData] = useState([]);
    const userData = useSelector(state => state.auth.user);
    const emailsent = useSelector(state => state.emailsent.emailsend);

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#141025', // Replace with your desired color
                color: 'white', // Replace with your desired text color
                fontWeight: 'bold'
            },
        },
    };



    useEffect(() => {
        const pagename = 'Potentail'
        const userid = userData.id
        const data = {
            pagename: pagename,
            id: userid
        }
        dispatch(fetchLead(data));
    }, [dispatch]);










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
                    {/* <button className='agent-edit-delete-btn d-flex align-items-center '
                        disabled={row.approvalStatus === 'Not Approved' || row.approvalStatus === 'Pending'}
                        data-toggle="modal" onClick={() => handleEdit(row.leadId)} data-target="#vendoremail">
                        <div className='mailcount'>{row.mailcount}</div>
                        Send Email</button>
                    <button className='agent-edit-delete-btn ml-1' onClick={() => handleEdit(row.leadId)} type='button' data-toggle="modal" data-target="#updatelead">Update</button> */}
                    <button className='agent-edit-delete-btn ml-1' onClick={() => handleEdit(row.leadId)} type='button' data-toggle="modal" data-target="#updatestatus">Update Status</button>

                </div>
            ),
            minWidth: '200px',
            center: true

        },
    ];
    const [Viewvehicle, setViewvehicle] = useState([])

    const viewcar = (data) => {
        console.log(data);
        const vehicles = data.split(', ');
        setViewvehicle(vehicles);
    }


    const handleEdit = (id) => {
        const foundlead = leads.find((lead) => lead.id === id);
        console.log(foundlead);
        seteditData([
            foundlead.id,
            foundlead.fullname,
            foundlead.email,
            foundlead.phoneno,
            foundlead.originaddress,
            foundlead.origincity,
            foundlead.originstate,
            foundlead.originzipcode,
            foundlead.destinationaddress,
            foundlead.destinationcity,
            foundlead.destinationstate,
            foundlead.destinationzipcode,
            foundlead.shipdate,
            foundlead.howmany,
            foundlead.vehicle

        ]);

    };


    const statusRef = useRef(null);
    const updatestatus = (data) => {
        // e.preventDefault();
        const status = statusRef.current.value;
        console.log(status);
        console.log(data)
        const dataa = {
            leadid: data[0],
            agentid: userData.id,
            status: status
        }
        dispatch(updateStatus(dataa));
        if (!Lead_Add) {
            toast.success('status update Successfully...!');
        }
        else if (Lead_Add) {
            toast.error('Lead status not update Successfully...!');
        }
    }

    let data = [];
    useEffect(() => {
        if (leads && Array.isArray(leads)) {
            data = leads.map((lead, index) => {

                const receivedDate = new Date(lead.recieveddate);
                const formattedDate = receivedDate.toLocaleDateString();
                const formattedTime = receivedDate.toLocaleTimeString();
                const vehicles = lead.vehicle?.map((vehicle) => `${vehicle.make} ${vehicle.model} ${vehicle.
                    modelyear} ${vehicle.vehicletype}`).join(', ');
                return {
                    id: index + 1,
                    leadId: lead.id,
                    name: lead.fullname,
                    email: lead.email,
                    phoneno: lead.phoneno,
                    assignto: lead.isAssignedName,
                    shipdate: lead.shipdate,
                    origincity: lead.origincity,
                    originaddress: lead.originaddress,
                    originstate: lead.originstate,
                    originzipcode: lead.originzipcode,
                    destinationcity: lead.destinationcity,
                    destinationaddress: lead.destinationaddress,
                    destinationstate: lead.destinationstate,
                    destinationzipcode: lead.destinationzipcode,
                    vehicle: vehicles,
                    mailcount: lead.mailcount,
                    approvalStatus: lead.approvelStatus,
                    addby: lead.addBy,
                    rowClass: lead.isAssigned ? 'assigned-row' : ''
                };
            });


            setRecord(data);
        }

    }, [leads]);
    //   console.log(conditionalRowStyles)













    const [record, setRecord] = useState(data);
    function handlefilter(event) {
        console.log("usama")
        const newdata = data.filter(row => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecord(newdata)
    }

    const getRowidValue = (id) => {
        setrowIdValue(id);
    }


    return (
        <>


            <div >
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
            {/* veiw car  */}
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {Viewvehicle.map((vehicle, index) => {
                                        const [make, model, modelyear, vehicletype] = vehicle.split(' ');
                                        return (
                                            <tr key={index}>
                                                <td>{make}</td>
                                                <td>{model}</td>
                                                <td>{modelyear}</td>
                                                <td>{vehicletype}</td>
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





            {/* update lead status  */}
            <div class="modal fade" id="updatestatus" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Assign Lead</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form action="">
                            <div class="modal-body">
                                <div className="form-group">
                                    <h4>Update Lead Status</h4>
                                    <select name="status" id="status" className='assignlead' ref={statusRef}>
                                        <option value="">Select</option>
                                        <option value="lead">Leads</option>
                                        <option value="Followup">Follow Up</option>
                                        <option value="Quotes">Quotes</option>
                                        <option value="Orders">Orders</option>
                                        <option value="Dispatched">Dispatched</option>
                                        <option value="Archived">Archived</option>
                                        <option value="Potentail">Potential</option>
                                        <option value="Cancel">Cancel Order</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="agent-edit-delete-btn ml-1" data-dismiss="modal" onClick={() => {
                                    if (statusRef.current.value !== '') {
                                        updatestatus(editData);
                                    }
                                }}>Update Status</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            {/* // end */}






            <div className='agenttable'>
                <div className="agent-header ">
                    <div className="agenttab">
                        Potential
                    </div>

                </div>
                <div className="agentsearch  d-flex justify-content-between pr-2 ">
                    <div className='d-flex '>
                        <div className='agentsearchicon d-flex align-items-center'>
                            <FontAwesomeIcon icon={faSearch} className='mr-1' />
                        </div>
                        <input type="text" onChange={handlefilter} placeholder='Search by name ' />
                    </div>

                </div>
                <div className='agentdata'>

                    <DataTable
                        columns={columns}
                        data={record}
                        pagination
                        fixedHeader
                        responsive
                        highlightOnHover
                        customStyles={customStyles}

                    />
                </div>
            </div>
        </>





    )
}

export default Potential
