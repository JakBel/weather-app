const qs = (e) => document.querySelector(e);

const input = qs("input");
const button = qs("button");
const cityName = qs(".city-name");
const warning = qs(".warning");
const photo = qs(".photo");
const weather = qs(".weather");
const temperature = qs(".temperature");
const humidity = qs(".humidity");

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=8e700511307b54e91583aca1994e1b56";
const API_LANG = "&lang=pl";
const API_UNITS = "&units=metric";

//function
const getWeather = () => {
    const city = input.value;
    const URL = API_LINK + city + API_KEY + API_LANG + API_UNITS;

    axios
        .get(URL)
        .then((res) => {
            const temp = res.data.main.temp;
            const hum = res.data.main.humidity;
            const status = Object.assign({}, ...res.data.weather);

            input.value = "";
            warning.textContent = "";

            if (status.id >= 200 && status.id < 300) {
                photo.setAttribute("src", "./img/thunderstorm.png");
            } else if (status.id >= 300 && status.id < 500) {
                photo.setAttribute("src", "./img/drizzle.png");
            } else if (status.id >= 500 && status.id < 600) {
                photo.setAttribute("src", "./img/rain.png");
            } else if (status.id >= 600 && status.id < 700) {
                photo.setAttribute("src", "./img/ice.png");
            } else if (status.id >= 700 && status.id < 800) {
                photo.setAttribute("src", "./img/fog.png");
            } else if (status.id === 800) {
                photo.setAttribute("src", "./img/sun.png");
            } else if (status.id > 800 && status.id < 900) {
                photo.setAttribute("src", "./img/cloud.png");
            }

            cityName.textContent = res.data.name;
            temperature.textContent = Math.floor(temp) + "℃";
            humidity.textContent = hum + "%";
            weather.textContent = status.main;
        })
        .catch(() => {
            warning.textContent = "Podaj prawidłową nazwę miasta!";
            input.value = "";
        });
};

const enterCheck = (e) => {
    if (e.key === "Enter") {
        getWeather();
    }
};

//eventListener
button.addEventListener("click", getWeather);
input.addEventListener("keyup", enterCheck);
