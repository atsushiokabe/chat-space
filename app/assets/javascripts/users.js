$(function(){
  $("#user-search-field").on('keyup',function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
      .done(function(){
        console.log("succeed");
      })
      .fail(function(){
        console.log("failed");
      })
  })
})