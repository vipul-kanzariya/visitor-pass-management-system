const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
exports.registerUser = async(req,res)=>{
    const {name,email,password,role} = req.body;
  
  try{
    const exists =await User.findOne({email});

      if(exists){
        return res.status(400).json("Email alerdy exists");
    }
      const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);

    const user = await User.create({name,email,password:hash,role});
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
});
res.status(201).json({
    user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    },
    token
});
  }catch(error){
    res.status(500).json(error.message);
  }

}

exports.loginUser = async(req,res) =>{
    const {email,password} =req.body;
   try{
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json("Email not found")
    }
    const checkPassword =await bcrypt.compare(password,user.password);
    if(!checkPassword){
        return res.status(400).json("Invalid password")
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
    res.status(200).json({
    user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    },
    token
});
   }catch(error){
    res.status(500).json(error.message);

   }

}