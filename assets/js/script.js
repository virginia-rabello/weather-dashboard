var key = config.key;
var url = config.url;
fetch("https://yahoo-weather5.p.rapidapi.com/weather?location=sunnyvale&format=json&u=f", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": key,
		"x-rapidapi-host": url
	}
})
.then(response => response.json())
.then(response => {
	console.log(response.current_observation.atmosphere.humidity);
    
})
.catch(err => {
	console.error(err);
});