const cityInput = document.querySelector('.city-input')
const GEO_API_URL = `https://geocoding-api.open-meteo.com/v1/search?count=1&language=en&format=json`;
const FC_API_URL = `https://api.open-meteo.com/v1/forecast?current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code`;

// wmo_code: ['weather group', 'weather detailed type']
// https://open-meteo.com/en/docs
const wmo = {
    0: ['clear', 'clear'],
    1: ['cloudy', 'mostly-clear'],
    2: ['cloudy', 'partly-cloudy'],
    3: ['cloudy', 'overcast'],
    45: ['fog', 'fog'],
    48: ['fog', 'rime-fog'],
    51: ['drizzle', 'light-drizzle'],
    53: ['drizzle', 'moderate-drizzle'],
    55: ['drizzle', 'dense-drizzle'],
    80: ['showers', 'light-rain'],
    81: ['showers', 'moderate-rain'],
    82: ['showers', 'heavy-rain'],
    61: ['rain', 'light-rain'],
    63: ['rain', 'moderate-rain'],
    65: ['rain', 'heavy-rain'],
    56: ['icy-drizzle', 'light-freezing-drizzle'],
    57: ['icy-drizzle', 'dense-freezing-drizzle'],
    66: ['icy-rain', 'light-freezing-rain'],
    67: ['icy-rain', 'heavy-freezing-rain'],
    77: ['snow-grains', 'snowflake'],
    85: ['snow-showers', 'slight-snowfall'],
    86: ['snow-showers', 'heavy-snowfall'],
    71: ['snow', 'slight-snowfall'],
    73: ['snow', 'moderate-snowfall'],
    75: ['snow', 'heavy-snowfall'],
    95: ['thunderstorm', 'thunderstorm'],
    96: ['thunderstorm', 'thunderstorm-with-hail'],
    99: ['thunderstorm', 'thunderstorm-with-hail'],
}

const getCityWeather = () => {
    const cityName = cityInput.value.trim();
    if (cityName === "") return;
    let url = new URL(GEO_API_URL)
    url.searchParams.append("name", cityName);

    fetch(url)
        .then((response) => response.json())
        .then(data => {
            const latitude = data.results[0].latitude;
            const longitude = data.results[0].longitude;
            let fc_url = new URL(FC_API_URL);
            fc_url.searchParams.append("latitude", latitude)
            fc_url.searchParams.append("longitude", longitude);

            fetch(fc_url)
                .then((response) => response.json())
                .then(data => {
                    document.querySelector('#city-name').innerHTML = cityName;
                    document.querySelector('#city-temp').innerHTML = `Temperature: ${data.current.temperature_2m} °C`;
                    document.querySelector('#city-wind').innerHTML = `Wind: ${data.current.wind_speed_10m} Km/h`;
                    document.querySelector('#city-humidity').innerHTML = `Humidity: ${data.current.relative_humidity_2m} %`;
                    document.querySelector('.city-icon').src = `./icons/${wmo[data.current.weather_code][1]}@4x.png`;
                    document.querySelector('.city-icon').alt = wmo[data.current.weather_code][1];
                    document.querySelector('.city-icon-text').innerHTML = wmo[data.current.weather_code][0];
                });
        });
}

document.querySelector('button').addEventListener(
    "click", () => {
        getCityWeather();
    }
)
