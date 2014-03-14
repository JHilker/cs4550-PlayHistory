/**
 * GET /games
 * My Games page.
 */

exports.getGames = function(req, res) {
  res.render('games', {
    title: 'My Games'
  });
};
