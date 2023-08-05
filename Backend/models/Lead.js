const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
const User = require('./User');

// create schema

const LeadSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    fullname: {
        type: String,
        required: true
   },

    email: {
        type: String,
        required: true
    },
    phoneno: {
        type: String,
        required: true
    },
    recieveddate: {
        type: Date,
        default: Date.now
    },
    originaddress: {
        type: String,
        required: true
    },
    origincity: {
        type: String,
        required: true
    },
    originstate: {
        type: String,
        required: true
    },
    origincountry: {
        type: String,
        required: false
    },
    originzipcode: {
        type: String,
        required: true
    },
    destinationaddress: {
        type: String,
        required: true
    },
    destinationcity: {
        type: String,
        required: true
    },
    destinationstate: {
        type: String,
        required: true
    },
    destinationzipcode: {
        type: String,
        required: true
    },
    destinationcountry: {
        type: String,
        required: false
    },
    shipdate:{
        type:String,
        required:true
    },
    howmany:{
        type:String,
        required:false,
    },
    vehicle: [{

        model: {
            type: String,
            required: false
        },
        make: {
            type: String,
            required: false
        },
        vehicletype: {
            type: String,
            required: false
        },
        modelyear: {
            type: String,
            required: false
        },
        isoperable: {
            type: String,
            required: false,
            default:'no'
        }
    }],
    isAssigned:{
        type:Boolean,
        default:false
    },
    isAssignedName:{
        type:String,
        default:'Not Assigned'
    },
    mailcount: {
        type: Number,
        required: false,
        default: 0
    },
    status: {
        type: String,
        required: false,
        default: 'lead'
    },
    approvelStatus:{
        type: String,
    default: 'Pending',
    },
    addBy:{
        type: String,
        required: true
    },
    agreement :{
        type: Boolean,
        default:false
    },
    signature: {
        type: String, // or Buffer if storing image binary data
        default: null
      },
      ipaddress:{
        type: String,
        default:null
      },
    price:{
        type: String,
        default:'0'
    },
    paymentstatus:{
        type: String,
        defult:'not decided'
    },
    deliverstatus:{
        type:String,
        default:null
    },
    signaturedate:{
        type:String,
        defult:'No date'
    },
    Opickup:{
        type:String,
        default:'not updated'
    },
    Ophonono:{
        type:String,
        default:'not updated'
    },
    Dpickup:{
        type:String,
        default:'not updated'
    },
    Dphonono:{
        type:String,
        default:'not updated'
    },
    intialdeposite:{
        type:String,
        default:'0'
    }



});


// LeadSchema.plugin(AutoIncrement, {inc_field: 'leadid'});

module.exports = Lead = mongoose.model('lead', LeadSchema);
