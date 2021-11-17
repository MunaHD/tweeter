






$(document).ready(function() {

  $('.new-tweet').keyup(function() {
    //get the length of the input
    const inputLength= $(this).find('#tweet-text').val() ?  $(this).find('#tweet-text').val().length: 0;
 
    let counter =  $(this).find('.counter');
    const maxCount = 140;
    counter.text(maxCount - inputLength);


    if (inputLength > maxCount) {
      counter.addClass('tooLong')
    } else {
      counter.removeClass('tooLong')
    }

  });

});
