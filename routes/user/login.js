var express = require('express');
var router = express.Router();

var db = require('../../db');
var bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
  if(req.session.user) {
    res.redirect('/order');
  } else {
    res.render('user/login', {});
  }
});

router.post('/', function(req, res, next) {

  const username = db.esc(req.body.username);
  
  db.get().query('SELECT * FROM `customers` WHERE `user`= ?', [username], function(err, user) {

    if(!user.length) {
      res.render('user/login', {error: "Sorry, this username doesn't exist!"});
    } else {

      bcrypt.compare(db.esc(req.body.password), user[0].pass, function(err, auth) {

        if(auth) {
          req.session.user = user[0];
          res.redirect('/order');
        } else {
          res.render('user/login', {error: "Sorry, the password entered is incorrect!"});
        }

      });

    }

  });

});

module.exports = router;
