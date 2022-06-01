
// load previous search buttons upon loading
searchButtons();

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
            weatherSearch(lon, lat, city);
        })
};


// Weather Search Function
function weatherSearch(lon, lat, city) {
    // define the URL
    let requestURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=4bcac4085f133666bc3803dc7ed2e35c`

    // API request for weather
    fetch(requestURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // call function to display data
        displayWeather(data, city);
        console.log(data);
    })
}

// display weather function to dynamically create html elements
function displayWeather(data, city) {
    // show weather div and clear old html
    $("#today-weather").empty();
    $("#5day-forecast").empty();
    $("#weather-div").show();
    // display today's weather
    let date = moment.unix(data.current.dt).format("M/D/YYYY");
    let todayDiv = $("#today-weather");
    let cityDate = $("<h2>").text(`${city} ${date}`);
    let temp = $("<p>").text(`Temp: ${data.current.temp} F`);
    let wind = $("<p>").text(`Wind: ${data.current.wind_speed} MPH`);
    let uvIndex = $("<p>").text(`UV Index: ${data.current.uvi}`);
    todayDiv.append(cityDate, temp, wind, uvIndex);

    // display 5 day forecast
    let foreDiv = $("#5day-forecast");
    for (i=1; i<6; i++) {
        // div for the card
        let foreCard = $("<div>").addClass("fore-card");
        let Date = moment.unix(data.daily[i].dt).format("M/D/YYYY");
        let foreDate = $("<h3>").text(`${Date}`);
        let iconLink = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`;
        let foreImg = $("<img>").attr("src", iconLink);
        let foreTempH = $("<p>").text(`High Temp: ${data.daily[i].temp.max} F`);
        let foreTempL = $("<p>").text(`High Temp: ${data.daily[i].temp.min} F`);
        let foreWind = $("<p>").text(`Wind: ${data.daily[i].wind_speed} MPH`);
        let foreUVI = $("<p>").text(`UV Index: ${data.daily[i].uvi}`);
        foreCard.append(foreDate, foreImg, foreTempH, foreTempL, foreWind, foreUVI);
        foreDiv.append(foreCard);
    }
}


// search button event
$("#search-btn").on("click", function(event) {
    event.preventDefault();
    let city = $("#city-search").val().trim();
    let state = $("#state-select").val();
    // call function to store search data into local storage
    searchStore(city, state);
    // set input fields back to empty string
    $("#city-search").val('');
    // call my weather search function
    geoCode(city, state)
});

// function to handle local storage of cities
function searchStore(city, state) {
    // load local storage array of objects
    let citySearch = JSON.parse(localStorage.getItem("citySearch"));
    // if empty then initialize an array
    if (citySearch === null) {
        console.log("I'm null");
        citySearch = [{city: city, state: state}];
    }
    else {
        // check if search already exists return if it does exist
        for (i = 0; i < citySearch.length; i++) {
            if (city === citySearch[i].city && state === citySearch[i].state) {
                console.log("I'm returning");
                return;
            }
            console.log("I'm looping");
        }
        console.log(typeof citySearch);
        console.log("i'm hit");
        console.log({city: city, state: state});
        // update array if it doesn't exist
        citySearch.push({city: city, state: state});
    }
    // store new array into local storage
    localStorage.setItem("citySearch", JSON.stringify(citySearch));
    // call function to dynamical create buttons for past searches
    searchButtons();
 };

// Function to dynamically populate previous search buttons
function searchButtons() {
    // load search array from local storage
    let searchArr = JSON.parse(localStorage.getItem("citySearch"));
    // clear old buttons
    $("#history-div").empty();
    // create and append buttons for each previous search
    for (i=0; i<searchArr.length; i++) {
        let btnEl = $("<btn>")
            .addClass("btn btn-secondary w-100 my-2")
            .text(`${searchArr[i].city}, ${searchArr[i].state}`)
            .data("search", {city: searchArr[i].city, state: searchArr[i].state});
        $("#history-div").append(btnEl);
    }
}