const jwt=require('jsonwebtoken')
const {User_Token,Admin_Token}=require('./../config/config')
const userauth=(req,res,next)=>{
      const token= req.body.authuser
      if(token==undefined){
      res.status(200).send({message:'Access Denied',auth:false})
      }
      else{
      try{
 const verify=  jwt.verify(token,User_Token)
 req.user=verify
 next()
} 
catch(err){
    res.status(200).send({message:'Invalid user token',auth:false})
          }
      }
     
}


const Adminauth=(req,res,next)=>{
    const token= req.body.authadmin
    if(token==undefined)
  {  res.status(200).send({message:'Access Denied',auth:false,error:true})}
  else{  
  try{
const verify=  jwt.verify(token,Admin_Token)

req.user=verify
next()
    }
    catch(err){
res.status(200).send({message:'Access denied invalid-token',auth:false,error:true})
    }}
}
module.exports={userauth,Adminauth}