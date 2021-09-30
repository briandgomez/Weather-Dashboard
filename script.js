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
fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=60.99&lon=30.9&exclude=hourly&units=imperial&appid=067be3d3a13216f2b92074a702f43b7e"
)
    .then(function (response) {
        //console.log(response.json())
        return response.json();
    })
    .then(function (response) {
        var currentDate = document.getElementById('current-date');
        currentDate.textContent = response.timezone + ' ' + moment().format('MM/DD/YYYY');

        var currentTemp = response.current.temp;
        var currentTempInfoEl = document.createElement('p');
        var currentInfo = document.querySelector('.current-info');
        currentTempInfoEl.innerHTML = '';
        currentTempInfoEl.textContent = 'Temp: ' + currentTemp + "°F";
        currentInfo.appendChild(currentTempInfoEl);

        var currentWind = response.current.weather.wind_speed;
        var currentWindInfoEl = document.createElement('p');
        currentWindInfoEl.innerHTML = '';
        currentWindInfoEl.textContent = 'Wind: ' + currentWind + "MPH";
        currentInfo.appendChild(currentWindInfoEl);

        var currentHum = response.current.humidity;
        var currentHumInfoEl = document.createElement('p');
        currentHumInfoEl.innerHTML = '';
        currentHumInfoEl.textContent = 'Humidity: ' + currentHum + "%";
        currentInfo.appendChild(currentHumInfoEl);

        var currentUV = response.current.uvi;
        var currentUVInfoEl = document.createElement('p');
        currentUVInfoEl.innerHTML = '';
        currentUVInfoEl.textContent = 'UV Index: ' + currentUV;
        currentInfo.appendChild(currentUVInfoEl);
    });