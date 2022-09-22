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
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

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


			for (var i = 0; i < 5; i++) {
				var cityTitle = document.createElement("h3");
				var currentDate = document.createElement("h3");
				var currentIcon = document.createElement("h3");
				var currentTemp = document.createElement("p");
				var currentWind = document.createElement("p");
				var currentHumidity = document.createElement("p");
				var fiveDay = document.createElement("card")
				cityTitle.textContent = data[i].name;

				cityNameEl.append(cityTitle);
				currentHumidityEl.append(currentWind);
				currentWindEl.append(currentTemp);
				currentTempEl.append(currentIcon);
				currentIconEl.append(currentDate);
				currentDateEl.append(fiveDay);

				// append frm buttom up- humidty to wind, wind to temp, temp to icon, icon to date, date to 5 day card
			}
		});

}
formEl.addEventListener("submit", fetchGeo);


var displayWeather = function (data) {
	var { name } = data;
	var { icon, description } = data.weather[0];
	var { temp, humidity } = data.main;
	var { speed } = data.wind;
	console.log(name, icon, description, temp, humidity, speed);

}

// Yes. If you update the fetch url for fetchWeather, take a look at what data it returns and use that to add the days to your array.

// take collected data and create associated list item, then append to <ul>
