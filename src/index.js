function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let DayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[DayIndex];
  return `${day} ${hours}:${minutes}`;
}

let timeElement = document.querySelector("#current-time");
let now = new Date();

timeElement.innerHTML = formatDate(now);

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#degree").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "153ab0ef93038f6880fdf7939e39441f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  search(cityInput.value);
}
search("Copenhagen");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function degreeFahrenheit(event) {
  event.preventDefault();
  let degree = document.querySelector("#degree");
  degree.innerHTML = 48;
}
let linkFahrenheit = document.querySelector("#fahrenheit");
linkFahrenheit.addEventListener("click", degreeFahrenheit);

function degreeCelsius(event) {
  event.preventDefault();
  let degree = document.querySelector("#degree");
  degree.innerHTML = 9;
}
let linkCelsius = document.querySelector("#celsius");
linkCelsius.addEventListener("click", degreeCelsius);
