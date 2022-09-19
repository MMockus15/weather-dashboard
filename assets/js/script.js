// create a request variable and assign a new object to it
var cityInputEl = document.querySelector(".city-input");
var formEl = document.querySelector(".form");

var apiKey = "d91f911bcf2c0f925fb6535547a5ddc9";

function fetchGeo(event) {
	event.preventDefault()
  var cityName = cityInputEl.value;
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
	fetchWeather(data[0].lat, data[0].lon)
    });
}
function fetchWeather(lat, lon) {
console.log(lat, lon)
fetch(
    `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=6&appid=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}
formEl.addEventListener("submit", fetchGeo);

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
