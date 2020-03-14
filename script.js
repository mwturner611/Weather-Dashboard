// create variables
var city = "";


// add date to page
// localStorage.clear();

// on click event to get city name
$(".btn").on("click", function() {
    city = $("#input").val();

    var cityBtn = Object.keys(localStorage).length;

    localStorage.setItem(cityBtn,city);

    


})

$("#cityDate").append(city + ": " + moment().format('MMMM Do YYYY'));