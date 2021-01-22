const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const requireLogin = require('../middleware/requireLogin')
const Post = require('../models/post')
const post = require('../models/post')

router.post('/createpost',requireLogin,(req,res)=>{
const {title,body,pic} = req.body;
console.log("imageee")
if(!title || !body || !pic)
   res.status(402).json({error : " all fields are required"})
   console.log(req.user);
const post  = new Post({
    title,
    body,
    photo:pic,
    postedBy:req.user
})
post.save().then(result  =>
    { console.log("image posted")
        res.json({post:result})
    })
    .catch(err=>
        console.log(err)
        ) 
})




router.get('/allPost',requireLogin,(req,res)=>{

    Post.find()
    .populate("postedBy","name")
    .then(posts=>
        {
            res.json({posts})
        })
        .catch(err=>
            console.log(err))
})



router.get('/myPost',(req,res)=>{


    Post.find({postedBy: req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>{

        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.put('/comment',requireLogin,(req,res)=>{
   console.log("entry")
   const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            
   console.log(result)
            
            res.json(result)
        }
    })
})
module.exports = router

 