import React from "react";
import { useState, useEffect } from "react";
import './Login.css';
import logoimg from "../images/logo.png";
import loding from "../images/Dual Ring-1s-200px.gif";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import { login_user } from '../state/actions/authUser';
import { signup_Admin } from '../state/actions/signupAdmin';
import { emailchecker } from '../state/actions/signupAdmin';
import { secretkey } from '../state/actions/authUser'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import $ from 'jquery';


export default function Login(props) {

    const Secretkeyresponse = useSelector(state => state.auth.secretKey);
    const login_status = useSelector(state => state.auth.errorMessage);
    const Email_exist = useSelector(state => state.signupadmin.email_exist);
    const signUP_success = useSelector(state => state.signupadmin.success);

    const errormesssage = login_status?.message
    const dispatch = useDispatch();

    const [key, setKey] = useState(['', '', '', '']);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showalert, setShowalert] = useState(false);
    const [islodaing, setIsLoading] = useState(false);
    const [isKeyValidated, setIsKeyValidated] = useState(false);
    const [email, setEmail] = useState('');

    const handleInputChange = (e, index) => {
        const { value } = e.target;
        const newkey = [...key];
        newkey[index] = value;
        setKey(newkey);
    };
    // useEffect(() => {
    //     if (Secretkeyresponse === true) {
    //       dispatch(secretkey(''));
    //     }
    //   }, [Secretkeyresponse]);

    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false);
    const handleShow = () => setOpen(true);

    const secretkeyfun = async (e) => {
        e.preventDefault();
        const keyno = key.join('');
       
        try {
            const isKeyValid = await dispatch(secretkey(keyno)); // Wait for the secret key action to complete
            if (isKeyValid) {
                setIsKeyValidated(true);
                toast.success('Secret Key validation success');

            } else {
                setIsKeyValidated(false);
                console.log("not working");
                toast.error('Secret Key is wrong...!!!');
            }
        } catch (error) {
            console.log(error);
        }


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

    const signup =async (e) => {
        e.preventDefault();
        console.log("signup click")
        const name = e.target.name.value;
        const password = e.target.password.value;
        const email = e.target.email.value;
        const img = e.target.img.files[0]
        const signupData = {
            name: name,
            password: password,
            email: email,
            img: img
        }
        try {
          const signupp=await dispatch(signup_Admin(signupData))
        if (signupp ) {

            setIsKeyValidated(false);
            toast.success('Sign-Up Successfully...!');
        }
        else  {
            toast.error('Email already exist...!');
        }
        } catch (error) {
            toast.error('internal error');
        }
    }

    const loginvalidation = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const credentials = {
            email: email,
            password: password
        }

        dispatch(login_user(credentials));
    }

    const lodingimg = () => {
        setIsLoading(true);
    };

    const hideloadingimg = () => {
        setIsLoading(false);
    };


    const handleFirstModalClose = () => {
        setIsKeyValidated(false);
    };


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

                <div className="modal fade" id={isKeyValidated ? 'adminsignup' :'none' } tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" onHide={handleFirstModalClose}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content modelbg">
                            <div className="modal-header border-bottom-0">
                                <h5 className="modal-title" id="exampleModalLabel">Create Account</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={signup} method="POST" enctype="multipart/form-data">
                                <div className="modal-body">
                                    <div className="form-group mt-n3 ">

                                        <label htmlFor="email1">Full Name</label>
                                        <input type="text" className="form-control" id="name" name="name" required aria-describedby="emailHelp" placeholder="Enter First Name" />
                                    </div>
                                    <div className="form-group ">
                                        <label htmlFor="email1">Email</label>
                                        <div className="loadingimginput">
                                            <input type="email" className="form-control" id="email" name="email" required aria-describedby="emailHelp" placeholder="Enter email"
                                                onChange={handleEmailchecker}
                                                onFocus={lodingimg}
                                                onBlur={hideloadingimg}
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
                                        <label htmlFor="password1">Password</label>
                                        <input type="password" className="form-control" name="password" id="password" required placeholder="Password" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password1">Image</label>
                                        <input type="file" className="form-control" name="img" id="img" required placeholder="select your image" />
                                    </div>
                                </div>
                                <div className="modal-footer mt-n4 border-top-0 d-flex justify-content-center model-dismiss" >
                                    <button type="submit" className="btn button-86 " data-toggle='modal' data-dismiss='model' style={{ color: 'white' }} disabled={!Email_exist}>Submit</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>


            {/* Secret key model  */}
            <div className="modal fade" id="seceretkey" aria-hidden="true" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header border-bottom-0">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form action="" >
                            <div className="modal-body secrtmodelbody mt-n4">
                                <div className="modal-icon d-flex justify-content-center">
                                    <FontAwesomeIcon icon={faMobileAlt} className="mobilealt" /><FontAwesomeIcon className="circlecheck" icon={faCircleCheck} /></div>
                                <h4 className="title mt-3"><b>Enter Secret Key</b></h4>
                                <p className="modeldescription">Enter the Secret Verification code which is Provided by Developer to complete sign Up.</p>
                                <ul className="code-number">
                                    <li><input type="number" placeholder="0" maxLength="1" required
                                        value={key[0]}
                                        onChange={(e) => handleInputChange(e, 0)}
                                        onFocus={(e) => e.target.placeholder = ''}

                                    />
                                    </li>
                                    <li><input type="number" placeholder="0" maxLength="1" required
                                        value={key[1]}
                                        onChange={(e) => handleInputChange(e, 1)}
                                        onFocus={(e) => e.target.placeholder = ''}
                                    /></li>
                                    <li><input type="number" placeholder="0" maxLength="1" required
                                        value={key[2]}
                                        onChange={(e) => handleInputChange(e, 2)}
                                        onFocus={(e) => e.target.placeholder = ''}
                                    /></li>
                                    <li><input type="number" placeholder="0" maxLength="1" required
                                        value={key[3]}
                                        onChange={(e) => handleInputChange(e, 3)}
                                        onFocus={(e) => e.target.placeholder = ''}
                                    /></li>
                                </ul>

                                <button type="submit" onClick={secretkeyfun} className="btn Secretbtn"

                                        data-toggle="modal" data-target="#adminsignup"
                                    data-dismiss='modal'
                                >
                                    Continue
                                </button>



                                {showalert &&
                                    (<div class="alert alert-warning alert-dismissible fade show" role="alert">
                                        <strong>Opps!</strong> Secret key is not valid. Remaining try 2
                                    </div>)

                                }

                                <a href="" className="cancel">already got an account? Sign in</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>




            <div className="container-fluid login_body ">
                <div className="row no-gutters d-flex justify-content-center h-100 align-items-center ">

                    <div className="col-lg-7 no-gutters col-11 login-div">
                        {/* <div className="container-fluid ">
                            <div className="row no-gutters d-flex justify-content-center align-items-center"> */}
                        <div className="col-md-6 col-12 login_div1  ">
                            <div className="formdata ml-md-2 d-flex justify-content-center align-items-center flex-column">
                                <div className='loginheading'>
                                    <img src={logoimg} width={110} height={110} />
                                    <h3>Welcome</h3>
                                </div>

                                <form onSubmit={loginvalidation}>
                                    <div className='login_inputs'>

                                        <div className='logininput_fields'>
                                            <div className='inputname'>
                                                <b>Email</b>
                                            </div>
                                            <div className='logininput'>
                                                <div className='loginicon' >
                                                    <FontAwesomeIcon icon={faUser} />
                                                </div>
                                                <input type="text" name='email' required
                                                    id="email" placeholder="Enter Email"
                                                ></input>
                                            </div>
                                        </div>
                                        <div className='logininput_fields'>
                                            <div className='inputname'>
                                                <b>Password</b>
                                            </div>
                                            <div className='loginicon' >
                                                <FontAwesomeIcon icon={faLock} />
                                            </div>
                                            <div className='logininput'>
                                                <input type="password" required
                                                    name='password'
                                                    id="password"
                                                    placeholder="Enter Password"  ></input>
                                            </div>
                                        </div>
                                        {login_status && (
                                            <div className='login_message'>
                                                <div className="loginerror">
                                                    {errormesssage}
                                                </div>
                                            </div>
                                        )}

                                        <div className='logininput_fields_btn buttonn'>
                                            <button className='button-86' type='submit' > Login</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                        <div className="col-md-5 col-12 ml-2">
                            <div className='login_image'>
                                <h5 >Movera</h5>
                                <span>Your all-in-one platform for vehicle transport management.</span>
                                <button type="button" className="btn button-28" onClick={handleShow} data-toggle="modal" data-target="#seceretkey">
                                    Become Admin
                                </button>

                            </div>
                        </div>
                        {/* </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

