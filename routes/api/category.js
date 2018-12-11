var express = require('express');
var router = express.Router();

var db = require('../../db');
var bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
  db.get().query("SELECT * FROM `customizationCategories`", function(err, result) {
    res.json(result);
  });
});

module.exports = router;