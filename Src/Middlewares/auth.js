const router= require('express').Router()
const User=require('../Models/User')
const CryptoJs= require('crypto-js')
const jwt=require('jsonwebtoken')

//Register      

router.post('/register',async (req,res)=>{
    if(req.body.username===''||req.body.password==''||req.body.email===''){
        res.status(404).json('All inputs must be completed')
    }
    if(User.find({username:req.body.username})==req.body.username||User.find({email:req.body.email})===req.body.email){
      res.send(401).json('There are already users registered with that data')
    }

    else{

  const newUser=new User(
    
    {
        username:req.body.username,
        email:req.body.email,
        password:  CryptoJs.AES.encrypt(req.body.password,`${process.env.PASSWORD_SECRET}`)
        
    }
  )
 
  try{
    let savedUser=await newUser.save()
    res.status(201).json({success:'Usuario Creado!',usuario:savedUser.username})
    console.log(`Usuario creado ${savedUser.username}`)
  }
  catch(err){
    res.status(500).json('Ha habido un error:'+err)
  }
  }})

  //Login
router.post('/login',async(req,res)=>{
  try{
      const user=await User.findOne({username:req.body.username})
      const accesToken=jwt.sign({
          id:user._id,  
          admin:user.isAdmin
      },process.env.JWT_SECRET,{expiresIn:'5d'})
      !user&&res.status(401).json('"Please review your credentials and enter again"')
      const hashedPassword= CryptoJs.AES.decrypt(user.password,process.env.PASSWORD_SECRET)
      const unHashedPassword=hashedPassword.toString(CryptoJs.enc.Utf8)
      let {password,...publicData}=user._doc

      unHashedPassword!==req.body.password?res.status(401).json('"Please review your credentials and enter again"')

      :

            res.status(200).json({userInfo:publicData,token:accesToken})


  }
  catch(err){
      res.status(500).json('Internal error')
      console.log('Hubo un error')
  }
})

module.exports=router;