const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const nodemailer = require('nodemailer');
const Lead= require('../models/Lead')

// Import User model
const User = require('../models/User');



// Define your route for sending the email
router.get('/fetchagreementleaddata', async (req, res) => {
  try {
    const { hash_id } = req.query; // Access the hash_id parameter from the query
    console.log(hash_id);

    if (hash_id.length !== 24) {
      return res.status(400).json({ error: 'Invalid hash_id' });
    }

    // Assuming you have a Lead model/schema defined in your backend
    const lead = await Lead.findOne({ _id: hash_id });
    console.log(lead);

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    // Extract the required lead data and format it
    const formattedLeads = {
      fullname: lead.fullname,
      email: lead.email,
      phoneno: lead.phoneno,
      originaddress: lead.originaddress,
      origincity: lead.origincity,
      originstate: lead.originstate,
      originzipcode: lead.originzipcode,
      destinationaddress: lead.destinationaddress,
      destinationcity: lead.destinationcity,
      destinationstate: lead.destinationstate,
      destinationzipcode: lead.destinationzipcode,
      vehicle: lead.vehicle.map((vehicle) => ({
        model: vehicle.model,
        make: vehicle.make,
        vehicletype: vehicle.vehicletype,
        modelyear: vehicle.modelyear,
      })),
      agreement: lead.agreement,
      price: lead.price,
      signature: lead.signature,
      recieveddate: lead.recieveddate,
      payment: lead.paymentstatus,
      signaturedate: lead.signaturedate,
      ipaddress: lead.ipaddress,
    };
    res.status(200).json({ message: 'Lead fetch successful', data: formattedLeads });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



  router.post('/saveagreement', async (req, res) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Rest of your code...
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    console.log('User IP address:', ipAddress);
    try {

      const {
        name,
        email,
        phoneno,
        originaddress,
        origincity,
        originstate,
        originzipcode,
        destinationaddress,
        destinationcity,
        destinationstate,
        destinationzipcode,
        signature,
        id
      } = req.body;


      const lead = await Lead.findOne({ _id: id });
    //   console.log(lead);

      if (!lead) {
        return res.status(404).json({ error: 'Lead not found' });
      }

      // Check if the data matches the existing lead data
      const isDataMatch = checkDataMatch(req.body, lead);

      if (isDataMatch) {
        console.log("data match");
        res.status(200).json({ message: 'Agreement saved successfully' });
      } else {
        // If the data does not match, update the lead data and save the agreement
        lead.fullname = name;
        lead.email = email;
        lead.phoneno = phoneno;
        lead.origincity = origincity;
        lead.originaddress = originaddress;
        lead.originstate = originstate;
        lead.originzipcode = originzipcode;
        lead.destinationaddress = destinationaddress;
        lead.destinationcity = destinationcity;
        lead.destinationstate = destinationstate;
        lead.destinationzipcode = destinationzipcode;
        lead.agreement=true;
        lead.signature=signature;
        lead.ipaddress=ipAddress;
        lead.signaturedate = formattedDate;
        await lead.save();

        res.status(200).json({ message: 'Agreement saved successfully after updating lead data' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


// Function to check if the data matches the lead data

const checkDataMatch = (data, lead) => {
    // Compare the values of the properties
    // Return true if the data matches, false otherwise
    return (
      data.fullname === lead.fullname &&
      data.email === lead.email &&
      data.phoneno === lead.phoneno &&
      data.originaddress=== lead.originaddress &&
      data.origincity ===lead.origincity &&
      data.originstate === lead.originstate &&
      data.originzipcode === lead.originzipcode &&
      data.destinationaddress === lead.destinationaddress &&
      data.destinationcity === lead.destinationcity &&
      data.destinationstate === lead.destinationstate &&
      data.destinationzipcode === lead.destinationzipcode
    );
  };

module.exports = router;


