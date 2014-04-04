var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
  bggId: Number,
  name: String,
  imageUrl: String,
  yearPublished: Number
});

module.exports = mongoose.model('Game', gameSchema);
