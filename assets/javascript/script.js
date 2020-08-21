// Array of different foods
const comida = ["pizza", "bacon", "tacos", "sandwich", "queso", "nachos", "BBQ", "cheese", "sausage"];

// This function renders buttons for all the items in the array
function renderButtons() {
  // Delete existing comida before adding new comida
  $("#buttons-view").empty();

  // Looping through the array of comida
  for (let i = 0; i < comida.length; i++) {
    // Generate buttons for all the grub in the array
    let newBtn = $("<button>");

    // Add a class of grub to our button
    newBtn.addClass("grub");

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
  // Empty gifs-view div before dynamically adding new GIFs
  $("#gifs-view").empty();

  const grub = $(this).attr("data-name");
  const queryURL = `https://api.giphy.com/v1/gifs/search?q=${grub}&api_key=b4b3b21c358b416d81cfdb99df5b34fd&limit=10`;

  // Create AJAX call for specific grub button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(response => {
    for (let j = 0; j < 10; j++) {
      // Creating a div to hold the GIFs
      const gifDiv = $("<div class='col-md-5 rect'>");

      // Retrieving the GIFs
      const gifImage = response.data[j].images.fixed_height_still.url;
      const gifAction = response.data[j].images.fixed_height.url;

      // Creating an element to hold the GIFs
      const gifDisplay = $("<img>").attr({
        "src": gifImage,
        "data-still": gifImage,
        "data-animate": gifAction,
        "data-state": "still",
        "class": "epicGIF"
        });

      // Append the GIF
      gifDiv.append(gifDisplay);

      // Storing the rating data
      const rating = response.data[j].rating;

      // Creating an element to display rating
      const elem1 = $("<p>").text("Rating: " + rating.toUpperCase());

      // Displaying the rating
      gifDiv.append(elem1);

      // Putting the GIF div above the previous GIFs
      $("#gifs-view").prepend(gifDiv);
    }
  });
}

// This function starts/stops GIFs on click
function changeState() {
  // Grab the data-state of clicked image
  var state = $(this).attr("data-state");

  // If the clicked image's state is still, update its src attribute to what its data-animate value is. Then, set the image's data-state to animate.
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  // Else set src to the data-still value.
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}

// This function grabs user input to create new button
$("#add-grub").on("click", function(event) {
  // Prevent page from reloading upon user submit
  event.preventDefault();

  // This line grabs the input from the text box
  const grub = $("#grub-input").val().trim();

  // Check length of user input
  const inputLength = grub.length;

  // If user input not blank, add grub from text box to array
  if (inputLength > 0) {
    comida.push(grub);
  };

  // Call renderButtons
  renderButtons();

  // Clear input box after user input submitted
  $("#grub-input").val("");
});

// Add a click event listener to all elements with class "grub"
$(document).on("click", ".grub", displayGIFs);

// Add a click event listener to all elements with class "epicGIF"
$(document).on("click", ".epicGIF", changeState);

// Call renderButtons function to display the initial buttons
renderButtons();
