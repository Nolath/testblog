const mongoose = require('mongoose')
const Post = require('../database/models/post')

module.exports = async (req, res) => {
    const postId = req.body._id;
    console.log(postId);
    await Post.update({
        "_id" : mongoose.Types.ObjectId(postId)
    },
    {
        "title" : req.body.title,
        "description" : req.body.description,
        "content" : req.body.content
    }, (error, post) => {
        res.redirect(`/post/${postId}`);
    });
}