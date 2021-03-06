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
  User.find({ _id: {'$ne': req.user.id }}).sort([['email', 'ascending']]).exec(function (err, otherUsers) {
    Game.find({ "_id": { $in: req.user.games }}).sort([['name', 'ascending']]).exec(function (err, games) {
      // Player.find({ "user":  req.user.id }, function(err, players) {
        Play.find({ "players": req.user.id }).sort([['date', 'descending']]).populate('players game').exec(function(err, plays) {
          res.render('plays', {
            title: 'My Plays',
            games: games,
            allUsers: otherUsers,
            plays: plays,
            controller: controller,
            action: 'get'
          });
        });
      // });
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
    Game.findOne({ bggId: req.body.bggId }, function(err, game) {
      var playersArray  = [];
      _.each(req.body.players, function(playerID, index){
        // var newPlayer = new Player({
        //   score: 0,
        //   user: playerID
        // });
        // newPlayer.save(function(err) {
        //   if (err) {
        //     if (err) return next(err);
        //   }
        // });
        // playersArray.push(newPlayer._id);
        playersArray.push(playerID);
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

        Play.findById(newPlay._id).populate('players game').exec(function(err, play) {
          console.log(play);
          res.json(play);
        });
      });



      // res.json(newPlay.populate('players game'));
    });
  });
};
