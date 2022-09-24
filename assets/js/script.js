var cityInputEl = document.querySelector(".city-input");
var formEl = document.querySelector(".form");

// clear history vars
var historyEl = document.getElementById("history");
var clearHistoryEl = document.querySelector(".clear-history");

// current data var
var currentWeatherEl = document.querySelector(".current-weather-container");

// five day forcast var
var fiveDayContainer = document.querySelector(".five-day-container");

// assigning api key to variable
var apiKey = "d91f911bcf2c0f925fb6535547a5ddc9";

function fetchGeo(cityName) {
  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      cityName +
      "&appid=" +
      apiKey
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      fetchWeather(data[0].lat, data[0].lon, data[0].name);
    });
}

function fetchWeather(lat, lon, cityName) {
  console.log(lat, lon);
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayWeather(data);
      currentWeather(data, cityName);
    });
}


function displayWeather(data) {
  for (var i = 0; i < 5; i++) {
    // create elements

    var currentDate = document.createElement("h3");
    var currentIcon = document.createElement("img");
    var currentTemp = document.createElement("p");
    var currentWind = document.createElement("p");
    var currentHumidity = document.createElement("p");
    var card = document.createElement("div");
	card.setAttribute("class", "p-4");
    currentDate.textContent = convertDate(data.daily[i].dt);
    currentIcon.src = `https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`;
    currentTemp.textContent = `Temp: ${data.daily[i].temp.day}°F`;
    currentWind.textContent = `Wind: ${data.daily[i].wind_speed}`;
    currentHumidity.textContent = `Humidity: ${data.daily[i].humidity}`;

	fiveDayContainer,innerHtml = ""
    card.append(
      currentDate,
      currentIcon,
      currentTemp,
      currentWind,
      currentHumidity
    );
    fiveDayContainer.append(card);
  }
}

function currentWeather(data, city) {

  var cityName = document.createElement("h1");
  cityName.setAttribute("class", "m-4");
  var currentDate = document.createElement("h3");
  currentDate.setAttribute("class", "m-4");
  var currentIcon = document.createElement("img");
  currentIcon.setAttribute("class", "m-4");
  var headerCurrentEl = document.querySelector(".headerCurrentEl");

  var currentTemp = document.createElement("p");
  currentTemp.setAttribute("class", "m-2");
  var currentWind = document.createElement("p");
  currentWind.setAttribute("class", "m-2");
  var currentHumidity = document.createElement("p");
  currentHumidity.setAttribute("class", "m-2");
  var currentUVIndex = document.createElement("p");
  currentUVIndex.setAttribute("class", "m-2");
  cityName.textContent = city;
  currentDate.textContent = convertDate(data.current.dt);
  currentIcon.src = `https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`;
  currentTemp.textContent = `Temp: ${data.current.temp}°F`;
  currentWind.textContent = `Wind: ${data.current.wind_speed}`;
  currentHumidity.textContent = `Humidity: ${data.current.humidity}`;
  currentUVIndex.text = `UV Index: ${data.current.uvi}`;

  headerCurrentEl.innerHtml = ""
  headerCurrentEl.append(
	  cityName,
	  currentDate,
	  currentIcon,
	  )
  currentWeatherEl.append(
	headerCurrentEl,
    currentTemp,
    currentWind,
    currentHumidity,
    currentUVIndex
  )
}

function convertDate(date) {
	var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
  return new Date(date * 1000).toLocaleDateString("en-US");
}

// get history from local storage
formEl.addEventListener("submit", function(event) {
	event.preventDefault()
var searchTerm = cityInputEl.value;
console.log(searchTerm);
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
console.log(searchHistory);
searchHistory.push(searchTerm);
var finalSearchHistory = [...new Set(searchHistory)];
// push array thru new set, takes array and runs thru it without any duplicates
localStorage.setItem("search", JSON.stringify(finalSearchHistory));
fetchGeo(searchTerm);
renderSearchHistory();
})

function renderSearchHistory() {
	// remove all children of div that buttons are in/remove siblings
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
console.log(searchHistory);
for (let i = 0; i < searchHistory.length; i++) {
var historyInputBtn = document.createElement("button");
historyInputBtn.setAttribute("readonly", true);
historyInputBtn.setAttribute("class", "button history-button form-control d-block bg-white m-3");
historyInputBtn.setAttribute("data-city", searchHistory[i])
historyInputBtn.textContent = searchHistory[i]
historyInputBtn.setAttribute("click", function() {
	fetchGeo(historyInputBtn.value);
})
historyEl.append(historyInputBtn);

	}
}
renderSearchHistory();

var savedCityBtns = document.querySelectorAll(".history-button");
for (var i = 0; i < savedCityBtns.length; i++) {
savedCityBtns[i].addEventListener("click", function (event) {
	event.preventDefault();
	var selectedCity = event.target.getAttribute("data-city");
	fetchGeo(selectedCity);
	console.log(selectedCity);
})
};

function deleteAllHistory (event) {
clearHistoryEl.addEventListener("click")
}
// document.querySelector(".history-button").addEventListener("click", (event)=>{



// click on a button to get name
// fetchGeo(name value)

