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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2">
            <div class="weather-forecast-date">${day}</div>
            <img
              src="https://openweathermap.org/img/wn/04n@2x.png"
              alt=""
              width="42"
            />
            <div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max">07°</span>
              <span class="weather-forecast-temperature-min">04°</span>
            </div>
          </div>
        `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// New Start
function getWeather(response) {
  let cityElement = document.querySelector("#display-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");
  let speedElement = document.querySelector("#speed");
  let temperatureElement = document.querySelector("#temperature");

  let city = response.data.name;
  let country = response.data.sys.country;
  let description = response.data.weather[0].description;
  let humidity = Math.round(response.data.main.humidity);
  let icon = response.data.weather[0].icon;
  let speed = Math.round(response.data.wind.speed * 3.6); // meter/sec * 3.6 = km/h
  let temperature = Math.round(response.data.main.temp);
  console.log(response.data);

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = `${city}, ${country}`;
  descriptionElement.innerHTML = `${description}`;
  humidityElement.innerHTML = `${humidity}`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  speedElement.innerHTML = `${speed}`;
  temperatureElement.innerHTML = `${temperature}`;

  displayForecast();
}

function citySearch(event) {
  event.preventDefault(); // don't open new browser tab for link
  let searchedCity = document.querySelector(".search-input");

  let apiKey = "e71ce36525bb4351bd2f84fec8a5122c";
  console.log(searchedCity.value);

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&appid=${apiKey}&units=metric`;

  axios.get(url).then(getWeather);
  dateFunction();
}

function convertToFahrenheit(event) {
  event.preventDefault(); // don't open new browser tab for link
  celsiusUnit.classList.remove("active");
  fahrenheitUnit.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = fahrenheitTemperature;
}

function convertToCelsius(event) {
  event.preventDefault(); // don't open new browser tab for link
  celsiusUnit.classList.add("active");
  fahrenheitUnit.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#city-search");
form.addEventListener("submit", citySearch);

let fahrenheitUnit = document.querySelector("#fahrenheit-unit");
fahrenheitUnit.addEventListener("click", convertToFahrenheit);

let celsiusUnit = document.querySelector("#celsius-unit");
celsiusUnit.addEventListener("click", convertToCelsius);
