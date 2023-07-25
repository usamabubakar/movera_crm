const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser');
require('dotenv').config({ path: '../config/.env' });
const User = require('../models/User');


// Route for adding admin or agent
router.get('/fetchagentdata', async (req, res) => {
  try {
    const users = await User.find({ isAgent: true });
    const formattedUsers = users.map(user => {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        starttime: user.starttime,
        endtime: user.endtime
      };
    });

    // console.log(formattedUsers);
    res.status(202).json({ message: "Agent fetch successful", data: formattedUsers });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Invalid token' });
  }
});


router.get('/fetchvendordata', async (req, res) => {
  console.log("get data vendor daa");
  try {
    const users = await User.find({ isvendor: true });

    const formattedUsers = users.map(user => {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        starttime: user.starttime,
        endtime: user.endtime
      };
    });

    res.status(202).json({ message: "vendor fetch successful", data: formattedUsers });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});


module.exports = router;
