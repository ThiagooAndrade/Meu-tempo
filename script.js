const buttonSearchCity = document.getElementById("btnSubmit");
const buttonLocation = document.getElementById("btnLocation");

buttonSearchCity.addEventListener("click", () => {
    const city = document.querySelector(".container-input input");
    searchCity(city.value);
});

buttonLocation.addEventListener("click", getLocation);

async function getLocation() {
    const ipAPIKey = "ef031848e8289989b40183cdc92d44fc9f89069e4478791753659f47";
    const ipAPIURL = `https://api.ipdata.co?api-key=${ipAPIKey}`;

    const response = await fetch(ipAPIURL);
    let data = await response.json();

    const city = document.querySelector(".container-input input");
    city.value = data.city;
    searchCity(data.city);
}

async function searchCity(city) {
    const weatherAPIKey = "3d2d4073bc04d77eb884358684f252cc";
    const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${weatherAPIKey}`;

    const container = document.querySelector(".container");
    const weatherDetails = document.querySelector(".weather-details");
    const notFound = document.querySelector(".not-found");
    const weatherContainer = document.querySelector(".weather-container");

    if ((notFound.style.display = "block")) {
        notFound.style.display = "none";
    }

    if (city.value === "") {
        return;
    }

    const response = await fetch(weatherAPIURL);

    let data = await response.json();

    if (data.cod === "404") {
        const error404 = document.querySelector(".error404");
        container.style.height = "75%";
        weatherContainer.style.display = "none";
        weatherDetails.style.display = "none";
        notFound.style.display = "block";
        error404.classList.add("fadeIn");
        return;
    }
    container.style.height = "75%";

    const img = document.querySelector(".img");
    switch (data.weather[0].main) {
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

    weatherContainer.classList.add("fadeIn");
    weatherDetails.classList.add("fadeIn");

    weatherContainer.style.display = "flex";
    weatherDetails.style.display = "flex";

    const temperature = document.querySelector(".temperature");
    temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;

    const description = document.querySelector(".description");
    description.innerHTML = `${data.weather[0].description}`;
    description.style.textTransform = "capitalize";

    const humidity = document.querySelector(".humidity-text");
    humidity.innerHTML = `${data.main.humidity}%`;
    humidity.style.visibility = "visible";

    const wind = document.querySelector(".wind-text");
    wind.innerHTML = `${data.wind.speed} KM/h`;
    wind.style.visibility = "visible";
}
