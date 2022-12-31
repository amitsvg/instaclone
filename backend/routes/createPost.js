const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const POST = mongoose.model("POST")

//  Route
router.get("/allposts",requireLogin,(req,res) => {
    POST.find()
    .populate("postedBy","_id name userName")
    .then(posts=> res.json(posts))
    .catch(err => consolog(err))
})


router.post("/createPost", requireLogin, (req, res) => {
    const { caption, imageUrl } = req.body;
    console.log(imageUrl)
    if (!caption || !imageUrl) {
        return res.status(422).json({ error: "Please add both image and caption" })
    }
    console.log(req.user);
    const post = new POST({
        caption,
        photo: imageUrl,
        postedBy: req.user
    })
    post.save().then((result) => {
        return res.json({ post: result })
    }).catch(err => console.log(err))
})

module.exports = router