  // Adding click event listen listener to all buttons
  var animalAr = ["dog","rat","rabbit","lion","tiger","cow","snake"];
   
  for(var i =0; i<animalAr.length;i++){
    $("#animals").append("<button data-animal =" + animalAr[i] +">" + animalAr[i] + "</button>");
  // console.log(animalAr[i]);

}
   
  $("button").on("click", function() {
    // Grabbing and storing the data-animal property value from the button
    var animal = $(this).attr('data-animal');
      //console.log(animal);
    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=NqGXiZ1JTV8o4ZAtubeHmx4GmVFpdLSh&q=" + animal+"&limit=10&offset=0&rating=G&lang=en";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var animalDiv = $("<div class = 'animalstyle'>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var animalImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          animalImage.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and image tag to the animalDiv
          animalDiv.append(p);
          animalDiv.append(animalImage);

          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifs-appear-here").append(animalDiv);
        }
       
      }); $("#gifs-appear-here").empty();
  });
 