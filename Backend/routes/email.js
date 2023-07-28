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
console.log(req.body)
  const user= await User.findById(req.user_login.id);
  const lead = await Lead.findOne({_id:leadid});

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'moveralogistic@gmail.com',
        pass: 'cgkwnrrfputocydk'
    }
});
  if(user.isAdmin){
    console.log('Reached sendEmail endpoint admin ' );
  const chekagentorvendor= await User.findById(id);

if(chekagentorvendor.isvendor){
console.log("vendore meeil")

  const mailOptions = {
    from: 'moveralogistic@gmail.com',
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
  chekagentorvendor.emailsent=true
  await chekagentorvendor.save();
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Failed to send email' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ success: true, message: 'Email sent successfully'});
    }
  });

}

  else if(chekagentorvendor.isAgent) {
    console.log('Reached sendEmail endpoint agent');
    const mailOptions = {
      from: 'moveralogistic@gmail.com',
      to: email,
      subject: "Login credetionals",
      text:` Congrualations...!!! you are selected for job and join offcie tomarrow and your login credetionals are:

      Email: ${email}
      password: ${password}
      Job start time : ${starttime}
      Job End time :  ${endtime}
      `
    };
    chekagentorvendor.emailsent=true
    await chekagentorvendor.save();
    transporter.sendMail(mailOptions,async (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to send email' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ success: true, message: 'Email sent successfully'});
      }


    });



  }
}

  else  {
    console.log(customeremail + "agent");
const mailOptions = {
    from: 'moveralogistic@gmail.com',
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
      res.status(200).json({ success: true, message: 'Email sent successfully'});
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
