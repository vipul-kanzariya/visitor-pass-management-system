const Pass = require("../models/passModel");
const Visitor = require("../models/visitorModel");
const qrCode = require('qrcode');
exports.createPass = async(req,res) =>{
    try{
        const {visitorId} = req.body;
        const visitor = await Visitor.findById(visitorId);
        if(!visitor){
            return res.status(400).json('Visitor not found');
        }
        const validUntil = new Date();
        validUntil.setDate(validUntil.getDate()+1);
        const pass =await Pass.create({ visitor: visitor._id, qrCode: "pending", issuedBy: req.user._id, validUntil })
        const qrImage= await qrCode.toDataURL(pass._id.toString());
        pass.qrCode = qrImage;
        await pass.save();
        res.status(201).json(pass);
        
    }catch(err){
        res.status(400).json({ error: err.message });
    }
}