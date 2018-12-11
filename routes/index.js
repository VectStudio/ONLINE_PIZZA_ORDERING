var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(req.session.user) {
    res.render('index', {loggedIn: true, user: req.session.user});
  } else {
    res.render('index', {loggedIn: false});
  }
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
