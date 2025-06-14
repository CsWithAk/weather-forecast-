const apiKey = "5e1cc00e2583b47327a65974bb6773a6";
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weather-icon");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") return;
  getWeather(city);
});

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod === "404") {
        alert("City not found!");
        return;
      }

      cityName.textContent = data.name;
      temperature.textContent = `${Math.round(data.main.temp)} °C`;
      humidity.textContent = `${data.main.humidity}%`;
      wind.textContent = `${data.wind.speed} Km/h`;
      weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    })
    .catch(error => {
      alert("Error fetching weather data.");
      console.error(error);
    });
}
