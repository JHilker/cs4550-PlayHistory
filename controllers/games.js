/**
 * GET /games
 * My Games page.
 */

var controller = 'games';

exports.getGames = function(req, res) {
  res.render('games', {
    title: 'My Games',
    controller: controller,
    action: 'get'
  });
};
