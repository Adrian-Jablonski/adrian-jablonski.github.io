window.onload = getLocation
var getCurrentLocation = true;
var degC; var degF;
var feelsLikeC; var feelsLikeF;
var minTempC; var minTempF;
var maxTempC; var maxTempF;
var currentUnit = "F";
var localTime;
var sunrise; var sunset;

$("#check-weather").hide();
$("#weather-information").hide();

function getLocation() {
    // Finds user location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(myMap);
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
}

function myMap(position) {
    navigator.geolocation.getCurrentPosition(function(position) {
        currLat = position.coords.latitude;
        currLong = position.coords.longitude;
        update_location();
        $("#check-weather").slideDown(2500);
    }, function() {
        $("#status").text("")
        getCurrentLocation = false;
        $("#check-weather").slideDown(2500);
    });
}

function update_location() {
    (function() {
        var url = "http://api.apixu.com/v1/forecast.json?key=";
        var apiKey = "072572d88ff3433a9e1203832180903"; 
        if (getCurrentLocation === true){
            var location = currLat + ", " + currLong;
            getCurrentLocation = false;
        }
        else {
            var location = document.getElementById("location").value;
        }
        
        var url2 = "&q=" + location;
        $.get(url + apiKey + url2).done(function(response) {
            console.log(response);
            updateUISuccess(response);
        }).fail(function(error) {
            console.log(error);
            updateUIError();	
        });

        // handle success
        function updateUISuccess(response) {
            $("#weather-information").show();
            $("#status").hide();
            var condition = response.current.condition.text;
            degC = response.current.temp_c;
            degF = response.current.temp_f;
            feelsLikeC = response.current.feelslike_c;
            feelsLikeF = response.current.feelslike_f;
            minTempC = Math.round(response.forecast.forecastday[0].day.mintemp_c);
            minTempF = Math.round(response.forecast.forecastday[0].day.mintemp_f);
            maxTempC = Math.round(response.forecast.forecastday[0].day.maxtemp_c);
            maxTempF = Math.round(response.forecast.forecastday[0].day.maxtemp_f);
            sunrise = response.forecast.forecastday[0].astro.sunrise;
            sunset = response.forecast.forecastday[0].astro.sunset;
            var currentLocation = response.location.name + ", " + response.location.region;
            var currentCountry = response.location.country;
            localTime = response.location.localtime;
            // checks whether to use day or night icons
            var isDay = response.current.is_day;
            if (isDay === 1) {
                isDay = "day";
            }
            else {
                isDay = "night";
            }
            
            $("#condition").html(condition);
            $("#current-location").html(currentLocation);
            $("#current-country").html(currentCountry);
            $("#local-time").html("Local Time: " + localTime);
            
            $(".background-picture").attr("src", "images/weather_pictures/" + condition +".png");
            $("#weather-icon").attr("src", "images/weather_icons/" + isDay +"/" + condition + ".png");
            //$("#sunrise").html("Sunrise: " + sunrise);
            
            showWeather();
        }

        // handle error
        function updateUIError() {
            $("#weather-information").hide();
            $("status").show();
            $("#status").html("Could not load current location weather")
        }

    })();

}

function imperialUnits() {
    currentUnit = "F";
    showWeather();
}

function metricUnits() {
    currentUnit = "C";
    showWeather();
}

function showWeather() {
    if (currentUnit === "F") {
        $("#current-temp").html(degF + "&#176;" + currentUnit);
        $("#max-min-temp").html(maxTempF + " / " + minTempF + "&#176" + currentUnit);
        $("#weather-box").html("<p>Feels like " + feelsLikeF + "&#176;" + currentUnit);
        var year = localTime.slice(0, 4);
        var monthAndDate = localTime.slice(5, 10);
        var hour = localTime.slice(11, 13);
        var ampm = "AM";
        if (hour.slice(1) === ":") {
            hour = hour[0]
        }
        else if (hour > 12) {
            hour = hour - 12;
            ampm = "PM";
        }
        var minutes = localTime.slice(-2)
        $("#local-time").html("Local Time: " + monthAndDate + "-" + year + " " + hour +":" + minutes + ampm);
        $("#sunrise").html("<b>Sunrise: </b>" + sunrise);
        $("#sunset").html("<b>Sunset: </b>" + sunset);
        
        
    }
    else {  // if "C"
        $("#current-temp").html(degC + "&#176;" + currentUnit);
        $("#max-min-temp").html(maxTempC + " / " + minTempC + "&#176;" + currentUnit);
        $("#weather-box").html("<p>Feels like " + feelsLikeC + "&#176;" + currentUnit);
        $("#local-time").html("Local Time: " + localTime);
        
        var sunriseHour = sunrise.slice(0, 2);
        var sunsetHour = sunset.slice(0, 2);
        
        if (sunrise.slice(-2) === "AM") {
            var sunrise24Hr = sunrise.slice(0, 5);
        }
        else {
            var sunrise24Hr = (Number(sunriseHour) + 12) + ":" + sunrise.slice(3, 5);
        }
        
        if (sunset.slice(-2) === "AM") {
            var sunset24Hr = sunset.slice(0, 5);
        }
        else {
            var sunset24Hr = (Number(sunsetHour) + 12) + ":" + sunset.slice(3, 5);
        }
        
        $("#sunrise").html("<b>Sunrise: </b>" + sunrise24Hr);
        $("#sunset").html("<b>Sunset: </b>" + sunset24Hr);
    }
}