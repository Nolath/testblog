const mongoose = require('mongoose')
const Post = require('../database/models/post')
 
module.exports = async (req, res) => {
    console.log(req.params.id);
    const post = await Post.findById(mongoose.Types.ObjectId(req.params.id));
    console.log(post);
    res.render("update", { post });
}