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
![](./screenshot.jpg)
​
Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.
​
Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it.
​
Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.
​
**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**
​
### Links
​
- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)
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
After taking on the challenges provided by this simple web app, I am inpsired to find innovataive ways to implement APIs.  
​
### Useful resources
​
- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.
​
**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**
​
## Author
​
- Website - [Add your name here](https://www.your-site.com)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)
​
**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**
​
## Acknowledgments
​
This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.
​
**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**