$(function () {

  var name = $('#name');
  var age = $('#age');
  
  function addOrder(order) {
    $('#orders').append(`<li data-id='${order.id}'>
      <p>
        <strong>name: </strong> 
        <span class="noedit name">${order.name}</span>
        <input class="edit name"/>
      </p>
      <p>
        <strong>age: </strong> 
        <span class="noedit age">${order.age}</span>
        <input class="edit age"/>
      </p>
        <button data-id=${order.id} class="remove">X</button>
        <button class="editOrder noedit">Edit</button>      
        <button class="saveEdit edit">Save</button>
        <button class="cancelEdit edit">Cancel</button>
    </li>`)
  }

  $.ajax({
    type: 'GET',
    url: 'http://rest.learncode.academy/api/yong/friends',
    success: function(orders) {
      if(orders!== null) {
        console.log('success', orders);
        $.each(orders, function(i,order){
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
      url: 'http://rest.learncode.academy/api/yong/friends',
      data: order,
      success: function(newOrder) {
        addOrder(newOrder);
      },
      error:function(){
        alert('error saving order');
      }
    })
  });

  $('#orders').delegate(".remove", 'click',function(){

    var li = $(this).closest('li');
    console.log(this)
   

    $.ajax({
      type:'DELETE',
      url: 'http://rest.learncode.academy/api/yong/friends/'+$(this).attr('data-id'),
      success: function(){
        li.fadeOut(350, function(){
          li.remove(); 
        })
      }
    });
  });

$('#orders').delegate('.editOrder', 'click', function(){
  var li =$(this).closest('li'); 
  
  li.find('input.name').val(li.find('span.name').html() );
  li.find('input.age').val(li.find('span.age').html() );
  li.addClass('edit');
  console.log(li);

})

$('#orders').delegate('.cancelEdit', 'click', function(){
  $(this).closest('li').removeClass('edit');
});

$('#orders').delegate('.saveEdit', 'click', function(){
  var li = $(this).closest('li');
  var order = {
    name: li.find('input.name').val(), 
    age: li.find('input.age').val(),
  };
  $.ajax({
    type: 'PUT',
    url: 'http://rest.learncode.academy/api/yong/friends/' + li.attr('data-id'),
    data: order, 
    success: function(newOrder) {
      li.find('span.name').html(order.name);
      li.find('span.age').html(order.age);
      li.removeClass('edit');
      console.log(order.age);
    },
    error: function() {
      alert('error saving order');
    }
  });

})

})