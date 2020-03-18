// weather api call URLS
var URLWeatherToday = "https://api.openweathermap.org/data/2.5/weather?q=";
var URLWeatherForecast = "https://api.openweathermap.org/data/2.5/forecast?q=";
var URLUVIndexToday = "https://api.openweathermap.org/data/2.5/uvi?appid=";

// needed for weather api
var key = "7beaf68a896729e45aa274746dd5eeda";

// get local storage city values and sort them. Name most recent one variable
var keys = Object.keys(localStorage);
    keys.sort(function(a, b){return b - a});
var entrantNbr = keys[0];

// store local storage values in array
var allValues = [];
for (var i = 0; i < keys.length; i++){
    allValues.push(localStorage.getItem(keys[i]))
}

// call functions getting weather with most recent search entrant from local storage and create buttons
grabWeather(entrantNbr);
createCityButtons();

// on click event for search button - sends entered value to local storage
$(".btn-primary").on("click", function(event) {
    var userInput = $("#input").val()

    // function to check existing values against user's input
    function checkCity(ckCity){
        return ckCity !== userInput;
    }
    
    // if statement to stop blank or duplicate values being added to local storage
    if (userInput !== '' && allValues.every(checkCity)) {
        var newCity = ($("#input").val());
        var keys = Object.keys(localStorage);
        entrantNbr = keys.length + 1;
        localStorage.setItem(entrantNbr,newCity);
    }
    else{
        grabWeather(0);
    }        
})

// clear local storage
$(".btn-danger").on("click",function(){
    localStorage.clear();
    location.reload();
})


// on click for created buttons
$(".btn-secondary").on("click",function(event){
    event.preventDefault();

    // grab which button's id being clicked, it correlates to local storage keys
    var cityKey = $(this).attr("id");
    
    // send the id to grabweather as city key
    grabWeather(cityKey);        
})


// create city buttons from local storage
function createCityButtons (){
    // Get local storage and sort it
    var keys = Object.keys(localStorage);
    keys.sort(function(a, b){return b - a});
    
    // cycle through local storage creating buttons with text of city name and assigning ID for it's key in local storage
    for (var i = 0; i < keys.length; i++ ){
        var cityName = (localStorage.getItem(keys[i]));
        var newButton = $("<button>" + cityName + "</button>");
        newButton.attr({"class":"btn","class":"btn-secondary","id":keys[i]});
        $(".buttonArea").append(newButton);
    }
}

// get local weather function
function grabWeather(keyValue){
        
    // If local storage is empty pull Nashville weather, else pull from local storage
    if (keyValue > 0 ){
        var city = localStorage.getItem(keyValue);
    }
    else{
        var city = "Nashville"
    }
    
    // create query urls with city
    var queryURLForecast = URLWeatherForecast + city + "&appid=" + key;
    var queryURLToday = URLWeatherToday + city + "&appid=" + key;
    
    // call 5 day forecast
    $.ajax({
        url: queryURLForecast,
        method: "GET"
    })
    .then(function(response){
        var weatherDates = ["bug",5,13,21,29,37]
        

        for (var i = 1; i < weatherDates.length; i++){
            $("#date" + i).text((response.list[weatherDates[i]].dt_txt).slice(6,10));
            $("#temp" + i).text("Temp: " + ((response.list[i].main.temp - 273.15) * 9/5 + 32).toFixed(1) + "F");
            $("#humidity" + i).text("Humidity: " + response.list[i].main.humidity + "%");
            var symbolURL = "http://openweathermap.org/img/wn/" + response.list[weatherDates[i]].weather[0].icon + "@2x.png";
            $("#symbolDay" + i).attr("src", symbolURL);     
        }    
    })

   
    // call weather today
    $.ajax({
        url: queryURLToday,
        method: "GET"
    })
    .then(function(response){
        // get temp, humidity, wind speed for today (convert to F) and post today's info
        $("#date0").text(city + ": " + moment().format('MMMM Do, YYYY'))
        $("#temp0").text("Temperature: " + ((response.main.temp - 273.15) * 1.80 + 32).toFixed(1) + "F");
        $("#humidity0").text("Humidity: " + response.main.humidity + "%");
        $("#ws0").text("Wind Speed: " + response.wind.speed);

        // get city location for UV api calls
        var lon = response.coord.lon;
        var lat = response.coord.lat;

        // create specific call for UV today and forecast UV
        var queryURLUVIndexToday = URLUVIndexToday + key + "&lat=" + lat + "&lon=" + lon;

        // call UV today
        $.ajax({
            url: queryURLUVIndexToday,
            method: "GET",
        })
        .then(function (response){
            $("#uv0").text("UV Index: " + response.value);
        })
    })
}
