var express = require('express');
var router = express.Router();

var db = require('../../db');
var bcrypt = require('bcrypt')

const salt = 10;

router.get('/', function (req, res, next) {
  if(req.session.user) {
    res.redirect('/order');
  } else {
    res.render('user/register', {});
  }
});

router.post('', function (req, res, next) {

  var errors = [];

  const user = {
    username: db.esc(req.body.username),
    email: db.esc(req.body.email),
    firstName: db.esc(req.body.firstName),
    lastName: db.esc(req.body.lastName),
    phoneNum: db.esc(req.body.phone)
  }

  db.get().query("SELECT * FROM `customers` WHERE `user`=?", [user.username], function (err, result) {

    if (result.length) {
      errors.push("Sorry, this username is already taken!");
    }

    if (req.body.password !== req.body.repassword) {
      errors.push("The provided passwords do not match");
    }

    if (!(user.username && req.body.password && req.body.repassword && user.email && user.firstName && user.lastName && user.phoneNum)) {
      errors.push("All fields must be filled!");
    }

    if (errors.length) {
      res.render('user/register', { error: errors, data: user });
    } else {

      bcrypt.hash(db.esc(req.body.password), salt, function (err, hash) {

        let q = 'INSERT INTO `customers`(`user`, `pass`, `email`, `firstName`, `lastName`, `phoneNumber`) VALUES (?, ?, ?, ?, ?, ?)';
        db.get().query(q, [user.username, hash, user.email, user.firstName, user.lastName, user.phoneNum], function (err, customer) {

          let q = 'SELECT * FROM `customers` WHERE id= ?';

          res.render('user/login', { success: "Your account is successfully created!" });

        });

      });
    }
  });
});

module.exports = router;
