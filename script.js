// create variables
var city = "";


// add date to page
// localStorage.clear();

// on click event to get city name
// $(".btn").on("click", function() {
//     city = $("#input").val();

//     var cityBtn = Object.keys(localStorage).length;

//     localStorage.setItem(cityBtn,city);

    


// })

// $("#cityDate").append(city + ": " + moment().format('MMMM Do YYYY'));

var URLWeatherToday = "https://api.openweathermap.org/data/2.5/weather?q=";
var URLWeatherForecast = "https://api.openweathermap.org/data/2.5/forecast?q=";
var URLUVIndexForecast = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid="; 
var URLUVIndexToday = "http://api.openweathermap.org/data/2.5/uvi?appid="
var city = "Nashville";
var key = "7beaf68a896729e45aa274746dd5eeda";


var queryURLToday = URLWeatherToday + city + "&appid=" + key;
var queryURLForecast = URLWeatherForecast + city + "&appid=" + key;

$.ajax({
    url: queryURLForecast,
    method: "GET"
})
.then(function(response){
    console.log(response);
})

$.ajax({
    url: queryURLToday,
    method: "GET"
})
.then(function(response){
    console.log("Temp " + response.main.temp);
    console.log("Humidity " + response.main.humidity);
    console.log("Wind Speed " + response.wind.speed);
    console.log(response.coord.lon);
    console.log(response.coord.lat);

    var lon = response.coord.lon;
    var lat = response.coord.lat;

    var queryURLUVIndexForecast = URLUVIndexForecast + key + "&lat=" + lat + "&lon=" + lon + "&cnt=" + 4;

    var queryURLUVIndexToday = URLUVIndexToday + key + "&lat=" + lat + "&lon=" + lon;

    $.ajax({
        url: queryURLUVIndexForecast,
        method: "GET",
    })
    .then(function (response){
        console.log(response);
    })
    
    
    $.ajax({
        url: queryURLUVIndexToday,
        method: "GET",
    })
    .then(function (response){
        console.log("UV Index " + response.value);
    })


})



// "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=7beaf68a896729e45aa274746dd5eeda&lat=36.17&lon=-86.78&cnt=1"

