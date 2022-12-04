var express = require('express');
const Expense = require('../Models/Expense');
const User=require('../Models/User')
var router = express.Router();


/* GET All products. */
router.get('/',async(req, res)=> {
 try{

     const user=req.headers.username
     const colection= Expense.find({
        $or: [
          {
            creator:user
          },
          {
            participants:user
          }
        ]}, (err, documents)=> {
         res.send(documents);
         
       });
       
 }
catch(err){
    throw {
        status: 401,
        json: {
          status: "Error",
          message: `Sorry,there has been an internal server error`,
          data:null
        }
      }   
}
}
)

router.delete('/delete/:id',async(req,res)=>{
    // I should lookup the user in DB in order to validate it against the expense.

    try{
        const expense= await Expense.findById(req.params.id)
    if(req.headers.username==expense.creator||req.headers.admin==true){
          const deletedItem=  await expense.delete((error,response)=>{
            if (error){
                throw {
                    status: 401,
                    json: {
                      status: "Error",
                      message: `You are not able to perform this task.`,
                      data:null
                    }
                }}
                else{
                    res.status(200).json({
                        status: "Success",
                        message: `Expense has deleted correctly! `,
                        data: expense.title
                    })
                }
            }


          )}
    }
 
        
      
    
    catch(err){
        res.send(err)
    }
}
)


router.post('/create',async(req,res)=>{
    const expenseAmount=(req.body.amount/(req.body.participants.length+[req.body.creator].length)).toFixed()

 
    const newExpense=new Expense({
        title:req.body.title,
        type:req.body.type,
        category:req.body.category,
        amount: expenseAmount,
        creator:req.body.creator,
        participants:req.body.participants
        
    })  
    
    try{
        
        let savedExpense= await newExpense.save((err,response)=>{
            if(err){
                console.log(err)
            }
            
            res.status(200).json({
                status: 200,
                message: `Expense has been added correctly! `,
                data: savedExpense
            });
            req.body.participants.map((item)=>{
                console.log('Friend: '+ item)
            })
            console.log('Friend: '+ req.body.creator)
            console.log((req.body.amount/(req.body.participants.length+[req.body.creator].length)))
        })
      
        
    
}
    catch(err){
        throw {
            status: 401,
            json: {
              status: "Error",
              message: `Sorry, there has been an internal server error`,
              data:null
            }
          }
        
    }
})


module.exports = router;