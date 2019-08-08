const mongoose = require('mongoose');
const Post = require('../database/models/post')
 
module.exports = async (req, res) => {
    const userId = req.session.userId;
    const postId = req.params.id;
    
    const posts = await Post
        .aggregate( [
            {
              $lookup:
              {
                from: "users",
                localField: "username",
                foreignField: "username",
                as: "userdata"
              }
            },
            {
                $unwind: "$userdata"
            },
            {
                $match: { "_id" : mongoose.Types.ObjectId(postId)}
            }
         ] );
    const post = posts[0];
    const foundId = posts[0].userdata._id;
    const equalId = foundId == userId;
    res.render("post", { post, isAuthor : equalId });
}