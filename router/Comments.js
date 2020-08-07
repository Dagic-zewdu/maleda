const router=require('express').Router()
const comment=require('./../DB/CommentSchema')
const {readall,create,readone,update,Delete} =require('./../CrudMethods/crud')
/**creating get route for comments */
router.get('/api/comments',async (req,res)=>{
    const read=await readall(comment)
    const allcomments=read.data.reverse()
    res.send(allcomments)
})
router.post('/api/getcomments',async (req,res)=>{
   try{
  if(req.body.type=='video'){
   const read = await comment.find({video_id : req.body.video_id})
   res.send({error:false,data:read})  
  }
  else{
    const read = await comment.find({news_id : req.body.news_id})
    res.send({error:false,data:read})
  }
   }
   catch(err){
   res.send({error:true})
   }
})

/** creating post route for news */
router.post('/api/postcomments',async (req,res)=>{
    const save= await create(comment,req.body)
 if(!save.error){
     res.status(200).send({created:true,data:save})
 }
 else{
     res.status(200).send({created:false})
 }  
})
/** creating put route for news */
router.put('/api/comments',async (req,res)=>{
    const modify= await update(comment,req.body.id,req.body)
    if(!modify.error&&modify.updated){
        res.status(200).send({updated:true,data:modify})
    }
    else{
        res.status(200).send({updated:false,data:modify})
    }
})
/**creating Delete route for news */
router.post('/api/delcomments',async (req,res)=>{
    const remover= await Delete(comment,req.body.id)
    if(!remover.error&&remover.deleted){
        res.status(200).send({deleted:true})
    }
    else{
        res.status(200).send({deleted:false})
    }
})
module.exports=router