cities = [
        "San Diego",
        "Denver",
        "Miami",    
];       

function getCityInfo() {

};
    
function loadCity(){
    
// var countries = ['United States', 'Canada', 'Argentina', 'Armenia'];
// var cList = $('ul.mylist')
// $.each(countries, function(i)
// {
//     var li = $('<li/>')
//         .addClass('ui-menu-item')
//         .attr('role', 'menuitem')
//         .appendTo(cList);
//     var aaa = $('<a/>')
//         .addClass('ui-all')
//         .text(countries[i])
//         .appendTo(li);
// });
        // Delete array of cities prior to adding new city
        $("#city-view").empty();
        // Loops through the array of cities
        for (var i = 0; i < cities.length; i++) {
          // render city history buttons dynamically
          var a = $("<button>");
          // Adds a class of movie to our button
          a.addClass("city");
          // Added a data-attribute
          a.attr("data-name", cities[i]);
          // Provided the initial button text
          a.text(cities[i]);
          // Added the button to the buttons-view div
          $("#city-view").append(a);
        }
};

    // if search button is clicked - valid then go
    $(document).on("click", ".city-search", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var city = $("#city-input").val().trim();

        if (city != "") {
        
            alert(city);
            // get the JSON data from weather API
            getCityInfo(); 
            // Add city to Local storage (array)
            cities.push(city);
            // load city history
            loadCity();
            // var cityDiv = $("<LI>");
            // // Creates an element to have the rating displayed
            // var cityDiv = $("<p>").text("Rating : "+ response.Rated);
            // var releaseDiv = $("<p>").text("Release : "+ response.Released);
            // var plotDiv = $("<p>").text("Plot : " +response.Plot);
            // var posterDiv = $("<img>").attr("src", response.Poster).attr("alt", "Movie Poster")
            // movieDiv.append(ratingDiv,releaseDiv,plotDiv, posterDiv);
            // $("#city-view").append(cityDiv);  
            // $("#city-view").append('<li><a href="#">New list item</a></li>');
            

        };
    });

    // if city is clicked 
    $(document).on("click", ".city-selected", function() {
     // if search button is clicked - valid then go
        getCityInfo();
        
    });

    loadCity();
