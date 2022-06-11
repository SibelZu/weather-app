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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col-2">
          <strong>${day}</strong> <br />
          11/04<br />
          <i class="fa-solid fa-cloud-sun"></i>
          <br />
          <strong>9°</strong>/3°
        </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#degree").innerHTML = Math.round(celsiusTemperature);
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

function degreeFahrenheit(event) {
  event.preventDefault();
  let degree = document.querySelector("#degree");
  linkCelsius.classList.remove("active");
  linkFahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  degree.innerHTML = Math.round(fahrenheitTemperature);
}
function degreeCelsius(event) {
  event.preventDefault();
  let degree = document.querySelector("#degree");
  linkCelsius.classList.add("active");
  linkFahrenheit.classList.remove("active");
  degree.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let linkFahrenheit = document.querySelector("#fahrenheit");
linkFahrenheit.addEventListener("click", degreeFahrenheit);

let linkCelsius = document.querySelector("#celsius");
linkCelsius.addEventListener("click", degreeCelsius);

search("Copenhagen");
displayForecast();
