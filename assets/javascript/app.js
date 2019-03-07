var cars = ["Audi", "BMW", "Mercedes Benz", "Volkswagen", "Bugatti", "Aston Martin", "Mazda", "Honda", "Toyota", "Lexus", "Acura", "Nissan", "Infiniti", "Subaru", "Mitsubishi", "Hyundai", "Volvo", "Lamborghini", "Ferrari", "Porsche"]

function renderTags() {
	$("#tags").empty();
for (var i = 0; i < cars.length; i++){
	var newTag = $("<button class='btn btn-info'>");
	newTag.addClass("carmake");
	newTag.attr("data-make", cars[i]);
	newTag.text(cars[i]);
	$("#tags").append(newTag);
  }
}

//add tag function with on click listener
$("#add-tag").on("click", function(event) {

	event.preventDefault();
	var car = $("#tag-input").val().trim();
	//checks to see if userInput already exists
	for (var k = 0; k < cars.length; k++){
		if (car.toLowerCase() === cars[k].toLowerCase()) {
			return;
		}
	}
	// checks to see if there's any userInput before executing
	if (car) {
		cars.push(car);
		renderTags();
	};

});
//renderGifs function
function renderGifs() {
	$("#imgs").empty();
	var make = $(this).attr("data-make");
	//queryURL specification with randomize feature
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        make + "&api_key=CwQQ9vOY5c6CbG9BjLDdCeH4kgr9Lbyy&limit=10&offset=" + Math.floor(Math.random() * 10);
 	//AJAX call
 	$.ajax({
 		url: queryURL,
 		method: "GET"
 		// promise call back function
 	}).then(function(response){
 		var results = response.data;

 		for (var j = 0; j < results.length; j++){
 			var gifDiv = $("<div class=gifs>");
 			var makeImage = $("<img>");
 			var rating = results[j].rating
			var p = $("<p>").text("Rating: " + rating);
			//define default gif state and onclick animation start/stop functionality
 			  makeImage.attr("src", results[j].images.fixed_height_still.url);
 			  makeImage.attr("data-still", results[j].images.fixed_height_still.url);
 			  makeImage.attr("data-state", "still");
 			  makeImage.addClass("gif");
 			  makeImage.attr("data-animate", results[j].images.fixed_height.url);
 			gifDiv.append(makeImage);
 			gifDiv.append(p);
 			$("#imgs").prepend(gifDiv);  
 		}
 	})

 };

 $(document).on("click", ".gif", function(){
 	var state = $(this).attr("data-state");
 		if (state === "still"){
 			$(this).attr("src", $(this).data("animate"));
 			$(this).attr("data-state", "animate");
 		} else {
 			$(this).attr("src", $(this).data("still"));
 			$(this).attr("data-state", "still");
 		}
 });

 $(document).on("click", ".carmake", renderGifs);

renderTags();