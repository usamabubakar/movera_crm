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
        subject: 'this is follow up template',
        text: ` <div style="background-color: black; color: white; width:80%  font-family: Arial, sans-serif;">
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
        <table style="border-collapse: collapse; margin-top:5px width: 100%; text-align: center; border: 1ps solid black;">
            <thead>
                <tr>
                <th style="border: 1px solid #dddddd;">Origin</th>
                <th style="border: 1px solid #dddddd;">Destination</th>
                <th style="border: 1px solid #dddddd;">shipment date</th>
                <th style="border: 1px solid #dddddd; ">Price</th>
                </tr>
            </thead>
            <tbody>
                <tr style="border: 1px solid #dddddd;">
                    <td style="border: 1px solid #dddddd;">
                        {origin},{origincity},{originstate},{originzipcode}
                    </td>
                    <td style="border: 1px solid #dddddd;">
                        {destinationcity},{destinationstate},{destinationzipcode}
                    </td>
                    <td style="border: 1px solid #dddddd;">{shipdate}</td>
                    <td style="border: 1px solid #dddddd;">200$</td>
                </tr>
            </tbody>
        </table>
        <h2>Vehicles</h2>
        <hr>
        <table style="border-collapse:collapse;  margin-top:5px width: 100%; text-align: center; border: 1ps solid black;">
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

            <div style=" padding: 10px; font-size:14px">
                <h3><b>Your Custom Quote</b></h3>
                <p>Your custom price for your shipment from {origin} to {destination} is {price}. If you have any
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
        subject: 'this is quote template',
        text: `<div style="  justify-content: center; flex-direction:column font-family: Arial, sans-serif; align-items: center;">
		<h1 style="width: 100%; text-align: center; display:block;">
		H1, usama</h1>
		<p style=" display: block; text-align: center;">Thank you for your interest in our company! Below you will find your auto transport quote details.</p>
		<div style="">
			<hr>
			<div style="display: flex; justify-content: space-between; margin-bottom: -10px; margin-top: -10px;">
				<div>
					<h3>Door to Door service</h3>
				</div>
				<div>
					<h3>$10000</h3>
				</div>
			</div>
			<hr>
			<div style="display: flex; justify-content: space-between; margin-bottom: -10px; margin-top: -10px;">
				<div>
					<h3>Total</h3>
				</div>
				<div>
					<h3>$10000</h3>
				</div>

			</div>
			<hr>
		</div>
		<button style="border-radius: 5px; border: none; cursor: pointer; padding: 15px; margin-top: 10px; background-color: rgb(23, 23, 73); color: white; font-size: 16px;
		">Get Started now!</button>
		<div style="width: 80%;">

			<h2  style="text-align: center; margin-top:10px; display:block;">Quote details</h2>
			<div>
				<b>origin:</b> {origincity},{originstate},{originzipcode} <br>
				<b>destination:</b> {destinationcity} , {destinationstate}, {destinationzipcode} <br>
				<b>ship date:</b> {shipdate} <br>
				<b>price:</b> {price} <br> <br>
				If you have any questions or would like us to match a competitor's rate please call me at (516) 656-1474.

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
        id: 3,
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
        id: 6,
        subject: 'this is a agreement template',
        text: `

      <div style="text-center">
        <h1 style="color: rgba(0, 0, 0, 0.692);">Thank You!</h1>
        <p style="color: rgba(0, 0, 0, 0.692);">
          {name},
          We have received your payment for order number <b>  </b>.
          <br>
          Please contact us at 5166561474 with any questions!
          <br>
          Sincerely,
          <br>
          5166561474
        </p>
      </div>

       `
    }
]


export default template;