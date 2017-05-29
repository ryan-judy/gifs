$(document).ready(function() {

	//declare variables
	var shows;
	var buttons;
	var response;
	var data;
	var showDiv = false;
	var newDiv = true;
			      var click = 0;



	//declare jQuery
	buttons = $("#buttons");


	//declare array of tv shows
	shows = [
		"Games of Thrones",
		"Veep",
		"Sillicon Valley",
		"Master of None",
		"The Handmaid's Tale",
		"Bob's Burgers",
		"The Great British Baking Show",
		"Big Little Lies",
		"The Get Down"
	]

	//loop through array to create buttons
      function renderButtons() {
        buttons.empty();
        // Loops through the array of movies
        for (var i = 0; i < shows.length; i++) {
          var a = $("<button>");
          a.addClass("show");
          a.attr("data-name", shows[i]);
          a.text(shows[i]);
          buttons.append(a);
        }
      }


	//function to call gify api
	function loadShows() {
		$(".show-view").empty();
		var show = $(this).attr("data-name");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + show + "&limit=10&api_key=dc6zaTOxFJmzC";
    
	    var showCall = $.get(queryURL);
	    showCall.done(function(response) {
			console.log(response)
	      	for (var i = 0; i < response.data.length; i++) {
		      var gifs = response.data[i];
		      showDiv = $("<div class= 'gifs'>");
		      gifDiv = $("<img>");
		      gifDiv.attr("src", gifs.images.fixed_height_still.url);
		      gifDiv.addClass("gif-style");
		      gifDiv.attr("data-name", i);		      
		      showDiv.append(gifDiv);
		      showDiv.prepend("Rating: " + gifs.rating + "<br>" );
		    $(".show-view").append(showDiv);
			    gifDiv.on("click", function () {
			      var number = $(this).attr("data-name");
			      click++;
			      $(this).attr("src", response.data[number].images.fixed_height.url);
		      	    	if (click > 1) {
			      			$(this).attr("src", response.data[number].images.fixed_height_still.url);
			      			click = 0;
			      		} 
			})
		    }

			$(".add-show").on("click", function(event) {
		       	event.preventDefault();
		       	var newShow = $(".show-input").val()
		       	shows.push(newShow);
		       	renderButtons();
		      	});

		});
	}


      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", ".show", loadShows);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();	

});