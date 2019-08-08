const mongoose = require('mongoose');
const Post = require('../database/models/post')
 
module.exports = (req, res) => {
    const postId = req.params.id;
    console.log(postId);
    Post.deleteOne({ "_id" : mongoose.Types.ObjectId(postId) }).exec();
    res.redirect("/");
}