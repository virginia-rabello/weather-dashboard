var key = config.key;
var url = config.url;
var cityInfoDiv = document.querySelector("#cityInfoDiv");
var cityForecast = document.querySelector("#cityForecast");
var cityTarget = "";

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
    console.log(cityH2);
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

addEventListener("click", buttonHandler);

