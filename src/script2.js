let currentTime = document.querySelector("#time");
console.log(currentTime);
let now = new Date();
let weekdays = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
let weekday = weekdays[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
currentTime.innerHTML = `${weekday} <br /> ${hours}:${minutes} `;

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast-info");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `           <div class="col-3">
            <div class="forecast-date">${formatDate(forecastDay.dt)}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              id="icon"
              alt="Clear"
              class="float-center"
              height="30px"
            />
            <br />
            <div class="forecast-temp">
              <span class="forecast-temp-max">${Math.round(
                forecastDay.temp.max
              )}°/</span>
              <span class="forecast-temp-min">${Math.round(
                forecastDay.temp.min
              )}°</span><br /><br />
            </div>
          
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "083367c3a98d6341794f54630adaf2aa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

function showCurrentTemp(response) {
  console.log(response);
  let currentCityTemperature = document.querySelector("#temp");
  let currentCityWind = document.querySelector("#wind");
  let currentCityRain = document.querySelector("#rain");
  let currentCityHighestTemp = document.querySelector("#high");
  let currentCityLowestTemp = document.querySelector("#low");
  let currentCityDescription = document.querySelector("#description");
  let currentIconElement = document.querySelector("#icon");
  let currentCityElement = document.querySelector("#city");

  celsiusTemperature = response.data.main.temp;

  currentCityTemperature.innerHTML = `${Math.round(celsiusTemperature)}°C`;
  currentCityElement.innerHTML = response.data.name;
  currentCityWind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  currentCityRain.innerHTML = `${response.data.main.humidity}%`;
  currentCityHighestTemp.innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  currentCityLowestTemp.innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
  currentCityDescription.innerHTML = `*${response.data.weather[0].description}*`;
  currentIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "083367c3a98d6341794f54630adaf2aa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showCurrentTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

getCurrentPosition();
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);

function showTemperature(response) {
  console.log(response.data);

  let cityTemperature = document.querySelector("#temp");
  let cityWind = document.querySelector("#wind");
  let cityRain = document.querySelector("#rain");
  let cityHighestTemp = document.querySelector("#high");
  let cityLowestTemp = document.querySelector("#low");
  let cityDescription = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  let cityElement = document.querySelector("#city");

  celsiusTemperature = response.data.main.temp;

  cityTemperature.innerHTML = `${Math.round(celsiusTemperature)}°C`;
  cityElement.innerHTML = response.data.name;
  cityWind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  cityRain.innerHTML = `${response.data.main.humidity}%`;
  cityHighestTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
  cityLowestTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°`;
  cityDescription.innerHTML = `*${response.data.weather[0].description}*`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

/////
function enteringCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let selectInput = document.querySelector("#submit-enter");
  city.innerHTML = selectInput.value;

  let apiKey = "083367c3a98d6341794f54630adaf2aa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}
let submitButton = document.querySelector("#submit-search");
submitButton.addEventListener("submit", enteringCity);
//////

function showFarenheitTemperature(event) {
  event.preventDefault();

  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = `${Math.round(farenheitTemperature)}°F`;
}

function showCelciumTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}
let celciumButton = document.querySelector("#celcium");
celciumButton.addEventListener("click", showCelciumTemperature);

let celsiusTemperature = null;

let farenheitButton = document.querySelector("#farenheit");
farenheitButton.addEventListener("click", showFarenheitTemperature);
