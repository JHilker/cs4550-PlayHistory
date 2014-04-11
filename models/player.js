var mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
  score: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Player', playerSchema);
