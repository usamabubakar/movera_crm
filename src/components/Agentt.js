import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useRef} from 'react';
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import './style.css'
import { connect } from 'react-redux';
import { addAgent, fetchAgentData } from '../state/actions/agentCrud';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import loding from "../images/Dual Ring-1s-200px.gif";
import 'react-toastify/dist/ReactToastify.css';
import { emailchecker } from '../state/actions/signupAdmin';
import { useEffect } from 'react';
import { updateAgent } from '../state/actions/agentCrud';
import { sendEmail } from '../state/actions/email';



import { deleteAgent } from '../state/actions/agentCrud';




function Agentt(props) {

    const dispatch = useDispatch();
    const signUP_success = useSelector(state => state.agent.success);
    const Email_exist = useSelector(state => state.signupadmin.email_exist);
    const agentdata = useSelector(state => state.agentdata);
    const agentdelet = useSelector(state => state.agent.userDelete);
    const agents = useSelector(state => state.agents.agents);
    const notification = useSelector(state => state.agents.notification);
    const emailsent = useSelector(state => state.emailsent.emailsend);
const admindata=useSelector(state=>state.auth.emailpassword)

console.log("admindata",admindata,typeof(admindata))




    const [email, setEmail] = useState('');
    const [islodaing, setIsLoading] = useState(false);
    const [rowidValue, setrowIdValue] = useState()
    const [editData, seteditData] = useState([]);


    useEffect(() => {
        dispatch(fetchAgentData());
    }, []);

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

            name: 'Password',
            selector: row => row.password,
            minWidth: '150px',

        },
        {

            name: 'Phone no',
            selector: row => row.phoneno,
            center: true,
            minWidth: '200px'
        },
        {

            name: 'Job Start Time',
            selector: row => row.jobstarttime,
            center: true,
            minWidth: '150px'
        },
        {

            name: 'Job End Time',
            selector: row => row.jobendtime,
            center: true,
            minWidth: '150px'
        },


        {
            name: 'Action',

            cell: (row) => (
                <div className=' d-flex cell-button' style={{ whiteSpace: 'nowrap' }}>
                    <button className='agent-edit-delete-btn ' onClick={() => handleEdit(row.agentId)} data-toggle='modal' data-target={admindata === 'none' ? '#emailpassword': '#agentemail'} >{row.emailsent ? 'Already send' : 'Send Email'}</button>
                    <button className='agent-edit-delete-btn ml-1' onClick={() => handleEdit(row.agentId)} type='button' data-toggle="modal" data-target="#updatemodel">Edit</button>
                    <button
                        className='agent-edit-delete-btn ml-1'
                        type='button'
                        onClick={() => {
                            const id = row.agentId;
                            handleEdit(id);
                            getRowidValue(id)
                        }}
                        data-toggle="modal"
                        data-target="#deleteagent"
                    >
                        Delete
                    </button>

                </div>
            ),
            minWidth: '340px',
            center: true

        },
    ];
    // const data=[]

    const [record, setRecord] = useState([]);
    const [searchText, setSearchText] = useState('');
    let [data, setData] = useState([]);

    useEffect(() => {
        if (agents && Array.isArray(agents)) {
            const dataa = agents.map((agent, index) => ({
                id: index + 1,
                agentId: agent._id || agent.id,
                name: agent.name,
                email: agent.email,
                password: agent.password,
                jobstarttime: agent.starttime,
                jobendtime: agent.endtime,
                emailsent: agent.emailsent,
                phoneno: agent.phoneno
            }));
            setData(dataa);
            setRecord(dataa);
        }
        console.log(agents)
    }, [agents]);

    const getRowidValue = (id) => {
        setrowIdValue(id);
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





    const handleEdit = (id) => {
        console.log("cheingl id", id)
        const foundAgent = agents.find((agent) => agent.id === id || agent._id === id);
        seteditData([
            foundAgent.id || foundAgent._id,
            foundAgent.name,
            foundAgent.email,
            foundAgent.password,
            foundAgent.starttime,
            foundAgent.endtime,
            foundAgent.phoneno

        ]);
        console.log(editData)
    };


    const addAgentfun = (e) => {
        e.preventDefault();
        const name = e.target.aname.value;
        const email = e.target.aemail.value;
        const password = e.target.apassword.value;
        const starttime = e.target.astarttime.value;
        const endtime = e.target.aendtime.value;
        const phoneno = e.target.phoneno.value
        const data = {
            name: name,
            email: email,
            password: password,
            starttime: starttime,
            endtime: endtime,
            phoneno: phoneno
        };
        console.log(data);
        dispatch(addAgent(data)).then(
            toast.success(`Agent added Successfully...!`)
        )

    };

    const handleDelete = async (id) => {
        try {
          console.log(editData);
          console.log(id);
          const isDeleted = await dispatch(deleteAgent(id));

          if (isDeleted) {
            toast.success(`Agent ${editData[1]} deleted successfully.`);
          } else {
            toast.error(`Agent ${editData[1]} not deleted.`);
          }
        } catch (error) {
          toast.error(`An error occurred while deleting agent ${editData[1]}.`);
        }
      };


    const updateagent = async(e) => {

        try {
            e.preventDefault();
            console.log("click udpoate")
            const name = e.target.name.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            const starttime = e.target.starttime.value;
            const endtime = e.target.endtime.value;
            const phoneno=e.target.phoneno.value;
            const data = {
                id: editData[0],
                name: name,
                email: email,
                password: password,
                starttime: starttime,
                endtime: endtime,
                phoneno:phoneno
            };
            console.log(data)

          const update=  await dispatch(updateAgent(data))
          if(update){
            toast.success(`Agent ${editData[1]} update Successfully.`)
          }

        dispatch(updateAgent(data)).then(
            toast.success(`Agent ${editData[1]} update Successfully...!`)
        )




    };

    const [emailexist, setemailexist] = useState(null)
    const handleEmailchecker = (e) => {
        const email = e.target.value;
        setEmail(email);

        dispatch(emailchecker(email))
            .then(() => {
                setemailexist(true)
            }).catch(
                setemailexist(false)
            )
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
    const sendEmailfuntion = async (data) => {
        console.log("email function");
        const { email, password, starttime, endtime } = data;
        const dataa = {
            id: data[0],
            email: data[2],
            password: data[3],
            starttime: data[4],
            endtime: data[5],
        };

        try {
            const isEmailSent = await dispatch(sendEmail(dataa));
            if (isEmailSent) {

              toast.success("Email Sent Successfully...!");
            } else {
                toast.error("Email Not Sent Successfully...!");
            }
        } catch (error) {
            console.log("Error in sendEmailFunction:", error.message);
            toast.error("Email Not Sent Successfully...!");
        }

    };


    console.log(data)
}


    return (

        <>

            <div >
                <ToastContainer
                    position="top-center"
                    autoClose={1500}
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

{/* emailpasswrod */}
<div class="modal fade" id="emailpassword" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    <label htmlFor="password">Please set you email App password first</label>
                                    <input type="text" className="form-control" id="appassword" name="appassword" ref={emailPasswordRef} placeholder="Email app password" required />
                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="agent-edit-delete-btn ml-1" style={{ padding: '9px 10px' }}  onClick={() => setEmailpassword(emailPasswordRef.current.value)} data-dismiss="modal">save it </button>

                        </div>
                    </div>
                </div>
            </div>

            {/* email  */}

            <div class="modal fade" id="agentemail" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Send Instruction to  vendors</h5>
                            <button id='closeemailmodal'  type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="form-group">
                                <label htmlFor="subject"><b>Subject:</b> Agent Login credetionals</label>
                                <hr />
                            </div>
                            <div className="form-group">
                                <table>
                                    <thead>
                                        <td><b>Email</b></td>
                                        <td><b>Password</b></td>
                                        <td><b>Job Start Time</b></td>
                                        <td><b>Job End Time</b></td>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{editData[2]}</td>
                                            <td>{editData[3]}</td>
                                            <td>{editData[4]}</td>
                                            <td>{editData[5]}</td>


                                        </tr>
                                    </tbody>
                                </table>


                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="agent-edit-delete-btn ml-1" style={{ padding: '9px 10px' }} onClick={() => sendEmailfuntion(editData)} data-dismiss="modal">Send </button>

                        </div>
                    </div>
                </div>
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
            <div className="modal fade" id="addagent" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content modelbg">
                        <div className="modal-header border-bottom-0">
                            <h5 className="modal-title" id="exampleModalLabel">Create Account</h5>
                            <button id='closeagentmodel' type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={addAgentfun}>
                            <div className="modal-body">
                                <div className="form-group mt-n3">
                                    <label htmlFor="name">Full Name</label>
                                    <input type="text" className="form-control" id="aname" name="name" required placeholder="Enter Full Name" />
                                </div>
                                <div className="form-group">

                                    <label htmlFor="email">Email</label>
                                    <div className="loadingimginput">
                                        <input type="email" className="form-control" id="aemail" name="email" aria-describedby="emailHelp" placeholder="Enter Email"
                                            onChange={handleEmailchecker}
                                            onFocus={lodingimg}
                                            onBlur={hideloadingimg}
                                            required
                                        />
                                        {islodaing && <img src={loding} alt="" className="loading-image" width={30} height={30} />}

                                    </div>

                                    {emailexist === null ? null : (
                                        emailexist ? (
                                            <div>
                                                <small id="emailHelp" style={{ color: "#00cc00", fontSize: "12px" }} className="form-text">
                                                    Email is correct! &#9989;
                                                </small>
                                            </div>
                                        ) : (
                                            <div>
                                                <small id="emailHelp" style={{ color: "tomato", fontSize: "12px" }} className="form-text">
                                                    Email already exists
                                                </small>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="apassword" name="password" placeholder="Password" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Phone No</label>
                                    <input type="number" className="form-control" id="phoneno" name="phoneno" placeholder="Phoneno" required />
                                </div>
                                <div className="form-group d-flex justify-content-between">
                                    <div className="w-50 mr-1">
                                        <label htmlFor="starttime">Start Time</label>
                                        <input type="time" className="form-control" id="astarttime" name="starttime" placeholder="Start Time" required />
                                    </div>
                                    <div className="w-50 ml-1">
                                        <label htmlFor="endtime">End Time</label>
                                        <input type="time" className="form-control" id="aendtime" name="endtime" placeholder="End Time" required />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer mt-n4 border-top-0 d-flex justify-content-center">
                                <button type="submit" className="btn button-86" style={{ color: 'white' }} disabled={!Email_exist}  >Submit</button>
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
                            <h5 className="modal-title" id="exampleModalLabel">Edit Account</h5>
                            <button id='closeeditmodal' type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={updateagent}>
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
                                    <input type="password" className="form-control" id="password" value={editData[3]} name="password" placeholder="Password"
                                        onChange={(e) => { handleInputChange(3, e.target.value); }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Phono No</label>
                                    <input type="number" className="form-control" id="phoneno" value={editData[6]} name="phoneno" placeholder="Phone no"
                                        onChange={(e) => { handleInputChange(6, e.target.value); }}
                                    />
                                </div>
                                <div className="form-group d-flex justify-content-between">
                                    <div className="w-50 mr-1">
                                        <label htmlFor="starttime">Start Time</label>
                                        <input type="time" className="form-control" id="starttime" onChange={(e) => { handleInputChange(4, e.target.value); }} value={editData[4]} name="starttime" placeholder="Start Time" />
                                    </div>
                                    <div className="w-50 ml-1">
                                        <label htmlFor="endtime">End Time</label>
                                        <input type="time" className="form-control" id="endtime" onChange={(e) => { handleInputChange(5, e.target.value); }} value={editData[5]} name="endtime" placeholder="End Time" />
                                    </div>
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
                        Agents
                    </div>
                    <div className="agentbtn">

                        <button type='button' data-toggle="modal" data-target="#addagent" className='button-86'><b>Add Agent  <FontAwesomeIcon icon={faUserPlus} className='ml-1' /> </b></button>
                    </div>
                </div>
                <div className="agentsearch  ">
                    <div className='d-flex '>
                        <div className='agentsearchicon d-flex align-items-center'>
                            <FontAwesomeIcon icon={faSearch} className='mr-1' />
                        </div>
                        <input type="text" value={searchText} onChange={handlefilter} placeholder='Search by name ' />

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
