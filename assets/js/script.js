var key = config.key;
var url = config.url;
var cityIcon = document.querySelector("#icon");
var cityForecast = document.querySelector("#cityForecast");
var day1 = document.querySelector("#day1");
var day2 = document.querySelector("#day2");
var day3 = document.querySelector("#day3");
var day4 = document.querySelector("#day4");
var day5 = document.querySelector("#day5");
var cityTarget = "";
var cities = [];
var arrayDays = [day1, day2, day3, day4, day5];
var lastSearch = "";

var saveCities = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
    localStorage.setItem("lastCity", JSON.stringify(lastSearch));
  };

var loadCities = function() {
    if(localStorage.getItem("cities") != null){
    cities = JSON.parse(localStorage.getItem("cities")); 
    } 
    else {
        cities = [];
    }
    lastSearch = JSON.parse(localStorage.getItem("lastCity"));
};

var dateFormat = function(date){
     var formated_date = date.getMonth()+1 + "/" + date.getDate() + 
    "/" + date.getFullYear();
    return formated_date;
};

var sameCityDetector = function (city){
    var push = true;
    if(cities){
        if(cities.length>0){
         cities.forEach(element => {
            if(city === element){
                push = false;
            }
                       
        });
      }
    }
    return push;
} 

var calculateUV = function (UVindex){
    var indexColor;
    if(UVindex >= 6){
        indexColor = "red";
    }
    else if(UVindex > 2 && UVindex < 6){
        indexColor = "yellow";
    }
    else {
        indexColor = "green";
    }
    return indexColor;
       
}

var generateIconURL = function (code){
  
    var url = 'http://openweathermap.org/img/wn/'+ code +'@2x.png';
    return url;
}

var getCoordinates = function (city){
fetch("https://yahoo-weather5.p.rapidapi.com/weather?location="+ city +"&format=json&u=f", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": key,
		"x-rapidapi-host": url
	}
})
.then(response => response.json())
.then(response => {
    console.log(response);
    cityTarget = response.location.city;
    var okPush = sameCityDetector(cityTarget);
    console.log(okPush);
    if(okPush){
    cities.push(cityTarget);
    }
    lastSearch = cityTarget;
    saveCities();
    var lat = response.location.lat;
    var long = response.location.long;
    searchCity(lat, long);
})
.catch(err => {
	console.error(err);
});
}

var searchCity = function (lat, long){
fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ long +"&units=imperial&exclude=minutely,hourly&appid=" + openAPI)
	

.then(response => response.json())
.then(response => {
    console.log(response);

    // Today's weather   
    var cityH2 = document.getElementById("cityInfo");
    var temp = "Temp: " + response.current.temp +" °F" ;
    var wind = "Wind: " + response.current.wind_speed + " MPH";
    var humidity = "Humidity: " + response.current.humidity + "%";
    var uvText = "UV Index: ";
    var uvIndex = response.current.uvi;
    var uvSpan = document.getElementById("uvIndex");
    var cityTemp= document.getElementById("temp");
    var cityWind= document.getElementById("wind");
    var cityHumidity= document.getElementById("humi");
    var cityUV= document.getElementById("uv");
    var date = new Date(response.current.dt * 1000);
    var datePlace = document.getElementById("currentDate");
    var icon = {
        id:response.current.weather[0].id,
        code:response.current.weather[0].icon
    }
    var URLicon = generateIconURL(icon.code);
    cityIcon.src = URLicon;
    cityH2.innerHTML = cityTarget;
    datePlace.innerHTML = date;
    cityTemp.innerHTML = temp;
    cityWind.innerHTML = wind;
    cityHumidity.innerHTML = humidity;
    cityUV.innerHTML = uvText;
    var UVcolor = calculateUV(uvIndex);
    uvSpan.style.backgroundColor = UVcolor;
    uvSpan.textContent = uvIndex; 
    
    // 5 days forecast
    for(var i = 0; i < arrayDays.length; i++){
        var dayDate = new Date (response.daily[i].dt * 1000);
        var dayFormat = dateFormat(dayDate);
        var dayIcon = generateIconURL(response.daily[i].weather[0].icon);
        var dayTemp = "Temp: " + response.daily[i].temp.day +" °F" ;
        var dayWind = "Wind: " + response.daily[i].wind_speed + " MPH";
        var dayHumidity = "Humidity: " + response.daily[i].humidity + "%";
        arrayDays[i].children[0].innerHTML = dayFormat;
        arrayDays[i].children[1].src = dayIcon;
        arrayDays[i].children[2].innerHTML = dayTemp;
        arrayDays[i].children[3].innerHTML = dayWind;
        arrayDays[i].children[4].innerHTML = dayHumidity;
    }
})
.catch(err => {
	console.error(err);
});
}
var buttonHandler = function(event){
    var target = event.target;
    var city = document.getElementById("form").value;
    if(target.id === "search"){
        if(city){
            getCoordinates(city);
        }
    }

}

loadCities();
if(!lastSearch){
    lastSearch = "Austin";
}
getCoordinates(lastSearch);
addEventListener("click", buttonHandler);

