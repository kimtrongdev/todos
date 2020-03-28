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
    user_id:String,
    children:[items]
})

STodos.statics.getAll=async function (_id){
    const list=await todos.find({user_id:_id})
    return {todos:list}
}

const todos=mongoose.model('todos',STodos)
module.exports=todos