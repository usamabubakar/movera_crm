const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Becomeadmin = require('../models/Becomeadmin')
const Lead = require("../models/Lead")
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser');
require('dotenv').config({ path: '../config/.env' });
// hasing password salt
const { isAfter, isBefore, set } = require('date-fns');

const upload=require('./multerconfig');

// jwt secret key
const jwt_Secret_key = process.env.SECRET_KEY;
const admin_secret_key = process.env.BECOME_A_ADMIN_SECRET_KEY




// Signup user as a admin or agent

router.post('/signup', [
  body('name').isLength({ min: 3 }).withMessage('minimum length is 3'),
  body('password').notEmpty().withMessage('Password is required')
    .isLength({ min: 3 }).withMessage('Password must be at least 3 characters'),
  body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
  body('isAdmin').isBoolean().withMessage("tell me this is a Admin or Agent"),

], async (req, res) => {
  const validation_result = validationResult(req);
  if (!validation_result.isEmpty()) {
    return res.status(400).json({ validation_result: validation_result.array() });
  }


  // if everything ok then we create user
  try {
    // check the email already exist
    const email_uniqueness_validation = await User.findOne({ email: req.body.email })
    if (email_uniqueness_validation) {
      return res.status(400).json({ message: "Email already exist" })
    }

    var salt = await bcrypt.genSaltSync(10);
    const securepassword = await bcrypt.hash(req.body.password, salt);
    const createuser = new User({
      name: req.body.name,
      email: req.body.email,
      password: securepassword,
      isAdmin: req.body.isAdmin
    })

    const user_created_successfully = await createuser.save();
    return res.status(202).json({ message: 'user created successfull', user: user_created_successfully })

  } catch (error) {
    return res.status(500).json({ message: 'internal server error' });
  }

})

//  code validation for become a admin

router.post('/secretadminkey', (req, res) => {
  const key = req.body.key;



  try {

      const enteredKey = parseInt(req.body.key);
      const secretKey = parseInt(admin_secret_key);
      if (enteredKey === secretKey) {
          console.log("secret key success")
          res.status(200).json({ message: "admin key validated successfully" });
      } else {
          console.log("secret key wrong")
          res.status(401).json({ message: "unauthorized admin try to signup in Become an admin section" });
      }

  } catch (error) {
    res.status(500).json({ message: "internal error issue" });
  }
})

//  end of section


//  code for become a admin signup

router.post('/adminsignup', [
  body('name').isLength({ min: 3 }).withMessage('minimum length is 3'),
  body('password').notEmpty().withMessage('Password is required')
    .isLength({ min: 3 }).withMessage('Password must be at least 3 characters'),
  body('email').isEmail().withMessage('Invalid email').normalizeEmail()


],upload.single('img'), async (req, res) => {

  // const validation_result = validationResult(req);
  // console.log(validation_result)
  // if (!validation_result.isEmpty()) {
  //   return res.status(400).json({ validation_result: validation_result.array() });
  // }
  // console.log(validation_result)
  // if everything ok then we create admin
  try {

    const email_uniqueness_validation = await User.findOne({ email: req.body.email })
    if (email_uniqueness_validation) {
      return res.status(400).json({ message: "Email already exist" })
    }

    else {
      var salt = await bcrypt.genSaltSync(10);
      const securepassword = await bcrypt.hash(req.body.password, salt);
      console.log(securepassword)
      const createuser = new User({
        name: req.body.name,
        email: req.body.email,
        password: securepassword,
        isAdmin: true,
        img: req.file.filename
      })

      const user_created_successfully = await createuser.save();
      return res.status(202).json({ message: 'admin created successfull', user: user_created_successfully })
    }

  } catch (error) {
    console.error('Error saving user:', error);
    return res.status(500).json({ message: 'internal server error' });
  }

})

router.post('/emailexist', async (req, res) => {

  const { email } = req.body;


  // if everything ok then we create admin
  try {

    const email_uniqueness_validation = await User.findOne({ email: email })
    if (email_uniqueness_validation) {
      console.log("emial already exist")
      return res.status(409).json({ message: "Email already exist", data: email_uniqueness_validation })
    }

    else {
      console.log("email not eixst")
      return res.status(202).json({ message: 'Valid' })
    }

  } catch (error) {
    console.log("email error", error)
    return res.status(500).json({ message: 'internal server error' });
  }

})


// end of section


