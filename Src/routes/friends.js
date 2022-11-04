var  express = require('express');
var  router = express.Router();
const User = require('../Models/User');
const {verifyToken,verifyAuthorization}=require('../Middlewares/verifyToken');


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
  const friend= await User.findOne({username:req.body.friend})


  const user=await User.findById(req.body.id)
  if(friend&&friend!=req.headers.username){
   
    user.friends.find((x)=>{
    
      switch(friend.username){
        case user.username:{
          res.status(401).json({
            status: "Failed",
            message: "We are sorry but you cant add yourself as friend",
            data:null
        
        })
        }
        case x.friend_username:{
          res.status(401).json({
            status: "Error",
            message: `Sorry, your friend has been already added`,
            data: []
          })
        }
        default:{

          User.findByIdAndUpdate(req.body.id,{
          
            $addToSet:{friends:{
              friend_id:friend.id,
              friend_username:friend.username
            }}
              },{upsert:true,safe:true})
                .then(result=>{
                  res.status(200).json({
                    status: "Success",
                    message: `Friend has been added correctly! `,
                    data: result
                      })
                })
                
              .catch((err)=>{
                res.status(500).json({
                  status: "Failed",
                  message: "Database Error",
                  data: err
                 })
                })
            }
             }  }
             )}
            

     

        
     
  

   else{
  res.status(404).json({
      status: "Failed",
      message: "We are sorry but the username was not found",
      data:null
  })
  console.log(`There has been an failed attempt of adding a new user. \nUser: ${req.headers.username} `)

}
  
})




module.exports = router;
