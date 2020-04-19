$(function(){
  function buildHTML(message){
    if (message.image){
      var html =
        `<div class="message" data-message-id=${message.id}>
          <div class="message__info">
            <div class="message__info__name">
              ${message.user.name}
            </div>
            <div class="message__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image}>
        </div>`
      return html;
    } else{
      var html =
        `<div class="message" data-message-id=${message.id}>
          <div class="message__info">
            <div class=message__info__name">
              ${message.user_name}
            </div>
            <div class="message__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
    var reloadMessages = function() {
      var last_message_id = $('.message:last').data("message.id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
      })
      .fail(function() {
        alert('error');
      });
    };

  $("#new_message").on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      console.log(data)
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
      console.log(html)
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  });
  setInterval(reloadMessages, 7000);
});