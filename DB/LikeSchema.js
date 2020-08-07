const mongoose =require('./connection')
//creating Likes Schema 
const Like= mongoose.Schema({
    likes:Number,
    video_id : String,
    news_id: String,
    type : String,
    user_id : String,
    date : {
        type: Date,
        default: Date.now
    }
})
const Likes= new mongoose.model('Likes',Like)
module.exports= Likes