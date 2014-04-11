var mongoose = require('mongoose');
// var Player = require('../models/player');

var playSchema = new mongoose.Schema({
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
  date: Date,
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  // players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]
});

module.exports = mongoose.model('Play', playSchema);

