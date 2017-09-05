// Array of GIF topics

var topics = ["pizza", "tacos", "beer", "nachos", "BBQ", "cheese"];

// displayGIFs function re-renders the HTML to display the appropriate content

function displayGIFs() {

  var topic = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=b4b3b21c358b416d81cfdb99df5b34fd&limit=10";

  // Create AJAX call for specific movie button being clicked

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    // Creating a div to hold the GIF
    var gifDiv = $("<div class='topic'>");

    // Storing the rating data
    var rating = response.rating;

    // Creating an element to display rating
    var elem1 = $("<p>").text("Rating: " + rating);

    // Displaying the rating
    gifDiv.append(elem1);

    // Putting the GIF div above the previous GIFs
    $("#gifs-view").prepend(gifDiv);

  });

}

function renderButtons() {

  // Deleting existing movies before adding new movies
  $("#buttons-view").empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {

    // Generate buttons for each topic in the array
    var newBtn = $("<button>");

    // Add a class of topic to our button
    newBtn.addClass("topic");

    // Add a data attribute
    newBtn.attr("data-name", topics[i]);

    // Provide the initial button text
    newBtn.text(topics[i]);

    //Add button to the buttons-view div
    $("#buttons-view").append(newBtn);

  }

}

// This function handles events where a topic button is clicked
$("#add-topic").on("click", function(event) {
  
  event.preventDefault();

  // This line grabs the input from the text box
  var topic = $("#topic-input").val().trim();

  // Add topic from text box to array
  topics.push(topic);

  // Call renderButtons
  renderButtons();

});

// Add a click event listener to all elements with class "topic"
$(document).on("click", ".topics", displayGIFs);

// Call renderButtons function to display the initial buttons
renderButtons();