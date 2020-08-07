const router=require('express').Router()
const Likes =require('./../DB/LikeSchema')
const {update,Delete,readall} =require('./../CrudMethods/crud')
const video =require('./../DB/VideoSchema')
const news= require('./../DB/NewSchema')
router.get('/api/getlikes',async (req,res)=>{
     try{
  const read=await readall(Likes)
  res.send(read.data)
     }
     catch(err){
         res.send({error:true,err})
     }
})
router.post('/api/ifliked',async (req,res)=>{
    try{

    const read = await Likes.find(req.body)
    read.length?
    (
       res.send({Liked:true,error:false}) 
    ):(
        res.send({Liked:false,error:false})
    )
}
catch(err){
    res.send({Liked:false, error:true})
}
})
router.post('/api/vliked',async (req,res)=>{
    try{
        const info = new Likes(req.body)
     const save=await info.save(req.body)
     const change= await update(video,req.body.video_id,{likes:req.body.likes})
     if(change.error&&!change.updated){
         res.send({Liked:false,error:false})
     }
     else{
     res.send({Liked:true,error:false})}
    }
    catch(err){
res.send({Liked:false,error:true})
    }
})
router.post('/api/unlikev',async (req,res)=>{
    try{
        const search= await Likes.find(
            {
                user_id:req.body.user_id,
                 video_id:req.body.video_id
            })
   if(search.length>0)
   {
    const remover=await Delete(Likes,{_id : search[0]._id})
    if(remover.deleted){
    const change= await update(video,req.body.video_id,{likes:req.body.likes})
     if(change.error&&!change.updated){
         res.send({Liked:false,error:false})
     }
     else{
     res.send({Liked:true,error:false})
    }
   }
   else{
    res.send({Liked:false,error:false})
   }
}        
    else{
        res.send({Liked:false,error:false})
    } 
     
    }
    catch(err){
res.send({Liked:false,error:true})
    }
})
router.post('/api/unliken',async (req,res)=>{
    try{
        const search= await Likes.find(
            {
                user_id:req.body.user_id,
                 news_id:req.body.video_id
            })
   if(search.length>0)
   {
    const remover=await Delete(Likes,{_id : search[0]._id})
    if(remover.deleted){
    const inc=req.body.likes-1
     const change= await update(news,req.body.video_id,{likes:inc})
     if(change.error&&!change.updated){
         res.send({Liked:false,error:false})
     }
     else{
     res.send({Liked:true,error:false})
    }
   }
   else{
    res.send({Liked:false,error:false})
   }
}        
    else{
        res.send({Liked:false,error:false})
    } 
     
    }
    catch(err){
        console.log(err)
res.send({Liked:false,error:true})
    }
})
router.post('/api/nliked',async (req,res)=>{
    try{
     const save=await Likes.save(req.body)
     const inc=req.body.likes+1
     const change= await update(news,req.body.news_id,{likes:inc})
     if(change.error&&!change.updated){
         res.send({Liked:false,error:false})
     }
     else{
     res.send({Liked:true,error:false})}
    }
    catch(err){
        console.log(err)
res.send({Liked:false,error:true})
    }
})
module.exports=router