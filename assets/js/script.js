var savID = 0;
var lastCity = " ";
var apiKey = "a4d8a766435d39d19416a58ba78c0da0";
cities = [""];
var city = " ";

function getCityInfo(city) {


  var queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey;

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



    // today's date
    var today = moment(new Date()).format("L");

    // build current weather card
    $("#city-name").text(data.name + " " + today)
    // display the temperature, wind, and humidity 
    var tempDiv = $("<p>").attr("class", "card-text").text("Temperature: " + data.main.temp + " °F");
    var humidityDiv = $("<p>").attr("class", "card-text").text("Humidity: " + data.main.humidity + "%");
    var windDiv = $("<p>").attr("class", "card-text").text("Wind Speed: " + data.wind.speed + " MPH");

    // create url for weather icon and save it in a variable
    var iconUrl =
      "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

    // create an img element and set its src equal to the icon url.
    var iconImg = $("<img>").attr({
      src: iconUrl,
      alt: data.weather[0].description,
    });
    // empty div #weather-icon and append the current weather
    //    $("#weather-icon").empty().append(iconImg,tempDiv,humidityDiv,windDiv);


    // construct a url to search OpenWeatherAPI for UV index
    var queryUrl =
      "https://api.openweathermap.org/data/2.5/uvi?lat=" +
      data.coord.lat +
      "&lon=" +
      data.coord.lon +
      "&appid=" +
      apiKey;


    // send ajax request for UV index to OpenWeatherAPI
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (data2) {
      // log the data from the api to the console

      if (parseInt(data2.value) < 3) {
        uvDiv = $("<p>").attr("class", "card-text text-success").text("UV Index: " + data2.value);
      } else if (parseInt(data2.value) >= 6) {
        uvDiv = $("<p>").attr("class", "card-text text-danger").text("UV Index: " + data2.value);
      } else {
        uvDiv = $("<p>").attr("class", "card-text text-warning").text("UV Index: " + data2.value);
      };
      // date
      $("#weather-icon").empty().append(iconImg, tempDiv, humidityDiv, windDiv, uvDiv);
       getFiveDay(city);

    });
  });
};

function getFiveDay(city) {
  var queryUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey;

  // send ajax request for UV index to OpenWeatherAPI
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (data3) {

    // grab a reference to the card container
    var cardContainer = $("#card-5day");

    var h3Div = $("<h3>5 Day Forecast</h3>");
    $(".five-day").append(h3Div);

    cardContainer.empty();

    // loop to get 5 day data
    for (i = 0; i < 40; i += 8) {
      var iconUrl =
        "https://openweathermap.org/img/wn/" + data3.list[i].weather[0].icon + ".png";

      var iconImg = $("<img>").attr({
        src: iconUrl,
        alt: data3.list[i].weather[0].description,
      });

      //format date 2020-09-22 03:00:00
      var day = data3.list[i].dt_txt.split("-")[2].split(" ")[0];
      var month = data3.list[i].dt_txt.split("-")[1];
      var year = data3.list[i].dt_txt.split("-")[0];
      var dateFmt = month + "/" + day + "/" + year

      // build 5 day cards 
      var cardTitle = $("<h5>").text(dateFmt).addClass("card-title");
      var cardBody = $("<div class='card bg-primary text-light'></div>");
      cardBody.append(cardTitle);
      var temp5Div = $("<p>").attr("class", "card-text").text("Temp: " + data3.list[i].main.temp + " °F");
      var humidity5Div = $("<p>").attr("class", "card-text").text("Humidity: " + data3.list[i].main.humidity + "%");
      var card = $("<div class='card bg-primary text-light'></div>");
      card.append(cardBody, iconImg, temp5Div, humidity5Div);
      var col = $("<div class='col'></div>");
      col.append(card);
      cardContainer.append(col);

    };
  });
};

function loadCity() {

  $("#city-view").empty();
  cities = [""];

  // get cities in local storage and add to array
  for (idCity = 0; idCity < 20; idCity++) {

    //If I have a city in local storage
    if (localStorage.getItem(idCity) !== null) {
    
      cities.push(localStorage.getItem(idCity));
      savID = idCity

    };
  };

  // Delete array of cities prior to adding new city
  $("#city-view").empty();
  $("#city-selected").empty();
  // Loops through the array of cities
  for (var i = 0; i < cities.length; i++) {

    // render city history buttons dynamically
    var a = $("<button>");
    a.attr("data-name", cities[i]);
    a.attr("id", "city-selected");
    a.text(cities[i]);
    $("#city-view").append(a);

    // save last city for when page is reloaded
    lastCity = cities[i];

  }
};

// if search button is clicked - valid then go
$(document).on("click", ".city-search", function (event) {
  event.preventDefault();

  // This line of code will grab the input from search
  var city = $("#city-input").val().trim();

  if (city != "") {

    // get the JSON data from weather API
    getCityInfo(city);
    // load city history
    var savThis = 0;
    // increment to save to local storage
    savThis = savID + 1
    // add to local storage
    localStorage.setItem(savThis, city);
    // load city history
    loadCity();

  };
});

// if city is clicked 
$(document).on("click", "#city-selected", function () {
  // if search button is clicked - valid then go
  var city = $(this).text().trim();

  getCityInfo(city);

});

loadCity();
getCityInfo(lastCity);