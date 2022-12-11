const country_img = 'https://openweathermap.org/images/flags/'
const weather_img = 'https://openweathermap.org/img/wn/'
const Days = {'0': 'Sun', '1': 'Mon', '2': 'Tue', '3': 'Wen', '4': 'Thu', '5': 'Fri', '6': 'Sat'}
const Months = {
    '0': "January", '1': "February", 
    '2': "March", '3': "April", '4': "May", 
    '5': "June", '6': "July", '7': "August", 
    '8': "September", '9': "October", 
    '10': "November", '11': "December"}

async function showSearch() {
    const search_value = document.getElementById('search_bar').value
    const list = { city: search_value, f: 1 }
    const response = await fetch('/weatherinfo', {
        method: 'POST',//or other
        headers: {
            'Accept': 'application/json', //receive json
            'Content-Type': 'application/json;charset=UTF-8' //tell the sever the format of our data
        },
        body: JSON.stringify(list)// send a json string version of the data
    })
    const data = await response.json()
    if (data.cod === '404') {
        const error = document.getElementById("error");
        error.style.display = 'flex';
    }
    else {
        error.style.display = 'none'
        const btn = document.getElementById("result");
        cityName_country_flag = "<span>" + data.name + ', ' + data.sys.country + ' <img src="' + country_img + data.sys.country.toLowerCase() + '.png" alt="">' + '</span>'
        temp = '<span> ' + Math.round(data.main.temp - 273.15) + '°C </span>';
        weather_icon = '<span> <img src="' + weather_img + data.weather[0].icon + '.png" alt="" width="60%"> </span>';
        btn.innerHTML = cityName_country_flag + temp + weather_icon;
        btn.style.display = 'flex';
    }
}

async function showWeatherForecast() {
    const search_value = document.getElementById('search_bar').value
    const list = { city: search_value, f: 2 }
    const response = await fetch('/weatherinfo', {
        method: 'POST',//or other
        headers: {
            'Accept': 'application/json', //receive json
            'Content-Type': 'application/json;charset=UTF-8' //tell the sever the format of our data
        },
        body: JSON.stringify(list)// send a json string version of the data
    })
    const data = await response.json();
    document.getElementById('result').style.display = 'none';
    const cards_container = document.getElementById('cards_container');
    document.getElementById('city_name').innerHTML = data.city.name
    var cards = ""
    cards_container.innerHTML = "";
    for (var i = 0; i < 9; i++) {
        const icon = 'https://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '.png'
        const temp = Math.round(data.list[i].main.temp - 273.15)
        const time = tConvert(data.list[i].dt_txt.split(" ")[1])
        cards += `
            <div class="col-sm-2 p-2 card_div">
                <div class="card weather_cards justify-content-center">
                    <div class="card-body">
                        <img src='${icon}' class="pb-2">
                        <p class="card-text weather_card_text">${temp}°C</p>
                        <p class="card-text weather_card_text">${time.split(":")[0]} ${time.slice(time.length-2,time.length)}</p>
                    </div>
                </div>
            </div>
            `
    }
    cards_container.insertAdjacentHTML('beforeend', cards);
    currentWeather()
}

async function currentWeather() {
    const search_value = document.getElementById('search_bar').value
    const list = { city: search_value, f: 1 }
    const response = await fetch('/weatherinfo', {
        method: 'POST',//or other
        headers: {
            'Accept': 'application/json', //receive json
            'Content-Type': 'application/json;charset=UTF-8' //tell the sever the format of our data
        },
        body: JSON.stringify(list)// send a json string version of the data
    })
    const data = await response.json();

    // filling data inside the card on the sidebar
    const card_img = document.getElementById("current_weather_card_img");
    const current_time = document.getElementById('current_time');
    const current_date = document.getElementById('current_date')
    const card_temp = document.getElementById('current_weather_card_temp');
    const card_city = document.getElementById('current_weather_card_city');
    const humidity_perc = document.getElementById('humidity_perc');
    const humidity_bar = document.getElementById('humidity_bar');
    


    card_img.src = weather_img + data.weather[0].icon + '@2x.png';

    const date = new Date(data.dt * 1000);
    current_time.innerHTML = date.getHours() + ':' + (date.getMinutes().toString().length === 2 ? date.getMinutes() : '0' + date.getMinutes());
    current_date.innerHTML = Days[date.getDay()] + ', ' + date.getDate() + " " + Months[date.getMonth()];
    card_temp.innerHTML = Math.round(data.main.temp - 273.15) + '°C';
    card_city.innerHTML = data.name;
    humidity_perc.innerHTML = data.main.humidity + '%';
    humidity_bar.style.width = data.main.humidity + '%';
    humidity_bar.ariaValueNow = data.main.humidity;

    // show the card on the sidebar
    document.getElementById('navbar_card_container').style.display = 'flex';
    
}

function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
}