var mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
  score: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

var playSchema = new mongoose.Schema({
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' }
  date: Date,
  players: [Player]
});

module.exports = mongoose.model('Play', playSchema);
module.exports = mongoose.model('Player', playerSchema);
