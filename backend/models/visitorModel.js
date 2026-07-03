const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitorSchema = Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    purpose:{
        type:String,
        required:true
    },
    hostEmployee:{
         type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:String,
        enum:['pending','approved','rejected'],
        default:'pending'
    },
    photo:{
        type:String,

    }
},{timestamps:true});

module.exports =mongoose.model('Visitor',visitorSchema);