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


function Cancellead(props) {
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





    useEffect(() => {
        const pagename='Cancel'
        const userid=userData.id
        const data={
            pagename:pagename,
            id:userid
        }
        dispatch(fetchLead(data));
    }, [dispatch]);





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
            name: 'Lead By',
            selector: row => row.addby,
            minWidth: "150px"
        },
        {
            name:'Approval Status',
            selector:row=>row.approvalStatus,
            minWidth:'160px'
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
                    <button className='agent-edit-delete-btn d-flex align-items-center '
                    disabled={row.approvalStatus === 'Not Approved' || row.approvalStatus === 'Pending'}
                    data-toggle="modal" onClick={() => handleEdit(row.leadId)} data-target="#vendoremail">
                        <div className='mailcount'>{row.mailcount}</div>
                        Send Email</button>
                    <button className='agent-edit-delete-btn ml-1' onClick={() => handleEdit(row.leadId)} type='button' data-toggle="modal" data-target="#updatelead">Update</button>
                    <button className='agent-edit-delete-btn ml-1' onClick={() => handleEdit(row.leadId)} type='button' data-toggle="modal" data-target="#updatestatus">Update Status</button>

                </div>
            ),
            minWidth: '400px',
            center: true

        },
    ];

    const sendEmailfunction = (data,e) => {
        e.preventDefault()

        const text=e.target.emailtemplatetext.value;

        const dataa = {
            leadid:data[0],
            customeremail: data[2],
            text:text,
            agentemail:userData.email,
            agentid:userData.id
        }
        console.log(dataa)
                dispatch(sendEmail(dataa))
                    .then((response) => {
                        if (emailsent) {
                            toast.success(`Email Sent Successfully...!`);
                        }
                    })

    };

