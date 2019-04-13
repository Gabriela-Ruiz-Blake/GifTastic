// Initial array of movies
var topics = ["Madrid", "London", "Paris", "Tokyo"];

// Function for dumping the JSON content for each button into the div
function displayGifInfo() {
  $("#display").empty();
  // create new variable that calls button name
  var GifName = $(this).attr("data-name");
  // search for button name in omdb and show info underneath
  var queryURL =
    "http://api.giphy.com/v1/gifs/search?q=" +
    GifName +
    "&api_key=PRLWrzdi6Mvo7R4W6jU7Eh7kVj0EO73V" +
    "&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    for (var i = 0; i < response.data.length; i++) {
      var gifDiv = $("<div class='gifDiv float-left'>");
      var rating = response.data[i].rating;
      var ratingInfo = $("<div class='rating'>").text("Rating: " + rating);
      
      var animated = response.data[i].images.fixed_height.url;
      var still = response.data[i].images.fixed_height_still.url;


      var gifImage = $("<img>").attr("src", still);
      gifImage.addClass("gif");
      gifImage.attr("data-still", still);
      gifImage.attr("data-animate", animated);
      gifImage.attr("data-state", "still");
      gifDiv.append(gifImage);
      $("#display").append(gifDiv);
      gifDiv.append(ratingInfo);
    }

    console.log(gifDisplay);
  });
}

  $(document).on("click", ".gif", function() {
    // Set the value of "data-state" attribute.
    console.log(this)
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate.
    // Else set src to the data-still value.
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
  }
  
});


// Function for displaying gifs
function renderButtons() {
  // Deleting the buttons prior to adding new topics
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of cities
  for (var i = 0; i < topics.length; i++) {
    // Then dynamicaly generating buttons for each city in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of gif to our button
    a.addClass("gif_button btn btn-outline-info ");
   
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  };
};

// This function handles events where one button is clicked
$("#add-gif").on("click", function(event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var city = $("#gif-input")
    .val()
    .trim();

  // The movie from the textbox is then added to our array
  topics.push(city);

  console.log(topics);
  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Generic function for displaying the movieInfo
$(document).on("click", ".gif_button", displayGifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();
