var cities = JSON.parse(localStorage.getItem("cities"));



// Geocoding function to get lon & lat
function geoCode(city, state) {
    // define fetch request URL
    let requestURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},US&appid=4bcac4085f133666bc3803dc7ed2e35c`
    // fetch request to convert to lon lat
    fetch(requestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            // Get Lon/Lat and call weather search function
            let lon = data[0].lon;
            let lat = data[0].lat;
            weatherSearch(lon, lat);
        })
};


// Weather Search Function
function weatherSearch(lon, lat) {


    // define the URL
    let requestURL = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&units=imperial&q=${search}&appid=4bcac4085f133666bc3803dc7ed2e35c`

// API request for weather
}


// search button event
$("#search-btn").on("click", function(event) {
    event.preventDefault();
    let city = $("#city-search").val().trim();
    let state = $("#state-select").val();
    console.log(city, state);
    // set input fields back to empty string
    $("#city-search").val('');
    // add city search input to local storage
    if (cities === null) {
        cities = [];
    }
    cities[cities.length] = {
        city: city,
        state: state
    }
    console.log(cities);
    localStorage.setItem("cities", JSON.stringify(cities));
    // call my weather search function
    geoCode(city, state)
});