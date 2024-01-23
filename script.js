const buttonSearchCity = document.getElementById("btnSubmit");
const container = document.querySelector(".container");
const notFound = document.querySelector(".not-found");
const weatherContainer = document.querySelector(".weather-container");
const img = document.querySelector(".img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidityText = document.querySelector(".humidity-text");
const windtext = document.querySelector(".wind-text");

const apiKey = "";
const url = ``;

buttonSearchCity.addEventListener("click", () => {
  container.style.height = "70%";
  weatherContainer.style.display = "flex";

  temperature.textContent = "50Celcius";
  description.textContent = "solzao";
  humidityText.textContent = "50mm";
  humidityText.style.visibility = "visible";
  windtext.textContent = "10m/s";
  windtext.style.visibility = "visible";
});
