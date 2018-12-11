$(document).ready(async function () {

  async function updatePrice() {
    
    let getCart = await axios.get('/api/cart/');
    let data = getCart.data;
    let totalPrice = 0;

    for(let i=0; i<data.length; i++) {
      totalPrice = totalPrice + data[i].price * data[i].quantity;
    }

    $("#total-price").html('$'+totalPrice);

  }

  async function getCartCount() {
    let getCart = await axios.get('/api/cart/');

    let data = getCart.data;

    let count = 0;

    for(let i=0; i<data.length; i++) {
      count = count + data[i].quantity;
    }

    return count;
  }

  $("#msg").hide();

  $("#cart-count").html(" ("+await getCartCount()+") ");

  $(".add-to-cart").click(async function() {
    
    $("#msg").show();  

    let post = {
      item_id: $(this).attr('id'),
      quantity: 1,
      price: parseFloat($(this).parents(".product-grid").find(".price").text().replace('$', '')).toFixed(2)
    };

    let result = await axios.post('api/cart/', post);
    
    if(result) {
      let msg = "Your item is added to your cart";

      $("#msg").html(msg);
      $("#cart-count").html(" ("+await getCartCount()+") ");
    }
  });

  $("#add-custom").click(async function() {

    $(this).fadeOut(100).delay(3500).fadeIn(100);

    let customizations = [];

    $(document).find(".cat-grid-selected").each(function(i, obj) {
      customizations.push(" "+$(this).children('h4').text());
    });

    let post = {
      item_id: -1,
      quantity: 1,
      cust: customizations
    };

    let result = await axios.post('/api/cart/', post);

    if(result) {
      let msg = "Building your custom pizza. Please wait ...";

      $("#msg").show();
      $("#pg-bar").show();
      $("#pg-bar-bg").show();
      $("#msg").removeClass('alert-success').addClass('alert-warning').html(msg);
      $('#pg-bar').animate({width: "100%"}, 3000);

      let newCount = await getCartCount();

      setTimeout(function() {
        $("#msg").removeClass('alert-warning').addClass('alert-success').html("Your item has been added to the cart!");
        $("#cart-count").html(" ("+newCount+") ");
      }, 3500);

    }
    
  });

  $(".action-btn.remove").click(async function() {

    let result = await axios.delete('/api/cart/'+$(this).attr('id'));

    if(result) {
      let msg = "Item has been deleted from cart!";

      $("#msg").hide();
      $("#msg-delete").show();
      $("#msg-delete").html(msg);
      $("#cart-count").html(" ("+await getCartCount()+") ");

      $('#row-id-'+$(this).attr('id')).remove();

      updatePrice();
    }

  });

  $(".action-btn.update").click(async function() {
    
    let put = {
      newQuantity: parseInt($("#inputSelect"+$(this).attr('id')).val())
    }

    let result = await axios.put('/api/cart/'+$(this).attr('id'), put);

    if(result) {
      let msg = "Item has been modified!";

      $("#msg-delete").hide();
      $("#msg").show();
      $("#msg").html(msg);
      $("#cart-count").html(" ("+await getCartCount()+") ");

      let item = await axios.get('/api/cart/'+$(this).attr('id'));

      $("#price-"+$(this).attr('id')).html('$'+item.data.price*item.data.quantity);
      updatePrice();
    }

  });

  $("#remove-all").click(async function() {

    let result = await axios.delete('/api/cart/');

    $('#cart-table').find('tr').remove();

    if(result) {
      let msg = "Your cart has been emptied!";

      $("#msg").hide();
      $("#msg-delete").show();
      $("#msg-delete").html(msg);
      $("#cart-count").html(" ("+await getCartCount()+") ");
    }

  });

});