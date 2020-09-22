
var apiKey= "a4d8a766435d39d19416a58ba78c0da0";    
cities = [
        "San Diego",
        "Denver",
        "Miami",    
];  
var city = " ";     

function getCityInfo(city) {

    alert("getCityInfo" + city)
    var queryUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      apiKey;

    // update the current weather card using the result from the search display
    // a loading spinner so that the user knows something is happening
   
    // construct a url to search OpenWeatherAPI for the current weather in the
    // city
    var queryUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      apiKey;

    // send ajax request for current weather to OpenWeatherAPI
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (data) {
      // log the data from the api to the console
      console.log(data);
      // date

      // set the text of the #city-name h2 element using the city name in the
      // response
      $("#city-name").text(data.name + " Weather");
      
            // display the temperature, wind, and humidity in the elements found in
      // the html. (set the text)
      $(".card-text").text(" ");
    //   $("#temp").text(data.main.temp + "°");
    //   $("#wind").text(data.wind.speed + " mph");
    //   $("#humidity").text(data.main.humidity + " %");

      // create url for weather icon and save it in a variable
      var iconUrl =
        "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

      // create an img element and set its src equal to the icon url.
      var iconImg = $("<img>").attr({
        src: iconUrl,
        alt: data.weather[0].description,
      });
      // empty div #weather-icon and append the weather icon
      $("#weather-icon").empty().append(iconImg);
      
      // display the temperature, wind, and humidity in the elements found in
      // the html. (set the text)
    //   $("#temp").text(data.main.temp + "°");
    //   $("#wind").text(data.wind.speed + " mph");
    //   $("#humidity").text(data.main.humidity + " %");

    });
};

function loadCity(){
        
        // // get cities in local storage and add to array
        // for (j = 0; j < 5; j++) {
        
        //     var id = "city-" + j;
        //     var appointment = localStorage.getItem(id);

        //     // If I have a city in local storage
        //     if (appointment !== null) {
        //          $(this).children(".description").val(appointment);
        //     };

        // };
        
        // Delete array of cities prior to adding new city
        $("#city-view").empty();

        // Loops through the array of cities
        for (var i = 0; i < cities.length; i++) {
          // render city history buttons dynamically
          var a = $("<button>");
          // Adds a class of movie to our button
        //   a.addClass("city");
          // Added a data-attribute
          a.attr("data-name", cities[i]);
          a.attr("id", "city-selected");
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
        
            // get the JSON data from weather API
            getCityInfo(city); 
            // Add city to Local storage (array)
            cities.push(city);
            // load city history
            loadCity();
       

        };
    });

    // if city is clicked 
    $(document).on("click", "#city-selected", function() {
     // if search button is clicked - valid then go
        var city = $(this).text().trim();
        
        alert(city)
        getCityInfo(city);
        
        
    });

    loadCity();

