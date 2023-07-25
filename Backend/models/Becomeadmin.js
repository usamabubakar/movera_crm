const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const BecomeAdmin=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin: {
        type: Boolean,
        default: true,
      }
})

module.exports=mongoose.model('Becomeadmin',BecomeAdmin)