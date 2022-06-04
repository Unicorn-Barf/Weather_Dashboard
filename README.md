# Weather Dashboard Web App
​
## Table of contents
​
- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)
​
​
## Overview
​
### The challenge
​
The project is a simple web application for searching weather in the United States.  It utilizes the Open Weather One Call API and their geocoding API to fetch weather data from user input.  It is built with HTML, CSS, and JavaScript to dynamically display weather data and to store past user searches.  An added feature using past search data store on local storage dynamically creates buttons so that the user can quickly see weather data of past searches.
​
### User Story
​
```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```
​
### Acceptance Criteria
​
```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```
​
### Screenshot
​
![Website gif](./assets/images/website.gif)
​
​
### Links
​
- Solution URL: [https://github.com/Unicorn-Barf/Weather_Dashboard](https://github.com/Unicorn-Barf/Weather_Dashboard)
- Live Site URL: [https://unicorn-barf.github.io/Weather_Dashboard/](https://unicorn-barf.github.io/Weather_Dashboard/)
​
## My process
​
### Built with
​
- HTML5
- CSS
- Bootstrap
- JavaScript
​
​
### What I learned
​
This project provided one of my first experiences utilizing APIs and the built in JavaScipt fetch API.  One of my first challenges was to read the Open Weather One Call API documentation to figure out how I can access the data that I needed.  Another difficult feature I needed to implement was a color coded background for the UV index data displayed on the current weather card.  I am proud of what I was able to accomplish and have a breakdown of these two challenging aspects of this web app below.


By reading the API documentation, I realized in order to use the free One Call weather API, it was neccessary to fetch weather by longitude and latititude.  I perused the documentation and found the same API provider also had a free geocoding service API that would convert the user input as city and state to longitude and latitude.  I implemented two fetch calls to get the appropriate data that I needed.  I am proud of the way I was able to incorporate user input into my fetch request URL parameters to effectively get the correct data.  Also, this taught me how to `console.log(data)` to observed the returned promise object and properly target the specific data I needed.  Below is an example of my fetch request code:

```js
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
        displayWeather(data, city);
    })
}

```
​
An additional feature I was proud of utilized data atributes and CSS skills to conditionally change the background of the UV index value on the current weather card.  This was a challenge at first because the element for UVI was dynamically created and I needed to come up with a way to be able to target its CSS properties depending on the value.  I decided to use data attribute properties assigned to a `<span>` element holding the UVI value.  By doing this, I could specifically target the number value background and not the whole `<p>` tag element.  With data attributes, I could specifically target them in my CSS file depending on their level indicated.  Here is the javascript I used to assign the data attribute vales depending on UVI level.

```js
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
```

​
### Continued development
​
After taking on the challenges provided by this simple web app, I am inpsired to find innovataive ways to implement APIs.  I realize that future project development will heavily utilize APIs for functionality.  Lastly, I am very excited to learn about setting up and using servers to not only improved user experience, but also to handle secure imformation.  Many of my previously built apps would improve with handling user data and login credentials.
​
### Useful resources
​
- [Open Weather One Call API docs](https://openweathermap.org/api/one-call-3) - This is the documentation to use the Open Weather One Call API.
- [EPA UV Index Guide](https://www.epa.gov/sites/default/files/documents/uviguide.pdf) - This is the EPA's guide to UV indexes.  I got my severity color codes from this guide.
- [MDN's Data Atrribute Docs](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) - MDN's documentation on data attributes and how to utlize them in your CSS code.
- [Special Symbols for HTML & JavaScript](http://www.javascripter.net/faq/mathsymbols.htm) - I used this as a reference to get the hexidecimal code for the degree symbol to use in my JS file.  It has many special characters in HexCode, Numeric, HTML, escape, and encodeURI formats.
- [Blog Post: How to capitalize first letter of each word in a string](https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/) - This helped me figure out how to take my user input for the city search input and make sure the city name was capitolized even for cities with multiple word names.
​
## Author
​
- Website - [Nolan Spence](https://unicorn-barf.github.io/Portfolio_Website_HTML_CSS/)
- LinkedIn - [https://www.linkedin.com/in/aerospence/](https://www.linkedin.com/in/aerospence/)
​
## Acknowledgments
​
Thank you to Nifer for pointing out my current weather had no conditions icon on it!!