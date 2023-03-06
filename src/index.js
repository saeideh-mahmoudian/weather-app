function insertCurrentDay(timestamp){
  let date = new Date(timestamp);
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

  return day;
}
  
function insertCurrentTime(timestamp){
  let date = new Date(timestamp);
 
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
 
  return `${hours}:${minutes}`;
}
  
function showInformation(response){
  celsiusTemperature = response.data.temperature.current;
  let city = response.data.city;
  let temperature = Math.round(response.data.temperature.current);

  /*let minTemperature = Math.round(response.data.main.temp_min);
  let maxTemperature = Math.round(response.data.main.temp_max); */

  let weatherDescription = response.data.condition.description;
  let humidity = Math.round(response.data.temperature.humidity);
  let windSpeed = Math.round((response.data.wind.speed)*3.6);

  let iconElement = document.querySelector ("#icon");
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

  let day_value = document.querySelector("#currentDay");
  day_value.innerHTML = insertCurrentDay(response.data.time * 1000);

  let time_value = document.querySelector("#currentTime");
  time_value.innerHTML = insertCurrentTime(response.data.time * 1000);
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
    axios.get(apiUrl).then(showInformation);
  }else{
    let citySearch = document.querySelector("#current-city-search");
    citySearch.innerHTML = "<small>type a city...</small>";
  }
});

function displayFahrenheitTemperature(event){
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
   temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
   temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;



let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let apiKey = "7bdf7162a6a99746bf19d90tod17b361";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Tehran&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(showInformation);