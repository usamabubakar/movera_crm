const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser');
require('dotenv').config({ path: '../config/.env' });
const jwt_Secret_key = process.env.SECRET_KEY;

// Import User model
const User = require('../models/User');

// JWT secret key

// Route for adding admin or agent
router.post('/addvendor', [
    body('name').isLength({ min: 3 }).withMessage('Minimum length is 3'),
    body('password').notEmpty().withMessage('Password is required')
        .isLength({ min: 3 }).withMessage('Password must be at least 3 characters'),
    body('email').isEmail().withMessage('Invalid email').normalizeEmail()
], async (req, res) => {
    console.log("vendor add")
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

        const { name, email, password} = req.body;


        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            isvendor: true,
        });

        // Save the user to the database
        const user = await newUser.save();
        const payload = {
          user: {
              id: user.id,
              name: user.name
          }
      };
        const token = jwt.sign(payload, jwt_Secret_key);
        const updatedVendor = await User.findOneAndUpdate(
          { _id: user._id },
          {  vendortoken: token },
          { new: true }
        );
        return res.status(202).json({ message: 'vendor created successfully', user });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});


// delete agent

router.delete('/deletevendor/:id', async (req, res) => {
    try {
      const agentId = req.params.id;
   const user= await User.findByIdAndDelete(agentId);
   res.status(200).json({ message: 'User deleted succesfully', data:user.name , vendorid:user.id});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  router.post('/updatevendor', async (req, res) => {
    try {

      const { id, name, email, password } = req.body;
        console.log(id, name)
      // Assuming you have a User model defined
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.findByIdAndUpdate(id, {
        name,
        email,
        password:hashedPassword,

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

module.exports = router;

