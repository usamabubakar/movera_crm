const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser');
const Lead = require('../models/Lead');
require('dotenv').config({ path: '../config/.env' });
const jwt_Secret_key = process.env.SECRET_KEY;


// Import User model
const User = require('../models/User');

// JWT secret key

// Route for adding admin or agent
router.post('/leadbyvendor', async (req, res) => {
    try {
      const {token , leads} = req.body;
      console.log("leads by insomia")
    //   console.log(leads)
      const decoded = jwt.verify(token, jwt_Secret_key);
      const vendorId=decoded.user.id
      const vendor = await User.findById(vendorId);
      if(!vendor){
        console.log("Vendor not found");

        res.status(401).json({ message: 'Vendor not found' });
        return;
      }
      else{
        const createdLeads = [];
      for (const leadData of leads) {
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
          shipdate,
          howmany,
          cars
        } = leadData;

        const newLead = new Lead({
          owner: '64789c719b88f895f8504c4e',
          fullname: name,
          email: email,
          phoneno: phoneno,
          originaddress: originaddress,
          origincity: origincity,
          originstate: originstate,
          originzipcode: originzipcode,
          destinationaddress: destinationaddress,
          destinationcity: destinationcity,
          destinationstate: destinationstate,
          destinationzipcode: destinationzipcode,
          shipdate: shipdate,
          howmany: howmany,
          vehicle: [],
          approvelStatus:'Approved',
          addBy:'Vendor',

        });

        for (const car of cars) {
          const { make, model, typee, year } = car;
          newLead.vehicle.push({
            make: make,
            model: model,
            vehicletype: typee,
            modelyear: year
          });
        }

        const createdLead = await newLead.save();
        createdLeads.push(createdLead);
      }

      res.status(200).json({ message: "Leads added successfully", data: createdLeads });
      console.log("Leads added successfully");
      }
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid token' });
    }
  });


// delete agent


module.exports = router;

