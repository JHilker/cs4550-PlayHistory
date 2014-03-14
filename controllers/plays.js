/**
 * GET /plays
 * My Plays page.
 */

exports.getPlays = function(req, res) {
  res.render('plays', {
    title: 'My Plays'
  });
};
