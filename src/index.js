function insertCurrentDay(date){
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wendesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  
  return days[date.getDay()];
}
  
function insertCurrentTime(date){
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
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let minTemperature = Math.round(response.data.main.temp_min);
  let maxTemperature = Math.round(response.data.main.temp_max);
  let weatherDescription = response.data.weather[0].description;
  let humidity = Math.round(response.data.main.humidity);
  let windSpeed = Math.round((response.data.wind.speed)*3.6);
  let citySearch = document.querySelector("#current-city-search");
  citySearch.innerHTML = city;
  let temperatureValue = document.querySelector("#temperature");
  temperatureValue.innerHTML = temperature;
  let minTemp = document.querySelector("#minTemp");
  minTemp.innerHTML = `${minTemperature}°C`;
  let maxTemp = document.querySelector("#maxTemp");
  maxTemp.innerHTML = `${maxTemperature}°C`;
  let description = document.querySelector("#description");
  description.innerHTML = weatherDescription;
  let humidityLevel = document.querySelector("#humidity");
  humidityLevel.innerHTML = `${humidity}%`;
  let windLevel = document.querySelector("#wind");
  windLevel.innerHTML = `${windSpeed}km/h`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = searchInput.value;
  if (city) {  
    let apiKey = "cf341738c7bb0fba2e56905d21ee16f0";
    let unit = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
    axios.get(apiUrl).then(showInformation);
  }else{
    let citySearch = document.querySelector("#current-city-search");
    citySearch.innerHTML = "<small>type a city...</small>";
  }
});

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", function(){
  navigator.geolocation.getCurrentPosition(function(position){
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "cf341738c7bb0fba2e56905d21ee16f0";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showInformation);
  });
});

let day_value = document.querySelector("#currentDay");
let nowDate = new Date();
day_value.innerHTML = insertCurrentDay(nowDate);

let time_value = document.querySelector("#currentTime");
time_value.innerHTML = insertCurrentTime(nowDate);

let apiKey = "cf341738c7bb0fba2e56905d21ee16f0";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Amsterdam&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(showInformation);