const router=require('express').Router()
const News=require('./../DB/UserSchema')
const comment=require('./../DB/CommentSchema')
const bcrypt =require('bcryptjs')
const {User_Token,Admin_Token} =require('./../config/config')
const jwt= require('jsonwebtoken')
const {readall,create,readone,update,Delete} =require('./../CrudMethods/crud')
const {Adminauth}=require('./../auth/auth')
/**creating get route for user */

router.post('/api/login',async (req,res)=>{
    const user= await News.find({phone : req.body.phone})
        if(user.length==0)
        {
            res.status(200).send({login:false,message:'Unknown phone'})
        }
        else
     {   
        const compare=  await bcrypt.compare(req.body.password,user[0].password)
   
        if(compare){
        if(user[0].type=='admin'){
            const admintoken=jwt.sign({id:user[0]._id},Admin_Token)
            res.status(200).send({login:true,authadmin:admintoken})    
        }
        else{
const token=jwt.sign({id:user[0]._id},User_Token)
res.status(200).send({login:true,authuser:token}) 
        }
    }
    else{
        res.status(200).send({login:false,message:"Invalid password"})
    }}
    
})

/** creating post route for user */
router.post('/api/signup',async (req,res)=>{
    try{
        const phone= await News.find({phone : req.body.phone})
        if(phone.length==0){
            const email= await News.find({email : req.body.email})
           if(email.length==0){
               
                const salt=await bcrypt.genSalt(10)
                const hashpassword= await bcrypt.hash(req.body.password,salt)
             var USER
                if(req.body.email!=''){   
                 USER={
                    name : req.body.name,
                    email : req.body.email,
                    phone : req.body.phone,
                    password : hashpassword
                }}
                else{
                     USER={
                        name : req.body.name,
                        phone : req.body.phone,
                        password : hashpassword
                    }   
                }
                const creater= await create(News,USER)
                if(!creater.error){
                      if(creater.data.type=='admin'){
                        const admintoken=jwt.sign({id:creater.data._id},
                            Admin_Token)
  res.status(200).send({login:true,data:creater,authadmin:admintoken})
                      }
                      else{
                        const token=jwt.sign({id:creater.data._id},User_Token)
   res.status(200).send({login:true,data:creater,authuser:token})
                      }
                  }
                  else{
                      res.status(200).send({login:false,data:creater})
                  }
            }
            else{
                res.status(200).send(
                    {login: false,message:'You have registered with this email before'})
            }
        }
        else{
            res.status(200).send(
                {login: false,message:'You have registered with this phone before'})   
        }
   }
      catch(err){
          res.status(200).send({login:false,data:err})
      }
})
/**creating adding admin with their name */
router.post('/api/addadmin',Adminauth,async (req,res)=>{
    try{
        const phone= await News.find({phone : req.body.phone})
        if(phone.length==0){
            const email= await News.find({email : req.body.email})
           if(email.length==0){
               
                const salt=await bcrypt.genSalt(10)
                const hashpassword= await bcrypt.hash(req.body.password,salt)
             var USER
                if(req.body.email!=''){   
                 USER={
                    name : req.body.name,
                    email : req.body.email,
                    phone : req.body.phone,
                    password : hashpassword,
                    type : 'admin'
                }}
                else{
                     USER={
                        name : req.body.name,
                        phone : req.body.phone,
                        password : hashpassword,
                        type : 'admin'
                    }   
                }
                const creater= await create(News,USER)
                if(!creater.error){
                      if(creater.data.type=='admin'){
                        const admintoken=jwt.sign({id:creater.data._id},
                            Admin_Token)
  res.status(200).send({login:true,data:creater,authadmin:admintoken})
                      }
                      else{
                        const token=jwt.sign({id:creater.data._id},User_Token)
   res.status(200).send({login:true,data:creater,authuser:token})
                      }
                  }
                  else{
                      res.status(200).send({login:false,data:creater})
                  }
            }
            else{
                res.status(200).send(
                    {login: false,message:'You have registered with this email before'})
            }
        }
        else{
            res.status(200).send(
                {login: false,message:'You have registered with this phone before'})   
        }
   }
      catch(err){
          res.status(200).send({login:false,data:err})
      }
})
/** */
router.get('/api/user',async (req,res)=>{
    try{
  const name= await News.find({},('_id','name'))
 res.send(name) 
    }
    catch(err){
res.send({error:true})
    }
})
router.post('/api/getusers',Adminauth,async (req,res)=>{
    try{
    const getall=await News.find({},('_id email name phone type'))
    res.send(getall)
}
catch(err){
    res.send({error:true})
}
})
/** creating put route for user */
router.put('/api/user',async (req,res)=>{
    const salt=await bcrypt.genSalt(10)
    const hashpassword= await bcrypt.hash(req.body.password,salt)
    const USER={
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        password : hashpassword
    }
    const modify= await update(News,req.body._id,USER)
    if(!modify.error&&modify.updated){
        res.status(200).send(modify)
    }
    else{
        res.status(400).send(modify)
    }
})
/**creting Delete route for user */
router.post('/api/deluser',Adminauth,async (req,res)=>{
    try{
    const remover= await Delete(News,req.body._id)
    if(!remover.error&&remover.deleted){
        const commentsremover=comment.deleteMany({user_id:req.body._id},(err)=>{
            if(err)
            throw new error(err)
        })
        res.status(200).send({deleted:true,error:false})
    }
    else{
        res.status(200).send({deleted:false,error:true})
    }}
    catch(err){
        res.send({deleted:false,error:true,message:err})
    }
})
module.exports=router