const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passSchema = Schema({
    visitor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Visitor',
        required: true
    },
    qrCode:{
        type:String,
        required: true

    },
    issuedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    validUntil:{
        type:Date
    },
    status:{
        type:String,
       enum: ['active','expired','revoked'],
        default: 'active'
    }
},{timestamps:true});
module.exports = mongoose.model('Pass',passSchema);