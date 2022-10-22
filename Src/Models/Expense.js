const mongoose=require('mongoose')

const ExpenseSchema=new mongoose.Schema({
    title:{type:String, required:true},
    img:{type:String},
    description:{type:String, required:false},
    type:{type:String}, required:false,
    category:{type:String, required:false},
    amount:{type:Number,required:true},
    creator:{type:String,required:true},
    participants:{type:Object,default:[],required:false}
    
},
{
    timestamps:true
}
)

module.exports=mongoose.model('Expense',ExpenseSchema)