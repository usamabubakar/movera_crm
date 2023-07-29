import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { faEye, faEyeSlash, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { fetchLead, addLead, deleteLead, assignLead } from '../state/actions/lead';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateLead } from '../state/actions/lead';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Checkbox } from 'antd';
import { useSelector } from 'react-redux';
import './style.css';


function Lead(props) {
    const dispatch = useDispatch();
    const Lead_Add = useSelector(state => state.lead.leads);
    const Lead_Data = useSelector(state => state.leadsData.leadsData);
    const leaddelete = useSelector(state => state.lead.leadDelete);
    const [rowidValue, setrowIdValue] = useState()
    const agentdata = useSelector(state => state.agentdata.agentData);
    const leads = useSelector(state => state.leads.leadsData);
    const [editData, seteditData] = useState([]);
    const userData = useSelector(state => state.auth.user);
    const [selectedLeadIds, setSelectedLeadIds] = useState([]);
    const [leadnotification, setLeadNotification] = useState([]);
    const id = useSelector(state => state.auth.user.id);




    useEffect(() => {
        const pagename = 'admilead'
        const userid = userData?.id
        console.log("id from reducer " + id)
        console.log(userData)
        const data = {
            pagename: pagename,
            id: userid
        }
        console.log(data)
        dispatch(fetchLead(data));
    }, [dispatch]);


    const [cars, setCars] = useState([]);
    const [modelyear, setModelyear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [vehicletype, setVehicletype] = useState('');
    const [idCounter, setIdCounter] = useState(0);


    const handleAddCar = () => {
        if (modelyear.trim() !== '' && make.trim() !== '' && model.trim() !== '' && vehicletype.trim() !== '') {
            const newCar = { id: cars.length, modelyear, make, model, vehicletype };
            setCars((prevCars) => [...prevCars, newCar]);
            setModelyear('');
            setMake('');
            setModel('');
            setVehicletype('');
            console.log(cars);
        }
    };
    console.log(cars);
    const deleteCar = (index) => {
        setCars((prevCars) => {
            const updatedCars = [...prevCars];
            updatedCars.splice(index, 1);
            return updatedCars;
        });
    };


    const updateCar = (index, property, value) => {
        setCars((prevCars) => {
            const updatedCars = [...prevCars];
            updatedCars[index][property] = value;
            return updatedCars;
        });
    };


    //    const password ='*'.repeat(row.password.length)
    const [isOn, setIsOn] = useState(false);




    const handleToggle = () => {
        setIsOn(!isOn);
    };



    const handleEdit = (id) => {
        const foundlead = leads.find((lead) => lead.id === id);
        console.log(foundlead);
        if (Array.isArray(foundlead.vehicle)) {
            setCars([...foundlead.vehicle]);
        } else {
            setCars([]);
        }
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
    // useEffect(() => {
    //     console.log(selectedLeadIds);
    //     console.log("user efct for leadi")
    // }, [selectedLeadIds]);

    const columns = [

        isOn ? (
            {
                name: 'Select',
                selector: 'checkbox',
                cell: row => (
                    <input
                        type="checkbox"
                        checked={selectedLeadIds.includes(row.leadId)}
                        onChange={(e) => handleCheckboxChange(row.leadId, e.target.checked)}
                    />
                ),
                maxWidth: '50px',
                center: true,
            }
        ) : (
            null, {
                name: null,
                selector: null,
                cell: row => null,
                maxWidth: '0px',
                center: null,
            }
        )
        ,

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
            name: 'Total Vehicles',
            cell: (row) => (
                <div className=' d-flex cell-button' style={{ whiteSpace: 'nowrap' }}>
                    <button className='agent-edit-delete-btn ml-1' onClick={() => viewcar(row.vehicle)} type='button' data-toggle="modal" data-target="#viewcars">View Vehicles</button>
                </div>
            ),

            //     <table className='text-center data-table'>
            //         <thead>
            //             <tr>
            //                 <th>Make</th>
            //                 <th>Model</th>
            //                 <th>Model Year</th>
            //                 <th>Vehicle Type</th>
            //             </tr>
            //         </thead>
            //         <tbody>
            //             {row.vehicle.split(', ').map((vehicle, index) => {
            //                 const [make, model, modelYear, vehicleType] = vehicle.split(' ');
            //                 return (
            //                     <tr key={index}>
            //                         <td>{make}</td>
            //                         <td>{model}</td>
            //                         <td>{modelYear}</td>
            //                         <td>{vehicleType}</td>
            //                     </tr>
            //                 );
            //             })}
            //         </tbody>

            //     </table>
            //     // <div className=' d-flex cell-button' style={{ whiteSpace: 'nowrap' }}>
            //     //     <button className='agent-edit-delete-btn ml-1' type='button' data-toggle="modal" data-target="#assignlead" onClick={() => getRowidValue(row.leadId)} >Assign Lead</button>

            //     // </div>

            // ),
            center: true,
            minWidth: '200px'
        },

        {
            name: 'Action',

            cell: (row) => (
                <div className=' d-flex cell-button' style={{ whiteSpace: 'nowrap' }}>
                    <button className='agent-edit-delete-btn ml-1' type='button' data-toggle="modal" data-target="#assignlead" onClick={() => getRowidValue(row.leadId)} >Assign Lead</button>
                    <button className='agent-edit-delete-btn ml-1' onClick={() => handleEdit(row.leadId)} type='button' data-toggle="modal" data-target="#updatelead">Update</button>
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

    const handleCheckboxChange = (leadId, isChecked) => {
        setSelectedLeadIds((prevLeadIds) => {
            if (isChecked) {
                // If the checkbox is checked and the leadId doesn't exist, add it to the array
                if (!prevLeadIds.includes(leadId)) {
                    return [...prevLeadIds, leadId];
                }
            } else {
                // If the checkbox is unchecked, remove the leadId from the array
                return prevLeadIds.filter((id) => id !== leadId);
            }
            return prevLeadIds; // Return the previous state if no changes were made
        });
        console.log(selectedLeadIds)
    };

    const [record, setRecord] = useState([]);
    const [searchText, setSearchText] = useState('');
    let [data, setData] = useState([]);


    useEffect(() => {
        if (leads && Array.isArray(leads)) {
            const dataa = leads.map((lead, index) => {

                const receivedDate = new Date(lead.recieveddate);
                const formattedDate = receivedDate.toLocaleDateString();
                const formattedTime = receivedDate.toLocaleTimeString();
                const vehicles = Array.isArray(lead.vehicle) ? lead.vehicle.map((vehicle) => `${vehicle.make} ${vehicle.model} ${vehicle.modelyear} ${vehicle.vehicletype}`).join(', ') : '';

                return {
                    id: index + 1,
                    leadId: lead.id || lead._id,
                    name: lead.fullname,
                    email: lead.email,
                    phoneno: lead.phoneno,
                    assignto: lead.isAssignedName,
                    shipdate: lead.shipdate,
                    recieveddate: formattedDate,
                    time: formattedTime,
                    vehicle: vehicles,
                    addby: lead.addBy,
                    rowClass: lead.isAssigned ? 'assigned-row' : ''
                };
            });


            setData(dataa);
            setRecord(dataa);
        }

    }, [leads]);
    //   console.log(conditionalRowStyles)









    const addleadfunction = (e) => {
        e.preventDefault();
        console.log("add lead click");
        const name = e.target.name.value;
        const email = e.target.email.value;
        const phoneno = e.target.phoneno.value;
        const originaddress = e.target.originaddress.value;
        const orgincity = e.target.origincity.value;
        const originstate = e.target.originstate.value;
        const originzipcode = e.target.originzipcode.value;
        const destinationaddress = e.target.desadress.value;
        const destinationcity = e.target.descity.value;
        const destinationstate = e.target.desstate.value;
        const destinationzipcode = e.target.deszipcode.value;
        const shipdate = e.target.shipdate.value;
        const howmany = e.target.howmany.value;
        const data = {
            name: name,
            email: email,
            phoneno: phoneno,
            originaddress: originaddress,
            origincity: orgincity,
            originstate: originstate,
            originzipcode: originzipcode,
            destinationaddress: destinationaddress,
            destinationcity: destinationcity,
            destinationstate: destinationstate,
            destinationzipcode: destinationzipcode,
            shipdate: shipdate,
            howmany: howmany,
            cars: cars
        }
        seteditData('')
        dispatch(addLead(data))
        .then(() => {
          toast.success('Lead Added Successfully...!');
        })
        .catch(() => {
          toast.error('Lead Not Added Successfully...!');
        });
    }

    const updatelead = (e) => {
        e.preventDefault();
        console.log("add lead click");
        const name = e.target.name.value;
        const email = e.target.email.value;
        const phoneno = e.target.phoneno.value;
        const originaddress = e.target.originaddress.value;
        const orgincity = e.target.origincity.value;
        const originstate = e.target.originstate.value;
        const originzipcode = e.target.originzipcode.value;
        const destinationaddress = e.target.desadress.value;
        const destinationcity = e.target.descity.value;
        const destinationstate = e.target.desstate.value;
        const destinationzipcode = e.target.deszipcode.value;
        const shipdate = e.target.shipdate.value;
        const howmany = e.target.howmany.value;
        const data = {
            leadid: editData[0],
            name: name,
            email: email,
            phoneno: phoneno,
            originaddress: originaddress,
            origincity: orgincity,
            originstate: originstate,
            originzipcode: originzipcode,
            destinationaddress: destinationaddress,
            destinationcity: destinationcity,
            destinationstate: destinationstate,
            destinationzipcode: destinationzipcode,
            shipdate: shipdate,
            howmany: howmany,
            cars: cars
        }
        console.log(data)
        dispatch(updateLead(data));
        seteditData('')
        if (!Lead_Add) {
            toast.success('Lead update Successfully...!');
        }
        else if (Lead_Add) {
            toast.error('Lead Not update Successfully...!');
        }
    }

    const handleDelete = (id) => {
        console.log(id)
        const data = {
            leadid: id,
            selectedleadIds: selectedLeadIds
        }
        console.log(data)

        dispatch(deleteLead(data))
        if (!Lead_Add) {
            toast.success('Lead Delete Successfully...!');
        }
        else if (Lead_Add) {
            toast.error('Lead Not Delete Successfully...!');
        }


    };
    const collectedhandleDelete = () => {
        const data = {
            selectedleadIds: selectedLeadIds
        }
        console.log(data)

        dispatch(deleteLead(data))
        if (!Lead_Add) {
            toast.success('Leads Delete Successfully...!');
        }
        else if (Lead_Add) {
            toast.error('Leads Not Delete Successfully...!');
        }


    };

    const assignLeadd = (e) => {
        e.preventDefault()
        const id = e.target.agentid.value
        const data = {
            leadId: rowidValue,
            agentid: id
        }
        dispatch(assignLead(data))
        .then(() => {
            toast.success('Lead Assign Successfully...!');
          })
          .catch(() => {
            toast.error('Lead Not Assign Successfully...!');
          });
    }



    function handlefilter(event) {
        const searchText = event.target.value.toLowerCase();

        if (searchText === '') {
            setRecord(data);
        } else {
            const filteredData = data.filter((row) =>
                row.name.toLowerCase().includes(searchText)
            );

            setRecord(filteredData);
        }

        setSearchText(event.target.value);
    }



    const getRowidValue = (id) => {
        setrowIdValue(id);
    }

    const collectedassignLead = (e) => {
        e.preventDefault()
        const id = e.target.agentid.value
        const data = {
            selectedleadId: selectedLeadIds,
            agentid: id
        }
        dispatch(assignLead(data))
    }

    const handleInputChange = (index, value) => {
        seteditData((preveditData) => {
            const updatedData = [...preveditData];
            updatedData[index] = value;
            return updatedData;
        });
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneno: '',
        origincity: '',
        originaddress: '',
        originstate: '',
        originzipcode: '',
        destinationaddress: '',
        destinationcity: '',
        destinationstate: '',
        destinationzipcode: '',
        shipdate: '',
        howmany: '',
        cars: []
    });

    const handletextleaddata = (e) => {
        const { value } = e.target;

        const parsedData = parseFormData(value);
        setFormData(parsedData);
    };

    const parseFormData = (text) => {
        const fieldsToExtract = [
          'name',
          'email',
          'phoneno',
          'origincity',
          'originaddress',
          'originstate',
          'originzipcode',
          'destinationaddress',
          'destinationcity',
          'destinationstate',
          'destinationzipcode',
          'shipdate',
          'howmany',
          'make',
          'model',
          'modelyear',
          'vehicletype',
        ];

        const parsedData = {
          cars: [], // Initialize the cars array
        };

        let currentCar = {}; // Temporary object to store car data
        let isParsingCarData = false; // Flag to indicate when car data is being parsed

        const pairs = text.split('\n');
        pairs.forEach((pair) => {
          const [key, value] = pair.split(':').map((item) => item.trim());

          if (fieldsToExtract.includes(key)) {
            if (value === '') {
              // Display an error toast for empty fields
              toast.error(`${key} field cannot be empty.`);
              return; // Stop the function execution
            }

            if (key === 'make' || key === 'model' || key === 'modelyear' || key === 'vehicletype') {
              isParsingCarData = true; // Indicates that car data is being parsed
              if (Object.keys(currentCar).length === 4) {
                parsedData.cars.push(currentCar);
                currentCar = {}; // Clear the current car object for a new car block
              }
              currentCar[key] = value;
            } else {
              parsedData[key] = value;
            }
          }
        });

        // Add the last car object to the 'cars' array if it exists
        if (isParsingCarData && Object.keys(currentCar).length === 4) {
          parsedData.cars.push(currentCar);
        }

        return parsedData;
      };





    const handleSubmitlead = () => {
        // Make an HTTP POST request to the backend to save the form data
        console.log(formData)
        dispatch(addLead(formData));
        // seteditData('')
console.log('Value of Lead_Add:', Lead_Add, typeof Lead_Add);

if (!Lead_Add) {
  console.log('Inside if block - Lead_Add is falsy.');
  toast.error('Lead Not Added Successfully...!');
} else if(Lead_Add){
  console.log('Inside else block - Lead_Add is truthy.');
  toast.success('Lead Add Successfully...!');
}


    };


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

            {/* text formet lead  */}
            <div class="modal fade" id="textlead" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add lead in text formet</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            <div className="form-group ">

                                <textarea className='w-100 p-2 '
                                    rows="18"
                                    cols="30"
                                    placeholder="Paste formatted data here "
                                    onChange={handletextleaddata}
                                ></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="agent-edit-delete-btn ml-1" style={{ padding: '9px 10px' }} onClick={() => handleSubmitlead()} data-dismiss="modal">Add lead</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* update lead  */}
            <div class="modal fade" id="updatelead" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                <div class="modal-dialog " role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalScrollableTitle">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <form onSubmit={updatelead}>
                            <div className="modal-body">
                                <div className="form-group mt-n3 ">
                                    <div className="form-group">
                                        <label for="email1">Full Name</label>
                                        <input type="text" className="form-control" id="name" name='name' value={editData[1]}
                                            onChange={(e) => handleInputChange(1, e.target.value)} required
                                            aria-describedby="emailHelp" placeholder="Enter Full Name" />

                                    </div>

                                </div>
                                <div className="form-group">

                                    <label htmlFor="email">Email</label>
                                    <div className="loadingimginput">
                                        <input type="email" className="form-control" id="vemail" name="email" value={editData[2]}
                                            onChange={(e) => handleInputChange(2, e.target.value)} required
                                            aria-describedby="emailHelp" placeholder="Enter Email"

                                        />

                                    </div>


                                </div>

                                <div className="form-group">
                                    <label for="password1">Phone No:</label>
                                    <input type="text" className="form-control" id="password" name='phoneno'
                                        onChange={(e) => handleInputChange(3, e.target.value)} required
                                        value={editData[3]} placeholder="Phoneno" />
                                </div>
                                <hr />

                                <h4>Origin</h4>
                                <div className='d-flex justify-content-between'>
                                    <div className="form-group mr-1">
                                        <label for="email1">Origin Address</label>
                                        <input type="text" className="form-control" id="originaddress" value={editData[4]}
                                            onChange={(e) => handleInputChange(4, e.target.value)} required
                                            name='originaddress' aria-describedby="emailHelp" placeholder="origin address" />

                                    </div>
                                    <div className="form-group ml-1">
                                        <label for="email1">Origin City</label>
                                        <input type="text" className="form-control" id="origincity" name='origincity' aria-describedby="emailHelp"
                                            onChange={(e) => handleInputChange(5, e.target.value)} required
                                            value={editData[5]} placeholder="Origin city" />

                                    </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className="form-group mr-1">
                                        <label for="email1">Origin state</label>
                                        <input type="text" className="form-control" id="originstate" name='originstate' aria-describedby="emailHelp" value={editData[6]}
                                            onChange={(e) => handleInputChange(6, e.target.value)} required
                                            placeholder="origin state" />

                                    </div>
                                    <div className="form-group ml-1">
                                        <label for="email1">Zip code</label>
                                        <input type="text" className="form-control" id="zipcode" name='originzipcode' aria-describedby="emailHelp" value={editData[7]}
                                            onChange={(e) => handleInputChange(7, e.target.value)} required
                                            placeholder="Zip code" />

                                    </div>
                                </div>
                                <hr />
                                <h4>Destination</h4>
                                <div className='d-flex justify-content-between'>
                                    <div className="form-group mr-1">
                                        <label for="email1">Destination Address</label>
                                        <input type="text" className="form-control" id="desadress" name='desadress' value={editData[8]}
                                            onChange={(e) => handleInputChange(8, e.target.value)} required
                                            aria-describedby="emailHelp" placeholder="Destination address" />

                                    </div>
                                    <div className="form-group ml-1">
                                        <label for="email1">Destination City</label>
                                        <input type="text" className="form-control" id="descity" name='descity' aria-describedby="emailHelp" value={editData[9]}
                                            onChange={(e) => handleInputChange(9, e.target.value)} required
                                            placeholder="Destination city" />

                                    </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className="form-group mr-1">
                                        <label for="email1">Destination state</label>
                                        <input type="text" className="form-control" id="desstate" name='desstate' aria-describedby="emailHelp" value={editData[10]}
                                            onChange={(e) => handleInputChange(10, e.target.value)} required
                                            placeholder="Destination state " />

                                    </div>
                                    <div className="form-group ml-1">
                                        <label for="email1">Zip code</label>
                                        <input type="text" className="form-control" id="deszipcode" name='deszipcode' aria-describedby="emailHelp" value={editData[11]}
                                            onChange={(e) => handleInputChange(11, e.target.value)} required
                                            placeholder="Destination zip code" />

                                    </div>
                                </div>
                                <hr />
                                <div className="form-group">
                                    <h4>Ship Date</h4>
                                    <div className="form-group">
                                        <input type="date" className="form-control" id="shipdate" name='shipdate' value={editData[12]}
                                            onChange={(e) => handleInputChange(12, e.target.value)} required
                                        />
                                    </div>
                                </div>
                                <hr />
                                <div className="form-group">
                                    <h4>Home many Vehicle?</h4>
                                    <select name="howmany" value={editData[13]} onChange={(e) => handleInputChange(13, e.target.value)} required id="howmany" className='assignlead'>
                                        <option value="volvo" >1</option>
                                        <option value="saab">2</option>
                                        <option value="mercedes">3</option>
                                        <option value="audi">4</option>
                                    </select>
                                </div>
                                <div className='form-group'>
                                    <h4>Vehicle</h4>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Model Year</th>
                                            <th>Make</th>
                                            <th>Model</th>
                                            <th>Vehicle Type</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cars.length === 0 ? (
                                            <tr>
                                                <td colSpan="5">No Vehicle available</td>
                                            </tr>
                                        ) : (
                                            cars.map((car, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <input type="text" value={car.modelyear} required className='update-modal-input' onChange={(e) => updateCar(index, 'modelyear', e.target.value)} />
                                                    </td>
                                                    <td>
                                                        <input type="text" value={car.make} required className='update-modal-input' onChange={(e) => updateCar(index, 'make', e.target.value)} />
                                                    </td>
                                                    <td>
                                                        <input type="text" value={car.model} required className='update-modal-input' onChange={(e) => updateCar(index, 'model', e.target.value)} />
                                                    </td>
                                                    <td>
                                                        <input type="text" value={car.vehicletype} required className='update-modal-input' onChange={(e) => updateCar(index, 'vehicletype', e.target.value)} />
                                                    </td>
                                                    <td>
                                                        <button className="toglebtn" required onClick={() => deleteCar(index)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>


                                <div className='d-flex justify-content-between'>
                                    <div className="form-group">
                                        <label for="email1">Model Year</label>
                                        <input
                                            type="text"
                                            className="form-control mr-1"
                                            name="year"
                                            id="year"
                                            value={modelyear}
                                            onChange={(e) => setModelyear(e.target.value)} placeholder="Enter model year" />

                                    </div>
                                    <div className="form-group ">
                                        <label for="email1">Make</label>
                                        <input type="text"
                                            name="make"
                                            className="form-control ml-1"
                                            id="make"
                                            value={make}
                                            onChange={(e) => setMake(e.target.value)} placeholder="Enter make" />

                                    </div>
                                </div>

                                <div className='d-flex justify-content-between'>
                                    <div className="form-group ">
                                        <label for="email1">Model</label>
                                        <input
                                            type="text"
                                            className="form-control mr-1"
                                            name="model"
                                            id="model"
                                            value={model}
                                            onChange={(e) => setModel(e.target.value)} placeholder="Enter model " />

                                    </div>
                                    <div className="form-group ">
                                        <label for="email1">Type</label>
                                        <input
                                            type="text"
                                            name="model"
                                            className="form-control ml-1"
                                            id="type"
                                            value={vehicletype}
                                            onChange={(e) => setVehicletype(e.target.value)} placeholder="Enter type" />

                                    </div>
                                </div>
                                <button className='toglebtn ' type='button' onClick={handleAddCar} >Add Car</button>
                            </div>
                            <div className="modal-footer mt-n4 border-top-0 d-flex justify-content-center">
                                <button type="submit" className="btn button-86" style={{ color: 'white' }} >Submit</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

            {/* add lead  */}
            <div class="modal fade" id="addlead" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                <div class="modal-dialog " role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalScrollableTitle">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>



                        <form onSubmit={addleadfunction}>
                            <div className="modal-body">
                                <div className="form-group mt-n3 ">
                                    <div className="form-group">
                                        <label for="email1">Full Name</label>
                                        <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" placeholder="Enter Full Name" />

                                    </div>
                                </div>

                                <div className="form-group">

                                    <label htmlFor="email">Email</label>
                                    <div className="loadingimginput">
                                        <input type="email" className="form-control" id="vemail" name="email" aria-describedby="emailHelp" placeholder="Enter Email"

                                        />

                                    </div>


                                </div>

                                <div className="form-group">
                                    <label for="password1">Phone No:</label>
                                    <input type="number" className="form-control" id="password" name='phoneno' placeholder="Password" />
                                </div>
                                <hr />

                                <h4>Origin</h4>
                                <div className='d-flex justify-content-between'>
                                    <div className="form-group mr-1">
                                        <label for="email1">Origin Address</label>
                                        <input type="text" className="form-control" id="originaddress" name='originaddress' aria-describedby="emailHelp" placeholder="Enter origin address" />

                                    </div>
                                    <div className="form-group ml-1">
                                        <label for="email1">Origin City</label>
                                        <input type="text" className="form-control" id="origincity" name='origincity' aria-describedby="emailHelp" placeholder="Enter email" />

                                    </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className="form-group mr-1">
                                        <label for="email1">Origin state</label>
                                        <input type="text" className="form-control" id="originstate" name='originstate' aria-describedby="emailHelp" placeholder="Enter origin address" />

                                    </div>
                                    <div className="form-group ml-1">
                                        <label for="email1">Zip code</label>
                                        <input type="number" className="form-control" id="zipcode" name='originzipcode' aria-describedby="emailHelp" placeholder="Enter email" />

                                    </div>
                                </div>
                                <hr />
                                <h4>Destination</h4>
                                <div className='d-flex justify-content-between'>
                                    <div className="form-group mr-1">
                                        <label for="email1">Destination Address</label>
                                        <input type="text" className="form-control" id="desadress" name='desadress' aria-describedby="emailHelp" placeholder="Enter destination address" />

                                    </div>
                                    <div className="form-group ml-1">
                                        <label for="email1">Destination City</label>
                                        <input type="text" className="form-control" id="descity" name='descity' aria-describedby="emailHelp" placeholder="Enter destination city" />

                                    </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className="form-group mr-1">
                                        <label for="email1">Destination state</label>
                                        <input type="text" className="form-control" id="desstate" name='desstate' aria-describedby="emailHelp" placeholder="Enter origin address" />

                                    </div>
                                    <div className="form-group ml-1">
                                        <label for="email1">Zip code</label>
                                        <input type="number" className="form-control" id="deszipcode" name='deszipcode' aria-describedby="emailHelp" placeholder="Enter email" />

                                    </div>
                                </div>
                                <hr />
                                <div className="form-group">
                                    <h4>Ship Date</h4>
                                    <div className="form-group">
                                        <input type="date" className="form-control" id="shipdate" name='shipdate' placeholder="Password" />
                                    </div>
                                </div>
                                <hr />
                                <div className="form-group">
                                    <h4>Home many Vehicle?</h4>
                                    <select name="howmany" id="howmany" className='assignlead'>
                                        <option value="volvo" >1</option>
                                        <option value="saab">2</option>
                                        <option value="mercedes">3</option>
                                        <option value="audi">4</option>
                                    </select>
                                </div>
                                <div className='form-group'>
                                    <h4>Vehicle</h4>
                                </div>
                                <table >
                                    <thead>
                                        <tr>
                                            <th>Model Year</th>
                                            <th>Make</th>
                                            <th>Model</th>
                                            <th>Vehicle Type</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cars.length === 0 ? (
                                            <tr>
                                                <td colSpan="5">No Vehicle available</td>
                                            </tr>
                                        ) : (
                                            cars.map((car, index) => (
                                                <tr key={index}>
                                                    <td>{car.modelyear}</td>
                                                    <td>{car.make}</td>
                                                    <td>{car.model}</td>
                                                    <td>{car.vehicletype}</td>
                                                    <td>
                                                        <button className='toglebtn' onClick={() => deleteCar(index)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>

                                <div className='d-flex justify-content-between'>
                                    <div className="form-group">
                                        <label for="email1">Model Year</label>
                                        <input
                                            type="text"
                                            className="form-control mr-1"
                                            name="year"
                                            id="year"
                                            value={modelyear}
                                            onChange={(e) => setModelyear(e.target.value)} placeholder="Enter model year" />

                                    </div>
                                    <div className="form-group ">
                                        <label for="email1">Make</label>
                                        <input type="text"
                                            name="make"
                                            className="form-control ml-1"
                                            id="make"
                                            value={make}
                                            onChange={(e) => setMake(e.target.value)} placeholder="Enter make" />

                                    </div>
                                </div>

                                <div className='d-flex justify-content-between'>
                                    <div className="form-group ">
                                        <label for="email1">Model</label>
                                        <input
                                            type="text"
                                            className="form-control mr-1"
                                            name="model"
                                            id="model"
                                            value={model}
                                            onChange={(e) => setModel(e.target.value)} placeholder="Enter model " />

                                    </div>
                                    <div className="form-group ">
                                        <label for="email1">Type</label>
                                        <input
                                            type="text"
                                            name="model"
                                            className="form-control ml-1"
                                            id="type"
                                            value={vehicletype}
                                            onChange={(e) => setVehicletype(e.target.value)} placeholder="Enter type" />

                                    </div>
                                </div>
                                <button className='toglebtn ' type='button' onClick={handleAddCar} >Add Car</button>
                            </div>
                            <div className="modal-footer mt-n4 border-top-0 d-flex justify-content-center">
                                <button type="submit" className="btn button-86" style={{ color: 'white' }} >Submit</button>
                            </div>
                        </form>

                    </div>
                </div>
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
            {/* collected lead del  */}
            <div class="modal fade" id="collecteddeletemodel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <button type="button" class="agent-edit-delete-btn ml-1" style={{ padding: '9px 10px' }} onClick={() => collectedhandleDelete()} data-dismiss="modal">Yes Sure</button>

                        </div>
                    </div>
                </div>
            </div>

            {/* assign lead  */}


            <div class="modal fade" id="assignlead" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Assign Lead</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form action="" onSubmit={assignLeadd}>
                            <div class="modal-body">
                                <div className="form-group">
                                    <h4>Name of agents</h4>
                                    <select name="agentid" id="agentid" className='assignlead'>
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
                                <button type="submit" class="agent-edit-delete-btn ml-1" style={{ padding: '9px 10px' }}  >Assign</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* collected lead assign  */}
            <div class="modal fade" id="collectedassignlead" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Assign Lead</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form action="" onSubmit={collectedassignLead}>
                            <div class="modal-body">
                                <div className="form-group">
                                    <h4>Name of agents</h4>
                                    <select name="agentid" id="agentid" className='assignlead'>
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
                                <button type="submit" class="agent-edit-delete-btn ml-1" style={{ padding: '9px 10px' }} data-dismiss="modal"  >Assign</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* add lead model */}

            {/* <div class="modal fade" id="addlead" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                <div class="modal-dialog " role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalScrollableTitle">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>



                        <form onSubmit={addleadfunction}>
                            <div className="modal-body">
                                <div className="form-group mt-n3 ">
                                    <div className="form-group">
                                        <label for="email1">Full Name</label>
                                        <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" placeholder="Enter Full Name" />

                                    </div>

                                </div>
                                <div className="form-group">

                                    <label htmlFor="email">Email</label>
                                    <div className="loadingimginput">
                                        <input type="email" className="form-control" id="vemail" name="email" aria-describedby="emailHelp" placeholder="Enter Email"

                                        />

                                    </div>


                                </div>

                                <div className="form-group">
                                    <label for="password1">Phone No:</label>
                                    <input type="number" className="form-control" id="password" name='phoneno' placeholder="Password" />
                                </div>
                                <hr />

                                <h4>Origin</h4>
                                <div className='d-flex justify-content-between'>
                                    <div className="form-group mr-1">
                                        <label for="email1">Origin Address</label>
                                        <input type="text" className="form-control" id="originaddress" name='originaddress' aria-describedby="emailHelp" placeholder="Enter origin address" />

                                    </div>
                                    <div className="form-group ml-1">
                                        <label for="email1">Origin City</label>
                                        <input type="text" className="form-control" id="origincity" name='origincity' aria-describedby="emailHelp" placeholder="Enter email" />

                                    </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className="form-group mr-1">
                                        <label for="email1">Origin state</label>
                                        <input type="text" className="form-control" id="originstate" name='originstate' aria-describedby="emailHelp" placeholder="Enter origin address" />

                                    </div>
                                    <div className="form-group ml-1">
                                        <label for="email1">Zip code</label>
                                        <input type="number" className="form-control" id="zipcode" name='originzipcode' aria-describedby="emailHelp" placeholder="Enter email" />

                                    </div>
                                </div>
                                <hr />
                                <h4>Destination</h4>
                                <div className='d-flex justify-content-between'>
                                    <div className="form-group mr-1">
                                        <label for="email1">Destination Address</label>
                                        <input type="text" className="form-control" id="desadress" name='desadress' aria-describedby="emailHelp" placeholder="Enter destination address" />

                                    </div>
                                    <div className="form-group ml-1">
                                        <label for="email1">Destination City</label>
                                        <input type="text" className="form-control" id="descity" name='descity' aria-describedby="emailHelp" placeholder="Enter destination city" />

                                    </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className="form-group mr-1">
                                        <label for="email1">Destination state</label>
                                        <input type="text" className="form-control" id="desstate" name='desstate' aria-describedby="emailHelp" placeholder="Enter origin address" />

                                    </div>
                                    <div className="form-group ml-1">
                                        <label for="email1">Zip code</label>
                                        <input type="number" className="form-control" id="deszipcode" name='deszipcode' aria-describedby="emailHelp" placeholder="Enter email" />

                                    </div>
                                </div>
                                <hr />
                                <div className="form-group">
                                    <h4>Ship Date</h4>
                                    <div className="form-group">
                                        <input type="date" className="form-control" id="shipdate" name='shipdate' placeholder="Password" />
                                    </div>
                                </div>
                                <hr />
                                <div className="form-group">
                                    <h4>Home many Vehicle?</h4>
                                    <select name="howmany" id="howmany" className='assignlead'>
                                        <option value="volvo" >1</option>
                                        <option value="saab">2</option>
                                        <option value="mercedes">3</option>
                                        <option value="audi">4</option>
                                    </select>
                                </div>
                                <div className='form-group'>
                                    <h4>Vehicle</h4>
                                </div>
                                <table >
                                    <thead>
                                        <tr>
                                            <th>Model Year</th>
                                            <th>Make</th>
                                            <th>Model</th>
                                            <th>Vehicle Type</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cars.length === 0 ? (
                                            <tr>
                                                <td colSpan="5">No Vehicle available</td>
                                            </tr>
                                        ) : (
                                            cars.map((car, index) => (
                                                <tr key={index}>
                                                    <td>{car.year}</td>
                                                    <td>{car.make}</td>
                                                    <td>{car.model}</td>
                                                    <td>{car.typee}</td>
                                                    <td>
                                                        <button className='toglebtn' onClick={() => deleteCar(index)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>

                                <div className='d-flex justify-content-between'>
                                    <div className="form-group">
                                        <label for="email1">Model Year</label>
                                        <input
                                            type="text"
                                            className="form-control mr-1"
                                            name="year"
                                            id="year"
                                            value={year}
                                            onChange={(e) => setYear(e.target.value)} placeholder="Enter model year" />

                                    </div>
                                    <div className="form-group ">
                                        <label for="email1">Make</label>
                                        <input type="text"
                                            name="make"
                                            className="form-control ml-1"
                                            id="make"
                                            value={make}
                                            onChange={(e) => setMake(e.target.value)} placeholder="Enter make" />

                                    </div>
                                </div>

                                <div className='d-flex justify-content-between'>
                                    <div className="form-group ">
                                        <label for="email1">Model</label>
                                        <input
                                            type="text"
                                            className="form-control mr-1"
                                            name="model"
                                            id="model"
                                            value={model}
                                            onChange={(e) => setModel(e.target.value)} placeholder="Enter model " />

                                    </div>
                                    <div className="form-group ">
                                        <label for="email1">Type</label>
                                        <input
                                            type="text"
                                            name="model"
                                            className="form-control ml-1"
                                            id="type"
                                            value={typee}
                                            onChange={(e) => setTypee(e.target.value)} placeholder="Enter type" />

                                    </div>
                                </div>
                                <button className='toglebtn ' type='button' onClick={handleAddCar} >Add Car</button>
                            </div>
                            <div className="modal-footer mt-n4 border-top-0 d-flex justify-content-center">
                                <button type="submit" className="btn button-86" style={{ color: 'white' }} >Submit</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div> */}

            {/* // end */}
            {/* // assign lead */}



            {/* delete model  */}




            <div className='agenttable'>
                <div className="agent-header ">
                    <div className="agenttab">
                        Leads
                    </div>

                    <div className="agentbtn d-flex">
                        <button type='button' data-toggle="modal" data-target="#addlead" className='button-86 m-1'><b>Add Lead <FontAwesomeIcon icon={faPlus} className='ml-1' /> </b></button>
                        <button type='button' data-toggle="modal" data-target="#textlead" className='button-86 m-1'><b>Add text Lead <FontAwesomeIcon icon={faPlus} className='ml-1' /> </b></button>

                    </div>
                </div>
                <div className="agentsearch  d-flex justify-content-between pr-2 ">
                    <div className='d-flex '>
                        <div className='agentsearchicon d-flex align-items-center'>
                            <FontAwesomeIcon icon={faSearch} className='mr-1' />
                        </div>
                        <input type="text" value={searchText} onChange={handlefilter} placeholder='Search by name ' />
                    </div>
                    <div className="realtime d-flex justify-content-center align-items-centers">
                        <div>
                            {isOn && (
                                <div className={`isonbtn ${isOn ? 'show' : ''}`}>
                                    <button className={`toglebtn ${isOn ? 'show' : ''}`} type='button' data-toggle="modal" data-target="#collectedassignlead">Asign Lead</button>
                                    <button className={`ml-1 toglebtn ${isOn ? 'show' : ''}`} type='button' data-toggle="modal" data-target="#collecteddeletemodel">Delete</button>
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
                        highlightOnHover

                    />
                </div>
            </div>
        </>





    )
}

export default Lead
