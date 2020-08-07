const mongoose =require('./connection')
const validator= require('validator')
//creating user Schema required=> title,news_type
const users= mongoose.Schema({
    name:{type:String, required: true},
    email:{
        type: String,
        unique : true,
        validate(value){
           if(!validator.isEmail(value)){
               throw new Error('Email is invalid')
           }
        }
    },
    phone:{
    type : String,
    required: true,
    unique: true
    },
    password :{
        type: String,
        trim: true,
        required : true
    },
    type:{
        type: String,
        default: 'user'
    },
    date:{
  type:Date,
  default: Date.now
    }
})
const user= new mongoose.model('user',users)
module.exports=user