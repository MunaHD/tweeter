/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(() => {
  
  //function that makes the input is only text 
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
 
  //create new tweet with imported info
  const createTweetElement = (tweetObj) => {
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
  </article>`;
    return $tweet;
  };
  
  //render the tweets from the obj
  const renderTweets = function(tweets) {
    
    $('.tweets-container').empty();
    for (let tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      $('.tweets-container').prepend(newTweet);
    }
  };

  
  //get the tweets from the page upon submition 
  $('#add-tweet').submit(function(event) {
    //prevent the browser from refreshing
    event.preventDefault();
  
    //variables to hold the value of the tweet and an error message
    let singleTweet = $('#tweet-text').val();
    let errMessage = "";

    //check if the message is too long and send error if true
    if (singleTweet.length > 140) {
      errMessage = "You have entered too many characters.";
      
      return $(".err")
        .text(errMessage)
        .slideDown("fast", function() {
          setTimeout(() => {
            $(".err").slideUp("fast")
          }, 2000); 
        });
    
    //check if the input is emoty and return error if true
    } else if (singleTweet.length === 0) {
      errMessage = " Your tweet does not have any content.";
      
      return $(".err")
        .text(errMessage)
        .slideDown("fast", function () {
          setTimeout(() => {
            $(".err").slideUp("fast");
          }, 2000);
        });
      
    }
      
    
    //post the tweets to the page in real time
    $.ajax({
      method: 'post',
      url: '/tweets',
      data: $(this).serialize(),
    })
      .then(event)
      .then((tweets) => {
        loadTweets();
        
        $(".counter").val(140);
      })


     this.reset();
  
  });
  
  //takes the tweets from the form and passes the data to the rendertweets function 
  //and returns the tweets
  const loadTweets = function() {
    //console.log("load tweets")
    $.ajax('/tweets', {method: 'GET'}).then(function (data) {
       console.log("data", data)
       renderTweets(data);
     })   
  };

  loadTweets();
  
  
  // navbar button when presed will toggle the form open and closed\
  // and focus on the textarea so user can write
  $(".nav-button").click(() => {
    $(".new-tweet").slideToggle("slow")
    $(".new-tweet textarea").focus();
    });
  
  
   
  
})