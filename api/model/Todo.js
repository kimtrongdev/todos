const mongoose=require('mongoose')
const Schema=mongoose.Schema

const items=new Schema({
    name:String,
    description:{
        type:String,
        default:'....'
    },
    status:{
        type:Boolean,
        default:false
    },
    time:{ 
        type:Date,
        default:Date.now()
    },
    priority:{ 
        type:String,
        default:"NONE"
        //
    }
},{
    timestamps:{
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
})

const STodos=new Schema({
    name:String,
    children:[items]
})



const todos=mongoose.model('todos',STodos)
module.exports=todos