$(document).ready(function() {

  var Topics = ["Cars","Clothing","Trucks","Healthcare","Groceries","Gas","Transportation", "Daycare","Restaurants","Holidays","Toys","Pets","Kids"];


  // Function for dumping the JSON content for each button into the div
      function displayTopicInfo() {

        var topic = $(this).attr("data-name");
       // var state = $(.gifs).data("state");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          console.log(queryURL);
          console.log(response);
          // storing the data from the AJAX request in the results variable
          $("#pictures").empty();
          var results = response.data;
          // Looping through each result item
          for (var i = 0; i < results.length; i++) {
            // Creating and storing a div tag
            var topicDiv = $("<div>");
            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);
            // Creating and storing an image tag
            var topicImage = $("<img>");
                topicImage.addClass("gif");
            // Setting the src attribute of the image to a property pulled off the result item
            topicImage.attr("src", results[i].images.fixed_height.url);
            topicImage.attr("data-animate", results[i].images.fixed_height.url);
            topicImage.attr("data-still", results[i].images.fixed_height_still.url);
            topicImage.attr("data-state", "animate");


            // Appending the paragraph and image tag to the topicDiv
            topicDiv.append(p);
            topicDiv.append(topicImage);
            // Prependng the topicDiv to the HTML page in the "#pictures" div
            $("#pictures").prepend(topicDiv);

             RenderButtons();

          }
         
        });

        
      }





     function RenderButtons(){

  	   $("#buttons").empty();


  	// Looping through the array of topics
        for (var i = 0; i < Topics.length; i++) {
         
        // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("topic");
          // Adding a data-attribute
          a.attr("data-name", Topics[i]);
          // Providing the initial button text
          a.text(Topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons").append(a);
        
      


         }



}

// This function handles events where one button is clicked
      $("#add-topic").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var topic = $("#topic-input").val().trim();
        // Adding the movie from the textbox to our array
        Topics.push(topic);
        console.log(Topics);
        // Calling renderButtons which handles the processing of our movie array
        RenderButtons();
      });








// Function for displaying the movie info
      // Using $(document).on instead of $(".topic").on to add event listenersto dynamically generated elements
      $(document).on("click", ".topic", displayTopicInfo);
      // Calling the renderButtons function to display the intial buttons
      RenderButtons();

      $(document).on("click",".gif", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      //var state = $(this).attr("data-state");
      var state = $(this).attr("data-state");
      console.log(state);
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
    });





});