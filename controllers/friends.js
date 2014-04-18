var User = require('../models/User');

/**
 * GET /friends
 * My Friends page.
 */

exports.getFriends = function(req, res) {
  User.find().sort([['email', 'ascending']]).exec(function (err, users) {
    res.render('friends', {
      title: 'My Friends',
      allUsers: users
    });
  });
};
