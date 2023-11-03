var passKey = '3dbf5011d16142b01340346c60ec010e';
var searchForm = $('#searchBar');
var inputCity = $('#searchBar-input');
//var inputCityVal = inputCity.value();
let searchBtn = $('#searchBtn');
let searchInput = $('#searchBar-input');
// Declare dynamic HTML Elements for today section
//todayHTwo.innerHTML()
let todayHTwo = $('#todayLocation');
let historyList = $('#historyList');
let todayTemp = $('#todayTemp');
let todayWind = $('#todayWind');
let todayHum = $('#todayHum');

// Declare dynamic HMTL elements for 5 day section
let dayOneDiv = $('#dayOne');
let dayOneDate = $('#oneDate');
let dayOneTemp = $('#dayOneTemp');
let dayOneWind = $('#dayOneWind');

let dayTwoDiv = $('#dayTwo');
let dayTwoDate = $('#twoDate');
let dayTwoTemp = $('#dayTwoTemp');
let dayTwoWind = $('#dayTwoWind');

let dayThreeDiv = $('#dayThree');
let dayThreeDate = $('#threeDate');
let dayThreeTemp = $('#dayThreeTemp');
let dayThreeWind = $('#dayThreeWind');

let dayFourDiv = $('#dayFour');
let dayFourDate = $('#fourDate');
let dayFourTemp = $('#dayFourTemp');
let dayFourWind = $('#dayFourWind');

let dayFiveDiv = $('#dayFive');

// Conversion functions
function KtoF(Kelvin) {
    let Fahrenheit = Math.round((((Kelvin - 273.15) * (9 / 5)) + 32));
    return Fahrenheit;
}
function CtoF(celcius) {
    let fahrenheit = Math.round(((celcius * 9 / 5) + 32));
    return fahrenheit
}

function kmToM(km) {
    let miles = Math.round(km * 0.621371);
    return miles;
}


// function to fetch data from api
function searchCity(city) {
    var requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${passKey}&units=metric`;
    fetch(requestURL)
        .then((response) => response.json())
        .then((data) => {
            let f = CtoF(data.main.temp);
            let m = kmToM(data.wind.speed);
            todayHTwo.text(`The Weather Today in ${city} is ${data.weather[0].description}`);
            todayTemp.text(`Temperature: ${f} °F`);
            todayWind.text(`Wind Speed: ${m} mi/h`);
            // Get Lon and Lat for 5 day forcast request
            let lat = data.coord.lat;
            let lon = data.coord.lon;
            //console.log("Latitude", lat, "Longitude", lon);
            //function getFiveDay(lat, lon) {
            let fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${passKey} `
            fetch(fiveDayURL).then((response) => response.json())
                .then((data) => {
                    console.log('Data', data);
                    //Parse/clean data for the following 5 days
                    //Day 1
                    tempF = KtoF(data.list[3].main.temp)
                    let dateTimeOne = data.list[3].dt_txt;
                    let parts = dateTimeOne.split(' ');
                    let dayOne = parts[0].split('-');
                    let dateOne = `${dayOne[1]}/${dayOne[2]}/${dayOne[0]}`;
                    dayOneDate.text(dateOne);
                    dayOneTemp.text(`Temp: ${tempF} °F`);
                    dayOneWind.text(`Wind: `)
                })

            // }
            console.log('SearchCity function log:', data);
        });

};



searchBtn.on('click', (event) => {
    event.preventDefault();
    let input = searchInput.val()
    searchCity(input);

});

