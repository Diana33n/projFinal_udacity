/* Global Variables */
const openWeatherMapBaseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiBaseURL = "http://localhost:3000/";
// Personal API Key for OpenWeatherMap API
const openWeatherMapAPIKey = "32ac451cc4299dcce5c63910bbcc691d";

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", () => getDataFromOpenWeatherAPI(openWeatherMapAPIKey));

/* Function to GET Web API Data*/
async function getDataFromOpenWeatherAPI(apiKey) {
    let zipCode = document.getElementById("zip").value;
    fetch(`${openWeatherMapBaseURL}${zipCode},us&units=imperial&appid=${apiKey}`).then((response) => {
        return response.json();
    }).then((result) => {
        postProjectData(result.main.temp);
    });
}

/* Function to GET Project Data */
async function getProjectData() {
    fetch(apiBaseURL + 'projectData').then((response) => {
        return response.json();
    }).then((result) => {
        document.getElementById("date").innerHTML = result.date;
        document.getElementById("temp").innerHTML = JSON.stringify(result.temp);
        document.getElementById("content").innerHTML = result.content;
        document.getElementById("zip").value = "";
        document.getElementById("feelings").value = "";
    });
}

/* Function to POST Project data */
async function postProjectData(temp) {
    // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear(); // Corrected date format
    let content = document.getElementById("feelings").value;
    let data = {
        date: newDate,
        temp: temp,
        content: content,
    };
    let options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    };
    fetch(apiBaseURL + 'projectData', options).then((response) => {
        return response.json();
    }).then((result) => {
        getProjectData()
    });
}
