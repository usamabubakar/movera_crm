import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { faEye, faEyeSlash, faPlus, faSearch ,faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import { fetchLead, addLead, deleteLead, assignLead } from '../../state/actions/lead';

import { useEffect } from 'react';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { sendEmail } from '../../state/actions/email';
import { updateStatus } from '../../state/actions/lead';
import template from '../SendmailTemplate';
import { updateLead } from '../../state/actions/lead';
import { company1, company2 } from '../companydetails';
import parse from 'html-react-parser'
import Car from './unnamed.png'

import { io } from 'socket.io-client';

import '../style.css';


function Followup(props) {
    const dispatch = useDispatch();
    const Lead_Add = useSelector(state => state.lead.leads);
    const showtost = useSelector(state => state.lead.showToast);

    const Lead_Data = useSelector(state => state.leadsData.leadsData);
    const leaddelete = useSelector(state => state.lead.leadDelete);
    const [rowidValue, setrowIdValue] = useState()
    const agentdata = useSelector(state => state.agentdata.agentData);
    const leads = useSelector(state => state.leads.leadsData);
    const [editData, seteditData] = useState([]);
    const userData = useSelector(state => state.auth.user);
    const emailsent = useSelector(state => state.emailsent.emailsend);
    const emailDivRef = useRef(null);

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
        const pagename = 'Followup'
        const userid = userData.id
        const data = {
            pagename: pagename,
            id: userid
        }
        dispatch(fetchLead(data));
    }, [dispatch]);


    const [cars, setCars] = useState([]);
    const [modelyear, setModelyear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [vehicletype, setVehicletype] = useState('');
    const [Operable, setOperable] = useState('');

  const handleAddCar = () => {
    if (modelyear.trim() !== '' && make.trim() !== '' && model.trim() !== '' && vehicletype.trim() !== '') {
      const newCar = { id: cars.length, modelyear, make, model, vehicletype, Operable };
      setCars((prevCars) => [...prevCars, newCar]);
      setModelyear('');
      setMake('');
      setModel('');
      setVehicletype('');
      setOperable('');
      console.log(cars);
    }
  };

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
                        data-toggle="modal" onClick={() => handleEdit(row.leadId)}
                        data-target={
                            row.price == 0
                                ? "#priceerror" : "#vendoremail"
                        }
                    >
                        <div className='mailcount'>{row.mailcount}</div>
                        Send Email</button>
                    <button className='agent-edit-delete-btn ml-1' onClick={() => handleEdit(row.leadId)} type='button' data-toggle="modal" data-target="#updatelead">Update</button>
                    <button className='agent-edit-delete-btn ml-1' onClick={() => handleEdit(row.leadId)} type='button' data-toggle="modal"
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

    const [Viewvehicle, setViewvehicle] = useState([])

    const viewcar = (data) => {
        console.log(data);
        const vehicles = data.split(', ');
        setViewvehicle(vehicles);
    }

    const handleEdit = (id) => {
        const foundlead = leads.find((lead) => lead.id === id);

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
            foundlead.vehicle,
            foundlead.price,
            foundlead.intialdeposite,
            foundlead.dphonono,
            foundlead.dpickup,
            foundlead.ophonono,
            foundlead.opickup,
        ]);

    };
    const [subject, setsubject]=useState('')

    const sendEmailfunction = async (data, e) => {
        e.preventDefault()
        console.log("emial sent agent")
        const text = emailDivRef.current.innerHTML;
        const dataa = {
            leadid: data[0],
            customeremail: data[2],
            text: text,
            agentemail: userData.email,
            agentid: userData.id,
            subject:subject
        }

        try {
            console.log("emial sent agent")
            const isEmailSent = await dispatch(sendEmail(dataa));
            if (isEmailSent) {
                console.log("send")
                toast.success("Email Sent Successfully...!");
            } else {
                console.log("not send")

                toast.error("Email Not Sent Successfully...!");
            }
        } catch (error) {
            console.log("Error in sendEmailFunction:", error.message);
            toast.error("Email Not Sent Successfully...!");
        }

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
                    modelyear} ${vehicle.vehicletype} ${vehicle.operable}`).join(', ');

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
                    intialdeposit:lead.intialdeposite,
                    opickup:lead.opickup,
                    ophonono:lead.ophonono,
                    dpickup:lead.dpickup,
                    dphonono:lead.dphonono,
                    rowClass: lead.isAssigned ? 'assigned-row' : ''
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



    const handleInputChange = (index, value) => {
        seteditData((preveditData) => {
            const updatedData = [...preveditData];
            updatedData[index] = value;
            return updatedData;
        });
    };




    const addleadfunction = (e) => {
        e.preventDefault();
        console.log("add lead click agenr");
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

        dispatch(addLead(data))
            .then(() => {
                toast.success('Lead Added Successfully...!');
            })
            .catch(() => {
                toast.error('Lead Not Added Successfully...!');
            });
    }







    const getRowidValue = (id) => {
        setrowIdValue(id);
    }
    const [company, setcompany] = useState("");
    const [companydetails, setcompanydetails] = useState(null);

    const companyselection = (data) => {
        console.log(data)
        if (data === '1') {
            setcompanydetails(company1)
        }
        if (data === '2') {
            setcompanydetails(company2)
        }

        setcompany(data)
    }


    const defaulttext = 'Select any template'
    const [Templatetext, setTemplatetext] = useState(defaulttext)


    const templateSeclection = (leadData, e) => {
        e.preventDefault();
        console.log(companydetails)
        const templateno = e.target.value;
        console.log(templateno + "temolat ni")
        const matchedTemplate = template.find((tpl) => tpl.id === parseInt(templateno));
        setsubject(matchedTemplate.subject)
        console.log(subject)
        if (matchedTemplate) {
            const templateData = (matchedTemplate) => {
                let replacedText = matchedTemplate.text
                    .replace('{name}', leadData[1])
                    .replace('{price}', leadData[15])
                    .replace('{origin}', leadData[3])
                    .replace('{origincity}', leadData[5])
                    .replace('{originstate}', leadData[6])
                    .replace('{originzipcode}', leadData[7])
                    .replace('{destinationcity}', leadData[9])
                    .replace('{destinationstate}', leadData[10])
                    .replace('{destinationzipcode}', leadData[11])
                    .replace('{shipdate}', leadData[12])
                    .replace('{leadid}', leadData[0])
                    .replace('{companyname}', companydetails?.name)
                    .replace('{companyemail}', companydetails?.email)
                    .replace('{companyphonono}', companydetails?.phone)
                    .replace('{img}', Car)
                    .replace('{deposit}', leadData[16])

                const carRows = leadData[14].map((car, index) => {
                    return `
                      <tr style="border: 1px solid #dddddd;">
                        <td style="border: 1px solid #dddddd;">${car.make}</td>
                        <td style="border: 1px solid #dddddd;">${car.model}</td>
                        <td style="border: 1px solid #dddddd;">${car.modelyear}</td>
                        <td style="border: 1px solid #dddddd;">${car.vehicletype}</td>
                      </tr>
                    `;
                });

                replacedText = replacedText.replace('{carrows}', carRows.join(''));
                const Templatetext1 = replacedText.toString();
                // console.log(typeof(Templatetext1))
                setTemplatetext(Templatetext1); // Set the updated value of setTemplatetext
            };

            templateData(matchedTemplate); // Call the templateData function
        }

    }
    const updatelead = async (e) => {
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
        const price = e.target.price.value
        const inprice=e.target.inprice.value
        const pickupname=e.target.pickupname.value;
        const pickupno=e.target.pickupno.value;
        const dropoffname=e.target.dropoffname.value;
        const dropoffno=e.target.dropoffno.value
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
            cars: cars,
            price: price,
            inprice:inprice,
            pickupname:pickupname,
            pickupno:pickupno,
            dropoffname:dropoffname,
            dropoffno:dropoffno
        }
        console.log(data);
        try {
            const isupdate = await dispatch(updateLead(data));
            if (isupdate) {

                toast.success('Lead update Successfully...!');
            } else {
                toast.error('Lead Not update Successfully...!');

            }
        } catch (error) {
            toast.error('Lead Not update Successfully...!');

        seteditData('')
        }
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

            {/*send at eat one emial*/}
            <div className="modal fade" id="oneemail" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">First email required</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Please send the first email
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Price eeroor */}
            <div className="modal fade" id="priceerror" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Prie updation required</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Please update the price First
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
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
                                        <th>Is Operable?</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {Viewvehicle.map((vehicle, index) => {
                                        const [make, model, modelyear, vehicletype, Operable] = vehicle.split(' ');
                                        return (
                                            <tr key={index}>
                                                <td>{make}</td>
                                                <td>{model}</td>
                                                <td>{modelyear}</td>
                                                <td>{vehicletype}</td>
                                                <td>{Operable}</td>

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
            {/* send email  */}
            <div class="modal fade bd-example-modal-xl emailmodelsent" id="vendoremail" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    <div className="form-group">
                                        <label htmlFor="token"> <b>Select company</b> </label>
                                        <select name="emailtext" id="emailtext" onChange={(e) => companyselection(e.target.value)} className='assignlead'>
                                            <option value="0">Select any company</option>
                                            <option value="1" >HS logistic</option>
                                            <option value="2">SM transport</option>
                                        </select>

                                    </div>
                                    {
                                        company === '1' && (
                                            <div className="form-group">
                                                <label htmlFor="token"> <b>Select Template for HS logistic</b> </label>
                                                <select name="emailtext" id="emailtext" onChange={(e) => templateSeclection(editData, e)} className='assignlead'>
                                                    <option value="" >Select any template</option>
                                                    <option value="1">Follow up</option>
                                                    <option value="2">New Quotes</option>
                                                    <option value="3">Order Confirmation</option>
                                                    <option value="4">Agreement</option>
                                                    <option value="5">Dispatched</option>
                                                    <option value="6">Payment Recieved</option>
                                                    <option value="7">Second Follow Up</option>
                                                </select>
                                            </div>
                                        )
                                    }
                                    {
                                        company === "2" && (
                                            <div className="form-group">
                                                <label htmlFor="token"> <b>Select Template fo SM transport</b> </label>
                                                <select name="emailtext" id="emailtext" onChange={(e) => templateSeclection(editData, e)} className='assignlead'>
                                                    <option value="" disabled >Select any template</option>
                                                    <option value="1">Follow up</option>
                                                    <option value="2">New Quotes</option>
                                                    <option value="3">Dispatched</option>
                                                    <option value="4">Order Confirmation</option>
                                                    <option value="5">Payment Recieved</option>
                                                    <option value="6">Agreement</option>
                                                    <option value="7">Second Follow Up</option>
                                                </select>
                                            </div>
                                        )
                                    }


                                </div>
                                <div className="form-group">
                                    <label htmlFor="subject"><b>Template Overview</b></label>
                                    {/* <textarea name="emailtemplatetext" cols="30" rows="10" className='textareemail p-2' value={Templatetext} defaultValue='Select your template'></textarea> */}
                                    <div className='emialtemplatediv' ref={emailDivRef}>
                                        {parse(Templatetext)}
                                    </div>
                                    <hr />
                                </div>
                                <div className="form-group">
                                    <div>
                                        <label htmlFor="subject" className='lableemail'><b>From:</b></label> <br />
                                        <input type="text" className='fromemail' readOnly value={userData.email} />

                                    </div>
                                    <div>
                                        <label htmlFor="subject" className='lableemail'><b>To:</b></label> <br />
                                        <input type="text" className='toemail' readOnly value={editData[2]} />
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
                                        <option value="Potentail">Completed</option>
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
                                <div className="form-group">
                                    <label for="password1">Pay to Carrier</label>
                                    <input type="number" className="form-control" id="password" name='price'
                                        required
                                        placeholder="Price" value={editData[15]}  onChange={(e) => handleInputChange(15, e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label for="password1">Initial deposite</label>
                                    <input type="number" className="form-control" id="inprice" name='inprice'
                                        required
                                        placeholder="Price" value={editData[16]}  onChange={(e) => handleInputChange(16, e.target.value)} />
                                </div>

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
                                <div className='d-flex justify-content-between'>
                                    <div className="form-group mr-1">
                                        <label for="email1">Pickup person name</label>
                                        <input type="text" className="form-control" id="pickupname" value={editData[20]}
                                            onChange={(e) => handleInputChange(20, e.target.value)} required
                                            name='pickupname' aria-describedby="emailHelp" placeholder="origin address" />
                                    </div>
                                ,
                                    <div className="form-group ml-1">
                                        <label for="email1">Pickup phono no</label>
                                        <input type="text" className="form-control" id="pickupno" name='pickupno' aria-describedby="emailHelp"
                                            onChange={(e) => handleInputChange(19, e.target.value)} required
                                            value={editData[19]} placeholder="Origin city" />

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
                                <div className='d-flex justify-content-between'>
                                    <div className="form-group mr-1">
                                        <label for="email1">Drop Off person name</label>
                                        <input type="text" className="form-control" id="dropoffname" name='dropoffname' value={editData[18]}
                                            onChange={(e) => handleInputChange(18, e.target.value)} required
                                            aria-describedby="emailHelp" placeholder="Destination address" />
                                    </div>

                                    <div className="form-group ml-1">
                                        <label for="email1">Drop Off person phoneno</label>
                                        <input type="text" className="form-control" id="dropoffno" name='dropoffno' aria-describedby="emailHelp" value={editData[17]}
                                            onChange={(e) => handleInputChange(17, e.target.value)} required
                                            placeholder="Destination city" />

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
                                                        <button className="toglebtn" required onClick={(e) => deleteCar(e, index)}>Delete</button>
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




            {/* // end */}





            <div className='agenttable'>
                <div className="agent-header ">
                    <div className="agenttab">
                       Followup
                    </div>

                </div>
                <div className="agentsearch  d-flex justify-content-between pr-2 ">
                    <div className='d-flex '>
                        <div className='agentsearchicon d-flex align-items-center'>
                            <FontAwesomeIcon icon={faSearch} className='mr-1' />
                        </div>
                        <input type="text" value={searchText} onChange={handlefilter} placeholder='Search by name ' />

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

export default Followup
