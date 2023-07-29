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


    const handleAddCar = () => {
        if (year.trim() !== '' && make.trim() !== '' && model.trim() !== '' && typee.trim() !== '') {
            const newCar = { id: cars.length, year, make, model, typee };
            setCars((prevCars) => [...prevCars, newCar]);
            setYear('');
            setMake('');
            setModel('');
            setTypee('');
            console.log(cars);
        }
    };
    console.log(cars);
    const deleteCar = (id) => {
        console.log(id);
        setCars((prevCars) =>
            prevCars.filter((car) => car.id !== parseInt(id, 10))
        );
    };



    //    const password ='*'.repeat(row.password.length)
    const [isOn, setIsOn] = useState(false);




    const handleToggle = () => {
        setIsOn(!isOn);
    };



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
            name: 'Vehicle',
            selector: row => row.vehicle,
            minWidth: '300px',
            center: true

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
            name: 'Action',

            cell: (row) => (
                <div className=' d-flex cell-button' style={{ whiteSpace: 'nowrap' }}>
                    <button
                        className={`agent-edit-delete-btn ml-1${row.approvelstatus === 'Not Approved' ? ' d-none' : ''}`}
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



    let data = [];
    useEffect(() => {
        if (leads && Array.isArray(leads)) {
            data = leads.map((lead, index) => {

                const receivedDate = new Date(lead.recieveddate);
                const formattedDate = receivedDate.toLocaleDateString();
                const formattedTime = receivedDate.toLocaleTimeString();
                const vehicles = lead.vehicle.map((vehicle) => `${vehicle.make} ${vehicle.model} ${vehicle.
                    modelyear} ${vehicle.vehicletype}`).join(', ');
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




    const handleDelete = (id) => {
        dispatch(deletependingLead(id))
        if (!leaddelete) {
            toast.success("Lead deleted Successfully...!");
        }
    };

    const pendingleadfun = (e) => {
        e.preventDefault()
        const status = e.target.pendingleadstatus.value
        const data = {
            leadId: rowidValue,
            status: status
        }
        dispatch(approveLeadFunction(data))
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
                    <div className="realtime d-flex justify-content-center align-items-centers">
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

                    </div>
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
