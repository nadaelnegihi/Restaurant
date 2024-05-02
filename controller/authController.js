const userModel = require("../models/userModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//signup
const signUp = async (req,res)=>{
    try{
        const { name, password,email} = req.body

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email address already exists" });
        }

        const hashpassword=await bcrypt.hash(password,5)

        console.log('req.body',name,password,email)
    
        const newUser = new userModel({
            name,
            password : hashpassword,
            email})
    
        const addedUser =  await newUser.save()
        
        res.status(200).json({message:"User added",addedUser})
    }catch(error){
        console.log('Error',error)
        res.status(500).json({ message: "Internal Server Error" });
    }
  
    
}

//login 
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
            const user = await userModel.findOne({ email });
            if(user)
            {
               const matchPassword = await bcrypt.compare(password,user.password)
               if(matchPassword){
                  const token = jwt.sign({id:user._id,isLoggedin:true} ,
                  process.env.tokenSignautre , {expiresIn : '24h'})
                   res.status(200).json({
                  message:"login is successfull",token
                   })
               }else{
                  res.json({
                    message:"invalid password"
                  })
               }
            }else{
               res.json({
                message:"invalid credintaial"
               })
            }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



module.exports = {
    signUp , login
}