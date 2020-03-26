const mongoose=require('mongoose')
const Schema=mongoose.Schema

const SUsers=new Schema({
    email:String,
    password:String,
    name:String,
    auth:1
})



const users=mongoose.model('users',SUsers)
module.exports=users