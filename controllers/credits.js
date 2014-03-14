/**
 * GET /credits
 * Credits page.
 */

exports.getCredits = function(req, res) {
  res.render('credits', {
    title: 'Credits'
  });
};
