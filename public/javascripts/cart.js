$(document).ready(async function(){
    
  let getCart = await axios.get('/api/cart/');
  let data = getCart.data;
  let totalPrice = 0;

  for(let i=0; i<data.length; i++) {
    totalPrice = totalPrice + data[i].price * data[i].quantity;
  }

  $("#total-price").html('$'+totalPrice);

});