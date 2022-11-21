// Buttons
const sunButton = document.getElementById('sun-icon');
const mercuryButton = document.getElementById('mercury-icon');
const venusButton = document.getElementById('venus-icon');
const earthButton = document.getElementById('earth-icon');
const moonButton = document.getElementById('moon-icon');
const marsButton = document.getElementById('mars-icon');
const jupiterButton = document.getElementById('jupiter-icon');
const saturnButton = document.getElementById('saturn-icon');
const uranusButton = document.getElementById('uranus-icon');
const neptuneButton = document.getElementById('neptune-icon');
const plutoButton = document.getElementById('pluto-icon');
const issButton = document.getElementById('iss-button');

// Content containers
let content = document.getElementById('content-container');
let contentContainer = document.getElementById('content');

// Auth (DONE WRONG, NEVER SAVE JWT IN LOCAL STORAGE, USE HTTP ONLY COOKIE INSTEAD)
const authContent = document.getElementById('auth');
let jwt = localStorage.getItem('jwt');
let isLoggedIn = 0;
let userName = "";
isLoggedIn = localStorage.getItem('isLoggedIn');
userName = localStorage.getItem('user');
verifyLoggedIn();

function verifyLoggedIn(){
    if (isLoggedIn == 1) {
        authContent.innerHTML = "<h2>Welcome " + userName + "</h2> <h2 style='cursor: pointer' onclick='signOut()'>Sign out</h2>"
    } else {
        authContent.innerHTML = "<h2><a href='/planetor/sign-in'>Sign in</a></h2>"
    }
}

function signOut(){
    localStorage.setItem('user', '');
    localStorage.setItem('isLoggedIn', '0');
    localStorage.setItem('jwt', '');
    alert("You have signed out.")
    document.location.reload();
}

// Content functions
displaySolarSystem();

function displaySolarSystem() {
    content.innerHTML = ""
    contentContainer.style.backgroundImage = "url('images/solar-system.png'"
    contentContainer.style.backgroundSize = "contain"
    contentContainer.style.backgroundRepeat = "no-repeat"
}

function fetchCelestialBody(id) {
    content.innerHTML = "Fetching data from backend.."

    fetch('https://planetor-production.up.railway.app/api/celestialbodies/' + id, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + jwt,
        })
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            content.innerHTML = "Celestial body: " + data.name + "<br>"
                + "Average temperature: " + data.averageTemperature + "°C" + "<br>"
                + "One day in earth hours: " + data.dayInEarthHours + "<br>"
                + "One year in earth days: " + data.yearInEarthDays + "<br>"
                + "Density: " + data.density + "<br>"
                + "Diameter: " + data.diameter + "<br>"
                + "Gravity: " + data.gravity + "<br>"
                + "Mass: " + data.mass + "<br>"
                + "Number of moons: " + data.numberOfMoons + "<br>"
        })
        contentContainer.style.backgroundImage = "none"
        contentContainer.style.backgroundSize = "contain"
        contentContainer.style.backgroundRepeat = "no-repeat"

    if (isLoggedIn != 1){
        content.innerHTML = "You must sign in to access database."
    }

}

function fetchSatellite(id){
    contentContainer.style.backgroundImage = "none"
    contentContainer.style.backgroundSize = "contain"
    contentContainer.style.backgroundRepeat = "no-repeat"
    content.innerHTML = "Fetching data from backend.."
    fetch('https://planetor-production.up.railway.app/api/satellites/' + id, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + jwt,
        })
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            content.innerHTML = data.description + "<br><br>"
                + "Latitude: " + data.latitude + "<br>"
                + "Longitude: " + data.longitude + "<br>"
                + "Currently over: " + data.country + "<br>"
        })

    if (isLoggedIn != 1){
        content.innerHTML = "You must sign in to access database."
    }
}
