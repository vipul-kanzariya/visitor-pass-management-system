const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkSchema = Schema({
    pass:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Pass',
        required:true
    },
    visitor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Visitor',
        required:true
    },
    checkIn:{
        type:Date,
        default: Date.now,
    },
    checkOut:{
        type:Date
    },
    scannedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps: true});

module.exports = mongoose.model('Check',checkSchema)