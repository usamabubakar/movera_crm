const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser');
require('dotenv').config({ path: '../config/.env' });
const User = require('../models/User');
const Lead = require('../models/Lead');




// Route for adding admin or agent
router.get('/dashborddata', async (req, res) => {
  try {

    const leads = await Lead.find();
    const agent= await User.find({isAgent:true});
    const vendor= await User.find({isvendor:true});
    const admin= await User.find({isAdmin:true});
    const onlineAgent= await User.find({isAgent:true, loggedIn:true});
    const onlineAdmin= await User.find({isAdmin:true, loggedIn:true});

    const onlineAgentCount=onlineAgent.length;
    const agentCount = agent.length;
    const leadCount = leads.length;
    const vendorCount=vendor.length;
    const adminCount=admin.length;
    const payment = await Lead.find({
      paymentstatus: { $in: ["paid", "pending"], $ne: null },
      deliverstatus: { $ne: null }
    });
    const leeads = await Lead.find({});
    const totalPrice = leeads.reduce((sum, lead) => sum + Number(lead.price), 0);
    console.log(totalPrice);



    const onlineagentName = onlineAgent.map(agent => {
      return {
        id: agent.id,
        name: agent.name
      };
    });
    const onlineadmin = onlineAdmin.map(admin => {
      return {
        id: admin.id,
        name: admin.name
      };
    });

    const userdata=agent.map(user=>{

        return {
            name:user.name
        }
    })

const allData={
    agentcount:agentCount,
    leadcount:leadCount,
    vendorcount:vendorCount,
    admincount:adminCount,
    onlineadmin:onlineadmin,
    totalprice:totalPrice

}

    console.log("reposme send");
    res.status(202).json({ message: "Agent fetch successful", onlineagent: onlineagentName, onlineadmin:onlineadmin, data:allData , payment:payment, totalprice: totalPrice});
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});





module.exports = router;
