let currentTime = document.querySelector("#time");
console.log(currentTime);
let now = new Date();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekday = weekdays[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
currentTime.innerHTML = `${weekday} <br /> ${hours}:${minutes} `;

function showTemperature(response) {
  console.log();
  let temperature = Math.round(response.data.main.temp);
  let cityTemperature = document.querySelector("#temp");
  cityTemperature.innerHTML = `${temperature}°C`;

  function showCelciumTemperature(event) {
    let celciumTemperature = document.querySelector("#temp");
    let x = temperature;
    celciumTemperature.innerHTML = `${x * 1}°C`;
  }
  let celciumButton = document.querySelector("#celcium");
  celciumButton.addEventListener("click", showCelciumTemperature);

  function showFarenheitTemperature(event) {
    let farenheitTemperature = document.querySelector("#temp");
    let x = temperature;
    farenheitTemperature.innerHTML = `${(x * 9) / 5 + 32}°F`;
  }
  let farenheitButton = document.querySelector("#farenheit");
  farenheitButton.addEventListener("click", showFarenheitTemperature);
}

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
