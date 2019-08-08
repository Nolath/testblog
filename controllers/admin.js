const Post = require('../database/models/post')

module.exports = async (req, res) => {
    const usersPosts = await Post.aggregate( [
        {
          $group: {
             _id: "$username",
             count: { $sum: 1 }
          }
        }, 
        { $sort: { count: 1 } }
     ] )
    var diagramData = "key;value*";
    usersPosts.forEach(element => {
        diagramData += Object.values(element)[0] + ";" + Object.values(element)[1] + "*";
    });
    res.render('admin', { myData: diagramData });
}