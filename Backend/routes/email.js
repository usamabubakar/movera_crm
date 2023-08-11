const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const nodemailer = require('nodemailer');
const Lead= require('../models/Lead')

// Import User model
const User = require('../models/User');



// Define your route for sending the email
router.post('/sendEmail', fetchuser,async(req, res) => {
  try{
  const {agentid, id, leadid, customeremail, email, password ,text ,starttime,endtime, subject  } = req.body;
  const user= await User.findById(req.user_login.id);
  const lead = await Lead.findOne({_id:leadid});
  // console.log(req.body)
//   const transporter = nodemailer.createTransport({
//     // host: 'smtp.titan.email',
//     name:'mail.hslogistics.org',
//     host:'mail.hslogistics.org',
//     port: 465,
//     secure: true,
//     auth: {
//         user: user.email,
//         pass: user.emailpassword
//     }
// });
let smtpSettings;
if (user.email.endsWith("hslogistics.org")) {
    smtpSettings = {
        name:'mail.hslogistics.org',
        host: "mail.hslogistics.org",
        port: 465,
        secure: true,
        auth: {
            user: user.email,
            pass: user.emailpassword
        }
    };
} else if (user.email.endsWith("smtransports.us")) {
    smtpSettings = {
        host: "smtp.titan.email",
        port: 465, // Replace with Titan's port
        secure: true,
        auth: {
            user: user.email,
            pass: user.emailpassword
        }
    };
} else {
    // If neither domain matches, use Gmail's SMTP settings
    smtpSettings = {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: user.email,
            pass: user.emailpassword
        }
    };
}

// Create the transporter using the selected SMTP settings
const transporter = nodemailer.createTransport(smtpSettings);
  if(user.isAdmin){
    console.log('Reached sendEmail endpoint admin ' );
  const chekagentorvendor= await User.findById(id);

if(chekagentorvendor.isvendor){
console.log("vendore meeil")

  const mailOptions = {
    from: user.email,
    to: email,
    subject: "Api Lead Instructions",
    text:`Your token: : ${chekagentorvendor.vendortoken} \n\n
    This is the Instruction for API, make a post request to "http://localhost:5000/api/vendor/leadbyvendor" and you lead must b in JSON formet and your toekn must b valid otherwise Lead will not post to this API
    \n
    <b>Lead Formet </b>
    {
      "token": "Your Token",
      "leads": [
        {
          "name": "Robert Josuson",
          "email": "robertjohnson@example.com",
          "destinationstate": "Destination haha",
          "destinationzipcode": "Destination ajajajCode",
          "shipdate": "2023-06-11",
          "phoneno": "(555) 123-4567",
          "originaddress": "555 Pine St",
          "origincity": "Origin City",
          "originstate": "Origin State",
          "originzipcode": "Origin Zip Code",
          "destinationaddress": "888 Oak St",
          "destinationcity": "Destination City",
          "howmany": 3,
          "cars": [
            {
              "make": "Chevrolet",
              "model": "Silverado",
              "typee": "Truck",
              "year": "2023"
            },
            {
              "make": "Jeep",
              "model": "Wrangler",
              "typee": "SUV",
              "year": "2022"
            },
            {
              "make": "BMW",
              "model": "X5",
              "typee": "SUV",
              "year": "2023"
            }
          ]
        },
        {
          Next Lead...
        }
      ]
    }
    `
    ,
  };
  transporter.sendMail(mailOptions, async(error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Failed to send email' });
    } else {
      console.log('Email sent: ' + info.response);
      chekagentorvendor.emailsent=true
      await chekagentorvendor.save();
      const vendordata=await User.findById(id);
      res.status(200).json({ success: true, message: 'Email sent successfully', data:vendordata});
    }
  });

}

  else if(chekagentorvendor.isAgent) {
    console.log('Reached sendEmail endpoint agent');
    const mailOptions = {
      from: user.email,
      to: email,
      subject: "Login credetionals",
      text:` Congrualations...!!! you are selected for job and join offcie tomarrow and your login credetionals are:

      Email: ${email}
      password: ${password}
      Job start time : ${starttime}
      Job End time :  ${endtime}
      `
    };
    transporter.sendMail(mailOptions,async (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to send email' });
      } else {
        console.log('Email sent: ' + info.response);
        chekagentorvendor.emailsent=true
        await chekagentorvendor.save();
      const agentdata=await User.findById(id);

        res.status(200).json({ success: true, message: 'Email sent successfully', data:agentdata});
      }
    });



  }
}

  else  {

    console.log(customeremail + "agent");
const mailOptions = {
    from: user.email,
    to: customeremail,
    subject: subject,
    text:'sm transport',
    html:text
  };

  transporter.sendMail(mailOptions,async (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Failed to send email' });
    } else {
      lead.mailcount += 1;
      await lead.save();
      console.log('Email sent: ' + info.response);
      res.status(200).json({ success: true, message: 'Email sent successfully' , data: lead});
    }

  });


    }
  // Send the email
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

module.exports = router;
