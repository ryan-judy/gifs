$(document).ready(function() {

	//declare variables
	var shows;
	var buttons;
	var response;
	var data;


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
	      console.log(response.data[0].images);
	      for (var i = 0; i < response.data.length; i++) {
	      var gifs = response.data[i];
	      var showDiv = $("<img><div class= 'show'>");
	      showDiv.prepend("Rating: " + gifs.rating + "<br>" );	      
	      showDiv.attr("src", gifs.images.original_still.url);
	      $(".show-view").append(showDiv);

	      }
	    });
	}

      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", ".show", loadShows);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();	

});