var  express = require('express');
var  router = express.Router();
const auth=require('../Middlewares/auth')
const CryptoJs= require('crypto-js')
const User = require('../Models/User');
const {verifyToken,verifyAuthorization}=require('../Middlewares/verifyToken')
/* GET users listing. */

router.get('/:id',verifyAuthorization,verifyToken,async (req, res)=> {
const user = await User.findById(req.params.id)
const {password,...userPublicInfo}=user._doc
res.status(200)
console.log(userPublicInfo)
});
router.use(auth)


router.put('/:id',verifyAuthorization,async(req,res)=>{
  if(req.body.password){
    req.body.password=CryptoJs.AES.encrypt(req.body.password,`${process.env.PASSWORD_SECRET}`.toString())

  }
  try{

    const updatedUser=await User.findByIdAndUpdate(req.params.id,{
      $set:req.body
    },{new:true})
res.status(200).json(`User updated Succesfull ${updatedUser}`)
  
}


  catch(err){
    res.send(403).json('There has been an error ')
  }
})

router.put('/:id/ProfileImage',verifyAuthorization,async(req,res)=>{
  if(req.body.password){
    req.body.password=CryptoJs.AES.encrypt(req.body.password,`${process.env.PASSWORD_SECRET}`.toString())

  }
  try{

    const updatedUser=await User.findByIdAndUpdate(req.params.id,{
      $set:req.body
    },{new:true})
res.status(200).json(`User updated Succesfull ${updatedUser}`)
  
}

  catch(err){
    res.send(403).json('There has been an error ')
  }
})

module.exports = router;
