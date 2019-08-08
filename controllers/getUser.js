const Post = require('../database/models/post')
const User = require('../database/models/user')
 
module.exports = async (req, res) => {
    const user = await User.findById(req.params.id);
    const posts = await Post.find({username : user.username});
    res.render("user", { posts, username: user.username });
}