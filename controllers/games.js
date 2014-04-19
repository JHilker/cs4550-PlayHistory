var User = require('../models/User');
var Game = require('../models/game');

/**
 * GET /games
 * My Games page.
 */

var controller = 'games';

exports.getGames = function(req, res) {
  Game.find({ "_id": { $in: req.user.games }}).sort([['name', 'ascending']]).exec(function (err, games) {
    res.render('games', {
      title: 'My Games',
      games: games,
      controller: controller,
      action: 'get'
    });
  });
};
