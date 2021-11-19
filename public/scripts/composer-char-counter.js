






$(document).ready(function() {

  $('.new-tweet').keyup(function() {
    //get the length of the input
    const inputLength = $(this).find('#tweet-text').val() ?  $(this).find('#tweet-text').val().length : 0;
 
    let counter =  $(this).find('.counter');
    const maxCount = 140;
    
    if (inputLength > maxCount) {
      counter.addClass('tooLong');
    } else {
      counter.removeClass('tooLong');
    }

    counter.text(maxCount - inputLength);
  });


  $(window).scroll(()=> {
    const y = $(this).scrollTop();
    if (y > 250) {
      $(".navbar-top-right").fadeOut();
      $('.scroll-btn').fadeIn();
    } else {
      $(".navbar-top-right").fadeIn();
      $('.scroll-btn').fadeOut();
    }
  });
  

  $('.scroll-btn').click(() => {
    $(window).scrollTop(0);
    $(".new-tweet").slideToggle("slow");
    $(".new-tweet textarea").focus();

  });


});
