var mongoose = require('mongoose');

var playSchema = new mongoose.Schema({
  _creator : { type: Number, ref: 'User' },
  game     : Number
});

module.exports = mongoose.model('Play', playSchema);
