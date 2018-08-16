  // Adding click event listen listener to all buttons
  var animalAr = ["Wild dog", "Wolf","Monkey", 
  " Fox","Black Bear"," Polar Bear ","Otter","Ferret ",
  "Snake","Girafee","Lion","Tiger",
  "Elephant","Cheetah","Pandat","Gorilla","Camel","Deer","Meerkat" ];
  
    for(var i =0; i<animalAr.length;i++)
  {
       $("#animals").append("<button class = 'Button' data-animal =" + animalAr[i] +" >" + animalAr[i] + "</button>");
  }
 //add on buttonclick function
       onbuttonclick();

  $("#submit").on("click",function()
  {
      var userInput = $('#Data').val();
      $('#animals').append("<button class = 'Button' data-animal =" + userInput + " >" + userInput + "</button>");
      //console.log(animalAr);
      animalAr.push(userInput);
      
      $('#Data').val('');
      //add on buttonclick function
      onbuttonclick();
  });
  

  function onbuttonclick()
  {
    
    $(".Button").on("click", function() {
      // Grabbing and storing the data-animal property value from the button
      var animal = $(this).attr('data-animal');
      
      // Constructing a queryURL using the animal name
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=NqGXiZ1JTV8o4ZAtubeHmx4GmVFpdLSh&q=" + animal+"&limit=10&offset=0&rating=G&lang=en";

      // Performing an AJAX request with the queryURL
      $.ajax({
      url: queryURL,
      method: "GET"
      })
      // After data comes back from the request
        .then(function(response)
       {
        
        // storing the data from the AJAX request in the results variable
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) 
            {
            // Creating and storing a div tag
                var animalDiv = $("<div class = 'animalstyle'>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                //creat image variable to hold image data
                var image = '<img src= " ' + results[i].images.fixed_height_still.url +
                '" data-still=" ' + results[i].images.fixed_height_still.url +
                ' " data-animate=" ' + results[i].images.fixed_height.url + '" data-state="still" class="movImage">';

                image = '<div class="col-md-4">' + image + "</div>";

                // Appending the paragraph and image tag to the animalDiv
                animalDiv.append(p);
                animalDiv.append(image);


                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs-appear-here").append(animalDiv);

            }
            //add imageclick function
          imageClick();

        });

       $("#gifs-appear-here").empty();

    });
}

function imageClick(){
  $('.movImage').on('click', function() {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).attr("data-animate"));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).attr("data-still"));
        $(this).attr('data-state', 'still');
    }

}); 
}