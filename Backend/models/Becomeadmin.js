const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const BecomeAdmin=new Schema({
    name:{
        type:String,
        default:'yes'
    }
})

module.exports=mongoose.model('Becomeadmin',BecomeAdmin)