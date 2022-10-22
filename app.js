const express= require('express')
const app=express()
require('dotenv').config();
const {promises:fs, write}=require('fs')
const body_parser =require('body-parser')
const users=require('./Src/routes/users')
const expenses=require('./Src/routes/Expenses')
const mongoose =require('mongoose')
const cors = require('cors')


app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(cors({origin:true}))

mongoose.connect(`${process.env.MONGO_URI}`)
.then((data)=>{
    console.log('Connection to DB was succesfull!')})
.catch((err)=>{console.log(err+'/n'+ process.env.MONGO_URI)})


app.get('/',(req,res)=>{
    res.send('holaaaa')
})
app.use('/users',(users))
app.use('/expenses',expenses)




const port = 8080 || process.env.port
app.listen(port,()=>{
console.log('Api is on')
})