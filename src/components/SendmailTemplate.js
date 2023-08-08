// import React from 'react'
// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// export default function SendmailTemplate(props) {

// const chektemplate=()=>{
//     console.log(templateno)
// }

//   return (
//     <div>


//     </div>
//   )
// }

const template = [
    {
        id: 1,
        subject: ' Follow-up Email ',
        text: ` <div style="background-color: black; color: white; width:80%  font-family:Arial, sans-serif;">
        <div style="padding: 10px; margin: 10px; background-color: rgb(226, 225, 225); color: black;">
            <h2>Sorry we missed you!</h2>
            <p>Hi {name}, <br> <br> We tried to contact you today to follow up on your requested quote; sorry we
                missed you! Your custom
                quote is below. Please feel free to contact us with any questions!</p>
        </div>
        <div style=" background-color: #202022;" >
        <div class="details " style="background-color: #3c3c3d; font-size: 14px; padding:10px">
        <h2>Details</h2>
        <hr>
        <b>Origin:</b> {origincity},{originstate},{originzipcode} <br>
        <b>Destination:</b> {destinationcity} , {destinationstate}, {destinationzipcode} <br>
        <b>Ship date:</b> {shipdate} <br>
        <b>Total price:</b> {price} <br>
        <b>Deposite:</b> {deposit} <br> <br>
        <h2 style="color:white">Vehicles</h2>
        <hr>
        <div style="width:!00%">
        <table style="border-collapse:collapse; color:white; margin-top:5px width: 100%; text-align: center; border: 1ps solid black;">
            <thead>
                <tr>
                <th style="border: 1px solid #dddddd;">Make</th>
                <th style="border: 1px solid #dddddd;">Model</th>
                <th style="border: 1px solid #dddddd;">Model year</th>
                <th style="border: 1px solid #dddddd; ">Model type</th>
                </tr>
            </thead>
            <tbody>
               {carrows}
            </tbody>
        </table>
        </div>
        <br> <br>
    </div>
            <div style=" padding: 10px; font-size:14px">
                <h3><b>Your Custom Quote</b></h3>
                <p>Your custom price for your shipment from {origincity},{originstate},{originzipcode}  to {destinationcity} , {destinationstate}, {destinationzipcode} is {price}$. If you have any
                    questions or would like to book your shipment via phone, please feel free to call us at (516)
                    656-1474.</p>

                <p>You may also book your shipment online via the button below:</p>
                <div style="width: 100%; display: flex; justify-content: center; cursor: pointer;">
                    <button style="padding: 10px; background: rgb(18, 18, 85); color: white; border: none;">Book
                        Now</button>
                </div>

                <p>Please feel free to contact us with any questions.</p>

                <p>Sincerely,</p>
                <p>{companyname}</p>
                <p>{companyemail}</p>
                <p>{companyphonono}</p>

                <p>You are receiving this email because you requested a custom quote to ship your vehicle.</p>
                <p>No longer interested? No problem, <a href="#">click here</a> and you won't hear from us again.
                </p>
            </div>
        </div>
    </div>

    `

    },
    {
        id: 2,
        subject: 'New Quote Email',
        text: `<div style="justify-content: center; flex-direction:column font-family: Arial, sans-serif; align-items: center;">
		<h2 style="width: 100%; text-align: center; display:block;">
		H1, usama</h2>
		<p style=" display: block; text-align: center;">Thank you for your interest in our company! Below you will find your auto transport quote details.</p>


			<div style=" border:1px solid black; display: flex; justify-content:space-between; margin-bottom: 10px; ">
				<div style="padding:5px ">
					<h3>Door to Door service</h3>
				</div>
				<div style="padding:5px">
					<h3>{price}$</h3>
				</div>
			</div>

			<div style="border:1px solid black;  display: flex; justify-content:space-between; margin-bottom: 10px; margin-top:10px;">
				<div style="padding:5px">
					<h3>Total</h3>
				</div>
				<div style="padding:5px">
					<h3>{price}$</h3>
				</div>

			</div>

		<button style="border-radius: 5px; border: none; cursor: pointer; padding: 15px; margin-top: 10px; background-color: rgb(23, 23, 73); color: white; font-size: 16px;
		">Get Started now!</button>
		<div style="width: 100%;">

			<h2  style="text-align: center; margin-top:10px; display:block;">Quote details</h2>
			<div>
            <b>Origin:</b> {origincity},{originstate},{originzipcode} <br>
            <b>Destination:</b> {destinationcity} , {destinationstate}, {destinationzipcode} <br>
            <b>Ship date:</b> {shipdate} <br>
            <b>Total price:</b> {price} <br>
            <b>Deposite:</b> {deposit} <br> <br>
            <b>Vehicles</b> <br>
            <div>
            <table style="border-collapse:collapse; margin-top:5px; width: 100%; text-align: center; border: 1ps solid black;">
            <thead>
                <tr>
                <th style="border: 1px solid #dddddd;">Make</th>
                <th style="border: 1px solid #dddddd;">Model</th>
                <th style="border: 1px solid #dddddd;">Model year</th>
                <th style="border: 1px solid #dddddd; ">Model type</th>
                </tr>
            </thead>
            <tbody>
               {carrows}
            </tbody>
        </table>

            </div>
            <br> <br>
				If you have any questions or would like us to match a competitor's rate please call me at 5166561474.

Regards, <br>
<br>
{companyname} <br>
{companyemail} <br>
{companyphonono}
			</div>
		</div>
	</div>
        `
    },
    {
        id: 8,
        subject: 'this is quote template',
        text: `<h1>Hi {name}</h1>
        Thank you for your interest in our company! Below you will find your auto transport   details.
        Door to Door Service price $12
        Details

         {modelyear}
          {make}
           {model}

            Origin: {origincity}, {originstate} {originzipcode}
            Destination: {destinationcity}, {destinationstate} {destinationzipcode}
            Available Date: {shipdate}
            Carrier Type:  opn
            Total : 12$
            If you have any questions or would like us to match a competitor's  fee  kindly contact us 5166561474.
            Regards,
            {email}
            {Hs Logistic company}
            Direct:  5166561474

        `
    },
    {
        id: 3,
        subject: 'Order Confirmation',
        text: `
        <div style="width: 100%; display: flex; justify-content: center;  align-items: center;">

    </div>
    <div>
        <h2 style="width: 100%; text-align: center; display:block;">
            Thank You</h2>
    </div>
<div>
    Hi, {name}
    <p>Thank you for placing your order with {companyname} </p>
</div> <br>
    <div style="width: 100%;">
        <hr>


			<div style=" border:1px solid black; display: flex; justify-content:space-between; margin-bottom: 10px; ">
				<div style="padding:5px ">
					<h4>Door to Door service</h4>
				</div>
				<div style="padding:5px" class="position:relative; right:1px;">
					<h4>{price}$</h4>
				</div>
			</div>

			<div style="border:1px solid black;  display: flex; justify-content: space-between; margin-bottom: 10px; margin-top:10px;">
				<div style="padding:5px">
					<h4>Total</h4>
				</div>
				<div style="padding:5px">
					<h4>{price}$</h4>
				</div>

			</div>


        <hr>
    </div>
    <div style="width: 100%; text-align: center;">
        <h2>Order Details</h2>
    </div>
    <div style="width: 100%;">

        <div>
            <b>Origin:</b> {origincity},{originstate},{originzipcode} <br>
            <b>Destination:</b> {destinationcity} , {destinationstate}, {destinationzipcode} <br>
            <b>Ship date:</b> {shipdate} <br>
            <b>Total price:</b> {price} <br>
            <b>Deposite:</b> {deposit} <br> <br>
            <b>Vehicles</b> <br>
            <table style="border-collapse:collapse; margin-top:5px width:100% text-align: center; border: 1ps solid black;">
            <thead>
                <tr>
                <th style="border: 1px solid #dddddd;">Make</th>
                <th style="border: 1px solid #dddddd;">Model</th>
                <th style="border: 1px solid #dddddd;">Model year</th>
                <th style="border: 1px solid #dddddd; ">Model type</th>
                </tr>
            </thead>
            <tbody>
               {carrows}
            </tbody>
        </table> <br> <br>
           <div style="width:100%">
           if you have any questions please feel free to call us!
           </div>
Sincerely, <br>
<br>
{companyname}<br>
{companyemail} <br>
{companyphonono}
        </div>
    </div>
       `
    },
    {
        id: 5,
        subject: 'Your Order Has Been Dispatched',
        text: `


        <div style="text-align: start; ">
            <h4>Hi, {name}</h4>
            <p>
                We are happy to inform you that your shipment from {origincity}, {originstate} {originzipcode} to {destinationcity}, {destinationstate} {destinationzipcode} has been assigned to a truck. You will
                be contacted shortly with an estimated pickup and delivery time. <br> <br>
                Please feel free to call us with any questions! <br> <br>

                Sincerely, <br>
                {companyname} <br>
                {companyphonono}
            </p>


    </div>

       `
    },
    {
        id: 6,
        subject:"We have recieved your payment",
        text:`
    <div>
        <h2 style="width: 100%; text-align: center; display:block;">
            Thank You</h2>
    </div>

    <div>
        Hi, {name}
        <p>We have received your payment  <br>
            Please contact us at {companyphonono} with any questions! </p>
    </div> <br>
    Sincerely, <br>
    <br>
    {companyname} <br>
    {companyemail} <br>
    {companyphonono}
                </div>`
    },
    {
        id: 4,
        subject:"Agreement for your order",
        text:`<div style="width: 100%; display: flex; justify-content: center;  align-items: center;">
    </div>


    <div>
        Hi, {name}
        <p>kindly click on this link and fill the agreement form Thank you. <br>
        Link: <a href="http://www.crmsmtransports.site/customeragreement?hash_id={leadid}">http://www.crmsmtransports.site/customeragreement?hash_id={leadid}</a> <br><br>
            Please contact us at {companyphonono} with any questions! </p>
    </div> <br>
    Sincerely, <br>
    <br>
    {companyname} <br>
    {companyemail} <br>
    {companyphonono}
                </div>`
    },
    {
        id:0,
        subject:'selct template',
        text:`no template selected`
    }
]



export default template;