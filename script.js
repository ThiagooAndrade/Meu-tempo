const buttonSearchCity = document.getElementById("btnSubmit");
const buttonLocation = document.getElementById("btnLocation");

buttonSearchCity.addEventListener("click", () => {
    const city = document.querySelector(".container-input input");
    searchCity(city.value);
});

buttonLocation.addEventListener("click", getLocation);

async function getLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;

            const nominatimURL = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=jsonv2&addressdetails=0&zoom=12`;
            const response = await fetch(nominatimURL);
            const data = await response.json();

            const resultCity = data.name;

            const city = document.querySelector(".container-input input");
            city.value = resultCity;
            searchCity(resultCity); // passa como parametro a cidade do usuario
            /* geolocation is available */
        });
    } else {
        alert(
            "Perdão, mas os serviços de geolocalização nao são suportados pelo seu navegador."
        );
    }
}

async function searchCity(city) {
    const weatherAPIKey = "3d2d4073bc04d77eb884358684f252cc";
    const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${weatherAPIKey}`;

    const container = document.querySelector(".container");
    const notFound = document.querySelector(".not-found");
    const weatherContainer = document.querySelector(".weather-container");
    const weatherDetails = document.querySelector(".weather-details");

    if ((notFound.style.display = "block")) {
        notFound.style.display = "none";
    }

    if (city.value === "") {
        return;
    }

    const response = await fetch(weatherAPIURL);

    const data = await response.json();

    if (data.cod === "404") {
        const error404 = document.querySelector(".error404");
        container.classList.add("container-height");
        weatherContainer.style.display = "none";
        weatherDetails.style.display = "none";
        notFound.style.display = "block";
        error404.classList.add("fadeIn");
        return;
    }

    container.classList.add("container-height");

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
