const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser');
require('dotenv').config({ path: '../config/.env' });

// Import User model
const User = require('../models/User');

// JWT secret key

// Route for adding admin or agent

router.get('/', fetchuser, async (req, res) => {
  try {
    const users = await User.find({ isAgent: true });

    const formattedUsers = users.map(user => {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        starttime: user.starttime,
        endtime: user.endtime,
        emailsent:user.emailsent,
        phoneno:user.phoneno,
        emailpassword: user.emailpassword
      };
    });

    // console.log(formattedUsers);
    res.status(202).json({ message: "Agent fetch successful", data: formattedUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
});

router.post('/addagent', [
    body('name').isLength({ min: 3 }).withMessage('Minimum length is 3'),
    body('password').notEmpty().withMessage('Password is required')
        .isLength({ min: 3 }).withMessage('Password must be at least 3 characters'),
    body('email').isEmail().withMessage('Invalid email').normalizeEmail()
], async (req, res) => {
    const validation_result = validationResult(req);
    if (!validation_result.isEmpty()) {
        return res.status(400).json({ validation_result: validation_result.array() });
    }

    try {
        // Check if the email already exists
        const email_uniqueness_validation = await User.findOne({ email: req.body.email });
        if (email_uniqueness_validation) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const { name, email, password, isAgent, starttime, endtime,phoneno,emailpassword } = req.body;
        // Create a new user object
        const newUser = new User({
            name: name,
            email: email,
            password: password,
            isAgent: true,
            starttime:starttime,
            endtime:endtime,
            emailsent:false,
            phoneno:phoneno,
            emailpassword:emailpassword
        });


        const user = await newUser.save();
        console.log(user)
        return res.status(202).json({ message: 'User created successfully', user });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});


// delete agent

router.delete('/deleteAgent/:id', fetchuser, async (req, res) => {
  try {
    const admin_name = req.user_login.name;
    const admin_id = req.user_login.id;
    const agentId = req.params.id;
    console.log(agentId, admin_name, admin_id);

    // Delete the agent
    const deletedAgent = await User.findByIdAndDelete(agentId);
    if (!deletedAgent) {
      return res.status(500).json({ message: 'agent not found' });
    }
    console.log(deletedAgent)

    // Update associated leads
    const updatedLeads = await Lead.updateMany(
      { owner: agentId },
      {
        owner: admin_id,
        isAssigned: false,
        isAssignedName: 'Not Assigned',
        approvelStatus: 'Approved',
      }
    );

    console.log(updatedLeads);

    // Send success response
    return res.status(200).json({
      message: 'Agent and associated leads deleted successfully',
      data: agentId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



  router.post('/updateagent', async (req, res) => {
    try {

      const { id, name, email, password, starttime, endtime,phoneno , emailpassword } = req.body;
      console.log(req.body)

      // Assuming you have a User model defined
      // const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.findByIdAndUpdate(id, {
        name,
        email,
        password:password,
        starttime,
        endtime,
        phoneno,
        emailpassword
      }, { new: true });

      if (!user) {
        return res.status(404).json({ message: 'Agent not found' });
      }

      res.status(200).json({ message: 'Agent updated successfully', data: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  router.post('/updateagentapppass', async (req, res) => {
    try {
      const { empas, id} = req.body;
      console.log(req.body , "app pass route" )

      // Assuming you have a User model defined
      // const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.findByIdAndUpdate(id, {
        emailpassword: empas
      }, { new: true });

      if (!user) {
        return res.status(404).json({ message: 'Agent not found' });
      }else{
        console.log("email updated")
      }

      res.status(200).json({ message: 'Agent updated successfully', data: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;

