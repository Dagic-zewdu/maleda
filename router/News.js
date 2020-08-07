const router=require('express').Router()
const News=require('./../DB/NewSchema')
const {readall,create,readone,update,Delete} =require('./../CrudMethods/crud')
/**creating get route for news */

router.get('/api/news',async (req,res)=>{
     const news= await readall(News)
     const NEWS=news.data.reverse()
     if(news.error){
        
         res.status(200).send(NEWS)
     }
     else{
         res.status(200).send(NEWS)
     }
})

/** creating post route for news */
router.post('/api/news',async (req,res)=>{
    if(req.body.news_type=='breaking news'||
    req.body.news_type=='Breaking news'){
        const set= await News.updateMany(
            { news_type:"breaking news"  }, { news_type: "normal" }) 
    }
      const creater= await create(News,req.body)
      if(creater.error&&!creater.created)
      {res.status(200).send({created:false,message:'duplicated movie name',data:creater.error})}
      else{
        res.status(200).send(
            {created:true,message:'saved successfully',data:creater.data})
      }
})
/** creating put route for news */
router.put('/api/news',async (req,res)=>{
    const modify= await update(News,req.body._id,req.body)
    if(!modify.error&&modify.updated){
        res.status(200).send({updated :true, data:modify})
    }
    else{
        res.status(200).send({updated :false, data:modify})
    }
})
/**creting Delete route for news */
router.post('/api/delnews',async (req,res)=>{
    const remover= await Delete(News,req.body._id)
    if(!remover.error&&remover.deleted){
        res.status(200).send({deleted:true,remover})
    }
    else{
        res.status(200).send({deleted:false,remover})
    }
})
module.exports=router