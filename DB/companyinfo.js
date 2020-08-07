const mongoose =require('./connection')
const company_info= mongoose.Schema({
    company_name :{type:String},
    phone1 : {type:String},
    phone2 : {type:String},
    email :String,
    fb:String,
    youtube:String,
    telegram:String,
    date : {
        type: Date,
        default: Date.now
    }
})
const company_Info= new mongoose.model('info',company_info)
module.exports= company_Info