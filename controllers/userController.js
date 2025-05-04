
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User=require("../models/User");
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  res.status(201).json({ success: true, message: "User created successfully", user });
};
exports.signin=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(401).json({
            success:false,
            message:"Invalid credentials"
        });
    }
    const token=jwt.sign({id:User._id},process.env.JWT_SECRET,{expiresIn:"1d"});
    res.json({token,user});
}