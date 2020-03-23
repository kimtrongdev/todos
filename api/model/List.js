const mongoose=require('mongoose')
const Schema=mongoose.Schema

const SList=new Schema({
    name:String,
},{
    timestamps:{
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
})

SList.statics=function(){
    const lists=await this.find()
    array.forEach(element => {
        
    });
}

const lists=mongoose.model('lists',SList)
module.exports=lists