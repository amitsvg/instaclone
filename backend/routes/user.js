const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const POST = mongoose.model("POST")

const USER = mongoose.model("USER")

router.get("/user/:userId", (req, res) => {
    USER.findOne({ _id: req.params.userId })
    .select("-password")
        .then(user => {
            POST.find({postedBy:req.params.userId})
            .populate("postedBy", "_id")
            .exec((err,post)=>{
                if(err){
                    return res.status(422).json(err)
                }
                res.status(200).json({user,post})
            })
        })
        .catch(err => {
            return res.status(404).json({error:"User not found"})
        })
})


module.exports = router;