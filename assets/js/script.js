var cities = JSON.parse(localStorage.getItem("cities"));

// search button event
$("#search-btn").on("click", function(event) {
    event.preventDefault();
    let search = $("#city-search").val();
    console.log(search);
    // set input fields back to empty string
    $("#city-search").val('');
    // add search to local storage
    if (cities === null) {
        cities = [];
    }
    cities[cities.length] = search;
    console.log(cities);
    localStorage.setItem("cities", JSON.stringify(cities));
    // searchLibrary(search, searchType);
});