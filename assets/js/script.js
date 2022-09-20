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

