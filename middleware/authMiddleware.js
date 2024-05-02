
// sign (bet create el token)
// verify (betfok el token 3ashan abeg el id ) => decoded 
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const Roles ={
    Admin:"admin",
    User:"user"
}

const auth =(accessRole)=>{
     return async (req,res,next)=>{
          const headerToken = req.headers.authorization
          console.log(headerToken)  
          ////// need to look , server down 
         if(!headerToken || headerToken==null || headerToken ==undefined ){
          res.json({message:"invalid token"})
         }else{
              const token = headerToken.split(" ")[1]
              const decoded = jwt.verify(token,process.env.tokenSignautre)
              console.log(decoded)
              const user = await userModel.findById(decoded.id).select('name email role')
              console.log('user:',user)
              if(!user){
                  res.json({message:"invalid user token"})
              }else{
                  console.log(accessRole)
                  if(accessRole.includes(user.role)){
                    req.user=user
                    next()
                  }else{
                    res.json({message:"not authorized user"})
                  }
                  
              }
         }
    }
}

module.exports = {
    auth,
    Roles
};
