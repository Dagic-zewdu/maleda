const router= require('express').Router()
const videos=require('./../DB/VideoSchema')
const Likes=require('./../DB/LikeSchema')
const comment=require('./../DB/CommentSchema')
const {readall,create,readone,update,Delete} =require('./../CrudMethods/crud')
router.get('/api/video',async (req,res)=>{
    const video = await readall(videos)
    if(video.error)
    {res.status(200).send(video.data)}
       else
        {
          let movies= video.data.reverse()
             res.status(200).send(movies)
            }
})
router.post('/api/checkvideo', async (req,res)=>{
    
    const reader=await readone(videos,{name : req.body.name})
     if(reader.find){
    res.status(200).send({find:true,message:'name has been found'})
   }
    else{
        res.status(200).send({find:false,message:'name has been found'})
    }
})
router.post('/api/video',async (req,res)=>{

   const Video= await create(videos,req.body)
      if(Video.error&&!Video.created)
      {res.status(200).send({created:false,message:'duplicated movie name',data:Video.error})}
      else{
        res.status(200).send(
            {created:true,message:'saved successfully',data:Video.data})
      }
     
})

router.put('/api/video',async (req,res)=>{
    const modify= await update(videos,req.body._id,req.body)
    if(!modify.error&&modify.updated){
        res.status(200).send({updated :true, data:modify})
    }
    else{
        res.status(200).send({updated :false, data:modify})
    }
})
router.post('/api/delvideo',async (req,res)=>{
    try
    {
        const remover= await Delete(videos,req.body._id)
    const likeremover=Likes.deleteMany({video_id:req.body._id},(err)=>{
        if(err)
        throw new error(err)
    })
    const commentsremover=comment.deleteMany({video_id:req.body._id},(err)=>{
        if(err)
        throw new error(err)
    })
    if(!remover.error&&remover.deleted){
        res.status(200).send({deleted:true,remover})
    }
    else{
        res.status(200).send({deleted:false,remover})
    }
}
catch(err){
    res.send({deleted:false,message:err})
}
})

module.exports=router