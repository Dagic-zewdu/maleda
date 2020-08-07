const route = require('express').Router()
const {userauth,Adminauth} =require('./auth')
 
route.post('/api/checkuser',userauth,async (req,res)=>{
    res.status(200).send({
        message:'Access granted',auth:true,user:req.user
    })
})
route.post('/api/checkadmin',Adminauth,async (req,res)=>{
    res.status(200).send({
        message:'Access granted',auth:true,user:req.user
    })
})
module.exports=route