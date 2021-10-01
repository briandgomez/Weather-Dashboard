/*
Fetch information from weather api:

1. Current weather
-City name, current date, icon for weather conditions, temperature ,wind speed, humidity, and UV index
-UV index color should change depending on weather conditions
2. 5-day forecast
-City name, current date, icon for weather conditions, temperature, wind speed, humidity, and UV index
-UV index color should change depending on weather conditions
3. Search history of all the cities searched
-City searched for should automatically be saved to search history
4.Previous searched cities info should reappear when clicked on in search history 

*/


/*
timezone = city name

Current weather:

current.dt = current date (UNIX time)
current.temp = temperature
current.weather = weather icons
current.wind_speed = wind speed
current.humidity = humidity
current.uvi = UV Index

5-day forecast:
'daily' = weather for next 7 days
*/
var getCity = JSON.parse(localStorage.getItem('savedCities')) || [];

var getCurrentWeather = function (name) {
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&units=imperial&appid=067be3d3a13216f2b92074a702f43b7e"
    )
        .then(function (response) {
            //console.log(response.json())
            return response.json();
        })
        .then(function (city) {
            console.log(city);
            //Longitude and latitude of city
            var longitude = city.coord.lon;
            var latitude = city.coord.lat;

            var currentDate = document.getElementById('current-date');
            //Current date in MM/DD/YYYY format
            currentDate.textContent = city.timezone + ' ' + moment().format('MM/DD/YYYY');

            //Current temp of a city
            var currentTemp = city.main.temp;
            var currentTempInfoEl = document.createElement('p');
            var currentInfo = document.querySelector('.current-info');
            currentTempInfoEl.innerHTML = '';
            currentTempInfoEl.textContent = 'Temp: ' + currentTemp + "°F";
            currentInfo.appendChild(currentTempInfoEl);

            var currentWind = city.wind.speed;
            var currentWindInfoEl = document.createElement('p');
            currentWindInfoEl.innerHTML = '';
            currentWindInfoEl.textContent = 'Wind: ' + currentWind + " MPH";
            currentInfo.appendChild(currentWindInfoEl);

            var currentHum = city.main.humidity;
            var currentHumInfoEl = document.createElement('p');
            currentHumInfoEl.innerHTML = '';
            currentHumInfoEl.textContent = 'Humidity: ' + currentHum + "%";
            currentInfo.appendChild(currentHumInfoEl);

            getUV(latitude, longitude);
        })
}

var getUV = function (latitude, longitude) {
    fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        latitude + "&lon=" + longitude +
        "&exclude=hourly&units=imperial&appid=067be3d3a13216f2b92074a702f43b7e"
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (uvInfo) {
            console.log(uvInfo);

            var currentInfo = document.querySelector('.current-info');
            var currentUVInfoEl = document.createElement('p');
            currentUVInfoEl.innerHTML = '';
            currentUVInfoEl.textContent = 'UV Index: ' + uvInfo.current.uvi;
            currentInfo.appendChild(currentUVInfoEl);
        })
}

$('.city-name').click(function () {
    var name = document.querySelector('#input').value;
    console.log(name);

    getCity.push(name);
    localStorage.setItem('savedCities',JSON.stringify(getCity));

    getCurrentWeather(name);
})



