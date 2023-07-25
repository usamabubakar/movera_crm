import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
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




function Agentt(props) {

    const dispatch = useDispatch();
    const signUP_success = useSelector(state => state.agent.success);
    const Email_exist = useSelector(state => state.signupadmin.email_exist);
    const vendordata = useSelector(state => state.vendordata);
    const vendordelete = useSelector(state => state.agent.userDelete);
    const emailsent = useSelector(state => state.emailsent.emailsend);
    console.log("checkin email");
    const vendors = useSelector(state => state.vendors.vendor);
    console.log(vendors)


    const [email, setEmail] = useState('');
    const [islodaing, setIsLoading] = useState(false);
    const [rowidValue, setrowIdValue] = useState()
    const [editData, seteditData] = useState([]);


    useEffect(() => {
        dispatch(fetchVendorData());
    }, [dispatch]);

    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            maxWidth: "30px"

        },
        {
            name: 'Name',
            selector: row => row.name,
            minWidth: '150px'
        },
        {
            name: 'Email',
            selector: row => row.email,
            minWidth: '250px',

        },



        {
            name: 'Action',

            cell: (row) => (
                <div className=' d-flex cell-button' style={{ whiteSpace: 'nowrap' }}>
                    {/* onClick={() => sendEmailfuntion(row)} */}
                    <button className='agent-edit-delete-btn ' data-toggle="modal" onClick={() => handleEdit(row.agentId)} data-target="#vendoremail">Send Email</button>
                    <button className='agent-edit-delete-btn ml-1' onClick={() => handleEdit(row.agentId)} type='button' data-toggle="modal" data-target="#updatemodel">Edit</button>
                    <button className='agent-edit-delete-btn ml-1' type='button' data-toggle="modal" data-target="#deleteagent" onClick={() => getRowidValue(row.agentId)} >Delete</button>
                </div>
            ),
            minWidth: '340px',
            center: true

        },
    ];
    const [record, setRecord] = useState([]);
    const [searchText, setSearchText] = useState('');
    let [data, setData] = useState([]);

    useEffect(() => {
        if (vendors && Array.isArray(vendors)) {
           const dataa = vendors.map((vendor, index) => ({
                id: index + 1,
                agentId: vendor.id || vendor._id,
                name: vendor.name,
                email: vendor.email,
                password: vendor.password
            }));
            setData(dataa);
            setRecord(dataa);
        }
    }, [vendors]);



    const getRowidValue = (id) => {
        setrowIdValue(id);
    }



    const handleEdit = (id) => {
        console.log(id)
        const foundvendor = vendordata.vendorData.find((vendor) => vendor.id === id);
        if (foundvendor && foundvendor.email) {
          seteditData([
            foundvendor.id,
            foundvendor.name,
            foundvendor.email,
            foundvendor.password,
          ]);
        } else {
          console.log('Email not found for the selected vendor.');
          // Handle the case where the email is not available
        }
      };





    function handlefilter(event) {
        const newdata = data.filter(row => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecord(newdata)
    }
    const addVendorfunction = (e) => {
        e.preventDefault();
        console.log("click ad vendor")
        const name = e.target.vname.value;
        const email = e.target.vemail.value;
        const password = e.target.vpassword.value;


        const data = {
            name: name,
            email: email,
            password: password,
        };

        dispatch(addVendor(data));
        if (signUP_success == true) {
            console.log(signUP_success + "vendor created")
            toast.success('Vendor add Successfully...!');
        }
        else {
            toast.error('Vendor add Successfully...!');

        }
    };

    const handleDelete = (id) => {
        dispatch(deleteVendor(id))
        if (vendordelete[0] == true) {
            toast.success(`Vendor ${vendordelete[1]} deleted Successfully...!`);
        }
        else {
            toast.error(`Vendor ${vendordelete[1]} not deleted Successfully...!`);
        }
    };

    const updatevendor = (e) => {
        e.preventDefault();
        console.log("click update")
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const data = {
            id: editData[0],
            name: name,
            email: email,
            password: password
        };


        dispatch(updateVendor(data))
        if (signUP_success == true) {
            console.log(signUP_success + "admin created")
            toast.success(`Vendor ${editData[1]} update Successfully...!`);
        }
        else {
            toast.error(`Vendor ${data} not update Successfully...!`);
        }
    };

        const sendEmailfuntion = (data) => {
        console.log(data)
        const { email, password } = data;
        const dataa = {
            id:data[0],
            email: data[2],
        }
        dispatch(sendEmail(dataa))
            .then((response) => {
                if (emailsent) {
                    toast.success(`Email Sent Successfully...!`);
                }
            })

    };


    const handleEmailchecker = (e) => {
        const email = e.target.value;
        setEmail(email);
        if (email.includes('@gmail.com')) {
            dispatch(emailchecker(email));
            console.log('Email entered is a Gmail address');
        }
        else {

        }
    }
    const lodingimg = () => {
        setIsLoading(true);
    };

    const hideloadingimg = () => {
        setIsLoading(false);
    };
    const handleInputChange = (index, value) => {
        seteditData((prevEditData) => {
            const newData = [...prevEditData];
            newData[index] = value;
            return newData;
        });
    };

    function handlefilter(event) {
        const searchText = event.target.value.toLowerCase();

        if (searchText === '') {
          setRecord(data); // Use the component-scoped data variable
        } else {
          const filteredData = data.filter((row) =>
            row.name.toLowerCase().includes(searchText)
          );

          setRecord(filteredData);
        }

        setSearchText(event.target.value);
      }



    return (

        <>

            <div >
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
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




            {/* // model */}
            {/* delete user model  */}
            <div class="modal fade" id="deleteagent" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Delete Agent</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure want to delete agent?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="agent-edit-delete-btn ml-1" style={{ padding: '9px 10px' }} onClick={() => handleDelete(rowidValue)} data-dismiss="modal">Yes Sure</button>

                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="vendoremail" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Send Instruction to  vendors</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="form-group">
                                <label htmlFor="subject"><b>Subject:</b> Api Lead Instructions</label>
                                <hr />

                                <br />
                                This is the Instruction for API, make a post request to <a href="">"http://localhost:5000/api/vendor/leadbyvendor"</a>
                                and you lead must b in JSON formet and your token must b valid otherwise Lead will not post to this API
                                <hr />


                            </div>


                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="agent-edit-delete-btn ml-1" style={{ padding: '9px 10px' }} onClick={() => sendEmailfuntion(editData)} data-dismiss="modal">Send </button>

                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addagent" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content modelbg">
                        <div className="modal-header border-bottom-0">
                            <h5 className="modal-title" id="exampleModalLabel">Create Account</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={addVendorfunction}>
                            <div className="modal-body">
                                <div className="form-group mt-n3">
                                    <label htmlFor="name">Full Name</label>
                                    <input type="text" className="form-control" id="vname" name="name" required placeholder="Enter Full Name" />
                                </div>
                                <div className="form-group">

                                    <label htmlFor="email">Email</label>
                                    <div className="loadingimginput">
                                        <input type="email" className="form-control" id="vemail" name="email" aria-describedby="emailHelp" placeholder="Enter Email"
                                            onChange={handleEmailchecker}
                                            onFocus={lodingimg}
                                            onBlur={hideloadingimg}
                                        />
                                        {islodaing && <img src={loding} alt="" className="loading-image" width={30} height={30} />}

                                    </div>

                                    {Email_exist == true && (
                                        <div >
                                            <small id="emailHelp" style={{ color: "#00cc00", fontSize: "12px" }} className="form-text">Email is correct! &#9989;</small>
                                        </div>


                                    )}
                                    {Email_exist == false && (
                                        <div >
                                            <small id="emailHelp" style={{ color: "tomato", fontSize: "12px" }} className="form-text">Email already exists</small>
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="vpassword" name="password" placeholder="Password" />
                                </div>

                            </div>
                            <div className="modal-footer mt-n4 border-top-0 d-flex justify-content-center">
                                <button type="submit" className="btn button-86" style={{ color: 'white' }} >Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* edit model  */}

            <div className="modal fade" id="updatemodel" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content modelbg">
                        <div className="modal-header border-bottom-0">
                            <h5 className="modal-title" id="exampleModalLabel">Create Account</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={updatevendor}>
                            <div className="modal-body">
                                <div className="form-group mt-n3">
                                    <label htmlFor="name">Full Name</label>
                                    <input type="text" className="form-control" id="name" value={editData[1]} name="name"
                                        onChange={(e) => { handleInputChange(1, e.target.value); }}
                                        required placeholder="Enter Full Name" />
                                </div>
                                <div className="form-group">

                                    <label htmlFor="email">Email</label>
                                    <div className="loadingimginput">
                                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter Email"

                                            onFocus={lodingimg}
                                            onBlur={hideloadingimg}
                                            value={editData[2]}
                                            onChange={(e) => { handleInputChange(2, e.target.value); }}
                                        />
                                        {islodaing && <img src={loding} alt="" className="loading-image" width={30} height={30} />}

                                    </div>

                                    {Email_exist == true && (
                                        <div >
                                            <small id="emailHelp" style={{ color: "#00cc00", fontSize: "12px" }} className="form-text">Email is correct! &#9989;</small>
                                        </div>


                                    )}
                                    {Email_exist == false && (
                                        <div >
                                            <small id="emailHelp" style={{ color: "tomato", fontSize: "12px" }} className="form-text">Email already exists</small>
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" />
                                </div>

                            </div>
                            <div className="modal-footer mt-n4 border-top-0 d-flex justify-content-center">
                                <button type="submit" className="btn button-86" style={{ color: 'white' }}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>





            <div className='agenttable'>
                <div className="agent-header ">
                    <div className="agenttab">
                        Vendors
                    </div>
                    <div className="agentbtn">

                        <button type='button' data-toggle="modal" data-target="#addagent" className='button-86'><b>Add Vendors  <FontAwesomeIcon icon={faUserPlus} className='ml-1' /> </b></button>
                    </div>
                </div>
                <div className="agentsearch  ">
                    <div className='d-flex '>
                        <div className='agentsearchicon d-flex align-items-center'>
                            <FontAwesomeIcon icon={faSearch} className='mr-1' />
                        </div>
                        <input type="text" value={searchText}  onChange={handlefilter} placeholder='Search by name ' />

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
const mapStateToProps = (state) => {
    return {
        agentData: state.agent.agentData,
    };
};

export default connect(mapStateToProps)(Agentt);
