const mongoose=require('./connection')
//creating video schema
const videos= new mongoose.Schema({
    name : String,
    image :{
        type : String,
        required : true
    },
    video :{
        type : String
    },
    description: String,
    video_type:{
        type : String,
        required: true
    },
    upload_type:{
        type : String,
        required : true
    },
 
    trailor:{
        type : String,
    },
    
    genre :{
  type : String,
    },
    spritual:{
        type : String
    },
    views:{
        type: Number
    },
    likes:{
        type: Number
    },
    artist:{
      type : String,
    },
    director:{
        type : String
    },
    cliprank :Number,
    spritualfor:String,
    spritualtype:String,
    date:{
        type: Date,
        default :Date.now
    }
})
const video= new mongoose.model('video',videos)
module.exports= video