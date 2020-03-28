const mongoose=require('mongoose')
const Schema=mongoose.Schema

const SUsers=new Schema({
    email:String,
    password:String,
    name:String,
    auth:String,
    token:String
})


const users=mongoose.model('users',SUsers)
module.exports=users