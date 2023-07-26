const express= require('express');
const router = express.Router();
const Chat= require('../models/Chat')
const Msg= require('../models/Message')
const User= require('../models/User')



router.get('/chat',async(req, res)=>{
   res.send("chatttt")
})
// Route to create a chat room between an agent and an admin
router.post('/createchat', async (req, res) => {
    const { agentId, adminId } = req.body;

    try {
      const chat = await Chat.findOne({
        members: { $all: [agentId, adminId] },
      });

      if (chat) {
        // If chat room already exists, return the existing chat room
        return res.status(200).json("already exist room");
      }

      // If chat room does not exist, create a new chat room
      const newChat = new Chat({
        members: [agentId, adminId],
      });

      const response = await newChat.save();
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });


router.get('/finduserchat/:userid',async(req, res)=>{
    console.log("fetcg")
    const userid=req.params.userid;
    console.log(typeof(userid))
   try {
    const chat = await Chat.findOne({
        members:{$in: [userid]}
    })
    res.status(200).json(chat)
   } catch (error) {
    console.log(error)
   }

})
router.get('/findchat/:firstid/:secondid',async(req, res)=>{
    const {firstid,secondid}=req.params;
    console.log(firstid, secondid)
   try {
    const chat = await Chat.findOne({
        members: { $all: [firstid, secondid] },
      });
      console.log(chat);
    res.status(200).json(chat)
   } catch (error) {
    console.log(error)
   }

})

router.post('/msg', async (req, res) => {
    const { chatid, senderid, senderType, text, receiverid } = req.body;
    console.log(req.body);

    try {
      let chat = await Chat.findOne({
        members: { $all: [senderid, receiverid] },
      });

      // If chat room not found, create a new chat room
      if (!chat) {
        const newChat = new Chat({
          members: [senderid, receiverid],
          messages: [],
        });
        chat = await newChat.save();
      }
      const sender = await User.findOne({ _id: senderid });
      const senderType = sender.isAdmin ? 'admin' : sender.isAgent ? 'agent' : null;
      // Create the message object
      const message = {
        senderType: senderType,
        text: text,
        createdAt: new Date(),
      };

      // Determine the target text array based on senderType
      const targetTextArray = senderType === 'admin' ? chat.messages.adminText : chat.messages.agentText;

      // Push the message to the appropriate text array
      targetTextArray.push(message);

      // Save the updated chat room with the new message
      await chat.save();

      res.status(200).json(chat);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });



router.get('/getmsg/:chatid', async (req, res) => {
  const { chatid } = req.params;

  try {
    const messages = await Msg.find({ chatid });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


module.exports=router;