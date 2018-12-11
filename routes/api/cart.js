var express = require('express');
var router = express.Router();

var db = require('../../db');
var bcrypt = require('bcrypt');

// get item in cart
router.get('/:cartid', function(req, res, next) {

  if(req.session.user) {
    
    let cart = req.session.cart;

    for(let i=0; i<cart.length; i++) {
      if(cart[i].cart_id==req.params.cartid) {
        res.json(cart[i]);
        break;
      }
    }

  } else {
    res.redirect('/login');
  }

});

// get items in cart
router.get('/', function(req, res, next) {
  
  // only return result if user is logged in
  if(req.session.user) {

    if(req.session.cart) {
      res.json(req.session.cart);
    } else {
      req.session.cart = [];
      res.json(req.session.cart);
    }

  } else {
    res.redirect('/login');
  }

});

// add item to cart
router.post('/', function(req, res, next) {

  // only add to cart if user is logged in
  if(req.session.user) {

    var cart = [];
  
    if(req.session.cart) {
      cart = req.session.cart;
    }

    if(req.body.item_id === -1) {

      let item = {
        item_id: -1,
        name: "Custom Pizza",
        quantity: 1,
        cart_id: cart.length,
        cust: req.body.cust,
        price: 10.99
      }

      cart.push(item);
      req.session.cart = cart;

      res.json(req.session.cart);

    } else {

      db.get().query('SELECT * FROM `products` WHERE id = ?', req.body.item_id, function(err, result) {
  
        let exist = false;

        for(let i=0; i<cart.length; i++) {
          if(cart[i].item_id == req.body.item_id) {
            exist = true;
            cart[i].quantity = cart[i].quantity+1;
            break;
          }
        }

        if(!exist) {
          let item = {
            item_id: result[0].id,
            name: result[0].name,
            quantity: 1,
            cart_id: cart.length,
            cust: [],
            price: req.body.price
          };
          cart.push(item);
        }

        req.session.cart = cart;
  
        res.json(req.session.cart);
  
      });

    }

  } else {
     res.redirect('/login');
  }
});

// update item from cart
router.put('/:cartid', function(req, res, next) {

  if(req.session.user) {

    var cart = [];

    if(req.session.cart) {
      cart = req.session.cart;
    }

    for(let i=0; i<cart.length; i++) {
      if(cart[i].cart_id==req.params.cartid) {
        cart[i].quantity = req.body.newQuantity;
        break;
      }
    }

    req.session.cart = cart;

    res.json(cart);

  } else {
    res.redirect('/login');
  }

});

// remove item from cart
router.delete('/:cartid', function(req, res, next) {
  if(req.session.user) {

    var cart = [];
  
    if(req.session.cart) {
      cart = req.session.cart;
    }

    for(let i=0; i<cart.length; i++) {
      if(cart[i].cart_id==req.params.cartid) {
        cart.splice(cart.indexOf(cart[i]), 1);
        break;
      }
    }

    // reset cart_id for items when an item is removed from cart
    for(let i=0; i<cart.length; i++) {
      cart[i].cart_id = i;
    }

    req.session.cart = cart;

    res.json(cart);

  } else {
    res.redirect('/login');
  }
});

router.delete('/', function(req, res, next) {

  // only delete cart if user is logged in
  if(req.session.user) {

    req.session.cart = [];

    res.json(req.session.cart);

  } else {
    res.redirect('/login');
  }

})

module.exports = router;