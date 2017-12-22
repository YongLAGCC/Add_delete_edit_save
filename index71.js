$(function () {

  var name = $('#name');
  var age = $('#age');
  
  function addOrder(order) {
    $('#orders').append(`<div>
    <li>
      <p>
        <strong>name: </strong> 
        <span class="noedit">${order.name}</span>
        <input class="edit name"/>
      </p>
      <p>
        <strong>age: </strong> 
        <span class="noedit">${order.age}</span>
        <input class="edit age"/>
      </p>
        <button data-id=${order.id} class="remove">X</button>
        <button class="editOrder noedit">Edit</button>      
        <button class="saveEdit edit">Save</button>
        <button class="cancelEdit edit">Cancel</button>
    </li>  
    </div>`)
  }

  $.ajax({
    type: 'GET',
    url: 'http://rest.learncode.academy/api/johnbob/friends',
    success: function(orders) {
      if(orders[7]!= null) {
        console.log('success', orders[7])
        $.each(orders[7], function(i,order){
          addOrder(order);
        })
      }
    }
  });

  $('#add-order').on('click',function(){
    var order = {
      name: name.val(),
      age: age.val(), 
    };
    $.ajax({
      type: 'POST',
      url: 'http://rest.learncode.academy/api/johnbob/friends',
      data: order,
      success: function(newOrder) {
        addOrder(newOrder);
      },
      error:function(){
        alert('error saving order');
      }
    })
  });

  $('#orders').delegate('.remove', 'click',function(){

    var li = $(this).closest('li');

    $.ajax({
      type:'DELETE',
      url: 'http://rest.learncode.academy/api/johnbob/friends/'+$(this).attr('data-id'),
      success: function(){
        li.fadeOut(400, function(){
          li.remove(); 
        })
      }
    });
  });




})