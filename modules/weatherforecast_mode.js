const API_KEY = ''
const BASE_URL = 'https://api.openweathermap.org/'
const country_img = 'https://openweathermap.org/images/flags/'

async function getCurrentWeather(city) {
    // get geographical area of the city
    try {
        // get weather of the city by passing city name to API
        const get_current_weather = await fetch(BASE_URL + 'data/2.5/weather?q=' + city + '&appid=' + API_KEY)
        const current_weather = await get_current_weather.json()
        return current_weather
    }
    catch {
        return false
    }
}

async function getFiveDaysForecast(city) {
    try {
        // get 3-hour forecast for 5 days by passing city name to API
        const response = await fetch(BASE_URL + 'data/2.5/forecast?q=' + city + '&appid=' + API_KEY);
        const data = await response.json();
        return data
    }
    catch {
        return false;
    }
}
module.exports = { getFiveDaysForecast, getCurrentWeather }