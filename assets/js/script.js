fetch("https://yahoo-weather5.p.rapidapi.com/weather?location=sunnyvale&format=json&u=f", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "72ec3ec64dmsh3a185f201e13e83p1fff16jsn8100cc7ea96c",
		"x-rapidapi-host": "yahoo-weather5.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(response => {
	console.log(response);
    
})
.catch(err => {
	console.error(err);
});