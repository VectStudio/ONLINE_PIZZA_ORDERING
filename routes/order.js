var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/', function (req, res, next) {

  if (req.session.user) {

    db.get().query('SELECT * FROM `category`', function (err1, cats) {

      var promises = [];
      var products = [];

      for (let i = 0; i < cats.length; i++) {

        let promise = new Promise(function (resolve, reject) {

          db.get().query('SELECT * FROM `products` WHERE `category` = ?', cats[i].id, function (err2, productResult) {

            products[i] = productResult;

            resolve();

          });

        });

        promises.push(promise);

      }

      Promise.all(promises).then(function (values) {
        res.render('order/index', { user: req.session.user, products: products, cats: cats })
      });

    });

  } else {
    res.redirect('/login');
  }
});

router.get('/cart', function(req, res, next) {

  if(req.session.user) {
    let cart = [];
    if(req.session.cart) {
      cart = req.session.cart;
    }
    res.render('order/cart', {user: req.session.user, cart: cart});
  } else {
    res.redirect('/login'); 
  }

});

router.get('/customize', function (req, res, next) {
  if (req.session.user) {
    db.get().query('SELECT * FROM `customizationCategories`', function (err1, ccats) {

      var promises = [];
      var customizations = [];

      for (let i = 0; i < ccats.length; i++) {

        let promise = new Promise(function (resolve, reject) {

          db.get().query('SELECT * FROM `customizations` WHERE `custCatId` = ?', ccats[i].id, function (err2, customizationResults) {

            customizations[i] = customizationResults;
            resolve();

          });
        });

        promises.push(promise);

      }

      Promise.all(promises).then(function (values) {
        res.render('order/create', { user: req.session.user, cust: customizations, ccats: ccats });
      });

    });

  } else {
    res.redirect('/login');
  }
});

module.exports = router;
