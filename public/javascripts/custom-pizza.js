$(document).ready(function () {

  var custom_pizza_customization = [];

  // select and unselect pizza customizations
  $(".cat-grid").click(function () {
    if ($(this).closest('.row').hasClass("multiple")) {
      if ($(this).hasClass("cat-grid-selected")) {
        $(this).removeClass("cat-grid-selected");
      } else {
        $(this).addClass("cat-grid-selected");
      }
    } else {
      $(this).closest(".row").children().children().removeClass("cat-grid-selected");
      $(this).addClass("cat-grid-selected");
    }
  });

  // function for cart button
  $("#add-custom").click(async function() {

    // get number of categories via category api
    const result = await axios.get('../api/category/');
    result.data.forEach(function(result) {
      
      // for each category, obtain values
      $(document).find('.cat-'+result.id).each(function (i, obj) {
        if($(this).hasClass('cat-grid-selected')) {
          addToPizza($(this).attr('id'));
        }
      });
    });

    // add to cart via api
  });

  function addToPizza(id) {
    custom_pizza_customization.push(id);
  }

});