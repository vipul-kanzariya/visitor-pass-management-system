const Check = require('../models/checkLogModel');
const Pass = require("../models/passModel");

exports.checkIn =  async(req,res) =>{
    try{
    const {passId} =  req.body;
    const pass = await Pass.findById(passId).populate('visitor');
    if(!pass){
        return res.status(400).json('Invalid pass');
    }
    if(pass.status !== 'active'){
        return res.status(400).json({msg:"Pass is not active"});
    }
    if(pass.validUntil < new Date()){
        return res.status(400).json({msg:"Pass has expired"})
    }
    const checkLog =await Check.create({
        pass:pass._id,
        visitor:pass.visitor._id,
        scannedBy:req.user._id
    })
    res.status(201).json(checkLog);
    }catch(err){
        res.status(400).json({ error: err.message });
    }
}

exports.checkOut = async(req,res)=>{
   try{
     const {id} =  req.params;
    const checkLog = await Check.findById(id);
    if(!checkLog){
        return res.status(400).json('Id not exits')
    }
  if(checkLog.checkOut){
    return res.status(400).json({ msg: 'Already checked out' });
}
    checkLog.checkOut = new Date();
    await checkLog.save();
        res.status(200).json(checkLog);
   }catch(err){
        res.status(400).json({ error: err.message });

   }

}