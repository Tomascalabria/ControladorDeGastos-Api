var  express = require('express');
var  router = express.Router();
const User = require('../Models/User');
const {verifyToken,verifyAuthorization}=require('../Middlewares/verifyToken');
const {userExists} =require('../Utils/utils.js')

router.get('/:id/search',verifyAuthorization,async(req,res)=>{
  console.log(req.params.id)
    try{
      const users = await User.find({id:req.params.id},{friends:true},{sort:{username:-1}})
      console.log(`Success! Friends where found \n ${users}`)
   
   if (users.length === 0) {
    res.status(404).json({
      status: "Error",
      message: "No users found with the given username"
    });
  } else {
    res.status(200).json({
      status: "Success",
      message: `Friends found! `,
      data: users
    });
  }
}
    catch(err){
        res.status(500).json('We are sorry there was an internal server error')

    }
})

router.post('/add',async(req,res)=>{

  try { 
    const friend = await User.findById(req.body.friend);
    const user = await User.findById(req.body.id);

    if (!user || !friend) {
      throw { 
        status: 404,
        json: {
          status: "Failed",
          message: "user id or friend name not found",
          data: null
        } 
      }
    }

    if (friend.username === user.username) {
      throw {
        status: 401,
        json: {
          status: "Failed",
          message: "We are sorry but you cant add yourself as friend",
          data:null
        }
      }
    }


    if (userExists(user.friends,friend.username)) {
      throw {
        status: 401,
        json: {
          status: "Error",
          message: `Sorry, your friend has been already added`,
          data:null
        }
      }
    }

    const addToSet = {
      $addToSet:{friends:{
        friend_id:friend.id,
        friend_username:friend.username
      }}
    };

    const result = await User.findByIdAndUpdate(req.body.id, addToSet,{ upsert:true, safe:true });
    res.status(200).json({
      status: "Success",
      message: `Friend has been added correctly! `,
      data: result
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      message: `Unexpected error has occured! `,
      data: null
    });
  }
})
module.exports = router;
