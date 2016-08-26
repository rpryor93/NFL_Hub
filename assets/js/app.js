$(document).ready(function() {
    
    // store our API endpoint
        var queryURL = "https://api.openweathermap.org/data/2.5/weatherq=orlando&api_key=04b494e287408f88135e3fe897efaf3d";

        // use ajax to GET the queryUrl
        $.ajax({url: queryURL, method: 'GET'})
        
        console.log(queryURL);
    
})

js