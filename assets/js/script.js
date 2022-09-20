// create a request variable and assign a new object to it
var cityInputEl = document.querySelector(".city-input");
var formEl = document.querySelector(".form");
// d91f911bcf2c0f925fb6535547a5ddc9

var apiKey = "840e9ff38c70dacbffbb1d3e4e259ed7";


function fetchGeo(event) {
	event.preventDefault()
  var cityName = cityInputEl.value;
  fetch(
	"http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid-" + apiKey
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
	fetchWeather(data[0].lat, data[0].lon)
    });
}



function fetchWeather(lat, lon, cityName) {
console.log(lat, lon)
fetch(
    "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&cnt=6&appid=" + apiKey
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });

	var dayArray = [data.list[6], data.list[14], data.list[22], data.list[30], data.list[38]];

	for (var i = 0; i < dayArray.length; i++) {
		console.log(dayArray[i]);
	}
}
formEl.addEventListener("submit", fetchGeo);
