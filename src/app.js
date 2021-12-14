//let apiKey = "e71ce36525bb4351bd2f84fec8a5122c";

let now = new Date();
let today = document.querySelector(".display-date");

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

today.innerHTML = `${day} ${hours}:${minutes}`;

// New Start
function getWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let city1 = response.data.name;
  console.log(response.data.name);

  let city = document.querySelector(".display-city");
  city.innerHTML = `${city1}    /    ${temperature}°C`;
}

function citySearch(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#search-input");

  let apiKey = "e71ce36525bb4351bd2f84fec8a5122c";
  console.log(searchedCity.value + apiKey);

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&appid=${apiKey}&units=metric`;

  axios.get(url).then(getWeather);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", citySearch);
