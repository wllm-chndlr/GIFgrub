// Array of GIF topics

var comida = ["pizza", "bacon", "tacos", "sandwich", "queso", "nachos", "BBQ", "cheese", "sausage", "cereal"];

// This function renders buttons for all the items in the array
function renderButtons() {

  // Delete existing comida before adding new comida
  $("#buttons-view").empty();

  // Looping through the array of comida
  for (var i = 0; i < comida.length; i++) {

    // Generate buttons for all the grub in the array
    var newBtn = $("<button>");

    // Add a class of grub to our button
    newBtn.addClass("grub btn-info");

    // Add a data attribute
    newBtn.attr("data-name", comida[i]);

    // Provide the initial button text
    newBtn.text(comida[i]);

    //Add button to the buttons-view div
    $("#buttons-view").append(newBtn);

  }

}

// This function displays GIFs and ratings based on button clicked
function displayGIFs() {
  
    $("#gifs-view").empty();
  
    var grub = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + grub + "&api_key=b4b3b21c358b416d81cfdb99df5b34fd&limit=10";
  
    // Create AJAX call for specific grub button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
  
      for (var j = 0; j < 10; j++) {
  
        // Creating a div to hold the GIFs
        var gifDiv = $("<div class='col-md-5 rect'>");
  
        // Retrieving the GIFs
        var gifImage = response.data[j].images.fixed_height_still.url;
        var gifAction = response.data[j].url;
        
  
        // Creating an element to hold the GIFs
  
        // var gifDisplay = $("<img class='epicGIF'>").attr("src", gifImage);
  
        var gifDisplay = $("<img>").attr({
          "src": gifImage,
          "data-still": gifImage,
          "data-animate": gifAction,
          "data-state": "still",
          "class": "epicGIF"
          });
        console.log(gifAction);
  
        // Append the GIF
        gifDiv.append(gifDisplay);
  
        // Storing the rating data
        var rating = response.data[j].rating;
        // Creating an element to display rating
        var elem1 = $("<p>").text("Rating: " + rating.toUpperCase());
        // Displaying the rating
        gifDiv.append(elem1);
  
        // Putting the GIF div above the previous GIFs
        $("#gifs-view").prepend(gifDiv);
  
      }
  
    });
  
}

// This function starts/stops GIFs on click
function changeState() {
  console.log(this);
  // Grab the data-state of clicked image
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

}

// This function handles events where a grub button is clicked
$("#add-grub").on("click", function(event) {

  event.preventDefault();

  // This line grabs the input from the text box
  var grub = $("#grub-input").val().trim();

  // Add grub from text box to array
  comida.push(grub);

  // Call renderButtons
  renderButtons();

});

// Add a click event listener to all elements with class "grub"
$(document).on("click", ".grub", displayGIFs);

// Add a click event listener to all elements with class "epicGIF"
$(document).on("click", ".epicGIF", changeState);

// Call renderButtons function to display the initial buttons
renderButtons();