// Login user as a admin or agent

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  const validation_result = validationResult(req);

  if (!validation_result.isEmpty()) {
    return res.status(400).json({ validation_result: validation_result.array() });
  }

  try {
    const { email, password } = req.body;
    console.log(email, password);
    const becomeAdmin = await Becomeadmin.findOne({ name: 'yes' });
    if (!becomeAdmin) {
      console.log("Admin access is not allowed");
      return res.status(403).json({ message: 'users not found at this time' });
    }
    const user_login = await User.findOne({ email: email });
    if (!user_login) {
      console.log("User not found");
      return res.status(404).json({ message: 'User not found' });
    }

    if (user_login.isAdmin) {
      const isMatch = await bcrypt.compare(password, user_login.password);
      if (isMatch) {
        user_login.loggedIn = true;
        await user_login.save();

        const payload = {
          user: {
            id: user_login.id,
            name: user_login.name,
            loggedIn: user_login.loggedIn,
            isadmin:user_login.isAdmin
          }
        };
        const token = jwt.sign(payload, jwt_Secret_key);

        const userData = {
          id: user_login.id,
          name: user_login.name,
          email: user_login.email,
          isAdmin: user_login.isAdmin,
          isAgent: user_login.isAgent,
          img:user_login.img,
          emailpassword:user_login.emailpassword
        };
        console.log("Server-side id:", user_login.id); // Log the id value before sending it to the client

        return res.status(200).json({ message: 'Admin login', token: token, userdata: userData });
      } else {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
    } else if (user_login.isAgent) {
      // const currentTime = new Date();
      const startTimeStr = user_login.starttime;
      const endTimeStr = user_login.endtime;
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();



const currentTimeMinutes = currentHour * 60 + currentMinute;

console.log("Current Time (Minutes):", currentTimeMinutes);
      const [startHour, startMinute] = startTimeStr.split(':').map(Number);
      const [endHour, endMinute] = endTimeStr.split(':').map(Number);
      const startTimeMinutes = startHour * 60 + startMinute;
      const endTimeMinutes = endHour * 60 + endMinute;

      // console.log("Current Time (Minutes):", currentTime24);
      console.log("Start Time (Minutes):", startTimeMinutes);
      console.log("End Time (Minutes):", endTimeMinutes);

      // console.log(endTime + " uu " + startTime + " usu " + currentTime);

      // if (currentTimeMinutes >= startTimeMinutes && currentTimeMinutes <= endTimeMinutes) {

        console.log("time metach  User login is within the specified time range")
        if (password == user_login.password) {
          user_login.loggedIn = true;
          await user_login.save();

          const payload = {
            user: {
              id: user_login.id,
              name: user_login.name,
              loggedIn: user_login.loggedIn,
              isadmin:user_login.isAdmin
            }
          };
          const token = jwt.sign(payload, jwt_Secret_key);

          const userData = {
            id: user_login.id,
            name: user_login.name,
            email: user_login.email,
            isAdmin: user_login.isAdmin,
            isAgent: user_login.isAgent
          };
          return res.status(200).json({ message: 'Agent login', token: token, userdata: userData });
        } else {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
      // } else {
      //   console.log("time not metach")

      //   // User login not allowed outside the specified time range
      //   return res.status(403).json({ message: 'Agent Login not allowed at the current time' });
      // }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});





// getuser informaiont using toke
router.get('/getuser', fetchuser, async (req, res) => {
  console.log("bhai get user me ho")
  try {
    const userId = req.user_login.id;
    console.log(userId, "id")
    const user = await User.findOne({ _id: userId }).select('-password');
    console.log(user, "i am user");
    // res.send(user)
    return res.status(200).json({ message: 'user loaded', user:user });

  } catch (error) {

    console.log("bhai error a gya get user me ")
    console.log(error)
    res.send("internal error")
  }
})

// router.get('/user', fetchuser, (req, res) => {

//   User.findById(req.user.id)
//       .select('-password')
//       .then(user => res.json(user))
// });

// logout user
router.post('/logout', fetchuser, async (req, res) => {
  try {
    const userid = req.user_login.id
    console.log(req.user_login.name)


    const logoutuser = await User.findOneAndUpdate(
      { _id: userid },
      { loggedIn: false },
      { new: true }
    );
    console.log(logoutuser)
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }



});



router.get('/singleuser',fetchuser,async (req,res)=>{

  try {
    const data = await User.findById(req.user_login.id).select('-password');

    res.status(200).json({message:'fetching suucess', data:data})
  } catch (error) {
    console.log(error)
  }
})





module.exports = router;