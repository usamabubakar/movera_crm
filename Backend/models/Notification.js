const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notification = new Schema({
    agentName: {
        type: String,
        default:null
    },
    leadId:{
        type:String,
        default:null
    },
    status:{
        type:String,
        default:'Pending'
    }

});

const Notification = mongoose.model('Notification', notification);

module.exports = Notification;
