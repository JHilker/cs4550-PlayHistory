var User = require('../models/User');
var Game = require('../models/game');
var Play = require('../models/play');
var Player = require('../models/player');
var _ = require('underscore');

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

exports.postPlay = function(req, res, next) {
  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);
    Game.find({ bggId: req.body.bggId }, function(err, game) {
      var playersArray  = [];
      _.each(req.body.players, function(playerID, index){
        var newPlayer = new Player({
          score: 0,
          user: playerID
        });
        newPlayer.save(function(err) {
          if (err) {
            if (err) return next(err);
          }
        });
        playersArray.push(newPlayer._id);
      });

      var newPlay = new Play({
        game: game._id,
        date: req.body.date,
        players: playersArray
      });

      newPlay.save(function(err) {
        if (err) {
          if (err) return next(err);
        }
      });

      res.json(newPlay);
    });
  });
};
