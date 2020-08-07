const mongoose =require('./connection')
//creating comment Schema 
const comment= mongoose.Schema({
    comment :{type:String},
    video_id : {type:String},
    news_id: {type:String},
    user_id : {type:String},
    date : {
        type: Date,
        default: Date.now
    }
})
const Comment= new mongoose.model('comment',comment)
module.exports= Comment