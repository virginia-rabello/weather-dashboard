var key = config.key;
var url = config.url;
var cityIcon = document.querySelector("#icon");
var cityForecast = document.querySelector("#cityForecast");
var cityTarget = "";
var cities = [];
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
fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ long +"&exclude=hourly,daily&appid=" + openAPI)
	

.then(response => response.json())
.then(response => {
    console.log(response);
       
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
    cityIcon.style.width = '120px';
    cityIcon.style.height = '120px';
    cityIcon.style.marginLeft = '100px';
    cityIcon.style.marginTop = '20px';
    cityIcon.src = URLicon;
    cityH2.innerHTML = cityTarget;
    datePlace.innerHTML = date;
    cityTemp.innerHTML = temp;
    cityWind.innerHTML = wind;
    cityHumidity.innerHTML = humidity;
    cityUV.innerHTML = uvText;
    uvSpan.textContent = uvIndex;
    
    	
    
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

