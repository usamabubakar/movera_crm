const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Notification=require('../models/Notification');
const Lead = require('../models/Lead');
const Becomeadmin = require('../models/Becomeadmin')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser');





router.post('/addlead', fetchuser, async (req, res) => {
  try {
    const { name, id } = req.user_login;
    const data = req.body;
    const { cars } = req.body;
    const user = await User.findById(id);
    console.log(cars)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isAgent) {
      const newLead = new Lead({
        owner: id,
        fullname: req.body.name,
        email: req.body.email,
        phoneno: req.body.phoneno,
        originaddress: req.body.originaddress,
        origincity: req.body.origincity,
        originstate: req.body.originstate,
        originzipcode: req.body.originzipcode,
        destinationaddress: req.body.destinationaddress,
        destinationcity: req.body.destinationcity,
        destinationstate: req.body.destinationstate,
        destinationzipcode: req.body.destinationzipcode,
        shipdate: req.body.shipdate,
        howmany: req.body.howmany,
        vehicle: [],
        addBy:'Agent',
        isAssignedName:name
      });

      for (const car of cars) {
        newLead.vehicle.push({
          model: car.model,
          make: car.make,
          vehicletype: car.vehicletype,
          modelyear: car.modelyear,
        });
      }

      const newNotification = new Notification({
        agentName: name,
        leadId: newLead.id,
        status: 'Pending',
      });


      await newLead.save();
      await newNotification.save();



      res.status(200).json({ message: "Lead added successfully", data: newLead });
    } else {
      const newLead = new Lead({
        owner: id,
        fullname: req.body.name,
        email: req.body.email,
        phoneno: req.body.phoneno,
        originaddress: req.body.originaddress,
        origincity: req.body.origincity,
        originstate: req.body.originstate,
        originzipcode: req.body.originzipcode,
        destinationaddress: req.body.destinationaddress,
        destinationcity: req.body.destinationcity,
        destinationstate: req.body.destinationstate,
        destinationzipcode: req.body.destinationzipcode,
        shipdate: req.body.shipdate,
        howmany: req.body.howmany,
        vehicle: [],
        approvelStatus:'Approved',
        addBy:'Admin'
      });

      for (const car of cars) {
        newLead.vehicle.push({
          model: car.model,
          make: car.make,
          vehicletype: car.vehicletype,
          modelyear: car.modelyear,
        });
      }

      await newLead.save();

      res.status(200).json({ message: "Lead added successfully", data: newLead });
    }

    console.log("Lead added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/fetchlead', async (req, res) => {
  console.log(req.query);
  try {
    const userid = req.query.id;
    const pagename = req.query.page;
    console.log(pagename, userid);
    const user = await User.findById(userid);
    let formattedLeads = [];

    if (user.isAdmin) {
      const leads = await Lead.find();
      formattedLeads = leads.map(lead => ({
        id: lead.id,
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
        shipdate: lead.shipdate,
        howmany: lead.howmany,
        vehicle: lead.vehicle.map(vehicle => ({
          model: vehicle.model,
          make: vehicle.make,
          vehicletype: vehicle.vehicletype,
          modelyear: vehicle.modelyear
        })),
        recieveddate: lead.recieveddate,
        isAssignedName: lead.isAssignedName,
        addBy: lead.addBy,
        paymentstatus:lead.paymentstatus
      }));
    } else if (pagename === 'agreement' && user.isAgent) {
      console.log("agreement");
      const leads = await Lead.find({ owner: userid, agreement: true });
      formattedLeads = leads.map(lead => ({
        id: lead.id,
        fullname: lead.fullname,
        email: lead.email,
        phoneno: lead.phoneno,
        agreement: lead.agreement,
        signature: lead.signature,
        vehicle: lead.vehicle.map(vehicle => ({
          model: vehicle.model,
          make: vehicle.make,
          vehicletype: vehicle.vehicletype,
          modelyear: vehicle.modelyear
        })),

      }));
      console.log(formattedLeads);
    } else if (user.isAgent) {
      const leads = await Lead.find({ owner: userid, status: pagename });
      formattedLeads = leads.map(lead => ({
        id: lead.id,
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
        shipdate: lead.shipdate,
        howmany: lead.howmany,
        vehicle: lead.vehicle.map(vehicle => ({
          model: vehicle.model,
          make: vehicle.make,
          vehicletype: vehicle.vehicletype,
          modelyear: vehicle.modelyear
        })),
        recieveddate: lead.recieveddate,
        isAssignedName: lead.isAssignedName,
        mailcount: lead.mailcount,
        addBy: lead.addBy,
        approvelStatus: lead.approvelStatus,
        paymentstatus:lead.paymentstatus,
        price:lead.price,
        intialdeposite:lead.intialdeposite,
        Dphonono:lead.Dphonono,
        Dpickup:lead.Dpickup,
        Ophonono:lead.Ophonono,
        Opickup:lead.Opickup
      }));
    }

    const onlineAdmin= await User.find({isAdmin:true, loggedIn:true});
    const onlineadmin = onlineAdmin.map(admin => {
      return {
        id: admin.id,
        name: admin.name
      };
    });

    res.status(200).json({ message: "Lead fetch successful", data: formattedLeads, onlineadmin:onlineadmin });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});



// Route to fetch pending leads
router.get('/pendinglead', fetchuser, async (req, res) => {
    const id = req.user_login.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      try {
        const leads = await Lead.find({ $or: [{ approvelStatus: 'Not Approved' }, { approvelStatus: 'Pending' }] });
        const pendingLeads = leads.map(lead => {
          return {
            id: lead.id,
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
            shipdate: lead.shipdate,
            howmany: lead.howmany,
            vehicle: lead.vehicle.map(vehicle => ({
              model: vehicle.model,
              make: vehicle.make,
              vehicletype: vehicle.vehicletype,
              modelyear: vehicle.modelyear
            })),
            recieveddate: lead.recieveddate,
            isAssignedName: lead.isAssignedName,
            addBy: lead.addBy,
            approvelStatus:lead.approvelStatus
          };
        });

        res.status(200).json({ data: pendingLeads });
        // console.log(pendingLeads);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  });


  router.put('/updatelead/:leadId', fetchuser, async (req, res) => {
    try {
      const { name } = req.user_login;
      const leadId = req.params.leadId;
      const data = req.body;
      const { cars } = req.body;
      console.log(data)

      const user = await User.findById(req.user_login.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const lead = await Lead.findById(leadId);
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }

      lead.fullname = data.name;
      lead.email = data.email;
      lead.phoneno = data.phoneno;
      lead.originaddress = data.originaddress;
      lead.origincity = data.origincity;
      lead.originstate = data.originstate;
      lead.originzipcode = data.originzipcode;
      lead.destinationaddress = data.destinationaddress;
      lead.destinationcity = data.destinationcity;
      lead.destinationstate = data.destinationstate;
      lead.destinationzipcode = data.destinationzipcode;
      lead.shipdate = data.shipdate;
      lead.howmany = data.howmany;
      if ('price' in data) {
        lead.price = data.price;
      }
      if ('inprice' in data) {
        lead.intialdeposite = data.inprice;
      }
      if ('pickupname' in data) {
        lead.Opickup = data.pickupname;
      }
      if ('pickupno' in data) {
        lead.Ophonono = data.pickupno;
      }
      if ('dropoffname' in data) {
        lead.Dpickup = data.dropoffname;
      }
      if ('dropoffno' in data) {
        lead.Dphonono = data.dropoffno;
      }
      if ('price' in data) {
        lead.price = data.price;
      }
      // lead.intialdeposite=data.

      // Update existing cars
      if (cars && Array.isArray(cars)) {
        lead.vehicle = cars.map((car) => ({
          model: car.model,
          make: car.make,
          vehicletype: car.vehicletype,
          modelyear: car.modelyear,
        }));
      }

      // Add new cars if available
      if (data.newCars && Array.isArray(data.newCars)) {
        lead.vehicle.push(
          ...data.newCars.map((newCar) => ({
            model: newCar.model,
            make: newCar.make,
            vehicletype: newCar.vehicletype,
            modelyear: newCar.modelyear,
          }))
        );
      }

      await lead.save();

      res.status(200).json({ message: "Lead updated successfully", data: lead });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });



  router.delete('/deleteLead', async (req, res) => {
    try {
      // const { leadId, selectedLeadIds } = req.body;
      console.log("pending leads" + req.body)
      const leadId=req.body.leadid;
      const selectedleadids=req.body.selectedleadIds
      console.log(leadId, selectedleadids)
      if (leadId) {
        const deletedLead = await Lead.findByIdAndDelete(leadId);
        if (!deletedLead) {
          return res.status(404).json({ message: 'Lead not found' });
        }
        console.log(deletedLead)
        res.status(200).json({ message: 'Lead deleted successfully' ,leadid: deletedLead.id});
      } else if (Array.isArray(selectedleadids) && selectedleadids.length > 0) {
        const deletedLeads = await Lead.deleteMany({ _id: { $in: selectedleadids } });

      console.log(deletedLeads)
        res.status(200).json({ message: 'Leads deleted successfully' , leadid: selectedleadids});
      } else {
        return res.status(400).json({ message: 'Invalid request body' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

router.delete('/deletependingLead', async (req, res) => {
  console.log(req.body)
  console.log("pendinlg lead det")
    // try {
    //     const leadId = req.params.id;
    //     const user = await Lead.findByIdAndDelete(leadId);
    //     res.status(200).json({ message: 'User deleted succesfully', leadid:user.id } );
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'Internal server error' });
    // }
});

//   assign lead to agent
router.post('/assignlead', async (req, res) => {
  try {
    const data = req.body;
    const leadIds = Array.isArray(data.selectedleadId) ? data.selectedleadId : [data.leadId];
    console.log(leadIds)
    const agentId = data.agentid;
    const user = await User.findOne({_id: agentId});
    const agentName = user.name;

    const assignedLeads = await Lead.updateMany(
      {_id: {$in: leadIds}},
      {
        owner: agentId,
        isAssigned: true,
        isAssignedName: agentName
      },
      {new: true}
    );

    if (!assignedLeads) {
      return res.status(404).json({message: 'Leads not found'});
    }

    console.log(assignedLeads)
    res.status(200).json({message: 'Leads assigned successfully'});
    console.log("Leads assigned successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal server error'});
  }
});

// Update Status
router.post('/updatestatus', async (req, res) => {
    try {
        const data = req.body;
        const leadid = data.leadid;
        const agentid = data.agentid;
        const status=data.status

        console.log(status + " " +  "uam chkin lea stus")

        const user = await User.findOne({ _id: agentid });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userid = user.id;
        const leaddata = await Lead.findOne({ _id: leadid });

        if (!leaddata) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        leaddata.status = status;
        await leaddata.save();

        console.log(leaddata)

        res.status(200).json({ message: 'Lead status updated successfully', data:leaddata });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/payment',fetchuser ,async (req, res) => {
  try {
      const data = req.body;
      const leadid = data.leadId;
      console.log(data)
      console.log(leadid)
      console.log(req.user_login.id)
      // console.log(req.user_login.name + " " +  "uam chkin lea stus")

      const user = await User.findOne({ _id: req.user_login.id });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      const userid = user.id;
      const leaddata = await Lead.findOne({ _id: leadid });
// console.log(leaddata)
      if (!leaddata) {
          return res.status(404).json({ message: 'Lead not found' });
      }

      leaddata.paymentstatus = data.price;
      await leaddata.save();

      // console.log(leaddata)

      res.status(200).json({ message: 'Lead status updated successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});




// PUT /api/lead/approvalstatus/:leadId/status
router.put('/approvalstatus/:leadId/status', fetchuser, async (req, res) => {
    try {
      const { leadId } = req.params;
      const { isApproved } = req.body;
console.log(isApproved)
      // Find the lead by leadId
      const lead = await Lead.findById(leadId);

      if (!lead) {
        return res.status(404).json({ message: 'Lead not found' });
      }

      // Update the lead status
      lead.approvelStatus = isApproved;
      await lead.save();

      res.status(200).json({ message: 'Lead status updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });


  router.get('/notification', async (req, res) => {
    console.log("notifiction ")
    try {
      // Fetch notifications from the database
      const notifications = await Notification.find();

      // Return the notifications as a JSON response
      console.log(notifications);
      res.status(200).json({ message: 'noti fetch successfully' ,data:notifications});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.delete('/deletenoti/:id',fetchuser, async (req, res) => {
    try {
        const leadId = req.params.id;
        console.log(leadId)
        const results = await Notification.findOneAndDelete({ leadId: leadId });
        console.log(results)
        res.status(200).json({ message: 'noti deleted succesfully', data:results } );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



router.get('/agentactivity', async (req, res) => {
  try {
    const { id, page } = req.query;
    console.log(id);
    const user= await User.find({_id:id})
    console.log(page);
    const leads = await Lead.find({ owner: id, status: page });
    const lead = await Lead.find({ owner: id });

    const totalleads = {
      name: user[0].name,
      leadtotal: lead.length
    };


    if (lead.length === 0) {
      // Return empty data if no leads found
      return res.status(200).json({ message: "No leads found", data: [], totalleads: totalleads });
    }


    const formattedLeads = leads.map(lead => {
      // Formatting the lead data
      return {
        id: lead.id,
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
        shipdate: lead.shipdate,
        howmany: lead.howmany,
        vehicle: lead.vehicle.map(vehicle => ({
          model: vehicle.model,
          make: vehicle.make,
          vehicletype: vehicle.vehicletype,
          modelyear: vehicle.modelyear
        })),
        recieveddate: lead.recieveddate,
        isAssignedName: lead.isAssignedName,
        mailcount: lead.mailcount,
        addBy: lead.addBy,
        approvelStatus: lead.approvelStatus,
        status: lead.status,
        signature:lead.signature,
        price:lead.price
      };
    });

    res.status(200).json({ message: "Lead fetch successful", data: formattedLeads, totalleads: totalleads });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router