const updatestatus =(data, e)=>{
    e.preventDefault();
    const status=e.target.status.value;
    const dataa = {
        leadid:data[0],
        agentid:userData.id,
        status:status
    }
    dispatch(updateStatus(dataa));
}

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
                    mailcount:lead.mailcount,
                    approvalStatus:lead.approvelStatus,
                    addby:lead.addBy,
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
    const [Templatetext, setTemplatetext]=useState({ text: 'Select Any template' })

    useEffect(() => {
        console.log(Templatetext)
        console.log("template data")
      }, [Templatetext]);

      const templateSeclection = (leadData, e) => {
        e.preventDefault();
        console.log(leadData);
        const templateno = e.target.value;
        const matchedTemplate = template.find((tpl) => tpl.id === parseInt(templateno));

        if (matchedTemplate) {
          const templateData = (matchedTemplate) => {
            let replacedText = matchedTemplate.text
              .replace('{name}', leadData[1])
              .replace('{price}', leadData[2])
              .replace('{origin}', leadData[3])
              .replace('{origincity}', leadData[5])
              .replace('{originstate}', leadData[6])
              .replace('{originzipcode}', leadData[7])
              .replace('{destinationcity}', leadData[9])
              .replace('{destinationstate}', leadData[10])
              .replace('{destinationzipcode}', leadData[11])
              .replace('{shipdate}', leadData[12]);

            leadData[14].forEach((car) => {
              replacedText = replacedText
                .replace('{modelyear}', car.modelyear)
                .replace('{make}', car.make)
                .replace('{model}', car.model);
            });

            setTemplatetext(replacedText); // Set the updated value of setTemplatetext
          };

          templateData(matchedTemplate); // Call the templateData function
        }

        const handleTextChange = (e) => {
          setTemplatetext(e.target.value);
        };
      };


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
            {/* send email  */}
            <div class="modal fade bd-example-modal-lg emailmodelsent" id="vendoremail" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Send Email to Customer</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={(e) => sendEmailfunction(editData, e)}>
                        <div class="modal-body ">
                            <div className="form-group">

                                <label htmlFor="token"><b>Company:</b> Vehicle transport </label>

                                <br />


                                <div className="form-group">
                                    <label htmlFor="token">Select Template</label>
                                    <select name="emailtext" id="emailtext"  onChange={(e)=>templateSeclection(editData,e)} className='assignlead'>
                                        <option value="" >Select</option>
                                        <option value="1">New Quotes</option>
                                        <option value="2">Follow up</option>
                                        <option value="3">Dispatched</option>
                                        <option value="4">Order Confirmation</option>
                                        <option value="5">Payment Recieved</option>
                                        <option value="6">Agreement</option>
                                        <option value="7">Second Follow Up</option>
                                    </select>

                                </div>

                            </div>
                            <div className="form-group">
                                <label htmlFor="subject"><b>Template Text</b></label>
                                <textarea name="emailtemplatetext"  cols="30" rows="10" className='textareemail p-2' value={Templatetext} defaultValue={Templatetext.text}></textarea>

                                <hr />


                            </div>
                            <div className="form-group">
                                <div>
                                <label htmlFor="subject" className='lableemail'><b>From:</b></label> <br />
                                <input type="text" className='fromemail' readOnly value={'usamaabubakar785@gmail.com'} />
                                </div>
                                <div>
                                <label htmlFor="subject" className='lableemail'><b>To:</b></label> <br />
                                <input type="text"  className='toemail' readOnly value={editData[2]} />
                                </div>



                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="agent-edit-delete-btn ml-1" style={{ padding: '9px 10px' }}  >Send </button>

                        </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* update lead  */}
            {/* <div class="modal fade" id="updatelead" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                <div class="modal-dialog " role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalScrollableTitle">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>



                        <form>
                            <div className="modal-body">
                                <div className="form-group mt-n3 ">
                                    <div className="form-group">
                                        <label for="email1">Full Name</label>
                                        <input type="text" className="form-control" id="name" name='name' value={editData[1]} aria-describedby="emailHelp" placeholder="Enter Full Name" />

                                    </div>

                                </div>
                                <div className="form-group">

                                    <label htmlFor="email">Email</label>
                                    <div className="loadingimginput">
                                        <input type="email" className="form-control" id="vemail" name="email" value={editData[2]} aria-describedby="emailHelp" placeholder="Enter Email"

                                        />

                                    </div>


                                </div>

                                <div className="form-group">
                                    <label for="password1">Phone No:</label>
                                    <input type="text" className="form-control" id="password" name='phoneno' value={editData[3]} placeholder="Phoneno" />
                                </div>
                                <hr />

                                <h4>Origin</h4>
                                <div className='d-flex justify-content-between'>
                                    <div className="form-group mr-1">
                                        <label for="email1">Origin Address</label>
                                        <input type="text" className="form-control" id="originaddress" value={editData[4]} name='originaddress' aria-describedby="emailHelp" placeholder="origin address" />

                                    </div>
                                    <div className="form-group ml-1">
                                        <label for="email1">Origin City</label>
                                        <input type="text" className="form-control" id="origincity" name='origincity' aria-describedby="emailHelp" value={editData[5]} placeholder="Origin city" />

                                    </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className="form-group mr-1">
                                        <label for="email1">Origin state</label>
                                        <input type="text" className="form-control" id="originstate" name='originstate' aria-describedby="emailHelp" value={editData[6]} placeholder="origin state" />

                                    </div>
                                    <div className="form-group ml-1">
                                        <label for="email1">Zip code</label>
                                        <input type="text" className="form-control" id="zipcode" name='originzipcode' aria-describedby="emailHelp" value={editData[7]} placeholder="Zip code" />

                                    </div>
                                </div>
                                <hr />
                                <h4>Destination</h4>
                                <div className='d-flex justify-content-between'>
                                    <div className="form-group mr-1">
                                        <label for="email1">Destination Address</label>
                                        <input type="text" className="form-control" id="desadress" name='desadress' value={editData[8]} aria-describedby="emailHelp" placeholder="Destination address" />

                                    </div>
                                    <div className="form-group ml-1">
                                        <label for="email1">Destination City</label>
                                        <input type="text" className="form-control" id="descity" name='descity' aria-describedby="emailHelp" value={editData[9]} placeholder="Destination city" />

                                    </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className="form-group mr-1">
                                        <label for="email1">Destination state</label>
                                        <input type="text" className="form-control" id="desstate" name='desstate' aria-describedby="emailHelp" value={editData[10]} placeholder="Destination state " />

                                    </div>
                                    <div className="form-group ml-1">
                                        <label for="email1">Zip code</label>
                                        <input type="text" className="form-control" id="deszipcode" name='deszipcode' aria-describedby="emailHelp" value={editData[11]} placeholder="Destination zip code" />

                                    </div>
                                </div>
                                <hr />
                                <div className="form-group">
                                    <h4>Ship Date</h4>
                                    <div className="form-group">
                                        <input type="date" className="form-control" id="shipdate" name='shipdate' value={editData[12]} />
                                    </div>
                                </div>
                                <hr />
                                <div className="form-group">
                                    <h4>Home many Vehicle?</h4>
                                    <select name="howmany" value={editData[13]} id="howmany" className='assignlead'>
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
                                        {editData.length === 0 ? (
                                            <tr>
                                                <td colSpan="5">No Vehicle available</td>
                                            </tr>
                                        ) : (
                                            editData[14].map((car, index) => (
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



            {/* assign lead  */}


            <div class="modal fade" id="updatestatus" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Assign Lead</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form action="" onSubmit={(e) => updatestatus(editData,e)}>
                            <div class="modal-body">
                                <div className="form-group">
                                    <h4>Update Lead Status</h4>

                                    <select name="status" id="status" className='assignlead'>
                                        <option value="" >Select</option>
                                        <option value="Followup">Follow Up</option>
                                        <option value="Quotes">Quotes</option>
                                        <option value="Orders">Orders</option>
                                        <option value="Dispatched">Dispatched</option>
                                        <option value="Archived">Archived</option>
                                        <option value="Potentail">Potential</option>
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


            {/* // end */}






            <div className='agenttable'>
                <div className="agent-header ">
                    <div className="agenttab">
                        Cancel Orders
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
                    />
                </div>
            </div>
        </>





    )
}

export default Cancellead
