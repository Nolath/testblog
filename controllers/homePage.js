const Post = require('../database/models/post')
 
module.exports = async (req, res) => {
    const perPage = 5;
    const page = req.params.page || 1;
    const skipValue = perPage * page - perPage;
    
    const c = await Post.estimatedDocumentCount().exec();
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
                $sort: { createdAt: -1 } 
            }
         ] )
        .skip(skipValue)
        .limit(perPage);
    res.render("index", {
        posts,
        current: page,
        pages: Math.ceil(c / perPage)
    });
}