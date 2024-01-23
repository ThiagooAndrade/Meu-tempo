const buttonSearchCity = document.getElementById("btnSubmit");
const container = document.querySelector(".container");
const notFound = document.querySelector(".not-found");
const weatherContainer = document.querySelector(".weather-container");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".error404");
const img = document.querySelector(".img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity-text");
const wind = document.querySelector(".wind-text");
const country = document.querySelector(".country");

buttonSearchCity.addEventListener("click", () => {
  const APIKey = "3d2d4073bc04d77eb884358684f252cc";
  const city = document.querySelector(".container-input input").value;

  if ((notFound.style.display = "block")) {
    notFound.style.display = "none";
  }

  if (city === "") {
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "75%";
        weatherContainer.style.display = "none";
        weatherDetails.style.display = "none";
        notFound.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }
      container.style.height = "75%";

      switch (json.weather[0].main) {
        case "Clear":
          img.src = "assets/clear.png";
          break;

        case "Clouds":
          img.src = "assets/cloud.png";
          break;

        case "Mist":
          img.src = "assets/mist.png";
          break;

        case "Haze":
          img.src = "assets/haze.png";
          break;

        case "Rain":
          img.src = "assets/rain.png";
          break;

        case "Snow":
          img.src = "assets/snow.png";
          break;

        default:
          img.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      humidity.style.visibility = "visible";
      wind.style.visibility = "visible";
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${json.wind.speed} KM/h`;
      weatherContainer.style.display = "flex";
      weatherDetails.style.display = "flex";
      description.innerHTML = `${json.weather[0].description}`;
      description.style.textTransform = "capitalize";
      country.innerHTML = `${json.sys.country}`;

      weatherContainer.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
    });
});
