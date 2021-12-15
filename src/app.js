//let apiKey = "e71ce36525bb4351bd2f84fec8a5122c";

dateFunction();
// let apiKey = "e71ce36525bb4351bd2f84fec8a5122c";
// let url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;
// axios.get(url).then(getWeather);

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

  let today = document.querySelector(".today");
  today.innerHTML = `${day} ${hours}:${minutes}`;
}

// New Start
function getWeather(response) {
  let temperature1 = Math.round(response.data.main.temp);
  let humidity1 = Math.round(response.data.main.humidity);
  let city1 = response.data.name;
  let description1 = response.data.weather[0].description;
  let wind = Math.round(10 * response.data.wind.speed);
  console.log(response.data.wind.speed);

  let city = document.querySelector(".display-city");
  city.innerHTML = `${city1}`;
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = `${temperature1}`;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${humidity1}`;
  let description = document.querySelector(".description");
  description.innerHTML = `${description1}`;
  let speed = document.querySelector(".speed");
  speed.innerHTML = `${wind}`;
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
