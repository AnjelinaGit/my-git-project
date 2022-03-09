//formatDate
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0 ${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[dayIndex]} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("h6");
let currentTime = new Date();

dateElement.innerHTML = formatDate(currentTime);

//Search city
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  console.log(searchInput.value);

  let currentCity = document.querySelector("h3");
  currentCity.innerHTML = `${searchInput.value}`;
  let apiKey = "127d252c1436feb848b45deb449f2263";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let searchButton = document.querySelector("form");
searchButton.addEventListener("submit", search);

//Show Temp
function showTemperature(response) {
  let tempH1 = document.querySelector("h3");
  tempH1.innerHTML = `${response.data.name},${response.data.sys.country}`;
  let temp = Math.round(response.data.main.temp);
  console.log(temp);
  console.log(response);
  let tempElement = `${temp}`;
  let currentTemp = document.querySelector("h1");
  currentTemp.innerHTML = tempElement;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  navigator.geolocation.getCurrentPosition(showLocation);

  function showLocation(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let units = "metric";
    let apiKey = "127d252c1436feb848b45deb449f2263";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
  }

  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showLocation);
  }
  let button = document.querySelector("#current");
  button.addEventListener("click", getCurrentPosition);
}
