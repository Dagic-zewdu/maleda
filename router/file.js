var router = require('express').Router()
var multer = require('multer')
var fs= require('fs')
router.post('/api/uploadfile',(req,res)=>{
    var date=Date.now();
    var f
    var storage = multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null,'public')
        },
        filename : (req,file,cb)=>{
            f=date+file.originalname
          cb(null,f)
        }
    })
  
    var upload = multer ({storage:storage}).array('file')
    
    upload(req,res,(err)=>{
        if(err instanceof multer.MulterError){
            return res.status(500).json(err)
        }
        else if (err){
            return res.status(500).json(err)
        }
        return res.status(200).send({date:date,upload:true})
})
})
 var path='public/'
router.post('/api/deletefile',(req,res)=>{
    try{
     var z
        fs.unlinkSync(path+req.body.image)
        req.body.video?(
            fs.unlinkSync(path+req.body.video)
        ):(
       z=3
        )
        res.send({deleted:true})
    }
     catch(err){
         console.log(err)
         res.send({deleted: false})
     }
})
module.exports=router