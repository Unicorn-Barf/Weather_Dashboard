
// load previous search buttons upon loading
searchButtons();

// Geocoding function to get lon & lat from user input
function geoCode(city, state) {
    // define fetch request URL
    let requestURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},US&appid=4bcac4085f133666bc3803dc7ed2e35c`
    // fetch request to convert to lon lat
    fetch(requestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Get Lon/Lat and call weather search function
            let lon = data[0].lon;
            let lat = data[0].lat;
            weatherSearch(lon, lat, city);
        })
};


// Weather Search Function API to one call weather
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
        console.log(data);
        displayWeather(data, city);
    })
}

// display weather function to dynamically create html elements
function displayWeather(data, city) {
    // show weather div and clear old html
    $("#today-weather").empty();
    $("#5day-forecast").empty();
    $("#weather-div").show();
    // display today's weather
    // Get Date moment from data
    let date = moment.unix(data.current.dt).format("M/D/YYYY");
    let todayDiv = $("#today-weather");
    let cityDate = $("<h2>").text(`${city} - ${date}`).css("display", "inline-block").addClass("mt-2");
    let iconLinkCurrent = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
    let currentImg = $("<img>").attr("src", iconLinkCurrent).css({"width": "auto", "height": "auto"});
    let temp = $("<p>").text(`Temp: ${data.current.temp} \xB0F`);
    let wind = $("<p>").text(`Wind: ${data.current.wind_speed} MPH`);
    let humidity = $("<p>").text(`Humidity: ${data.current.humidity}%`);
    // store uv index value as a data attribute to put corresponding background color
    let UVI = data.current.uvi;
    let level
        if (UVI < 3) {
            level = "low";
        }
        else if (UVI < 6) {
            level = "moderate";
        }
        else if (UVI < 8) {
            level = "high";
        }
        else if (UVI < 11) {
            level = "very-high";
        }
        else {
            level = "extreme";
        }
    let uvIndex = $(`<p>UV Index: <span data-uvi=${level}>${UVI}</span></p>`);
    todayDiv.append(cityDate, currentImg, temp, wind, humidity, uvIndex);

    // display 5 day forecast
    let foreDiv = $("#5day-forecast");
    for (i=1; i<6; i++) {
        // div for the card
        let foreCard = $("<div>").addClass("fore-card");
        let Date = moment.unix(data.daily[i].dt).format("M/D/YYYY");
        let foreDate = $("<h3>").text(`${Date}`);
        let iconLink = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`;
        let foreImg = $("<img>").attr("src", iconLink);
        let foreTempH = $("<p>").text(`High: ${data.daily[i].temp.max} \xB0F`);
        let foreTempL = $("<p>").text(`Low: ${data.daily[i].temp.min} \xB0F`);
        let foreWind = $("<p>").text(`Wind: ${data.daily[i].wind_speed} MPH`);
        let foreHumidity = $("<p>").text(`Humidity: ${data.daily[i].humidity}%`);
        foreCard.append(foreDate, foreImg, foreTempH, foreTempL, foreWind, foreHumidity);
        foreDiv.append(foreCard);
    }
}


// search button event
$("#search-btn").on("click", function(event) {
    event.preventDefault();
    // Format user input to capitalize city names
    let city = $("#city-search").val().trim().split(" ");
    for (i=0; i<city.length; i++) {
        city[i] = city[i][0].toUpperCase() + city[i].substr(1);
    };
    city = city.join(" ");
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
        citySearch = [{city: city, state: state}];
    }
    else {
        // check if search already exists return if it does exist
        for (i = 0; i < citySearch.length; i++) {
            if (city === citySearch[i].city && state === citySearch[i].state) {
                return;
            }
        }

        // update array if it doesn't exist
        citySearch.splice(0, 0, {city: city, state: state});
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
    // return if no data is store locally
    if (searchArr === null) {
        return;
    }
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

// event listener on history div for search history buttons
$("#history-div").on("click", ".btn", function(event) {
    let btnEl = event.target;
    geoCode($(btnEl).data("search").city, $(btnEl).data("search").state);
})