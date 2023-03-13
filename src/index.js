function insertCurrentDate(timestamp){
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wendesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  return  `${day}   ${hours}:${minutes}`;
}

function insertForecastDay(timestamp){
  let date = new Date(timestamp);
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  let day = days[date.getDay()];
  return day;
}

function displayForecast(response){

  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  
  forecast.forEach(function(forecastDay , index){
    if (index < 6) {
    forecastHTML = forecastHTML +
    `
    <div class="col-2 text-center p-0">
    <div class="card card-forecast-bg text-center border-0">
      <div class="card-body card-padding">
        <h5 class="card-title weather-forecast-date">${insertForecastDay(forecastDay.time * 1000)}</h5>
        <img
          src= ${forecastDay.condition.icon_url}
          alt=${forecastDay.condition.icon}
          class = "forecast-weather-icon"
        />
        <p class="card-text text-danger fw-bold mt-3">
          ${Math.round(forecastDay.temperature.maximum)} °
        </p>
        <p class="card-text text-primary fw-bold">${Math.round(forecastDay.temperature.minimum)} °</p>
      </div>
    </div>
  </div>
  `;
  }
});
forecastElement.innerHTML = forecastHTML;
}
  
function displayTemperature(response){
  let city = response.data.city;
  let temperature = Math.round(response.data.temperature.current);

  /*let minTemperature = Math.round(response.data.main.temp_min);
  let maxTemperature = Math.round(response.data.main.temp_max); */

  let weatherDescription = response.data.condition.description;
  let humidity = Math.round(response.data.temperature.humidity);
  let windSpeed = Math.round((response.data.wind.speed));

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src" , `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
  iconElement.setAttribute("alt" , response.data.condition.description);

  let citySearch = document.querySelector("#current-city-search");
  citySearch.innerHTML = city;
  let temperatureValue = document.querySelector("#temperature");
  temperatureValue.innerHTML = temperature;
  
  /*let minTemp = document.querySelector("#minTemp");
  minTemp.innerHTML = `${minTemperature}°C`;
  let maxTemp = document.querySelector("#maxTemp");
  maxTemp.innerHTML = `${maxTemperature}°C`; */

  let description = document.querySelector("#description");
  description.innerHTML = weatherDescription;
  let humidityLevel = document.querySelector("#humidity");
  humidityLevel.innerHTML = `${humidity}%`;
  let windLevel = document.querySelector("#wind");
  windLevel.innerHTML = `${windSpeed}km/h`;

  let date_value = document.querySelector("#currentDate");
  date_value.innerHTML = insertCurrentDate(response.data.time * 1000);

}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = searchInput.value;
  if (city) {  
    let apiKey = "7bdf7162a6a99746bf19d90tod17b361";
    let unit = "metric";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&units=${unit}&key=${apiKey}`;
    axios.get(apiUrl).then(displayTemperature);
    let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&units=${unit}&key=${apiKey}`;
    axios.get(forecastApiUrl).then(displayForecast);
  }else{
    let citySearch = document.querySelector("#current-city-search");
    citySearch.innerHTML = "<small>type a city...</small>";
  }
});

let apiKey = "7bdf7162a6a99746bf19d90tod17b361";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Tehran&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=Tehran&units=metric&key=${apiKey}`;
axios.get(forecastApiUrl).then(displayForecast);