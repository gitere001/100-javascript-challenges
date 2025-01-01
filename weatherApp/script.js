document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const autoCompleteContainer = document.querySelector(".suggestion-cities");
  const inputElement = document.querySelector(".search-bar input");
  const spiner = document.querySelector("#loading");
  const mainContainer = document.querySelector("main");
  const mainErrorContainer = document.querySelector("#main-display-error");
  const forecastErrorContainer = document.querySelector(
    "#forecast-display-error"
  );

  const container = document.getElementById("main-card");

  // API Key
  const apiKey = "f6bf5017e820a5ecdb8c40b4ee111dcf";

  // Functions
  function detectLocationAndGetCity() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        fetchCityFromCoordinates,
        showError
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  function fetchCityFromCoordinates(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const city = { lat, lon };
    console.log(city);
    mainContainer.style.display = "none";
    spiner.classList.remove("hidden");
    getCurrentWeather(city);
    get5DayForecast(city);
    setTimeout(() => {
      mainContainer.style.display = "block";
      spiner.classList.add("hidden");
    }, 1000);
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.error("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.error("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.error("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.error("An unknown error occurred.");
        break;
    }
  }

  function getCurrentWeather(params) {
    let currentWeatherUrl;

    if (typeof params === "string") {
      currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${params}&appid=${apiKey}&units=metric`;
    } else if (typeof params === "object" && params.lat && params.lon) {
      currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.lon}&appid=${apiKey}&units=metric`;
    } else {
      throw new Error(
        "Invalid parameters. Provide a city name as a string or coordinates as an object with lat and lon properties."
      );
    }
    const todaysTempCard = document.getElementById("main-card");

    fetch(currentWeatherUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          mainErrorContainer.classList.add("hidden");
          const cityName = document.createElement("h2");
          cityName.id = "city-name";
          cityName.textContent = data.name;

          const cityDetailsCard = document.createElement("section");
          cityDetailsCard.className = "city-details-card";

          const cardTempDetails = document.createElement("div");
          cardTempDetails.className = "card-temp-details";

          const tempInfor = document.createElement("div");
          tempInfor.className = "temp-infor";

          const degrees = document.createElement("span");
          degrees.className = "degrees";
          degrees.textContent = `${(data.main.temp).toFixed(1)}°C`;

          const feelsLike = document.createElement("div");
          feelsLike.className = "feels-like";

          const feelsLikeIcon = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          feelsLikeIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          feelsLikeIcon.setAttribute("width", "16");
          feelsLikeIcon.setAttribute("height", "16");
          feelsLikeIcon.setAttribute("viewBox", "0 0 24 24");
          feelsLikeIcon.setAttribute("fill", "none");
          feelsLikeIcon.setAttribute("stroke", "currentColor");
          feelsLikeIcon.setAttribute("stroke-width", "2");
          feelsLikeIcon.setAttribute("stroke-linecap", "round");
          feelsLikeIcon.setAttribute("stroke-linejoin", "round");

          const path1 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          path1.setAttribute("d", "M12 9a4 4 0 0 0-2 7.5");
          feelsLikeIcon.appendChild(path1);

          const path2 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          path2.setAttribute("d", "M12 3v2");
          feelsLikeIcon.appendChild(path2);

          const path3 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          path3.setAttribute("d", "m6.6 18.4-1.4 1.4");
          feelsLikeIcon.appendChild(path3);

          const path4 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          path4.setAttribute("d", "M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z");
          feelsLikeIcon.appendChild(path4);

          feelsLike.appendChild(feelsLikeIcon);
          feelsLike.appendChild(
            document.createTextNode(` Feels like ${data.main.feels_like}°C`)
          );

          const weatherDescription = document.createElement("p");
          weatherDescription.textContent = data.weather[0].description;

          tempInfor.appendChild(degrees);
          tempInfor.appendChild(feelsLike);
          tempInfor.appendChild(weatherDescription);

          const weatherIcon = document.createElement("img");
          weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
          weatherIcon.alt = data.weather[0].description;
          weatherIcon.className = "weather-icon";

          cardTempDetails.appendChild(tempInfor);
          cardTempDetails.appendChild(weatherIcon);

          const humidityWind = document.createElement("div");
          humidityWind.className = "humidity-wind";

          const humidityCard = document.createElement("div");
          humidityCard.className = "humidity weather-condition-card";

          const humidityIcon = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          humidityIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          humidityIcon.setAttribute("width", "24");
          humidityIcon.setAttribute("height", "24");
          humidityIcon.setAttribute("viewBox", "0 0 24 24");
          humidityIcon.setAttribute("fill", "none");
          humidityIcon.setAttribute("stroke", "currentColor");
          humidityIcon.setAttribute("stroke-width", "2");
          humidityIcon.setAttribute("stroke-linecap", "round");
          humidityIcon.setAttribute("stroke-linejoin", "round");

          const humidityPath = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          humidityPath.setAttribute(
            "d",
            "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"
          );
          humidityIcon.appendChild(humidityPath);

          const humidityDetails = document.createElement("div");
          const humidityLabel = document.createElement("p");
          humidityLabel.className = "stat-label";
          humidityLabel.textContent = "Humidity";

          const humidityValue = document.createElement("p");
          humidityValue.className = "stat-value";
          humidityValue.textContent = `${data.main.humidity}%`;

          humidityDetails.appendChild(humidityLabel);
          humidityDetails.appendChild(humidityValue);

          humidityCard.appendChild(humidityIcon);
          humidityCard.appendChild(humidityDetails);

          const windCard = document.createElement("div");
          windCard.className = "wind weather-condition-card";

          const windIcon = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          windIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          windIcon.setAttribute("width", "24");
          windIcon.setAttribute("height", "24");
          windIcon.setAttribute("viewBox", "0 0 24 24");
          windIcon.setAttribute("fill", "none");
          windIcon.setAttribute("stroke", "currentColor");
          windIcon.setAttribute("stroke-width", "2");
          windIcon.setAttribute("stroke-linecap", "round");
          windIcon.setAttribute("stroke-linejoin", "round");

          const windPath1 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          windPath1.setAttribute("d", "M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2");
          windIcon.appendChild(windPath1);

          const windPath2 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          windPath2.setAttribute("d", "M9.6 4.6A2 2 0 1 1 11 8H2");
          windIcon.appendChild(windPath2);

          const windPath3 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          windPath3.setAttribute("d", "M12.6 19.4A2 2 0 1 0 14 16H2");
          windIcon.appendChild(windPath3);

          const windDetails = document.createElement("div");
          const windLabel = document.createElement("p");
          windLabel.className = "stat-label";
          windLabel.textContent = "Wind";

          const windValue = document.createElement("p");
          windValue.className = "stat-value";
          windValue.textContent = `${(data.wind.speed * 3.6).toFixed(2)} km/h`;

          windDetails.appendChild(windLabel);
          windDetails.appendChild(windValue);

          windCard.appendChild(windIcon);
          windCard.appendChild(windDetails);

          humidityWind.appendChild(humidityCard);
          humidityWind.appendChild(windCard);

          cityDetailsCard.appendChild(cardTempDetails);
          cityDetailsCard.appendChild(humidityWind);

          container.innerHTML = "";
          container.appendChild(cityName);
          container.appendChild(cityDetailsCard);
        } else {
          container.innerHTML = "";
          mainErrorContainer.classList.remove("hidden");
          console.error("Error fetching weather data:", data.message);
        }
      })
      .catch((error) => {
        container.innerHTML = "";
        mainErrorContainer.classList.remove("hidden");
        console.error("Network or server error:", error);
      });
  }

  function get5DayForecast(location) {
    let forecastUrl;
    const forecastContainer = document.querySelector(".days-forecast");

    if (typeof location === "string") {
      forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;
    } else if (typeof location === "object" && location.lat && location.lon) {
      forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric`;
    } else {
      console.error(
        "Invalid location format. Provide a city name or an object with lat and lon properties."
      );
      return;
    }

    fetch(forecastUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === "200") {
          forecastErrorContainer.classList.add("hidden");
          const dailyForecasts = [];
          const today = new Date().toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          });

          data.list.forEach((forecast) => {
            const date = new Date(forecast.dt * 1000);
            const day = date.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            });

            if (day !== today && !dailyForecasts.some((f) => f.day === day)) {
              dailyForecasts.push({
                day: day,
                temp: forecast.main.temp,
                description: forecast.weather[0].description,
                iconCode: forecast.weather[0].icon,
              });
            }
          });

          forecastContainer.innerHTML = "";
          const forecastH2 = document.createElement("h2");
          forecastH2.textContent = "5-Day Forecast";
          forecastContainer.appendChild(forecastH2);
          const forecastGrid = document.createElement("div");
          forecastGrid.classList.add("forecast-grid");
          forecastContainer.appendChild(forecastGrid);

          dailyForecasts.forEach((forecast) => {
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("weather-condition");

            const dateP = document.createElement("p");
            dateP.textContent = forecast.day;
            cardDiv.appendChild(dateP);

            const weatherImg = document.createElement("img");
            weatherImg.src = `https://openweathermap.org/img/wn/${forecast.iconCode}.png`;
            weatherImg.alt = forecast.description;
            weatherImg.className = "forecast-icon";
            cardDiv.appendChild(weatherImg);

            const tempP = document.createElement("p");
            tempP.textContent = `${forecast.temp}°C`;
            cardDiv.appendChild(tempP);

            const tempDescriptionP = document.createElement("p");
            tempDescriptionP.textContent = forecast.description;
            cardDiv.appendChild(tempDescriptionP);

            forecastGrid.appendChild(cardDiv);
          });
        } else {
          forecastErrorContainer.classList.remove("hidden");
          const forecastGrid = document.querySelector(".forecast-grid");
          if (forecastGrid) {
            forecastGrid.remove();
          }

        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        forecastErrorContainer.classList.remove("hidden");
        const forecastGrid = document.querySelector(".forecast-grid");
        if (forecastGrid) {
          forecastGrid.remove();
        }
      });
  }

  // Event Listeners
  autoCompleteContainer.addEventListener("click", (event) => {
    const clickedP = event.target;
    if (!clickedP.classList.contains("no-city")) {
      const cityName = clickedP.textContent;
      inputElement.value = cityName;
      autoCompleteContainer.style.display = "none";
      mainContainer.style.display = "none";
      spiner.classList.remove("hidden");
      getCurrentWeather(cityName);
      get5DayForecast(cityName);
      setTimeout(() => {
        inputElement.value = "";
        spiner.classList.add("hidden");
        mainContainer.style.display = "block";
      }, 1000);
    }
  });

  detectLocationAndGetCity();
});
