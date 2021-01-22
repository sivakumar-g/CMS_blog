const mongoose = require('mongoose')
const user = require('./user')
const {ObjectId} = mongoose.Schema.Types
const userScheme = new mongoose.Schema({

title:{
    type:String,
    required:true
},
body:{
    type:String,
    required:true
},

photo:{
    type:String,
    required:true
},
comments:[{
        text:String,
        postedBy:{type:ObjectId,ref:"User"}
    }],

postedBy:{
    type:ObjectId,
    ref:"User"
    
}


}     , {timestamps:true} )

module.exports = mongoose.model("Post",userScheme)