$(document).ready(function() {

	var shows;
	var response;
	var data;
	var showDiv = false;
	var click = 0;

	var buttons = $("#buttons");

	shows = [
		"Games of Thrones",
		"Veep",
		"Sillicon Valley",
		"Master of None",
		"The Handmaid's Tale",
		"Bob's Burgers",
		"The Great British Baking Show",
		"Ru Paul's Drag Race"
	]

    function renderButtons() {
        buttons.empty();
        for (var i = 0; i < shows.length; i++) {
          var a = $("<button class = btn>");
          a.addClass("show");
          a.attr("data-name", shows[i]);
          a.text(shows[i]);
          buttons.append(a);
        }
    }

    $(".add-show").on("click", function(event) {
		event.preventDefault();
		var newShow = $(".show-input").val()
		shows.push(newShow);
		renderButtons();
	});

    renderButtons();	

	function loadShows() {
		$(".show-view").empty();
		var show = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&limit=10&api_key=dc6zaTOxFJmzC";
	    var showCall = $.get(queryURL);
	    	showCall.done(function(response) {

		      	for (var i = 0; i < response.data.length; i++) {
			      var data = response.data[i];
				      showDiv = $("<div class= 'gifs'>");
				      gifDiv = $("<img>");
				      gifDiv.attr("src", data.images.fixed_height_still.url);
				      gifDiv.addClass("gif-style");
				      gifDiv.attr("data-name", i);		      
				      showDiv.append(gifDiv);
				      showDiv.prepend("<h3>Rating: " + data.rating + "</h3>" );

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
			});
	}

      $(document).on("click", ".show", loadShows);

});