const mongoose =require('./connection')

//creating News Schema required=> title,news_type
const News= mongoose.Schema({
    title :{
        type: String,
        required: true
    },
    news_type:{
        type :String,
        required : true
    },
    description:{
        type: String,
        required : true
    },
    image:{
        type: String,
        required: true
    },
    video: String,
    checkvideo:String,
    genre:{
        type: String,
        default: 'other'
    },
    views:{
        type: Number
    },
    upload_type:String,
    likes:{
        type: Number
    },
    source:{
        type: String
    },
    link : String,
    date:{
        type: Date,
        default : Date.now
    }
})
const news= new mongoose.model("news",News)
module.exports=news