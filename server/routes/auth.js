const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')
//const User = require('../models/user')
  

// const User = mongoose.model("User")
 const User = require('../models/user')
 mongoose.model('User')


 router.get('/protected',requireLogin,(req,res)=>{
    res.send("hello")
}) 
 
router.post('/signup',(req,res)=>{
    console.log(req.body.name)
    const {name,email,password} = req.body;
if(!email || !password || !name){
   return res.status(422).json({error : "please add  all fields"})
}
// res.json({message:"successful"})

/*
User.findOne({email:email},(err,doc)=>{
    if(doc){
        console.log("email exist")
        res.json({message:"already exist"})
    }
else{
console.log("added");
res.json({message:"added"})


}
})
*/ 



User.findOne({email:email})
.then((saveUser)=>
{
    if(saveUser)res.status(422).json({error:"user already exist"})
bcrypt.hash(password,10)
.then((hashed)=>{


    const user = new User({
        email,
        password:hashed,
        name
    })

    user.save()
    .then(user=>{
        res.json({"message":"saved successfully"})
    })
    .catch(err=>{
        console.log(err)
        res.json({"message":"something went wrong"})
    
    })
    

})




})//then
.catch(err=>{
    console.log(err)
})



//end 
})//post


router.post('/signin',(req,res)=>{

    const {email,password} = req.body;
if(!email || !password)
return res.status(422).json({error:"all fields needed"})

User.findOne({email:email})
.then((savedUser)=>{
if(!savedUser) return req.json({error:"invalid email or password"})


bcrypt.compare(password,savedUser.password)
.then((doMatch)=>{

    if(doMatch)
    {
        const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
       // res.json({token:token})
        const {_id,name,email,pic} = savedUser
        res.json({token,user:{_id,name,email}})
     
    }
else
{
    return res.status(422).json({error:"invalid password"})
}
})//domatch then
.catch(err =>{
    console.log(err+" password err")
})

})//then ssaved


})


module.exports = router


