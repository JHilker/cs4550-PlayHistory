var User = require('../models/User');
var Game = require('../models/game');

var controller = 'plays';

/**
 * GET /plays
 * My Plays page.
 */

exports.getPlays = function(req, res) {
  User.find({}, function (err, users) {
    Game.find({ "_id": { $in: req.user.games }}, function (err, games) {
      res.render('plays', {
        title: 'My Plays',
        games: games,
        allUsers: users,
        controller: controller,
        action: 'get'
      });
    });
  });
};


/**
 * POST /plays/
 * Add a play including the user
 */

exports.cratePlay = function(req, res, next) {
  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);
    Game.find({ bggId: req.body.game.bggId }, function(err, game) {
      // console.log(game);
      // console.log(game[0]);
      // if (game.length === 0) {
      //   var newGame = new Game({
      //     bggId: req.body.game.bggId,
      //     name: req.body.game.name,
      //     imageUrl: req.body.game.imageUrl,
      //     yearPublished: req.body.game.yearPublished
      //   });

      //   newGame.save(function(err) {
      //     if (err) {
      //       if (err) return next(err);
      //     }
      //   });

      //   if (!user.games.indexOf(newGame._id) >= 0) user.games.push(newGame._id);
      // } else {
      //   if (!user.games.indexOf(game[0]._id) >= 0) {
      //     console.log("Pushing " + game[0]._id);
      //     user.games.push(game[0]._id);
      //   }
      // }
      // user.save(function(err) {
      //   if (err) return next(err);
      // });

      // res.json(newGame || game);
    });
  });
};
