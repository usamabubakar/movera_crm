const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isAgent: {
        type: Boolean,
        default: false,
    },
    isvendor: {
        type: Boolean,
        default: false,
    },
    starttime: {
        type: String,
        default: null
    },
    endtime: {
        type: String,
        default: null
    },
    loggedIn: {
        type: Boolean,
        default: false
      },
    registerdate:
    {
        type: Date,
        default: Date.now
    },
    vendortoken: {
        type:String,
        defult:null
    },
    emailsent:{
        type: Boolean,
        defult:false
    },
    img:{
        type: String,
        default:'none'
    },
    phoneno:{
        type:String,
        defult:'none'
    },
    emailpassword:{
        type:String,
        required:false,
        default:'none'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
