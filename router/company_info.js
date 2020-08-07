const Info=require('./../DB/companyinfo')
const router= require('express').Router()
const {Adminauth} =require('./../auth/auth')
router.get('/api/companyinfo',async (req,res)=>{
    const info=await Info.find({})
    const company=info[0]
    res.send(company) 
})
router.post('/api/setcompany',async (req,res)=>{
    try{
        const {data}=req.body
        const info = new Info(data)
        const save=await info.save(data)
    res.send({created:true,save,error:false})
    }catch(err){
        res.send({created:false,err,error:true})
    }
})
router.put('/api/editcompany',Adminauth,async (req,res)=>{
    try{
        const info=await Info.find({})
    const {_id}=info[0]
    const Update = await Info.findByIdAndUpdate(_id,req.body)
    res.send({updated:true,Update,error:false})
    }
    catch(err){
        res.send({updated:false,err,error:true})
    }
})
module.exports=router