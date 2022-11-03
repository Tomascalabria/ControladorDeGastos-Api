var  express = require('express');
var  router = express.Router();
const User = require('../Models/User');
const {verifyToken,verifyAuthorization}=require('../Middlewares/verifyToken')


router.get('/:id/all',verifyAuthorization,async(req,res)=>{
    try{
   const user = await User.findById(req.params.id)
   res.send(user.friends)
    }
    catch(err){
        res.status(500).json('We are sorry there was an internal server error')

    }
})

router.post('/add',async(req,res)=>{
  try{ 
    const user = await User.findOne({},{id:req.body.id})
if(user){
      const friend= await User.findOne({},{username:req.body.friend})
      res.status(200).json(`Friend Added corectly ${friend}` )
}
else{
  res.status(401).json('Please review the username you entered')

}
  
  }
  catch(err){
    res.status(401).json('Sorry there has been an internal server error')
  }




})




module.exports = router;
