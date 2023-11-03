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
let dayFiveDate = $('#fiveDate');
let dayFiveTemp = $('#dayFiveTemp');
let dayFiveWind = $('#dayFiveWind');

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
                    let tempF = KtoF(data.list[3].main.temp)
                    let dateTimeOne = data.list[3].dt_txt;
                    let parts = dateTimeOne.split(' ');
                    let dayOne = parts[0].split('-');
                    let dateOne = `${dayOne[1]}/${dayOne[2]}/${dayOne[0]}`;
                    dayOneDate.text(dateOne);
                    dayOneTemp.text(`Temp: ${tempF} °F`);
                    dayOneWind.text(`Wind: ${data.list[3].wind.speed} mi/h`);

                    // Day 2
                    let tempFTwo = KtoF(data.list[11].main.temp)
                    let dateTimeTwo = data.list[11].dt_txt;
                    let partsTwo = dateTimeTwo.split(' ');
                    let dayTwo = partsTwo[0].split('-');
                    let dateTwo = `${dayTwo[1]}/${dayTwo[2]}/${dayTwo[0]}`;
                    dayTwoDate.text(dateTwo);
                    dayTwoTemp.text(`Temp: ${tempFTwo} °F`);
                    dayTwoWind.text(`Wind: ${data.list[11].wind.speed} mi/h`);

                    //Day 3
                    let tempFThree = KtoF(data.list[19].main.temp);
                    let dateTimeThree = data.list[19].dt_txt;
                    let partsThree = dateTimeThree.split(' ');
                    let dayThree = partsThree[0].split('-');
                    let dateThree = `${dayThree[1]}/${dayThree[2]}/${dayThree[0]}`;
                    dayThreeDate.text(dateThree);
                    dayThreeTemp.text(`Temp: ${tempFThree} °F`);
                    dayThreeWind.text(`Wind: ${data.list[19].wind.speed} mi/h`);

                    //Day 4
                    let tempFFour = KtoF(data.list[27].main.temp);
                    let dateTimeFour = data.list[27].dt_txt;
                    let partsFour = dateTimeFour.split(' ');
                    let dayFour = partsFour[0].split('-');
                    let dateFour = `${dayFour[1]}/${dayFour[2]}/${dayFour[0]}`;
                    dayFourDate.text(dateFour);
                    dayFourTemp.text(`Temp: ${tempFFour} °F`);
                    dayFourWind.text(`Wind: ${data.list[27].wind.speed} mi/h`);

                    //Day 5
                    let tempFFive = KtoF(data.list[36].main.temp);
                    let dateTimeFive = data.list[36].dt_txt;
                    let partsFive = dateTimeFive.split(' ');
                    let dayFive = partsFive[0].split('-');
                    let dateFive = `${dayFive[1]}/${dayFive[2]}/${dayFive[0]}`;
                    dayFiveDate.text(dateFive);
                    dayFiveTemp.text(`Temp: ${tempFFive} °F`);
                    dayFiveWind.text(`Wind: ${data.list[36].wind.speed} mi/h`);

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

