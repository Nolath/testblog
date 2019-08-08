const User = require('../database/models/user')

module.exports = async (req, res) => {
    if (req.session.userId) {
        const u = await User.findById(req.session.userId, 'username').exec();
        return res.render("create", { username: u.username });
    }
    res.redirect('/auth/login');
};