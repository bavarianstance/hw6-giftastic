var cars = ["Audi", "BMW", "Mercedes Benz", "Volkswagen", "Bugatti", "Aston Martin", "Mazda", "Honda", "Toyota", "Lexus", "Acura", "Nissan", "Infiniti", "Subaru", "Mitsubishi", "Hyundai", "Volvo", "Lamborghini", "Ferrari", "Porsche"]

function renderTags() {
	$("#tags").empty();
for (var i = 0; i < cars.length; i++){
	var newTag = $("<button>");
	newTag.addClass("carmake");
	newTag.attr("data-make", cars[i]);
	newTag.text(cars[i]);
	$("#tags").append(newTag);
  }
}

$("#add-tag").on("click", function(event) {

	event.preventDefault();

	var car = $("#tag-input").val().trim();
	cars.push(car);

	renderTags();

});

function renderGifs() {
	$("#imgs").empty();
	var make = $(this).attr("data-make");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        make + "&api_key=CwQQ9vOY5c6CbG9BjLDdCeH4kgr9Lbyy&limit=10";
 	
 	$.ajax({
 		url: queryURL,
 		method: "GET"
 	}).then(function(response){
 		var results = response.data;

 		for (var j = 0; j < results.length; j++){
 			var gifDiv = $("<div class=gifs>");
 			var makeImage = $("<img>");
 			var rating = results[j].rating
			var p = $("<p>").text("Rating: " + rating);
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