import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { faEye, faEyeSlash, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { fetchLead, addLead, deleteLead, assignLead } from '../../state/actions/lead';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { sendEmail } from '../../state/actions/email';
import { updateStatus } from '../../state/actions/lead';
import template from '../SendmailTemplate';

import '../style.css';


function CutomerAgreement(props) {
    const dispatch = useDispatch();
    const Lead_Add = useSelector(state => state.lead.leads);
    const Lead_Data = useSelector(state => state.leadsData.leadsData);
    const leaddelete = useSelector(state => state.lead.leadDelete);
    const [rowidValue, setrowIdValue] = useState()
    const agentdata = useSelector(state => state.agentdata.agentData);
    const leads = useSelector(state => state.leads.leadsData);
    const [editData, seteditData] = useState([]);
    const userData = useSelector(state => state.auth.user);

    const customStyles = {
        headCells: {
          style: {
            backgroundColor: '#141025', // Replace with your desired color
            color: 'white', // Replace with your desired text color
            fontWeight:'bold'
          },
        },
      };




    useEffect(() => {
        const pagename='agreement'
        const userid=userData.id
        const data={
            pagename:pagename,
            id:userid
        }
        dispatch(fetchLead(data));
    }, [dispatch]);


    const [cars, setCars] = useState([]);
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [typee, setTypee] = useState('');
    const [idCounter, setIdCounter] = useState(0);







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
            name: 'Digital signature',
            minWidth: '200px',
            selector: row => (
                <img
                  src={row.signature}
                  width={90}
                  height={70}
                  alt='Player'
                />
              )
          }
,
        {
            name: 'Ip Address',
            selector: row => row.phoneno,
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

    ];
    const [Viewvehicle, setViewvehicle] = useState([])

    const viewcar = (data) => {
        console.log(data);
        const vehicles = data.split(', ');
        setViewvehicle(vehicles);
    }




    const [record, setRecord] = useState([]);
    const [searchText, setSearchText] = useState('');
    let [data, setData] = useState([]);
    useEffect(() => {
        if (leads && Array.isArray(leads)) {
            const dataa = leads.map((lead, index) => {

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
                    signature:lead.signature,
                    agreemwnt:lead.agreement,
                    ipaddress:lead.ipaddress,
                    vehicle: vehicles,
                };
            });


            setData(dataa);
            setRecord(dataa);
        }

    }, [leads]);
    function handlefilter(event) {
        const searchText = event.target.value.toLowerCase();

        if (searchText === '') {
            setRecord(data);
        } else {
            const filteredData = data.filter((row) =>
            row.name.toLowerCase().includes(searchText) ||
            row.email.toLowerCase().includes(searchText) ||
            row.phoneno.includes(searchText)
            );

            setRecord(filteredData);
        }

        setSearchText(event.target.value);
    }




    return(
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


            <div className='agenttable'>
                <div className="agent-header ">
                    <div className="agenttab">
                   Customer Agreements
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

export default CutomerAgreement
