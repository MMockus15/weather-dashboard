var cityInputEl = document.querySelector(".city-input");
var formEl = document.querySelector(".form");
var clearHistoryEl = document.querySelector(".clear-history");

// current data vars
var currentWeatherEl = document.querySelector(".current-weather-container");
var cityNameEl = document.querySelector(".city-name");
var currentDateEl = document.getElementById("date");
var currentIconEl = document.getElementById("icon");
var currentTempEl = document.getElementById("temperature");
var currentWindEl = document.getElementById("wind");
var currentHumidityEl = document.getElementById("humidity");
var historyEl = document.getElementById("history")

// five day forcast vars
var fiveDayEl = document.querySelector(".five-day-header")

// getting search history out of local storage
var searchHistory = JSON.parse(localstorage.getItem("search")) || [];

// assigning api key to variable 
var apiKey = "840e9ff38c70dacbffbb1d3e4e259ed7"; 


function fetchGeo(event) {
	event.preventDefault()
  var cityName = cityInputEl.value;
  fetch(
	"http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKey
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
	  var dayArray = [data.list[6], data.list[14], data.list[22], data.list[30], data.list[38]];
  
	  for (var i = 0; i < dayArray.length; i++) {
		  console.log(dayArray[i]);
	  }
    });

}
formEl.addEventListener("submit", fetchGeo);


var displayWeather = function(data) {
var { name } = data;
var { icon, description } = data.weather[0];
var { temp, humidity } = data.main;
var { speed } = data.wind;
console.log(name, icon, description, temp, humidity, speed);
}

// Yes. If you update the fetch url for fetchWeather, take a look at what data it returns and use that to add the days to your array.