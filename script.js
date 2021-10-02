
//Turns information in localStorage into a object if it exists OR creates an empty array if there is nothing inside localStorage
var getCity = JSON.parse(localStorage.getItem('savedCities')) || [];

//var savedCitiesId = $('.saved-cities');
var savedCitiesId = document.querySelector('.saved-cities');
//Displays current weather info

var getCurrentWeather = function (name) {
    fetch(
        //Current weather information based on user input
        "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&units=imperial&appid=067be3d3a13216f2b92074a702f43b7e"
    )
        .then(function (response) {
            //console.log(response.json());
            return response.json();
        })
        .then(function (city) {
            //Longitude and latitude of city
            var longitude = city.coord.lon;
            var latitude = city.coord.lat;

            var currentDate = document.getElementById('current-date');
            //Current date in MM/DD/YYYY format
            currentDate.textContent = name + ' ' + moment().format('(MM/DD/YYYY)');

            //Display icon
            var currentIcon = city.weather[0].icon;
            var iconImage = document.createElement('img');
            //iconImage.innerHTML = '';
            var iconLocation = document.querySelector('#icon-location')
            var iconurl = "http://openweathermap.org/img/w/" + currentIcon + ".png";
            iconImage.setAttribute('src', iconurl);
            iconLocation.appendChild(iconImage);


            //Current temp of a city
            var currentTemp = city.main.temp;
            var currentTempInfoEl = document.createElement('p');
            var currentInfo = document.querySelector('.current-info');
            //currentTempInfoEl.innerHTML = '';
            currentTempInfoEl.textContent = 'Temp: ' + currentTemp + "°F";
            currentInfo.appendChild(currentTempInfoEl);

            var currentWind = city.wind.speed;
            var currentWindInfoEl = document.createElement('p');
            //currentWindInfoEl.innerHTML = '';
            currentWindInfoEl.textContent = 'Wind: ' + currentWind + " MPH";
            currentInfo.appendChild(currentWindInfoEl);

            var currentHum = city.main.humidity;
            var currentHumInfoEl = document.createElement('p');
            //currentHumInfoEl.innerHTML = '';
            currentHumInfoEl.textContent = 'Humidity: ' + currentHum + "%";
            currentInfo.appendChild(currentHumInfoEl);

            getUV(latitude, longitude);
        })
}


var getUV = function (latitude, longitude) {
    //Get UV information based on latitude and longitude of city name
    fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        latitude + "&lon=" + longitude +
        "&exclude=hourly&units=imperial&appid=067be3d3a13216f2b92074a702f43b7e"
    )
        //Return 'One Call info'
        .then(function (response) {
            return response.json();
        })
        //Current UV index
        .then(function (uvInfo) {
            /*var currentInfo = $('.current-info');
            var currentUVInfoEl = $('<p>');
            currentUVInfoEl.val('');
            currentUVInfoEl.text('UV Index: ' + uvInfo.current.uvi);
            currentInfo.appendTo(currentUVInfoEl);*/

            var currentInfo = document.querySelector('.current-info');
            var currentUVInfoEl = document.createElement('p');
            currentUVInfoEl.textContent = 'UV Index: ' + uvInfo.current.uvi;
            currentInfo.appendChild(currentUVInfoEl);
        })
}

var getFiveDay = function (name) {
    fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" + name + "&units=imperial&appid=746a6e0471547b3aa9ba1351082eb0a3"
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (city) {

            array = [0, 7, 15, 23, 31];
            for (var i = 1, j = 0; i <= 5; i <= 5 && j < array.length, i++, j++) {
                day = i;
                index = j;

                var fiveDayDiv = document.querySelector('.five-day-divs');
                var div = $('<div>');
                div.attr({
                    id: 'day-' + i,
                    class: 'mx-auto px-1 border border-dark',
                });
                div.appendTo(fiveDayDiv);

                var futureDate = moment().add(day, 'days').format('MM/DD/YYYY');
                var date = $('<h4>');
                date.text(futureDate);
                date.appendTo('#day-' + day);

                var icon = city.list[index].weather[0].icon;
                var img = $('<img>');
                var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
                img.attr('src', iconurl)
                img.appendTo(('#day-' + day));

                var temp = city.list[index].main.temp;
                var paragraph = $('<p>');
                paragraph.text('Temp: ' + temp + '°F');
                paragraph.appendTo('#day-' + day);

                var windSpeed = city.list[index].wind.speed;
                var paragraph = $('<p>');
                paragraph.text('Wind: ' + windSpeed + ' MPH');
                paragraph.appendTo('#day-' + day);

                var humidity = city.list[index].main.humidity;
                var paragraph = $('<p>');
                paragraph.text('Humidity: ' + humidity + '%');
                paragraph.appendTo('#day-' + day);
            }
        })
}

$('.search-btn').click(function () {
    //Input value (city name)
    //var name = document.querySelector('#input').value;
    var name = $('#input').val();

    //Create and display saved city button
    var newBtn = document.createElement('button');
    newBtn.style.margin = '14px 0px'
    newBtn.style.display = 'block';
    newBtn.style.borderRadius = '5px';
    newBtn.style.width = '-webkit-fill-available';
    newBtn.textContent = name;
    savedCitiesId.appendChild(newBtn);

    //Clears search input
    $('#input').val('');

    //Adds city name to empty array
    getCity.push(name);
    //Saves city name to localStorage
    localStorage.setItem('savedCities', JSON.stringify(getCity));

    getCurrentWeather(name);
    getFiveDay(name);
})

/*$('.saved-cities').click(function () {
    //var savedCityBtn = $('div').find('.saved-cities').text();
    console.log(savedCityBtn);

    getCurrentWeather(savedCityBtn);
})*/