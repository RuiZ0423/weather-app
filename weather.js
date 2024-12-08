const cityInput = document.querySelector('.city-input')
const GEO_API_URL = `https://geocoding-api.open-meteo.com/v1/search?count=1&language=en&format=json`;
const FC_API_URL = `https://api.open-meteo.com/v1/forecast?current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code`;

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
                    document.querySelector('#city-temp').innerHTML = data.current.temperature_2m;
                    document.querySelector('#city-wind').innerHTML = data.current.wind_speed_10m;
                    document.querySelector('#city-humidity').innerHTML = data.current.relative_humidity_2m;
                    console.log(data.current.temperature_2m);
                    console.log(data.current.wind_speed_10m);
                    console.log(data.current.relative_humidity_2m);
                    console.log(data.current.weather_code);
                });
        });
}

document.querySelector('button').addEventListener(
    "click", () => {
        getCityWeather();
    }
)
