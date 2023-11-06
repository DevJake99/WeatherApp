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
let todayI = $('#todayI')
// Declare dynamic HMTL elements for 5 day section
let dayOneDiv = $('#dayOne');
let dayOneDate = $('#oneDate');
let oneI = $('#oneI');
let dayOneTemp = $('#dayOneTemp');
let dayOneWind = $('#dayOneWind');

let dayTwoDiv = $('#dayTwo');
let twoI = $('#twoI');
let dayTwoDate = $('#twoDate');
let dayTwoTemp = $('#dayTwoTemp');
let dayTwoWind = $('#dayTwoWind');

let dayThreeDiv = $('#dayThree');
let threeI = $('#threeI');
let dayThreeDate = $('#threeDate');
let dayThreeTemp = $('#dayThreeTemp');
let dayThreeWind = $('#dayThreeWind');

let dayFourDiv = $('#dayFour');
let fourI = $('#fourI');
let dayFourDate = $('#fourDate');
let dayFourTemp = $('#dayFourTemp');
let dayFourWind = $('#dayFourWind');

let dayFiveDiv = $('#dayFive');
let fiveI = $('#fiveI');
let dayFiveDate = $('#fiveDate');
let dayFiveTemp = $('#dayFiveTemp');
let dayFiveWind = $('#dayFiveWind');

let historyBtn = $('#h')



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
            todayI.attr('src', `./assets/${data.weather[0].icon}.png`)

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
                    console.log('img: ', data.list[3].weather[0].icon)
                    //Parse/clean data for the following 5 days
                    //Day 1
                    let tempF = KtoF(data.list[3].main.temp)
                    let dateTimeOne = data.list[3].dt_txt;
                    let parts = dateTimeOne.split(' ');
                    let dayOne = parts[0].split('-');
                    let dateOne = `${dayOne[1]}/${dayOne[2]}/${dayOne[0]}`;
                    oneI.attr('src', `./assets/${data.list[3].weather[0].icon}.png`)
                    dayOneDate.text(dateOne);
                    dayOneTemp.text(`Temp: ${tempF} °F`);
                    dayOneWind.text(`Wind: ${data.list[3].wind.speed} mi/h`);

                    // Day 2
                    let tempFTwo = KtoF(data.list[11].main.temp)
                    let dateTimeTwo = data.list[11].dt_txt;
                    let partsTwo = dateTimeTwo.split(' ');
                    let dayTwo = partsTwo[0].split('-');
                    let dateTwo = `${dayTwo[1]}/${dayTwo[2]}/${dayTwo[0]}`;
                    twoI.attr('src', `./assets/${data.list[11].weather[0].icon}.png`)
                    dayTwoDate.text(dateTwo);
                    dayTwoTemp.text(`Temp: ${tempFTwo} °F`);
                    dayTwoWind.text(`Wind: ${data.list[11].wind.speed} mi/h`);

                    //Day 3
                    let tempFThree = KtoF(data.list[19].main.temp);
                    let dateTimeThree = data.list[19].dt_txt;
                    let partsThree = dateTimeThree.split(' ');
                    let dayThree = partsThree[0].split('-');
                    let dateThree = `${dayThree[1]}/${dayThree[2]}/${dayThree[0]}`;
                    threeI.attr('src', `./assets/${data.list[19].weather[0].icon}.png`)
                    dayThreeDate.text(dateThree);
                    dayThreeTemp.text(`Temp: ${tempFThree} °F`);
                    dayThreeWind.text(`Wind: ${data.list[19].wind.speed} mi/h`);

                    //Day 4
                    let tempFFour = KtoF(data.list[27].main.temp);
                    let dateTimeFour = data.list[27].dt_txt;
                    let partsFour = dateTimeFour.split(' ');
                    let dayFour = partsFour[0].split('-');
                    let dateFour = `${dayFour[1]}/${dayFour[2]}/${dayFour[0]}`;
                    fourI.attr('src', `./assets/${data.list[27].weather[0].icon}.png`)
                    dayFourDate.text(dateFour);
                    dayFourTemp.text(`Temp: ${tempFFour} °F`);
                    dayFourWind.text(`Wind: ${data.list[27].wind.speed} mi/h`);

                    //Day 5
                    let tempFFive = KtoF(data.list[36].main.temp);
                    let dateTimeFive = data.list[36].dt_txt;
                    let partsFive = dateTimeFive.split(' ');
                    let dayFive = partsFive[0].split('-');
                    let dateFive = `${dayFive[1]}/${dayFive[2]}/${dayFive[0]}`;
                    fiveI.attr('src', `./assets/${data.list[36].weather[0].icon}.png`)
                    dayFiveDate.text(dateFive);
                    dayFiveTemp.text(`Temp: ${tempFFive} °F`);
                    dayFiveWind.text(`Wind: ${data.list[36].wind.speed} mi/h`);

                })

            // }
            console.log('SearchCity function log:', data);
        });

};

let i = 0
const recentSearches = [];

$(document).ready(function () {
    // Loop through localStorage
    for (let j = 0; j < localStorage.length; j++) {
        // Get the key for the current item
        let key = localStorage.key(j);
        // Get the value of the current item
        let value = localStorage.getItem(key);
        // Append a new button to the history list
        $('#historyList').append(`<li><button class='h' id='s${key}'>${value}</button></li>`);
    }
});

searchBtn.on('click', (event) => {
    event.preventDefault();
    let input = searchInput.val()
    searchCity(input);
    i++;
    // Stores user input in local storage using i (number of clicks) as the key
    localStorage.setItem(i, input);
    recentSearches.push(input);
    // Start recent searches logic
    historyList.append(`<li><button class="h" id='s${i}'>${localStorage.getItem(i)}</button></li>`);


});
// Click handler for DOM elements (elemnts from local storage) to provide functionality to "recent searches" buttons
$(document).on('click', '.h', (event) => {
    event.preventDefault();
    let button = $(event.target).text();
    //let btnText = button.text();
    console.log('btn: ', button);
    searchCity(button);
})

