/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(() => {
 
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (tweetObj) => {
    // create variable
    const $tweet = `
    <article  class="tweets">
    <header>
      <div>
        <img src="${tweetObj.user.avatars}" > 
        <!-- <i class="fab fa-earlybirds"></i> -->
        <span>${tweetObj.user.name}</span>     
      </div>
      <div>
        <span>${tweetObj.user.handle}</span>
      </div>
    </header>
    
        <div class="content">
          <p>${escape(tweetObj.content.text)}</p>
        </div>
  
     <footer>
        <div>
          <span>${timeago.format(tweetObj.created_at)}</span>
        </div>
        <div>
          <i class="fas fa-flag icon"></i>
          <i class="fas fa-retweet icon"></i>
          <i class="fas fa-heart icon"></i>
        </div>
    </footer> 
  </article>`
    return $tweet;
  }
  
  const renderTweets = function(tweets) {
  
    for (let tweet of tweets) {
      const newTweet = createTweetElement(tweet)
      $('.tweets-container').prepend(newTweet); 
    }
  }

  
   
  $('#add-tweet').submit(function (event) {
    event.preventDefault();
  
    let singleTweet = $('#tweet-text').val();
    
    let errMessage = "";
    if (singleTweet.length > 140) {
      errMessage = "You have entered too many characters.";
      
      return $(".err")
      .text(errMessage)
      .slideDown("fast", function () {
      setTimeout(() => {
        $(".err").slideUp("fast")
      }, 2000 )
      });

      
      
      
    } else if (singleTweet.length === 0) {
     errMessage = " Your tweet does not have any content.";
     
     return $(".err")
     .text(errMessage)
     .slideDown("fast", function () {
      setTimeout(() => {
        $(".err").slideUp("fast")
      }, 2000 )
      });
      
    } 
      

    $.ajax({
      method: 'post',
      url: '/tweets',
      data: $(this).serialize(),
     })
     .then(event)
     .then(() => {
      loadTweets();
     })


     this.reset();
  
  });
  
  const loadTweets = function() {
    $.ajax('/tweets', {method: 'GET'}).then(function (data) {
       renderTweets(data);
     })

     
  };
  loadTweets();
  
  

  $(".nav-button").click(() => {
    $(".new-tweet textarea").focus()
    $(".new-tweet").slideToggle();
    });
  
  
   
  
})