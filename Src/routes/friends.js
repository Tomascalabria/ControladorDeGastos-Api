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

router.post('/add',(verifyToken),async(req,res)=>{
    // try{
    // const user = await User.findById(req.params.id)
    //     if (user){

    //         const friend=await User.findById(req.body.friend)
    //         const {isAdmin,password,friends,...friendsInfo}=friend._doc
    //         const newFriend= user.friends.push(friendsInfo)
    //         res.status(200).json(`Friend Added corectly ${newFriend}` )
    //     }
    //     else{
    //         res.status(404).json('sorry please review the given name and try again')
    //     }
try{
    // req.headers.username
    const user = await User.findById(req.headers.id)
    console.log(user.friends)
    res.status(200).json(user.friends)

}

catch(err){
res.send(404).json('hubo un error')
}



})





module.exports = router;
