let apiKey = "e71ce36525bb4351bd2f84fec8a5122c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Klaksvik&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(getWeather);

dateFunction();

function dateFunction() {
  let now = new Date();
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let today = document.querySelector("#today");
  today.innerHTML = `${day} ${hours}:${minutes}`;
}

// New Start
function getWeather(response) {
  let cityElement = document.querySelector("#display-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");
  let temperatureElement = document.querySelector("#temperature");

  let city = response.data.name;
  let country = response.data.sys.country;
  let description = response.data.weather[0].description;
  let humidity = Math.round(response.data.main.humidity);
  let speed = Math.round(response.data.wind.speed * 3.6); // meter/sec * 3.6 = km/h
  let temperature = Math.round(response.data.main.temp);
  console.log(response.data);

  cityElement.innerHTML = `${city}, ${country}`;
  descriptionElement.innerHTML = `${description}`;
  humidityElement.innerHTML = `${humidity}`;
  speedElement.innerHTML = `${speed}`;
  temperatureElement.innerHTML = `${temperature}`;
}

function citySearch(event) {
  event.preventDefault();
  let searchedCity = document.querySelector(".search-input");

  let apiKey = "e71ce36525bb4351bd2f84fec8a5122c";
  console.log(searchedCity.value);

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&appid=${apiKey}&units=metric`;

  axios.get(url).then(getWeather);
  dateFunction();
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", citySearch);
