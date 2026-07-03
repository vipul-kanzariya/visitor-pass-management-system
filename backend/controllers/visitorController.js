const Visitor = require("../models/visitorModel");

exports.getVisitors = async(req,res) =>{
    try {
    const visitor = await Visitor.find({}).sort({ createdAt: -1 });
    res.status(200).json(visitor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
exports.createVisitor = async(req,res) =>{
    const {name,email,phone,purpose,hostEmployee} = req.body;
    try{
        const visitor = await Visitor.create({name,email,phone,purpose,hostEmployee});
        res.status(201).json(visitor);

    }catch(err){
        res.status(400).json({ error: err.message });
    }
}