$(document).ready(function () {
    if (navigator.geolocation) {
        var lon; var lat;
        navigator.geolocation.getCurrentPosition(function (position) {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            getWeather(lon, lat, weatherReport);
        });
    }

    function getWeather(lon, lat, success) {
        $.ajax({
            url: 'https://fcc-weather-api.glitch.me/api/current?lon=' + lon + '&lat=' + lat,
            type: 'GET',
            json: 'json',
            dataType: 'json',
            success: success,
            error: function (error) {
                console.error(error);
            },
        })
    }
    function weatherReport(data) {
        var tempC = Math.round(data.main.temp);
        var tempF = Math.round((tempC) * (9 / 5) + 32);
        var conditions = data.weather[0].description;
        var tempClick = true;
        var windSpeed = data.wind.speed;
        var humidity = data.main.humidity;
        function titleCase(conditions) {
            var splitStr = conditions.toLowerCase().split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            return conditions = splitStr.join(' ');
        }

        $("#temp").text(tempF + " \xB0\F");
        $("#conditions").text(titleCase(conditions));
        $("#windSpeed").text("Wind " + windSpeed + " MPH");
        $("#location").text(data.name);
        $("#humidity").text("Humidity " + humidity + "%");
        $("#temp").click(function () {
            if (tempClick === false) {
                $("#temp").text(tempF + " \xB0\F");
                tempClick = true;
            }
            else {
                $("#temp").text(tempC + " \xB0\C");
                tempClick = false;
            }
        })
        if (tempF>=80){
            $('body').css('background-image', 'url(https://static.pexels.com/photos/9537/sea-beach-sand-sun.jpg)').css('background-size','100%','100%').css('background-repeat','no-repeat');
        }
        else if(tempF >=60){
            $('body').css('background-image', 'url(https://static.pexels.com/photos/51548/pexels-photo-51548.jpeg)').css('background-size','100%','100%').css('background-repeat','no-repeat');
        }
        else if(tempF >= 32){
            $('body').css('background-image', 'url(https://static.pexels.com/photos/534164/pexels-photo-534164.jpeg)').css('background-size','100%','100%').css('background-repeat','no-repeat');
        }
        else if (tempF < 32){
            $('body').css('background-image', 'url(https://static.pexels.com/photos/326119/pexels-photo-326119.jpeg)').css('background-size','100%','100%').css('background-repeat','no-repeat');
        }

    }
})

