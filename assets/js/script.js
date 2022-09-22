var cityInputEl = document.querySelector(".city-input");
var formEl = document.querySelector(".form");
var clearHistoryEl = document.querySelector(".clear-history");

// current data var
var currentWeatherEl = document.querySelector(".current-weather-container");

// five day forcast var
var fiveDayContainer = document.querySelector(".five-day-container");

// getting search history out of local storage
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

// assigning api key to variable
var apiKey = "d91f911bcf2c0f925fb6535547a5ddc9";

function fetchGeo(event) {
  event.preventDefault();
  var cityName = cityInputEl.value;
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
formEl.addEventListener("submit", fetchGeo);

function displayWeather(data) {
  for (var i = 0; i < 5; i++) {
    // create elements

    var currentDate = document.createElement("h3");
    var currentIcon = document.createElement("img");
    var currentTemp = document.createElement("p");
    var currentWind = document.createElement("p");
    var currentHumidity = document.createElement("p");
    var card = document.createElement("div");
    currentDate.textContent = convertDate(data.daily[i].dt);
    currentIcon.src = `https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`;
    currentTemp.textContent = `Temp: ${data.daily[i].temp.day}°F`;
    currentWind.textContent = `Wind: ${data.daily[i].wind_speed}`;
    currentHumidity.textContent = `Humidity: ${data.daily[i].humidity}`;

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
  var currentDate = document.createElement("h3");
  var currentIcon = document.createElement("img");
  var headerCurrentEl = document.createElement("div");
  var currentTemp = document.createElement("p");
  var currentWind = document.createElement("p");
  var currentHumidity = document.createElement("p");
  var currentUVIndex = document.createElement("p");
  cityName.textContent = city;
  currentDate.textContent = convertDate(data.current.dt);
  currentIcon.src = `https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`;
  currentTemp.textContent = `Temp: ${data.current.temp}°F`;
  currentWind.textContent = `Wind: ${data.current.wind_speed}`;
  currentHumidity.textContent = `Humidity: ${data.current.humidity}`;
  currentUVIndex.text = `UV Index: ${data.current.uvi}`;

headerCurrentEl.append(
	cityName,
	currentDate,
	currentIcon,
)
  currentWeatherEl.append(
	headerCurrentEl,
    // cityName,
    // currentDate,
    // currentIcon,
    currentTemp,
    currentWind,
    currentHumidity,
    currentUVIndex
  )
}

function convertDate(date) {
  return new Date(date * 1000).toLocaleDateString("en-US");
}

