const apiKey = "b1b27de70d4b904ae63742646e36cb1b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
    const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);

    if (response.status == 404) {
        alert("City not found");
        return;
    }

    var data = await response.json();

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    
    document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";

    // Image Change Logic
    const condition = data.weather[0].main;
    if (condition == "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (condition == "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (condition == "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (condition == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (condition == "Mist" || condition == "Haze") {
        weatherIcon.src = "images/mist.png";
    } else if (condition == "Snow") {
        weatherIcon.src = "images/snow.png";
    }
    document.querySelector(".error").style.display = "none";
    document.querySelector('.weather').style.display='block';  
}
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});