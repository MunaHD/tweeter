






$(document).ready(function() {
  
  //when user types in the form the counter number will change
  $('.new-tweet').keyup(function() {
    //get the length of the input
    const inputLength = $(this).find('#tweet-text').val() ?  $(this).find('#tweet-text').val().length : 0;
 
    let counter =  $(this).find('.counter');
    const maxCount = 140;
    
    // will become red if passed 140
    if (inputLength > maxCount) {
      counter.addClass('tooLong');
      //else it will stay the same colour
    } else {
      counter.removeClass('tooLong');
    }
    //return the counter value
    counter.text(maxCount - inputLength);
  });


  // when a user scrolls the navbar button will fadeout
  // and the scroll button will fadein
  $(window).scroll(()=> {
    const y = $(this).scrollTop();
    if (y > 250) {
      $(".navbar-top-right").fadeOut();
      $('.scroll-btn').fadeIn();
    
    // when the use scrolls to the top of page the scroll button  will fadeout
    // and the navbar button will fadein
    } else {
      $(".navbar-top-right").fadeIn();
      $('.scroll-btn').fadeOut();
    }
  });
  
   // the scroll top button will form wil open and focus on the textarea
   //will not close the form if already open
  $('.scroll-btn').click(() => {
    $(window).scrollTop(0);
    $(".new-tweet").show("slow");
    $(".new-tweet textarea").focus();

  });


});
