var User = require('../models/User');

/**
 * GET /games
 * My Games page.
 */

var controller = 'games';

exports.getGames = function(req, res) {
  res.render('games', {
    title: 'My Games',
    // games: req.user.games,
    controller: controller,
    action: 'get'
  });
};
