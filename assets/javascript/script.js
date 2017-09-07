// Array of GIF topics

var comida = ["pizza", "tacos", "sandwich", "queso", "nachos", "BBQ", "cheese", "sausage", "cereal"];

// displayGIFs function re-renders the HTML to display the appropriate content

function displayGIFs() {

  $("#gifs-view").empty();

  var grub = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + grub + "&api_key=b4b3b21c358b416d81cfdb99df5b34fd&limit=10";
  // var clickedOnGif = false;

  // Create AJAX call for specific grub button being clicked

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    for (var j = 0; j < 10; j++) {

      // Creating a div to hold the GIFs
      var gifDiv = $("<div>");

      // Retrieving the GIFs
      var gifImage = response.data[j].images.fixed_height_still.url;
      var gifAction = response.data[j].images.fixed_width.url;

      // Creating an element to hold the GIFs
      var gifDisplay = $("<img class='static'>").attr("src", gifImage);
      // var gifDisplay = $("<img class='gif'>").attr("src", gifAction);
      // $('.gif').gifplayer();

      // Append the GIF
      gifDiv.append(gifDisplay);

      // Storing the rating data
      var rating = response.data[j].rating;
      // Creating an element to display rating
      var elem1 = $("<p>").text("Rating: " + rating);
      // Displaying the rating
      gifDiv.append(elem1);

      // Putting the GIF div above the previous GIFs
      $("#gifs-view").prepend(gifDiv);

      // $("<img>").click(function() {
      //   // $(gifImage).replaceWith(gifAction);
      //   gifDisplay = $("<img>").attr("src", gifAction);
      // });

      // $("<img>").wrap($('<a>',{
      //   href: 'response.data[j].url'
      // }));

      $('.static').click(function() {
        var src = $('.static').attr("src");
        // e.preventDefault();
        // $(this).attr('src', gifAction).addClass('moving');
        $(this).attr('src', src.replace(gifImage, gifAction)).addClass('moving');
        // $(this).attr('src', gifImage);
        var src2 = $('.moving').attr("src");
        $('.moving', this).attr('src', src2.replace(gifAction, gifImage));
      });




      // $('.moving').click(function() {
      //   $(this).attr('src', gifImage);
      // })

      // $(function() {
      //   $(".static").click(
      //       function() {
      //           $(this).attr("src", response.data[j].images.fixed_width.url);
      //       },
      //       function() {
      //           $(this).attr("src", response.data[j].images.fixed_height_still.url);
      //       }
      //   );
      // });

    }

  });

}

function renderButtons() {

  // Delete existing movies before adding new movies
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

// Call renderButtons function to display the initial buttons
renderButtons();