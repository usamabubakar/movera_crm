import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { faEye, faEyeSlash, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { fetchPendingLead, deleteLead } from '../state/actions/lead';
import { approveLeadFunction } from '../state/actions/lead';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import './style.css';
import { deletependingLead } from '../state/actions/lead';


function Isapprovel(props) {
    const dispatch = useDispatch();
    const Lead_Add = useSelector(state => state.lead.leads);
    const Lead_Data = useSelector(state => state.leadsData.leadsData);
    const leaddelete = useSelector(state => state.lead.leadDelete);
    const [rowidValue, setrowIdValue] = useState()
    const agentdata = useSelector(state => state.agentdata.agentData);
    const leads = useSelector(state => state.leads.leadsData);
    const [editData, seteditData] = useState([]);
    const userData = useSelector(state => state.auth.user);




    useEffect(() => {
        dispatch(fetchPendingLead());
    }, [dispatch]);


    const [cars, setCars] = useState([]);
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [typee, setTypee] = useState('');
    const [idCounter, setIdCounter] = useState(0);

    //    const password ='*'.repeat(row.password.length)
    const [isOn, setIsOn] = useState(false);




    const handleToggle = () => {
        setIsOn(!isOn);
    };






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
            name: 'Assigned To',
            selector: row => row.assignto,
            minWidth: '150px'
        },
        {
            name: 'Approval Status',
            selector: row => row.approvelstatus,
            minWidth: '150px'
        },
        {
            name: 'Lead By',
            selector: row => row.addby,
            minWidth: "150px"
        },
        {
            name: 'Ship Date',
            selector: row => row.shipdate,
            minWidth: '150px'
        },

        {
            name: 'Received Date',
            selector: row => row.recieveddate,
            minWidth: '200px'

        },
        {
            name: 'Time',
            selector: row => row.time,
            minWidth: "150px"
        },
        {
            name: 'View Vehicles',
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
                    <button
                        className={`agent-edit-delete-btn ml-1 `}
                        type='button'
                        data-toggle="modal"
                        data-target="#assignlead"
                        onClick={() => getRowidValue(row.leadId)}
                    >
                        Pending Lead
                    </button>
                    <button className='agent-edit-delete-btn ml-1' type='button' data-toggle="modal" data-target="#deletelead" onClick={() => getRowidValue(row.leadId)} >Delete</button>
                </div>
            ),
            minWidth: '340px',
            center: true

        },
    ];
    const [Viewvehicle, setViewvehicle] = useState([])

    const viewcar = (data) => {
        console.log(data);
        const vehicles = data.split(', ');
        setViewvehicle(vehicles);
    }


    let data = [];
    useEffect(() => {
        if (leads && Array.isArray(leads)) {
            data = leads.map((lead, index) => {

                const receivedDate = new Date(lead.recieveddate);
                const formattedDate = receivedDate.toLocaleDateString();
                const formattedTime = receivedDate.toLocaleTimeString();
                const vehicles = lead.vehicle.map((vehicle) => `${vehicle.make} ${vehicle.model} ${vehicle.
                    modelyear} ${vehicle.vehicletype} ${vehicle.isoperable}` ).join(', ');
                return {
                    id: index + 1,
                    leadId: lead.id,
                    name: lead.fullname,
                    email: lead.email,
                    phoneno: lead.phoneno,
                    assignto: lead.isAssignedName,
                    shipdate: lead.shipdate,
                    recieveddate: formattedDate,
                    time: formattedTime,
                    vehicle: vehicles,
                    addby: lead.addBy,
                    approvelstatus: lead.approvelStatus,
                    rowClass: lead.isAssigned ? 'assigned-row' : ''
                };
            });


            setRecord(data);
        }

    }, [leads]);
    //   console.log(conditionalRowStyles)




    const handleDelete = async(id) => {
        try {
      const del=await dispatch(deletependingLead(id))
        if (del) {
            toast.success("Lead deleted Successfully...!");
        }
        else{
            toast.error("Lead not deleted Successfully...!");
        }
        } catch (error) {
            toast.error('internal error');
        }
    };

    const pendingleadfun =async (e) => {
      try {
        e.preventDefault()
        const status = e.target.pendingleadstatus.value
        const data = {
            leadId: rowidValue,
            status: status
        }
     const aprovel= await dispatch(approveLeadFunction(data))
     if(aprovel){
        toast.success("Lead Status Updated");
     }
     else{
        toast.error("Lead Status not Updated");

     }
      } catch (error) {
        toast.error("internal eeror");

      }
    }



    const [record, setRecord] = useState(data);
    function handlefilter(event) {
        console.log("usama")
        const newdata = data.filter(row => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecord(newdata)
    }

    const getRowidValue = (id) => {
        console.log(id)

        setrowIdValue(id);
        console.log(rowidValue)
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

   {/* view cars  */}
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
                                        <th>IS Operable?</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {Viewvehicle.map((vehicle, index) => {
                                        const [make, model, modelyear, vehicletype, operable] = vehicle.split(' ');
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

            {/* delete lead  */}
            <div class="modal fade" id="deletelead" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Delete Lead</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure want to delete Lead?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="agent-edit-delete-btn ml-1" style={{ padding: '9px 10px' }} onClick={() => handleDelete(rowidValue)} data-dismiss="modal">Yes Sure</button>

                        </div>
                    </div>
                </div>
            </div>

            {/* assign lead  */}


            <div class="modal fade" id="assignlead" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Approved or Pending</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form action="" onSubmit={pendingleadfun}>
                            <div class="modal-body">
                                <div className="form-group">
                                    <h4>Status</h4>
                                    <select name="pendingleadstatus" id="pendingleadstatus" className='assignlead'>
                                        <option value="" >Select</option>
                                        <option value="Not Approved" >Not Approved</option>
                                        <option value="Approved" >Approved</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="agent-edit-delete-btn ml-1" style={{ padding: '9px 10px' }}  >Assign</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>






            <div className='agenttable'>
                <div className="agent-header ">
                    <div className="agenttab">
                        Pending Leads
                    </div>

                </div>
                <div className="agentsearch  d-flex justify-content-between pr-2 ">
                    <div className='d-flex '>
                        <div className='agentsearchicon d-flex align-items-center'>
                            <FontAwesomeIcon icon={faSearch} className='mr-1' />
                        </div>
                        <input type="text" onChange={handlefilter} placeholder='Search by name ' />
                    </div>
                    {/* <div className="realtime d-flex justify-content-center align-items-centers">
                        <div>
                            {isOn && (
                                <div className={`isonbtn ${isOn ? 'show' : ''}`}>
                                    <button className={`toglebtn ${isOn ? 'show' : ''}`} type='button' data-toggle="modal" data-target="#assignlead">Asign Lead</button>
                                    <button className={`ml-1 toglebtn ${isOn ? 'show' : ''}`} type='button' data-toggle="modal" data-target="#deletemodel">Delete</button>
                                </div>
                            )}
                        </div>
                        <div className='d-flex justify-content-center align-items-center'>
                            <label htmlFor="check" className='switch'>
                                <input type="checkbox" onClick={handleToggle} id='check' />
                                <span className='toglecircle'></span>
                            </label>
                            Real Time
                        </div>

                    </div> */}
                </div>
                <div className='agentdata'>

                    <DataTable
                        columns={columns}
                        data={record}
                        pagination
                        fixedHeader
                        responsive
                        selectableRows={isOn}
                        highlightOnHover
                    />
                </div>
            </div>
        </>





    )
}

export default Isapprovel
