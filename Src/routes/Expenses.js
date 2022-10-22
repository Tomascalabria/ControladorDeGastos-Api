var express = require('express');
const { isValidObjectId } = require('mongoose');
const Expense = require('../Models/Expense');

var router = express.Router();

/* GET All products. */
router.get('/',async(req, res)=> {
 try{

     const user=req.headers.username
     const colection= Expense.find({creator:user}, function(err, documents) {
         res.send(documents);
       });
 }
catch(err){
    res.status(500).json('We are sorry there was an internal server error')
}
}
)

router.delete('/delete/:_id',async(req,res)=>{
    try{
        const expense= await Expense.findById(req.params._id)
    if(req.headers.username==expense.creator||req.headers.admin==true){
            await expense.delete() 
      
res.status(201).json(`Item deleted succesfully ${deletedItem.title}`)
    }
    else{
        res.status(401).json('Sorry but you are not able to perform this action')
    }
    }
    catch(err){
        res.send(err)
    }
})


router.post('/create',async(req,res)=>{
    const newExpense=new Expense({
        title:req.body.title,
        type:req.body.type,
        category:req.body.category,
        amount:req.body.amount,
        creator:req.body.creator
        
    })  

    try{
        
        let savedExpense= await newExpense.save()
        res.status(201).json('Gasto Creado! \n'  + savedExpense)
        console.log(savedExpense)
    }
    catch(err){
        res.status(402).json('There has been an error')
    }
})


module.exports = router;