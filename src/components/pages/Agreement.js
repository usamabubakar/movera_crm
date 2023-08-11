import React, { memo, useState, useRef, useEffect } from 'react'
import './stylee.css'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faCircleXmark, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import SignaturePad from 'react-signature-pad-wrapper'
import { fetchagreemetndata } from '../../state/actions/agreement';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addagreement } from '../../state/actions/agreement';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logoimg from "../../images/logo.png";
import axios from 'axios';
import html2pdf from 'html2pdf.js';



function Agreement() {


    const dispatch = useDispatch();

    const [isExpanded, setIsExpanded] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const signatureRef = useRef(null);
    const agreementtdata = useSelector(state => state.customerdata.agreementData);
    const [leadid, setleadid] = useState()
    const [signature, setsignature] = useState()

//  get ip function
    const [ip, setIp] = useState();
    const  getIp = async () => {
        const res = await axios.get('https://geolocation-db.com/json/https://geolocation-db.com/json/a9e48c70-8b22-11ed-8d13-bd165d1291e3')

        setIp(res.data.IPv4)
    }



    const downloadPDF = () => {
        const input = document.getElementById('invoicee');
        const pdfOptions = {
          margin: 10,
          filename: 'summary.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };

        // Store the current height and overflow properties
        const originalHeight = input.style.height;
        const originalOverflow = input.style.overflow;

        // Set the height to the full scroll height and remove overflow to display the entire content
        input.style.height = input.scrollHeight + 'px';
        input.style.overflow = 'visible';

        // Generate the PDF
        html2pdf().from(input).set(pdfOptions).save();

        // Restore the original height and overflow properties after generating the PDF
        input.style.height = originalHeight;
        input.style.overflow = originalOverflow;
      };





    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };
    const handleCheckboxChange = (event) => {
        if (!signature) {
            alert('Please save the signature first.');
            return;
          }
        setIsChecked(event.target.checked);
    };

    const clearSignature = (event) => {
        event.preventDefault();
        signatureRef.current.clear();
    };


    const saveSignature = (e) => {
        e.preventDefault()
        const signatureImage = signatureRef.current.toDataURL();
        setsignature(signatureImage)
    };



    useEffect(() => {
        getIp();
        const urlParams = new URLSearchParams(window.location.search);
        const leadId = urlParams.get('hash_id');
        setleadid(leadId)
        dispatch(fetchagreemetndata(leadId))
    }, []);

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Get the values from the input fields
        const fullName = event.target.name.value;
        const email = event.target.elements.email.value;
        const phoneNo = event.target.elements.phoneno.value;
        const originaddress = event.target.elements.originadress.value
        const orgincity = event.target.elements.origincity.value
        const originstate = event.target.elements.originstate.value
        const originzipcode = event.target.elements.originzipcode.value
        const destinationaddress = event.target.elements.destinationadress.value
        const destinationcity = event.target.elements.destinationcity.value
        const destinationstate = event.target.elements.destinationstate.value
        const destinationzipcode = event.target.elements.destinationzipcode.value
        const Opickup = event.target.elements.Opickup.value
       const Ophonono = event.target.elements.Ophonono.value
       const Dpickup = event.target.elements.Dpickup.value
       const Dphonono = event.target.elements.Dphonono.value
        const esign = signature

        const data = {
            name: fullName,
            email: email,
            phoneno: phoneNo,
            originaddress: originaddress,
            originstate: originstate,
            origincity: orgincity,
            originzipcode: originzipcode,
            destinationaddress: destinationaddress,
            destinationcity: destinationcity,
            destinationzipcode: destinationzipcode,
            destinationstate: destinationstate,
            signature: esign,
            id: leadid,
            ipaddress: ip,
            Opickup:Opickup,
            Ophonono:Ophonono,
            Dpickup:Dpickup,
            Dphonono:Dphonono
        }
        dispatch(addagreement(data))
        window.location.reload()



    };


    return (
        <>


            {/* veiw invoice  */}

            <div className="modal fade" id="invoice" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Shipment Invoice </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ overflowY: 'scroll' }} id="invoicee">

                            <div className="invpoiceheading">
                                <b>INVOICE</b>
                            </div>
                            {/* <div className="logoandnumber">
                                <div className="logoo ">
                                    <img src={logoimg} width='100px' height='100px' alt="" />


                                </div>
                                <div className="numberr">
                                    (214) 404-545
                                </div>
                            </div> */}
                            {/* <div className="ordernumbr">
                                <h6>ORDER#LQT6566 (18383 PRESTON RD STE 202, DALLAS TX 75252)</h6>
                            </div> */}
                            <div className="customeralex d-flex">
                                <div className="" style={{ width: '50%' }}>
                                    <h6><b>Customer :</b> {agreementtdata.fullname}</h6>
                                </div>
                                <div className="d-flex justify-content-start" style={{ width: '50%' }}>
                                    <h6><b>Order Date : </b> {agreementtdata.recieveddate}</h6>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="customerinfo">
                                    <b>Phone No : </b> {agreementtdata.phoneno} <br />
                                    <b>Payment Method : </b> {agreementtdata.payment}
                                </div>
                                <div className="orderpayment"></div>
                            </div>
                            <div className="dialog d-flex justify-content-between">
                                <div className="dialogbox1">
                                    <p>We do bumper to bumper insurance (includes up to $250,000 Carrier's insurance),
                                        door-to-door shipment, including all the tolls and taxes, and 100 lbs. of personal
                                        belongings with absolutely no hidden charges</p>
                                </div>
                                <div className="dialogbox2">
                                    <div className="box2heading">
                                        <b>PRICE AND PAYMENT</b>
                                    </div>
                                    <div className="p-2">
                                        <b>Price: </b> {agreementtdata.price} $ <br />
                                        <b>Intial deposit: </b> {agreementtdata.intialdeposite} $ <br />
                                        <b>Remaining: </b> { agreementtdata.price - agreementtdata.intialdeposite } $ <br /> <br />



                                    </div>
                                </div>
                            </div>

                            <div className="shippmentdetails details mt-3 p-1">
                                <div className="w-100 text-center">
                                    <h5 className='mt-1' ><b>Shipment Details</b></h5>
                                </div>
                                <table className='agreetable'>

                                    <thead>
                                        <tr>
                                            <th>Model</th>
                                            <th>Make</th>
                                            <th>Model Year</th>
                                            <th>Model Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {agreementtdata.vehicle?.map((car) => (
                                            <tr key={car.id}>
                                                <td>{car.model}</td>
                                                <td>{car.make}</td>
                                                <td>{car.modelyear}</td>
                                                <td>{car.vehicletype}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <table className='agreetable'>
                                    <thead>
                                        <tr>
                                            <th>Origin City</th>
                                            <th>Origin Address</th>
                                            <th>Origin State</th>
                                            <th>Origin Zipcode</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{agreementtdata.origincity}</td>
                                            <td>{agreementtdata.originaddress}</td>
                                            <td>{agreementtdata.originstate}</td>
                                            <td>{agreementtdata.originzipcode}</td>

                                        </tr>
                                    </tbody>
                                </table>
                                <table className='agreetable'>
                                    <thead>
                                        <tr>

                                            <th>Destination City</th>
                                            <th>Destination Address</th>
                                            <th>Destination State</th>
                                            <th>Destination zipcode</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{agreementtdata.destinationcity}</td>
                                            <td>{agreementtdata.destinationaddress}</td>
                                            <td>{agreementtdata.destinationstate}</td>
                                            <td>{agreementtdata.destinationzipcode}</td>



                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                            <div className="details mt-3 ">
                                <div className="text-center w-100 mt-3">
                                    <h5><b>TERMS AND CONDITION</b></h5>
                                </div>
                                <p className="mt-1" style={{ fontSize: '13px', marginLeft: '10px' }}>

                                      1) The carrier and driver jointly and separately are authorized to operate and transport his/her or their motor vehicle between its pickup location and the destination. While every effort will be made to confirm a driver for the estimated date and price, no guarantee of pickup or delivery date can be made. Changes may occur in both due to carrier schedules, mechanical failure, inclement weather, acts of God, among other unforeseen circumstances. HS Logistics will not be responsible for any charges or liabilities incurred due to delay of pickup or delivery. This includes but is not limited to airline tickets or rental car fees. The client will be given the carrier’s schedule at the time of dispatch. 2) The client agrees to not contract any other broker or carrier during the respective time which corresponds with their shipping option. Any client that is found working with another broker or carrier during this period, is subject to a non-refundable deposit fee. 3) Contracted carriers provide door to door transport if the truck driver can physically reach the pick-up and delivery addresses. If access to the pickup or delivery location is restricted by narrow streets, low- hanging trees or tight turns, the driver may ask that you meet the truck at a large parking lot nearby, such as a grocery store. 4) Carriers are not licensed or insured to transport any personal or household goods, however, we do understand that you may need to put some items in the vehicle. Carrier is not liable for damage caused to the vehicle from excessive or improper loading of personal items. These items must be put in the trunk and kept to a limit of 100 lbs. Any exceptions must be previously discussed and approved by HS Logistics. An additional fee may be assessed for personal items of any weight. Any misrepresentation of the personal belongings will result in a change of price and/or a dry run fee of $150 if a carrier is made to attend the scene of the pick-up and the shipment is different from expected. If a carrier is sent out and the vehicle is not ready as indicated by the shipper there will be an additional $75.00 rescheduling fee. HS Logistics must be notified, should the shipper be unavailable for pick up or delivery, the shipper must have an alternate representative take his/her place as shipper. 5) Vehicles must be tendered to the carrier in good running condition with no more than a half tank of fuel. Carrier will not be liable for damage caused by leaking fluids, freezing, exhaust systems, or antennas not tied down. Any claim for loss or damage must be noted and signed on condition report at time of delivery. 6) Trucking damage claims are covered by carriers from $100,000 up to $250,000 cargo insurance per load, and a minimum of 3/4 of a million dollars public liability and property damage. Any damage incurred to a vehicle during transport falls directly under the responsibility of the carrier and not HS Logistics. All carriers contracted will have insurance to cover damage caused by the driver or theft during transport. If damage is done, HS Logistics. will provide you with a full insurance packet for thecarrier to file a claim. All claims must be noted and signed for at time of delivery and submitted in writing within 15 days of delivery. 7) If a carrier is sent out and the vehicle is not ready as indicated by the shipper there will be an additional $75.00 rescheduling fee. HS Logistics must be notified, should the shipper be unavailable for pick up or delivery, the shipper must have an alternate representative take his/her place as shipper. If for any reason the vehicle becomes unavailable during a scheduled pick-up window, after an order has been placed, HS Logistics will not refund the deposit amount. 8) The client should under no circumstances release or receive vehicle(s) from a carrier without an inspection report (Bill of Lading/BOL) regardless of the time of day or the weather conditions. Failure to do so may result in the client’s inability to file a damage claim. Carriers insurance will only process claims for damages due to the carrier’s own negligence. Damage must be reported to HS Logistics within 24 hours of delivery. Damage must be clearly listed on the BOL and signed by the driver (no exceptions). If there is damage during transport, the client must notate those damages on the final inspection report, pay the remaining balance stated on this agreement, and then contact the carrier’s main office as well as the carrier's insurance company. Failure to notate any damage on the final inspection report releases the carrier of any liability and would result in the inability to process a damage claim. 09) A $150.00 non-operational fee will be charged for all non-running vehicles. This will be included in the final quote received from HS Logistics. If the vehicle becomes non-operational during transport, this fee will be applied to the original quote. Final quote will be provided to the customer at the time of dispatching with the carrier for the pickup of the vehicle. 10) HS Logistics agrees to provide a carrier to transport your vehicle as promptly as possible in accordance with your instructions but cannot guarantee pick-up or delivery on a specified date. A cancellation fee of $200 will be charged for orders canceled 7 days before the requested available pick- up date. HS Logistics does not agree to pay for your rental of a vehicle, nor shall it be liable for failure of mechanical or operating parts of your vehicle. Shipper warrants that he/she will pay the price quoted due HS Logistics for delivered vehicles and will not seek to charge back a credit card. This agreement and any shipment here under is subject to all terms and conditions of the carrier’s tariff and the uniform straight bill of lading, copies of which are available at the office of the carrier. 11) This agreement shall be governed by and construed in accordance with the laws of the State of California. The parties further agree that any legal action arising out of this agreement must be filed in a court of jurisdiction, and HS Logistics liability is limited to the amount of money HS Logistics broker’s fee only. The client hereby submits to the jurisdiction of such courts and waives any right to jurisdiction in any other location. I hereby agree to the transport terms provided by HS Logistics. I authorize a small down payment to be paid to HS Logistics via a credit or debit card or check by phone or mail. I further understand that any remaining balance is due on delivery and that it must be paid in full via cash, cashier’s check, and money order, to the authorized transporter.

                                </p>
                                    <hr />
                                    <div className="text-center w-100 mt-3">
                                    <h5><b>DIGITAL SIGNATURE CERTIFICATE</b></h5>
                                </div>
                                <p className="mt-1" style={{ fontSize: '13px', marginLeft: '10px' }}>By selecting "I Agree" and entering
                                    my full name as a binding electronic
                                    signature I understand that an electronic signature has the same legal effect and can be
                                    enforced in the same way as a written signature. Furthermore, I hereby accept the terms and
                                    conditions of service as described in the "Term" section below</p>
                                <div className="d-flex">
                                    <div className="detailbox">
                                        <b>Electronic Signature:</b> {agreementtdata?.fullName} <br />
                                        <p>This is image of  electronic signature of agreement</p>
                                        <b>Signed and Accepted On: </b>{agreementtdata.signaturedate} <br /> <br />
                                        <b >Your Ip Address: </b>{agreementtdata.ipaddress}

                                    </div>
                                    <div className="e-sign detailbox d-flex justify-content-center">
                                        <img src={agreementtdata.signature} alt="" width="120px" height="120px" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            <button type="button" className='agreebtn p-2' style={{width:'auto'}} id="downloadpdf" data-dismiss="modal" onClick={downloadPDF}>
                                Download Shipment Invoice
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="agree_navbar text-center d-flex align-items-center justify-content-center">
                <b>Agreement with {agreementtdata?.fullname}</b>
            </div>

            {
                agreementtdata=='400' ?(
                    <div className='invalid'>
                        <div className='invlaid-text'>
                        <FontAwesomeIcon className='agreeicon mb-1' icon={faCircleXmark} /> <br />
                       <b>Opps...!  Bad Request</b> <br />
                        Kindly click on provided link in email
                        </div>
                    </div>
                ):(
                    !agreementtdata.agreement ? (
                        <form onSubmit={handleFormSubmit}>
                            <div className="container agreement d-flex justify-content-center align-items-center">
                                <div className="row d-flex justify-content-center align-items-center">
                                    <div className="col-md-8 col-12">
                                        <div>
                                            <Accordion>
                                                <AccordionSummary style={{ background: '#0c2556', color: 'white' }} onClick={handleToggle} className=' d-flex justify-content-between align-items-center'>
                                                    <div className=' d-flex justify-content-between align-items-center w-100'>
                                                        <b>Contact Information</b>  <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
                                                    </div>
                                                </AccordionSummary>
                                                <AccordionDetails className='AccordionDetails'>
                                                    <div className='inputdaat'>
                                                        <div>
                                                            <label htmlFor="">Fullname</label> <br />
                                                            <input type="text" id='name' name='name' defaultValue={agreementtdata.fullname} onChange={handleInputChange} />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="">Email</label> <br />
                                                            <input type="text" id='email' name='email' defaultValue={agreementtdata.email} />
                                                        </div>

                                                        <div>
                                                            <label htmlFor="">Phone No</label> <br />
                                                            <input type="text" id='phoneno' name='phoneno' defaultValue={agreementtdata.phoneno} />
                                                        </div>
                                                    </div>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary style={{ background: '#0c2556', color: 'white' }}>
                                                    <div className=' d-flex justify-content-between align-items-center w-100'>
                                                        <b>Origin</b> <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
                                                    </div>
                                                </AccordionSummary>
                                                <AccordionDetails className='AccordionDetails'>
                                                    <div className='inputdaat'>
                                                        <div>
                                                            <label htmlFor="">Origin Address</label> <br />
                                                            <input type="text" id='originadress' name='originadress' onChange={handleInputChange} defaultValue={agreementtdata.originaddress} />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="">Origin City</label> <br />
                                                            <input type="text" id='origincity' name='origincity' onChange={handleInputChange} defaultValue={agreementtdata.origincity} />
                                                        </div>

                                                        <div>
                                                            <label htmlFor="">Origin State</label> <br />
                                                            <input type="text" id='originstate' name='originstate' onChange={handleInputChange} defaultValue={agreementtdata.originstate} />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="">Origin Zip Code</label> <br />
                                                            <input type="text" id='originzipcode' name='originzipcode' onChange={handleInputChange} defaultValue={agreementtdata.originzipcode} />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="">Origin Pickup Person Name</label> <br />
                                                            <input type="text" id='Opickup' name='Opickup' onChange={handleInputChange} defaultValue={agreementtdata.Opickup} />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="">Origin Pickup Person No</label> <br />
                                                            <input type="text" id='Ophonono' name='Ophonono' onChange={handleInputChange} defaultValue={agreementtdata.Ophonono} />
                                                        </div>
                                                    </div>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary style={{ background: '#0c2556', color: 'white' }}>
                                                    <div className=' d-flex justify-content-between align-items-center w-100'>
                                                        <b>Destination</b> <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
                                                    </div>
                                                </AccordionSummary>
                                                <AccordionDetails className='AccordionDetails'>
                                                    <div className='inputdaat'>
                                                        <div>
                                                            <label htmlFor="">Destination Address</label> <br />
                                                            <input type="text" id='destinationadress' name='destinationadress' onChange={handleInputChange} defaultValue={agreementtdata.destinationaddress} />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="">Destination City</label> <br />
                                                            <input type="text" id='destinationcity' name='destinationcity' onChange={handleInputChange} defaultValue={agreementtdata.destinationcity} />
                                                        </div>

                                                        <div>
                                                            <label htmlFor="">Destination State</label> <br />
                                                            <input type="text" id='destinationstate' name='destinationstate' onChange={handleInputChange} defaultValue={agreementtdata.destinationstate} />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="">Destination Zip Code</label> <br />
                                                            <input type="text" id='destinationzipcode' name='destinationzipcode' onChange={handleInputChange} defaultValue={agreementtdata.destinationzipcode} />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="">Destination Pickup Person Name</label> <br />
                                                            <input type="text" id='Dpickup' name='Dpickup' onChange={handleInputChange} defaultValue={agreementtdata.Dpickup} />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="">Destination Pickup Person No</label> <br />
                                                            <input type="text" id='Dphonono' name='Dphono' onChange={handleInputChange} defaultValue={agreementtdata.Dphonono} />
                                                        </div>
                                                    </div>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary style={{ background: '#0c2556', color: 'white' }}>
                                                    <div className=' d-flex justify-content-between align-items-center w-100'>
                                                        <b>Shipment Information </b><FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
                                                    </div>

                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <table className='agreetable'>
                                                        <thead>
                                                            <tr>
                                                                <th>Model</th>
                                                                <th>Make</th>
                                                                <th>Model Year</th>
                                                                <th>Model Type</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {agreementtdata.vehicle?.map((car) => (
                                                                <tr key={car.id}>
                                                                    <td>{car.model}</td>
                                                                    <td>{car.make}</td>
                                                                    <td>{car.modelyear}</td>
                                                                    <td>{car.vehicletype}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>

                                                    <div className="priceagree mt-3 text-center">
                                                        <b>Price : </b> {agreementtdata.price}
                                                    </div>
                                                </AccordionDetails>

                                            </Accordion>
                                            <Accordion className='termcondtion'>
                                                <AccordionSummary style={{ background: '#0c2556', color: 'white' }}>
                                                    <div className=' d-flex justify-content-between align-items-center w-100'>
                                                        <b>Term and Condition</b> <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
                                                    </div>

                                                </AccordionSummary >
                                                <AccordionDetails>
                                                    <p className='termandcon'>
                                                        1) The carrier and driver jointly and separately are authorized to operate and transport his/her or their motor vehicle between its pickup location and the destination. While every effort will be made to confirm a driver for the estimated date and price, no guarantee of pickup or delivery date can be made. Changes may occur in both due to carrier schedules, mechanical failure, inclement weather, acts of God, among other unforeseen circumstances. HS Logistics will not be responsible for any charges or liabilities incurred due to delay of pickup or delivery. This includes but is not limited to airline tickets or rental car fees. The client will be given the carrier’s schedule at the time of dispatch. 2) The client agrees to not contract any other broker or carrier during the respective time which corresponds with their shipping option. Any client that is found working with another broker or carrier during this period, is subject to a non-refundable deposit fee. 3) Contracted carriers provide door to door transport if the truck driver can physically reach the pick-up and delivery addresses. If access to the pickup or delivery location is restricted by narrow streets, low- hanging trees or tight turns, the driver may ask that you meet the truck at a large parking lot nearby, such as a grocery store. 4) Carriers are not licensed or insured to transport any personal or household goods, however, we do understand that you may need to put some items in the vehicle. Carrier is not liable for damage caused to the vehicle from excessive or improper loading of personal items. These items must be put in the trunk and kept to a limit of 100 lbs. Any exceptions must be previously discussed and approved by HS Logistics. An additional fee may be assessed for personal items of any weight. Any misrepresentation of the personal belongings will result in a change of price and/or a dry run fee of $150 if a carrier is made to attend the scene of the pick-up and the shipment is different from expected. If a carrier is sent out and the vehicle is not ready as indicated by the shipper there will be an additional $75.00 rescheduling fee. HS Logistics must be notified, should the shipper be unavailable for pick up or delivery, the shipper must have an alternate representative take his/her place as shipper. 5) Vehicles must be tendered to the carrier in good running condition with no more than a half tank of fuel. Carrier will not be liable for damage caused by leaking fluids, freezing, exhaust systems, or antennas not tied down. Any claim for loss or damage must be noted and signed on condition report at time of delivery. 6) Trucking damage claims are covered by carriers from $100,000 up to $250,000 cargo insurance per load, and a minimum of 3/4 of a million dollars public liability and property damage. Any damage incurred to a vehicle during transport falls directly under the responsibility of the carrier and not HS Logistics. All carriers contracted will have insurance to cover damage caused by the driver or theft during transport. If damage is done, HS Logistics. will provide you with a full insurance packet for thecarrier to file a claim. All claims must be noted and signed for at time of delivery and submitted in writing within 15 days of delivery. 7) If a carrier is sent out and the vehicle is not ready as indicated by the shipper there will be an additional $75.00 rescheduling fee. HS Logistics must be notified, should the shipper be unavailable for pick up or delivery, the shipper must have an alternate representative take his/her place as shipper. If for any reason the vehicle becomes unavailable during a scheduled pick-up window, after an order has been placed, HS Logistics will not refund the deposit amount. 8) The client should under no circumstances release or receive vehicle(s) from a carrier without an inspection report (Bill of Lading/BOL) regardless of the time of day or the weather conditions. Failure to do so may result in the client’s inability to file a damage claim. Carriers insurance will only process claims for damages due to the carrier’s own negligence. Damage must be reported to HS Logistics within 24 hours of delivery. Damage must be clearly listed on the BOL and signed by the driver (no exceptions). If there is damage during transport, the client must notate those damages on the final inspection report, pay the remaining balance stated on this agreement, and then contact the carrier’s main office as well as the carrier's insurance company. Failure to notate any damage on the final inspection report releases the carrier of any liability and would result in the inability to process a damage claim. 09) A $150.00 non-operational fee will be charged for all non-running vehicles. This will be included in the final quote received from HS Logistics. If the vehicle becomes non-operational during transport, this fee will be applied to the original quote. Final quote will be provided to the customer at the time of dispatching with the carrier for the pickup of the vehicle. 10) HS Logistics agrees to provide a carrier to transport your vehicle as promptly as possible in accordance with your instructions but cannot guarantee pick-up or delivery on a specified date. A cancellation fee of $200 will be charged for orders canceled 7 days before the requested available pick- up date. HS Logistics does not agree to pay for your rental of a vehicle, nor shall it be liable for failure of mechanical or operating parts of your vehicle. Shipper warrants that he/she will pay the price quoted due HS Logistics for delivered vehicles and will not seek to charge back a credit card. This agreement and any shipment here under is subject to all terms and conditions of the carrier’s tariff and the uniform straight bill of lading, copies of which are available at the office of the carrier. 11) This agreement shall be governed by and construed in accordance with the laws of the State of California. The parties further agree that any legal action arising out of this agreement must be filed in a court of jurisdiction, and HS Logistics liability is limited to the amount of money HS Logistics broker’s fee only. The client hereby submits to the jurisdiction of such courts and waives any right to jurisdiction in any other location. I hereby agree to the transport terms provided by HS Logistics. I authorize a small down payment to be paid to HS Logistics via a credit or debit card or check by phone or mail. I further understand that any remaining balance is due on delivery and that it must be paid in full via cash, cashier’s check, and money order, to the authorized transporter.

                                                    </p>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary style={{ background: '#0c2556', color: 'white' }}>
                                                    <div className=' d-flex justify-content-between align-items-center w-100'>
                                                        <b>Acceptance</b> <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
                                                    </div>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    By selecting "I Agree" and entering my full name as a binding electronic signature I understand that an electronic signature has the same legal effect and can be enforced in the same way as a written signature. Furthermore, I hereby accept terms and conditions of service as described in the "Terms and Conditions" section below.
                                                    <div className='e-signature'>
                                                        <div className="input">
                                                            <b>Signature Pad</b>
                                                            <div style={{ border: '1px solid black', marginBottom: '1rem' }}>
                                                                <SignaturePad
                                                                    ref={signatureRef}
                                                                    className="signaturepad"
                                                                    options={{
                                                                        minWidth: 1,
                                                                        maxWidth: 1,
                                                                        penColor: 'black',
                                                                        dotSize: 0.1 // Adjust the dotSize value here
                                                                    }}
                                                                    canvasProps={{ style: { background: '#939badde' } }}
                                                                />
                                                            </div>
                                                            <div>
                                                                <button onClick={clearSignature} className='sigpadbtn'>Clear</button>
                                                                <button onClick={saveSignature} className='sigpadbtn'>Save</button>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>

                                                        <input type="checkbox" required checked={isChecked} onChange={handleCheckboxChange} /> I Agreed to the all Terms And Condition mention below
                                                    </div>
                                                </AccordionDetails>

                                            </Accordion>
                                            {isChecked && (
                                                <div className='w-100 d-flex justify-content-center'>
                                                    <button type="submit" className='agreebtn' >
                                                        Submit
                                                    </button>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                    ) : (
                        <div className='container donecontainer d-flex align-items-center justify-content-center'>
                            <div className="row  d-flex align-items-center justify-content-center">
                                <div className="col-12">
                                    <div className='agreement-done'>
                                        <FontAwesomeIcon className='agreeicon' icon={faCheckCircle} />
                                        <div className='mt-3'>
                                            <b>Agreement already Confirmed: Your commitment is acknowledged...!</b>
                                            <p>We are pleased to inform you that your agreement has been successfully processed and confirmed. Your commitment to our services is highly appreciated, and we assure you that we will fulfill our responsibilities with utmost professionalism and dedication
                                                <br /> <br /> <b>Thank you Mr {agreementtdata.fullname} for choosing our services, and we look forward to serving you with excellence.</b>
                                            </p>
                                            <button className='pdf' type='button' data-toggle="modal" data-target="#invoice" >
                                                Download Form
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )
            }

        </>

    )
}

export default Agreement




